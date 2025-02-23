import * as assert from "assert";

import { Given, When, Then } from "@cucumber/cucumber";
import { Fleet } from "../src/domain/Fleet";
import { Vehicle } from "../src/domain/Vehicle";

// I can register a vehicle
Given("my fleet", function () {
  this.currentFleet = new Fleet("fleet-1");
});

Given("a vehicle", function () {
  this.currentVehicle = new Vehicle("vehicle-1");
});

When("I register this vehicle into my fleet", function () {
  this.currentFleet.addVehicle(this.currentVehicle);
});

// I can't register same vehicle twice
Given("I have registered this vehicle into my fleet", function () {});

When("I try to register this vehicle into my fleet", function () {
  this.currentFleet.addVehicle(this.currentVehicleTwo);
});

Then(
  "I should be informed this this vehicle has already been registered into my fleet",
  function () {
    assert.strictEqual(this.error.message, "VEHICLE_ALREADY_REGISTERED");
  },
);

// Same vehicle can belong to more than one fleet
Given("the fleet of another user", function () {
  this.fleetOfOtherUser = new Fleet("fleet-4");
});

Given(
  "this vehicle has been registered into the other user's fleet",
  function () {
    this.fleetOfOtherUser.addVehicle(this.currentVehicle);
  },
);

Then("this vehicle should be part of my vehicle fleet", function () {
  const foundVehicleInMyFleet = this.currentFleet.vehicles.some(
    (vehicle: Vehicle) => vehicle.id === this.currentVehicle.id,
  );

  assert.strictEqual(foundVehicleInMyFleet, true);
});
