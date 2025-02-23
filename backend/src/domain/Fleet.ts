import { Vehicle } from "./Vehicle";

export class Fleet {
  private readonly id: string;
  vehicles: Vehicle[];

  constructor(id: string) {
    this.id = id;
    this.vehicles = [];
  }

  addVehicle(vehicle: Vehicle) {
    const exists = this.vehicles.some((v) => v.id === vehicle.id);

    if (exists) {
      throw new Error(`Vehicle already exists in fleet ${this.id}`);
    }
    this.vehicles.push(vehicle);
  }
}
