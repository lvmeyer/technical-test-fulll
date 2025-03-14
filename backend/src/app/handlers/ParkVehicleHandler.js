import { fleetRepositoryInMemory } from "../../infra/FleetRepositoryInMemory.js";
import { fleetRepositorySqlite } from "../../infra/FleetRepositorySQLite.js";

class ParkVehicleHandler {
  handle(fleetId, vehicle, location) {
    const fleet = fleetRepositoryInMemory.getFleetById(fleetId);
    // const fleet = fleetRepositorySqlite.getFleetById(fleetId);

    if (!fleet) {
      throw new Error("FLEET_NOT_FOUND");
    }
    fleet.parkVehicle(vehicle, location);
    // fleetRepositorySqlite.updateVehicleLocation(vehicleId, lat, lng, alt);
  }
}

export const parkVehicleHandler = new ParkVehicleHandler();
