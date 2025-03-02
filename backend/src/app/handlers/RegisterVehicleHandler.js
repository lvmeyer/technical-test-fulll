import { fleetRepositoryInMemory } from "../../infra/FleetRepositoryInMemory.js";

class RegisterVehicleHandler {
  handle(fleetId, vehicle) {
    const fleet = fleetRepositoryInMemory.getFleetById(fleetId);
    if (!fleet) {
      throw new Error("FLEET_NOT_FOUND");
    }

    fleet.addVehicle(vehicle);
  }
}

export const registerVehicleHandler = new RegisterVehicleHandler();
