import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../../..", import.meta.url));
const desktopPkgPath = path.join(root, "apps/desktop/package.json");
const desktopPkg = JSON.parse(readFileSync(desktopPkgPath, "utf8"));

test("deb packaging configuration matches Kylin ARM64 offline requirements", () => {
  const deb = desktopPkg.build?.deb;
  assert.ok(deb, "deb build configuration must exist");
  assert.equal(deb.packageName, "pi-desktop");
  assert.match(deb.artifactName, /\$\{version\}_\$\{arch\}\.\$\{ext\}$/);

  // Version must be aligned with 0.23.0 baseline
  assert.equal(desktopPkg.version, "0.23.0");

  // Dependencies must be explicitly specified for offline installation
  assert.ok(Array.isArray(deb.depends), "deb.depends must be an array");

  // Must require glibc 2.31 floor
  assert.ok(
    deb.depends.some((dep) => dep.includes("libc6") && dep.includes("2.31")),
    "deb.depends must require libc6 >= 2.31",
  );

  // Must include standard desktop essentials
  assert.ok(deb.depends.includes("libgtk-3-0"), "must depend on libgtk-3-0");
  assert.ok(deb.depends.includes("libnss3"), "must depend on libnss3");
  assert.ok(deb.depends.includes("libasound2"), "must depend on libasound2");
  assert.ok(deb.depends.includes("libxss1"), "must depend on libxss1");
  assert.ok(deb.depends.includes("libxtst6"), "must depend on libxtst6");

  // Must NOT include obsolete/absent packages that fail offline dpkg -i on Kylin V10 SP1
  assert.equal(
    deb.depends.includes("gconf2"),
    false,
    "must not depend on obsolete gconf2",
  );
  assert.equal(
    deb.depends.includes("gconf-service"),
    false,
    "must not depend on obsolete gconf-service",
  );
  assert.equal(
    deb.depends.includes("libappindicator1"),
    false,
    "must not depend on missing libappindicator1",
  );
});
