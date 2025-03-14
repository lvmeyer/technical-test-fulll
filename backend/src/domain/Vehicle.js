export class Vehicle {
  /**
   * @param {string} id
   */
  constructor(id) {
    this.id = id;
    this.plateNumber = null;
    this.location = null;
  }

  park(location) {
    this.location = location.value;
  }
}
