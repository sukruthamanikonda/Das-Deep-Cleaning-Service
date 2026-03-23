const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');
const { sendWhatsApp, adminNumber } = require('../services/whatsapp');

const SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';

// Middleware to verify token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Access denied' });

    jwt.verify(token, SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user;
        next();
    });
};

// GET all orders (Admin sees all, User sees own)
router.get('/', verifyToken, (req, res) => {
    if (req.user.role === 'admin') {
        db.all('SELECT * FROM orders ORDER BY created_at DESC', [], (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows.map(row => ({
                ...row,
                items: JSON.parse(row.items || '[]')
            })));
        });
    } else {
        db.all('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC', [req.user.id], (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows.map(row => ({
                ...row,
                items: JSON.parse(row.items || '[]')
            })));
        });
    }
});

// POST create order
router.post('/', verifyToken, (req, res) => {
    const { items, total } = req.body;

    // Extract customer details from the first item if available to store nicely (optional)
    const firstItem = items && items.length > 0 ? items[0] : {};

    // For admin dashboard visibility, we might want to store top-level customer info if the schema supported it,
    // but for now we stick to storing the JSON blob in 'items'.

    const itemsStr = JSON.stringify(items);

    db.run(
        'INSERT INTO orders (user_id, items, total, status) VALUES (?, ?, ?, ?)',
        [req.user.id, itemsStr, total, 'pending'],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });

            // Create a notification for admin
            const orderId = this.lastID;
            const notifMsg = `New order #${orderId} from ${req.user.name || 'User'}`;
            db.run(
                'INSERT INTO notifications (type, title, message, meta) VALUES (?, ?, ?, ?)',
                ['order', 'New Booking', notifMsg, JSON.stringify({ orderId })],
                (nErr) => {
                    if (nErr) console.error('Failed to create notification', nErr);
                }
            );

            // Send WhatsApp notifications
            // 1. Get user phone number
            db.get('SELECT phone, name FROM users WHERE id = ?', [req.user.id], (uErr, userRow) => {
                if (uErr) {
                    console.error('Failed to fetch user for WhatsApp', uErr);
                    return;
                }

                const bookingDetails = `Booking #${orderId} confirmed! Total: $${total}. We will contact you shortly.`;

                // To Customer
                if (userRow && userRow.phone) {
                    sendWhatsApp({ to: userRow.phone, body: `Hi ${userRow.name}, ${bookingDetails}` });
                }

                // To Admin
                if (adminNumber) {
                    sendWhatsApp({ to: adminNumber, body: `New Order #${orderId} from ${req.user.name}. Total: $${total}.` });
                }
            });

            res.status(201).json({ id: orderId, message: 'Order created successfully' });
        }
    );
});

// PATCH update order status (Admin only)
router.patch('/:id', verifyToken, (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admin access required' });

    const { status } = req.body;
    db.run(
        'UPDATE orders SET status = ? WHERE id = ?',
        [status, req.params.id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0) return res.status(404).json({ error: 'Order not found' });
            res.json({ message: 'Order updated' });
        }
    );
});

module.exports = router;
