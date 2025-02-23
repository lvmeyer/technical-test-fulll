import { fleetRepositoryInMemory } from "../infra/FleetRepositoryInMemory";

export class RegisterVehicleHandler {
  handle(fleetId: string, vehicleId: string) {
    const fleet = fleetRepositoryInMemory.getFleetById(fleetId);

    if (!fleet) {
      throw new Error("FLEET_NOT_FOUND");
    }

    fleet.addVehicle(vehicleId);
  }
}
