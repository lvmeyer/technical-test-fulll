import * as assert from "assert";

import { Given, When, Then } from "@cucumber/cucumber";
import { Vehicle } from "../src/domain/Vehicle";
import { fleetRepositoryInMemory } from "../src/infra/FleetRepositoryInMemory";
import { registerVehicleHandler } from "../src/app/app";

// I can register a vehicle
Given("my fleet", function () {
  this.currentFleetId = "fleet-1";
  fleetRepositoryInMemory.createFleet(this.currentFleetId);
});

Given("a vehicle", function () {
  this.currentVehicle = new Vehicle("vehicle-1");
});

When("I register this vehicle into my fleet", function () {
  try {
    registerVehicleHandler.handle(this.currentFleetId, this.currentVehicle.id);
  } catch (e) {}
});

Then("this vehicle should be part of my vehicle fleet", function () {
  const fleet = fleetRepositoryInMemory.getFleetById(this.currentFleetId);
  const foundVehicleInMyFleet = fleet.vehicles.some(
    (vehicle: string) => vehicle === this.currentVehicle.id,
  );

  assert.strictEqual(foundVehicleInMyFleet, true);
});

// I can't register same vehicle twice
Given("I have registered this vehicle into my fleet", function () {
  // registerVehicleHandler.handle(this.currentFleetId, this.currentVehicle);
});

When("I try to register this vehicle into my fleet", function () {
  try {
    registerVehicleHandler.handle(this.currentFleetId, this.currentVehicle.id);
  } catch (error) {
    this.error = error;
  }
});

// Same vehicle can belong to more than one fleet
Given("the fleet of another user", function () {
  this.fleetIdOfOtherUser = "fleet-2";
  fleetRepositoryInMemory.createFleet(this.fleetIdOfOtherUser);
});

Given(
  "this vehicle has been registered into the other user's fleet",
  function () {
    registerVehicleHandler.handle(
      this.fleetIdOfOtherUser,
      this.currentVehicle.id,
    );
  },
);

Then(
  "I should be informed this this vehicle has already been registered into my fleet",
  function () {
    console.log(this.error.message);
    assert.strictEqual(this.error.message, "VEHICLE_ALREADY_REGISTERED");
  },
);
