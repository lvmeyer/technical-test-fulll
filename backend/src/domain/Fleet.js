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
}
