export class Fleet {
  /**
   * @param {string} id
   */
  constructor(id) {
    this.id = id;
    this.vehicles = [];
  }

  /**
   * @param {Vehicle} vehicle
   * @returns {string}
   */
  addVehicle(vehicle) {
    const exists = this.vehicles.some((v) => v.id === vehicle.id);
    if (exists) {
      throw new Error("VEHICLE_ALREADY_REGISTERED");
    }

    this.vehicles.push(vehicle);
  }

  /**
   * @param {Vehicle} vehicle
   * @param {Location} location
   * @returns {string}
   */
  parkVehicle(vehicle, location) {
    const vehicleFound = this.vehicles.find((v) => v.id === vehicle.id);
    if (!vehicleFound) {
      throw new Error("VEHICLE_NOT_FOUND");
    }

    if (vehicleFound.location === location.value) {
      throw new Error("VEHICLE_ALREADY_PARKED_AT_THIS_LOCATION");
    }
    vehicleFound.park(location);
  }
}
