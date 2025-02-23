export class Vehicle {
  id: string;
  private currentLocation: string | null = null;

  constructor(id: string) {
    this.id = id;
  }

  park(location: string) {
    this.currentLocation = location;
  }
}
