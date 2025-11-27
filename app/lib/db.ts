import sqlite3 from "sqlite3";

export function openDB() {
  return new sqlite3.Database("database.sqlite");
}