import Database from "better-sqlite3";

export const db = new Database("fleet_management.db");
db.pragma("journal_mode = WAL");

// language=SQL format=false
db.exec(`
  CREATE TABLE IF NOT EXISTS fleets (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    createdAt TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS vehicles (
    id TEXT PRIMARY KEY,
    plateNumber TEXT,
    location TEXT,
    updatedAt TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS fleet_vehicle (
    fleetId TEXT NOT NULL,
    vehicleId TEXT NOT NULL,
    PRIMARY KEY (fleetId, vehicleId),
    FOREIGN KEY(fleetId) REFERENCES fleets(id),
    FOREIGN KEY(vehicleId) REFERENCES vehicles(id)
  );
`);
