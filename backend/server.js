/**
 * Gatsby Portfolio — Contact Form Backend
 * Uses Express + Nodemailer to email enquiries to gatsby.techi@gmail.com
 *
 * SETUP:
 *   1. cd backend
 *   2. npm install
 *   3. Copy .env.example → .env and fill in your Gmail App Password
 *   4. node server.js
 */

require('dotenv').config();
const express    = require('express');
const nodemailer = require('nodemailer');
const cors       = require('cors');
const rateLimit  = require('express-rate-limit');

const app  = express();
const PORT = process.env.PORT || 3001;

// ── MIDDLEWARE ──────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Allow requests from your HTML file (adjust origin in production)
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'null', '*']
}));

// Rate limit: max 5 submissions per 15 minutes per IP (stops spam)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many submissions. Please try again in 15 minutes.' }
});
app.use('/api/contact', limiter);

// ── EMAIL TRANSPORTER ───────────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,   // gatsby.techi@gmail.com
    pass: process.env.GMAIL_PASS,   // Gmail App Password (not your real password)
  }
});

// ── CONTACT FORM ENDPOINT ───────────────────────────────────────────────────
app.post('/api/contact', async (req, res) => {
  const { fname, phone, biz, industry, budget, message } = req.body;

  // Basic server-side validation
  if (!fname || !phone || !biz) {
    return res.status(400).json({ error: 'Name, phone, and business name are required.' });
  }

  // Email to YOU (notification)
  const toYou = {
    from: `"Gatsby Portfolio" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    subject: `🔔 New Enquiry from ${fname} — ${biz}`,
    html: `
      <div style="font-family:Arial,sans-serif; max-width:600px; margin:0 auto; border:1px solid #e0e0e0; border-radius:8px; overflow:hidden;">
        <div style="background:#1E1A16; padding:24px 32px;">
          <h2 style="color:#FAF8F4; margin:0; font-size:20px;">New Website Enquiry</h2>
          <p style="color:#B8B0A4; margin:4px 0 0; font-size:13px;">Submitted via your Gatsby Portfolio site</p>
        </div>
        <div style="padding:32px;">
          <table style="width:100%; border-collapse:collapse; font-size:14px;">
            <tr><td style="padding:10px 0; border-bottom:1px solid #f0f0f0; color:#888; width:140px;">Name</td><td style="padding:10px 0; border-bottom:1px solid #f0f0f0; font-weight:600; color:#1E1A16;">${fname}</td></tr>
            <tr><td style="padding:10px 0; border-bottom:1px solid #f0f0f0; color:#888;">Phone</td><td style="padding:10px 0; border-bottom:1px solid #f0f0f0; font-weight:600; color:#1E1A16;">${phone}</td></tr>
            <tr><td style="padding:10px 0; border-bottom:1px solid #f0f0f0; color:#888;">Business</td><td style="padding:10px 0; border-bottom:1px solid #f0f0f0; font-weight:600; color:#1E1A16;">${biz}</td></tr>
            <tr><td style="padding:10px 0; border-bottom:1px solid #f0f0f0; color:#888;">Industry</td><td style="padding:10px 0; border-bottom:1px solid #f0f0f0; color:#1E1A16;">${industry || 'Not specified'}</td></tr>
            <tr><td style="padding:10px 0; border-bottom:1px solid #f0f0f0; color:#888;">Plan Interest</td><td style="padding:10px 0; border-bottom:1px solid #f0f0f0; color:#1E1A16;">${budget || 'Not specified'}</td></tr>
            <tr><td style="padding:10px 0; color:#888; vertical-align:top;">Message</td><td style="padding:10px 0; color:#1E1A16; line-height:1.6;">${message || 'No message provided.'}</td></tr>
          </table>
        </div>
        <div style="background:#FAF8F4; padding:16px 32px; text-align:center; font-size:12px; color:#B8B0A4;">
          Gatsby Website & Application Development · gatsby.techi@gmail.com
        </div>
      </div>
    `
  };

  // Auto-reply to the client (if they provided an email — optional field)
  // Currently no email field in the form, so we just notify you
  try {
    await transporter.sendMail(toYou);
    return res.status(200).json({ success: true, message: 'Enquiry sent successfully.' });
  } catch (err) {
    console.error('Email send error:', err.message);
    return res.status(500).json({ error: 'Failed to send email. Check server logs.' });
  }
});

// ── HEALTH CHECK ────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// ── START ───────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n✅ Gatsby backend running at http://localhost:${PORT}`);
  console.log(`   POST enquiries to: http://localhost:${PORT}/api/contact\n`);
});
