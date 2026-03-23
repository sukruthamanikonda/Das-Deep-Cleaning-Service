const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router();
const SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const FRONTEND_URL = process.env.FRONTEND_URL || process.env.REACT_APP_API_URL || '';

router.post('/register', async (req, res) => {
    const { name, email, password, phone } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'email and password required' });
    try {
        // basic email format check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return res.status(400).json({ error: 'invalid email format' });
        if (typeof password !== 'string' || password.length < 6) return res.status(400).json({ error: 'password must be at least 6 characters' });
        const hash = await bcrypt.hash(password, 10);
        db.run(
            'INSERT INTO users (name, email, password_hash, phone) VALUES (?, ?, ?, ?)',
            [name || null, email, hash, phone || null],
            function (err) {
                if (err) {
                    // Handle unique email constraint explicitly
                    const msg = (err.message || '').toLowerCase();
                    if (msg.includes('unique') || msg.includes('constraint failed') || msg.includes('sqlite_error')) {
                        console.warn('User creation unique constraint failed for email:', email, err.message);
                        return res.status(409).json({ error: 'Email already registered' });
                    }
                    console.error('User creation DB error:', err);
                    return res.status(500).json({ error: 'User creation failed', details: err.message });
                }
                const user = { id: this.lastID, name, email, role: 'user', phone };
                const token = jwt.sign(user, SECRET, { expiresIn: '7d' });
                res.json({ user, token });
            }
        );
    } catch (err) {
        console.error('Register error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    // Allow empty email for Admin (if configured that way)
    if ((email === undefined && email !== '') || !password) return res.status(400).json({ error: 'password required' });
    db.get('SELECT id, name, email, password_hash, role FROM users WHERE email = ?', [email], async (err, row) => {
        if (err) {
            console.error('Login DB error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (!row) {
            console.log('User not found:', email);
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        try {
            const ok = await bcrypt.compare(password, row.password_hash);
            if (!ok) {
                console.log('Password mismatch for:', email);
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            const user = { id: row.id, name: row.name, email: row.email, role: row.role };
            const token = jwt.sign(user, SECRET, { expiresIn: '7d' });
            res.json({ user, token });
        } catch (err) {
            console.error('Login error:', err);
            return res.status(500).json({ error: 'Server error during login' });
        }
    });
});

// Request password reset: send email with token (if SMTP configured)
router.post('/forgot', (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'email required' });
    db.get('SELECT id, name, email FROM users WHERE email = ?', [email], (err, row) => {
        if (err) {
            console.error('Forgot password DB error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        // Always respond success to avoid leaking which emails exist
        if (!row) return res.json({ success: true });

        const token = crypto.randomBytes(32).toString('hex');
        const expires = Date.now() + 3600 * 1000; // 1 hour
        db.run('UPDATE users SET password_reset_token = ?, password_reset_expires = ? WHERE id = ?', [token, expires, row.id], function (uErr) {
            if (uErr) console.error('Failed to set reset token', uErr);
            // send email if possible
            try {
                const SMTP_HOST = process.env.SMTP_HOST;
                const SMTP_PORT = process.env.SMTP_PORT || 587;
                const SMTP_USER = process.env.SMTP_USER;
                const SMTP_PASS = process.env.SMTP_PASS;
                if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
                    const transporter = nodemailer.createTransport({
                        host: SMTP_HOST,
                        port: Number(SMTP_PORT),
                        secure: Number(SMTP_PORT) === 465,
                        auth: { user: SMTP_USER, pass: SMTP_PASS }
                    });
                    const resetLink = FRONTEND_URL ? `${FRONTEND_URL.replace(/\/$/, '')}/reset-password?token=${token}&email=${encodeURIComponent(email)}` : `Token: ${token}`;
                    const mailOptions = {
                        from: SMTP_USER,
                        to: row.email,
                        subject: 'Password reset request',
                        text: `You requested a password reset. Use the link below (expires in 1 hour):\n\n${resetLink}`
                    };
                    transporter.sendMail(mailOptions).then(info => {
                        console.log('Password reset email sent:', info.messageId);
                    }).catch(sendErr => console.error('Failed to send password reset email', sendErr));
                } else {
                    console.log('SMTP not configured; password reset token generated for', email);
                }
            } catch (e) {
                console.error('Error in forgot route mailer:', e);
            }
            return res.json({ success: true });
        });
    });
});

// Reset password using token
router.post('/reset', async (req, res) => {
    const { email, token, newPassword } = req.body;
    if (!email || !token || !newPassword) return res.status(400).json({ error: 'email, token and newPassword required' });
    if (typeof newPassword !== 'string' || newPassword.length < 6) return res.status(400).json({ error: 'password must be at least 6 characters' });
    db.get('SELECT id, password_reset_token, password_reset_expires FROM users WHERE email = ?', [email], async (err, row) => {
        if (err) {
            console.error('Reset DB error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (!row || !row.password_reset_token) return res.status(400).json({ error: 'Invalid token' });
        if (row.password_reset_token !== token) return res.status(400).json({ error: 'Invalid token' });
        if (Date.now() > (row.password_reset_expires || 0)) return res.status(400).json({ error: 'Token expired' });
        try {
            const hash = await bcrypt.hash(newPassword, 10);
            db.run('UPDATE users SET password_hash = ?, password_reset_token = NULL, password_reset_expires = NULL WHERE id = ?', [hash, row.id], function (uErr) {
                if (uErr) {
                    console.error('Failed to reset password', uErr);
                    return res.status(500).json({ error: 'Failed to reset password' });
                }
                return res.json({ success: true });
            });
        } catch (e) {
            console.error('Hashing error during reset:', e);
            return res.status(500).json({ error: 'Server error' });
        }
    });
});

module.exports = router;
