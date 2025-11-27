import * as SQLite from "expo-sqlite";
import { Platform } from "react-native";

let db;

export const initDatabase = async () => {
  if (Platform.OS === "web") {
    // Use async APIs on web to avoid SharedArrayBuffer requirement
    db = await SQLite.openDatabaseAsync("microledger.db");
    await db.execAsync(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('trader', 'admin')),
      name TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL CHECK(type IN ('sale', 'expense')),
      amount REAL NOT NULL,
      description TEXT,
      date TEXT NOT NULL,
      trader_id INTEGER NOT NULL,
      is_synced INTEGER DEFAULT 0,
      updated_at TEXT NOT NULL,
      FOREIGN KEY (trader_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS ious (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      borrower_name TEXT NOT NULL,
      amount REAL NOT NULL,
      due_date TEXT NOT NULL,
      status TEXT NOT NULL CHECK(status IN ('pending', 'paid')),
      trader_id INTEGER NOT NULL,
      is_synced INTEGER DEFAULT 0,
      updated_at TEXT NOT NULL,
      FOREIGN KEY (trader_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      action TEXT NOT NULL,
      details TEXT,
      timestamp TEXT NOT NULL
    );
  `);

    const result = await db.getAllAsync("SELECT * FROM users WHERE role = ?", [
      "admin",
    ]);
    if (result.length === 0) {
      await db.runAsync(
        "INSERT INTO users (username, password, role, name) VALUES (?, ?, ?, ?)",
        ["admin", "admin123", "admin", "System Admin"]
      );
    }
  } else {
    // Native platforms can use the synchronous API
    db = SQLite.openDatabaseSync("microledger.db");
    db.execSync(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('trader', 'admin')),
      name TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL CHECK(type IN ('sale', 'expense')),
      amount REAL NOT NULL,
      description TEXT,
      date TEXT NOT NULL,
      trader_id INTEGER NOT NULL,
      is_synced INTEGER DEFAULT 0,
      updated_at TEXT NOT NULL,
      FOREIGN KEY (trader_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS ious (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      borrower_name TEXT NOT NULL,
      amount REAL NOT NULL,
      due_date TEXT NOT NULL,
      status TEXT NOT NULL CHECK(status IN ('pending', 'paid')),
      trader_id INTEGER NOT NULL,
      is_synced INTEGER DEFAULT 0,
      updated_at TEXT NOT NULL,
      FOREIGN KEY (trader_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      action TEXT NOT NULL,
      details TEXT,
      timestamp TEXT NOT NULL
    );
  `);

    const result = db.getAllSync("SELECT * FROM users WHERE role = ?", [
      "admin",
    ]);
    if (result.length === 0) {
      db.runSync(
        "INSERT INTO users (username, password, role, name) VALUES (?, ?, ?, ?)",
        ["admin", "admin123", "admin", "System Admin"]
      );
    }
  }
};

export const getDB = () => db;
