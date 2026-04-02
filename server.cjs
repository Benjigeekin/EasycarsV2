require('dotenv').config();
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Initialize SQLite DB (Relative to root)
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

// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

const sendBookingEmail = async (bookingData) => {
  try {
    if (!process.env.SMTP_PASS || process.env.SMTP_PASS === 'paste_your_16_character_app_password_here') {
      console.error('SMTP credentials are missing. Email action bypassed.');
      return;
    }
    
    await transporter.sendMail({
      from: `"EasyCars System" <${process.env.SMTP_USER}>`,
      to: 'biteksgroup@gmail.com',
      subject: 'New Booking Request Received',
      text: `A new booking has just been registered in the system!\n\n` +
            `Customer: ${bookingData.customerName}\n` +
            `Vehicle Model: ${bookingData.carModel}\n` +
            `Rental Window: ${bookingData.startDate} to ${bookingData.endDate}\n\n` +
            `Please reach out to finalize the reservation.`
    });
    console.log(`[AUTOMATION] Successfully triggered email for booking: ${bookingData.customerName}`);
  } catch (error) {
    console.error('[AUTOMATION] Failed to execute email trigger:', error);
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

  db.run(
    `INSERT INTO Bookings (customerName, carModel, startDate, endDate) VALUES (?, ?, ?, ?)`,
    [customerName, carModel, startDate, endDate],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to commit booking to database', details: err.message });
      }
      const newBookingId = this.lastID;
      sendBookingEmail({ customerName, carModel, startDate, endDate });
      res.status(201).json({ message: 'Booking request registered', bookingId: newBookingId });
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

// Serve frontend in production (relative to root)
app.use(express.static(path.join(__dirname, './dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`EasyCars Full-Stack running on port ${PORT}`);
});
