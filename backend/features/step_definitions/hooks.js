import { Before } from "@cucumber/cucumber";
import { db } from "../../src/infra/db.js";

Before({ tags: "@integration" }, async function () {
  db.exec("DELETE FROM fleet_vehicle;");
  db.exec("DELETE FROM vehicles;");
  db.exec("DELETE FROM fleets;");
});
