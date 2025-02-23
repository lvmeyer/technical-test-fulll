import { Vehicle } from "./Vehicle";

export class Fleet {
  private readonly id: string;
  vehicles: string[];

  constructor(id: string) {
    this.id = id;
    this.vehicles = [];
  }

  addVehicle(vehicleId: string) {
    const exists = this.vehicles.some((v) => v === vehicleId);

    if (exists) {
      throw new Error(`VEHICLE_ALREADY_REGISTERED`);
    }
    this.vehicles.push(vehicleId);
  }
}
