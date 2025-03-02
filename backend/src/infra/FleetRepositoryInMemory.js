import { Fleet } from "../domain/Fleet.js";

class FleetRepositoryInMemory {
  constructor() {
    this.fleets = {};
  }

  createFleet(id) {
    if (!this.fleets[id]) {
      this.fleets[id] = new Fleet(id);
    }
  }

  getFleetById(id) {
    return this.fleets[id] || null;
  }
}

export const fleetRepositoryInMemory = new FleetRepositoryInMemory();
