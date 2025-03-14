import { fleetRepositoryInMemory } from "../../infra/FleetRepositoryInMemory.js";
import { fleetRepositorySqlite } from "../../infra/FleetRepositorySQLite.js";

class RegisterVehicleHandler {
  handle(fleetId, vehicle) {
    // const fleet = fleetRepositoryInMemory.getFleetById(fleetId);
    const fleet = fleetRepositorySqlite.getFleetById(fleetId);
    if (!fleet) {
      throw new Error("FLEET_NOT_FOUND");
    }

    if (fleet.vehicles.some((v) => v.id === vehicle.id)) {
      throw new Error("VEHICLE_ALREADY_REGISTERED");
    }

    fleet.addVehicle(vehicle);

    fleetRepositorySqlite.addVehicleToFleet(fleetId, vehicle);
  }
}

export const registerVehicleHandler = new RegisterVehicleHandler();
