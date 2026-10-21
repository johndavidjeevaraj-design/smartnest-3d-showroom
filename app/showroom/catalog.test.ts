import assert from "node:assert/strict";
import test from "node:test";
import { filterMaterials, floors } from "./catalog.ts";

test("material search matches names and finishes without changing catalog order", () => {
  const results = filterMaterials("limestone", "All materials");

  assert.deepEqual(
    results.map((material) => material.id),
    ["warm-limestone"],
  );
});

test("material filters combine with search", () => {
  const results = filterMaterials("stone", "Stone");

  assert.deepEqual(
    results.map((material) => material.id),
    ["warm-limestone", "silver-travertine", "basalt-graphite"],
  );
});

test("every floor clearly identifies whether it has a modeled scene", () => {
  assert.deepEqual(
    floors.map(({ id, implemented }) => [id, implemented]),
    [
      ["ground-floor", true],
      ["first-floor", false],
      ["underground", false],
      ["pop-up-window", false],
    ],
  );
});
