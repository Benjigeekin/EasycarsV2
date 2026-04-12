require('dotenv').config();
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Initialize SQLite DB
const db = new sqlite3.Database('./bookings.db', (err) => {
  if (err) {
    console.error('Error connecting to SQLite database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    db.run(`CREATE TABLE IF NOT EXISTS Bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customerName TEXT NOT NULL,
      carModel TEXT NOT NULL,
      startDate TEXT NOT NULL,
      endDate TEXT NOT NULL,
      status TEXT DEFAULT 'PENDING',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
  }
});

const fs = require('fs');

// Configure Nodemailer Transporter
const getSMTPPass = () => {
  console.log('[DEBUG] Checking SMTP password source...');
  if (process.env.SMTP_PASS && process.env.SMTP_PASS !== 'paste_your_16_character_app_password_here') {
    console.log('[DEBUG] Using SMTP_PASS from environment variables.');
    return process.env.SMTP_PASS;
  }

  // Try reading from Render Secret File
  const secretPath = '/etc/secrets/Easycars_Email_confirmation';
  console.log(`[DEBUG] SMTP_PASS env missing. Checking for secret file at: ${secretPath}`);
  if (fs.existsSync(secretPath)) {
    try {
      const pass = fs.readFileSync(secretPath, 'utf8').trim();
      console.log(`[DEBUG] Successfully read secret file. Length: ${pass.length} characters.`);
      return pass;
    } catch (err) {
      console.error('[ERROR] Error reading Render secret file:', err.message);
    }
  } else {
    console.warn(`[WARN] Secret file NOT found at ${secretPath}`);
  }
  return null;
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER || 'biteksgroup@gmail.com',
    pass: getSMTPPass()
  }
});

// TRIGGER ON CREATE HELPER:
const sendBookingEmail = async (bookingData) => {
  try {
    const smtpPass = getSMTPPass();
    if (!smtpPass) {
      console.error('SMTP credentials are missing. Email action bypassed.');
      return;
    }

    console.log('[AUTOMATION] Attempting to send email...');
    const info = await transporter.sendMail({
      from: `"EasyCars System" <${process.env.SMTP_USER || 'biteksgroup@gmail.com'}>`,
      to: 'biteksgroup@gmail.com',
      subject: 'New Booking Request Received',
      text: `A new booking has just been registered in the system!\n\n` +
        `Customer: ${bookingData.customerName}\n` +
        `Vehicle Model: ${bookingData.carModel}\n` +
        `Rental Window: ${bookingData.startDate} to ${bookingData.endDate}\n\n` +
        `Please reach out to finalize the reservation.`
    });
    console.log(`[AUTOMATION] Successfully triggered email for booking: ${bookingData.customerName}. Message ID: ${info.messageId}`);
  } catch (error) {
    console.error('[AUTOMATION] Failed to execute email trigger. Full error:', error);
  }
};


// -----------------------------------------
// POST Endpoint (Trigger: On Create)
// -----------------------------------------
app.post('/api/bookings', (req, res) => {
  const { customerName, carModel, startDate, endDate } = req.body;

  if (!customerName || !carModel || !startDate || !endDate) {
    return res.status(400).json({ error: 'Missing required fields in payload' });
  }

  // 1. Commit to Database
  db.run(
    `INSERT INTO Bookings (customerName, carModel, startDate, endDate) VALUES (?, ?, ?, ?)`,
    [customerName, carModel, startDate, endDate],
    function (err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to commit booking to database', details: err.message });
      }

      const newBookingId = this.lastID;
      console.log(`Successfully committed booking ${newBookingId} to database.`);

      // 2. TRIGGER SERVER-SIDE EMAIL AUTOMATION IMMEDIATELY AFTER COMMIT
      sendBookingEmail({
        customerName,
        carModel,
        startDate,
        endDate
      });

      // Respond to frontend
      res.status(201).json({
        message: 'Booking request registered',
        bookingId: newBookingId
      });
    }
  );
});

// GET Endpoint for administrative viewing
app.get('/api/bookings', (req, res) => {
  db.all('SELECT * FROM Bookings ORDER BY id DESC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Serve frontend in production
const path = require('path');
app.use(express.static(path.join(__dirname, '../dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`EasyCars Backend running on http://localhost:${PORT}`);
});
