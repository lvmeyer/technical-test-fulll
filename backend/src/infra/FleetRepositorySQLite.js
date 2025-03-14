import { db } from "./db.js";
import { Fleet } from "../domain/Fleet.js";
import { Vehicle } from "../domain/Vehicle.js";

class FleetRepositorySqlite {
  getFleetById(fleetId) {
    const fleetRow = db
      .prepare("SELECT * FROM fleets WHERE id = ?")
      .get(fleetId);

    if (!fleetRow) return null;

    const fleet = new Fleet(fleetRow.id);

    // language=SQL format=false
    const vehicleRows = db
      .prepare(
        `
              SELECT v.*
              FROM vehicles v
              JOIN fleet_vehicle fv ON fv.vehicleId = v.id
              WHERE fv.fleetId = ?
                `,
      )
      .all(fleetId);

    vehicleRows.forEach((row) => {
      const vehicle = new Vehicle(row.id, row.plateNumber);
      fleet.vehicles.push(vehicle);
    });

    return fleet;
  }

  createFleet(id, userId) {
    const existingUser = db
      .prepare(
        `
                    SELECT *
                    FROM fleets
                    WHERE userId = ?
                `,
      )
      .get(userId);
    console.log(existingUser);
    if (existingUser) {
      throw new Error(`User already exists: ${JSON.stringify(existingUser)}`);
    }

    // language=SQL format=false
    db.prepare(
      `
                INSERT INTO fleets (id, userId, createdAt)
                VALUES (?, ?, datetime('now'))
            `,
    ).run(id, userId);
  }

  addVehicleToFleet(fleetId, vehicle) {
    const existingVehicle = db
      .prepare("SELECT * FROM vehicles WHERE id = ?")
      .get(vehicle.id);
    if (!existingVehicle) {
      db.prepare(
        `
                    INSERT INTO vehicles (id, plateNumber, updatedAt)
                    VALUES (?, ?, datetime('now'))
                `,
      ).run(vehicle.id, vehicle.plateNumber);
    }

    try {
      db.prepare(
        `
                    INSERT INTO fleet_vehicle (fleetId, vehicleId)
                    VALUES (?, ?)
                `,
      ).run(fleetId, vehicle.id);
    } catch (err) {
      if (
        err.message.includes("UNIQUE constraint failed") ||
        err.message.includes("PRIMARY KEY")
      ) {
        throw new Error("VEHICLE_ALREADY_REGISTERED");
      }
      throw err;
    }
  }
}

export const fleetRepositorySqlite = new FleetRepositorySqlite();
