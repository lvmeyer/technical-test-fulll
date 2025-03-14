#!/usr/bin/env node

import { program } from "commander";
import { fleetRepositorySqlite } from "./infra/FleetRepositorySQLite.js";
import { Vehicle } from "./domain/Vehicle.js";
import { registerVehicleHandler } from "./app/handlers/RegisterVehicleHandler.js";

program
  .command("create <userId>")
  .description("Create a new Fleet for the given user. Prints out the fleetId.")
  .action((userId) => {
    const fleetId = crypto.randomUUID();
    fleetRepositorySqlite.createFleet(fleetId, userId);
    console.log(`Fleet [${fleetId}] created`);
  });

program
  .command("register-vehicle <fleetId> <vehiclePlateNumber>")
  .description("Register a vehicle into the fleet.")
  .action((fleetId, vehiclePlateNumber) => {
    const vehicleId = vehiclePlateNumber;
    const vehicle = new Vehicle(vehicleId);
    vehicle.plateNumber = vehiclePlateNumber;

    try {
      registerVehicleHandler.handle(fleetId, vehicle);
      console.log(
        `Vehicle [${vehiclePlateNumber}] registered to fleet [${fleetId}]`,
      );
    } catch (err) {
      console.error("Error:", err.message);
      process.exit(1);
    }
  });

program.parse(process.argv);
