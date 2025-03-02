import assert from "assert";
import { Given, When, Then } from "@cucumber/cucumber";
import { Location } from "../../src/domain/Location.js";
import { parkVehicleHandler } from "../../src/app/handlers/ParkVehicleHandler.js";
import { fleetRepositoryInMemory } from "../../src/infra/FleetRepositoryInMemory.js";
import { registerVehicleHandler } from "../../src/app/handlers/RegisterVehicleHandler.js";

Given("a location", function () {
  this.location = new Location("444,222");
});

When("I park my vehicle at this location", function () {
  registerVehicleHandler.handle(this.fleetId, this.vehicle);
  parkVehicleHandler.handle(this.fleetId, this.vehicle, this.location);
});

Then(
  "the known location of my vehicle should verify this location",
  function () {
    const fleet = fleetRepositoryInMemory.getFleetById(this.fleetId);
    const vehicle = fleet.vehicles.find((v) => v.id === this.vehicle.id);
    assert.strictEqual(vehicle.location, this.location.value);
  },
);

Given("my vehicle has been parked into this location", function () {});

When("I try to park my vehicle at this location", function () {
  try {
    parkVehicleHandler.handle(this.fleetId, this.vehicle, this.location);
  } catch (error) {
    this.error = error;
  }
});

Then(
  "I should be informed that my vehicle is already parked at this location",
  function () {
    assert.strictEqual(
      this.error.message,
      "VEHICLE_ALREADY_PARKED_AT_THIS_LOCATION",
    );
  },
);
