import { fleetRepositoryInMemory } from "../../infra/FleetRepositoryInMemory.js";

class ParkVehicleHandler {
  handle(fleetId, vehicle, location) {
    const fleet = fleetRepositoryInMemory.getFleetById(fleetId);
    if (!fleet) {
      throw new Error("FLEET_NOT_FOUND");
    }
    fleet.parkVehicle(vehicle, location);
  }
}

export const parkVehicleHandler = new ParkVehicleHandler();
