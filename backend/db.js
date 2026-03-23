const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const DB_PATH = path.join(__dirname, 'hygienix.db');

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Failed to open DB', err);
    process.exit(1);
  }
  console.log('Database connected at', DB_PATH);
});

// Create tables if not exist
db.serialize(() => {
  // We don't need users table strictly anymore, but leaving it to not break existing data is safer.
  // We can just ignore it.

  db.run(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      phone TEXT,
      message TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) console.error('Error creating contacts table:', err);
  });

  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER, -- Kept for legacy compatibility, but will be NULL for new bookings
      customer_name TEXT,
      customer_phone TEXT,
      address TEXT,
      service_date TEXT,
      items TEXT,
      total REAL,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) console.error('Error creating orders table:', err);
  });

  // Alter table to add new columns if they don't exist (for existing DB)
  const columnsToAdd = [
    { name: 'customer_name', type: 'TEXT' },
    { name: 'customer_phone', type: 'TEXT' },
    { name: 'address', type: 'TEXT' },
    { name: 'service_date', type: 'TEXT' }
  ];

  columnsToAdd.forEach(col => {
    db.run(`ALTER TABLE orders ADD COLUMN ${col.name} ${col.type}`, (err) => {
       // Ignore duplicate column errors
       if (err && !/duplicate column name|already exists/i.test(err.message || '')) {
         console.error(`Error adding ${col.name} column:`, err);
       }
    });
  });

  db.run(`
    CREATE TABLE IF NOT EXISTS notifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT,
      title TEXT,
      message TEXT,
      meta TEXT,
      is_read INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) console.error('Error creating notifications table:', err);
  });
});

module.exports = db;
