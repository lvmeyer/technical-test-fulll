import { Fleet } from "../domain/Fleet";

export class FleetRepositoryInMemory {
  fleets: any;

  constructor() {
    this.fleets = {};
  }

  createFleet(id: string) {
    if (!this.fleets[id]) {
      this.fleets[id] = new Fleet(id);
    }
  }

  getFleetById(id: string) {
    return this.fleets[id];
  }

  clear() {
    this.fleets = {};
  }
}

export const fleetRepositoryInMemory = new FleetRepositoryInMemory();
