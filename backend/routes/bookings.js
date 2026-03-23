const express = require('express');
const router = express.Router();
const db = require('../db');
const { sendWhatsApp, adminNumber } = require('../services/whatsapp');

// POST create booking (public)
router.post('/', (req, res) => {
    const { items, total, name, phone, date, address } = req.body;

    // Basic validation
    if (!items || !name || !phone || !date || !address) {
        return res.status(400).json({ error: 'Missing required booking details' });
    }

    const itemsStr = JSON.stringify(items);

    // Insert into DB
    db.run(
        'INSERT INTO orders (customer_name, customer_phone, address, service_date, items, total, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, phone, address, date, itemsStr, total, 'pending'],
        function (err) {
            if (err) {
                console.error('Booking DB Error:', err);
                return res.status(500).json({ error: err.message });
            }

            const orderId = this.lastID;

            // Create notification (internal/admin dashboard logic if still used)
            const notifMsg = `New order #${orderId} from ${name}`;
            db.run(
                'INSERT INTO notifications (type, title, message, meta) VALUES (?, ?, ?, ?)',
                ['order', 'New Booking', notifMsg, JSON.stringify({ orderId })],
                (nErr) => {
                    if (nErr) console.error('Failed to create notification', nErr);
                }
            );

            const serviceNames = items.map(i => i.serviceName || i.bhkCategory).join(', ');
            const time = (items[0] && items[0].time) || req.body.time || '';

            const messageBody = `*New Booking #${orderId}*\n` +
                `Name: ${name}\n` +
                `Phone: ${phone}\n` +
                `Service: ${serviceNames}\n` +
                `Date: ${date}\n` +
                (time ? `Time: ${time}\n` : '') +
                `Address: ${address}\n` +
                `Total: ₹${total}`;

            // Send notifications (fire and forget to not block response, or await if critical)
            // We'll catch errors here just in case, though service handles them.
            (async () => {
                try {
                    // Send to Customer
                    await sendWhatsApp({ to: phone, body: `Hi ${name}, your booking request is received!\n\n${messageBody}` });
                    // Send to Admin
                    await sendWhatsApp({ to: adminNumber, body: `ADMIN ALERT:\n${messageBody}` });
                } catch (wErr) {
                    console.error('WhatsApp sending failed:', wErr);
                }
            })();

            res.status(201).json({ id: orderId, message: 'Booking created successfully' });
        }
    );
});

module.exports = router;
