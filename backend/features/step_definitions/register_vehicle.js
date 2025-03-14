import assert from "assert";
import { Given, When, Then } from "@cucumber/cucumber";
import { Vehicle } from "../../src/domain/Vehicle.js";
import { registerVehicleHandler } from "../../src/app/handlers/RegisterVehicleHandler.js";
import { fleetRepositorySqlite } from "../../src/infra/FleetRepositorySQLite.js";

Given("my fleet", function () {
  this.fleetId = "fleet-1";
  this.userId = "user-2";
  fleetRepositorySqlite.createFleet(this.fleetId, this.userId);
});

Given("a vehicle", function () {
  this.vehicle = new Vehicle("vehicle-1");
});

When("I register this vehicle into my fleet", function () {
  try {
    registerVehicleHandler.handle(this.fleetId, this.vehicle);
    this.error = null;
  } catch (err) {
    this.error = err;
  }
});

Then("this vehicle should be part of my vehicle fleet", function () {
  const fleet = fleetRepositorySqlite.getFleetById(this.fleetId);
  const found = fleet.vehicles.some((v) => v.id === this.vehicle.id);
  assert.strictEqual(found, true);
});

Given("I have registered this vehicle into my fleet", function () {});

When("I try to register this vehicle into my fleet", function () {
  try {
    registerVehicleHandler.handle(this.fleetId, this.vehicle);
    this.error = null;
  } catch (err) {
    this.error = err;
  }
});

Then(
  "I should be informed this this vehicle has already been registered into my fleet",
  function () {
    assert.strictEqual(this.error.message, "VEHICLE_ALREADY_REGISTERED");
  },
);

Given("the fleet of another user", function () {
  this.otherFleetId = "fleet-1";
  fleetRepositorySqlite.createFleet(this.otherFleetId, this.userId);
});

Given(
  "this vehicle has been registered into the other user's fleet",
  function () {
    try {
      registerVehicleHandler.handle(this.otherFleetId, this.vehicle);
      this.error = null;
    } catch (err) {
      this.error = err;
    }
  },
);
