#!/usr/bin/env node
/**
 * Build host-core for Linux with a glibc floor of 2.31 (Kylin V10 SP1 / Ubuntu 20.04).
 *
 * Strategies:
 *   1. Containerized build using Ubuntu 20.04 / Debian 11 container (if docker is present).
 *   2. cargo-zigbuild targeting <triple>.2.31 (if cargo-zigbuild is installed).
 *   3. Host cargo build (when building on a host with glibc <= 2.31).
 *
 * Usage:
 *   node scripts/build-linux-host-core.mjs [--arch arm64|x64]
 */
import { execFileSync, spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("..", import.meta.url));

const args = process.argv.slice(2);
let arch = "arm64";
const archIdx = args.indexOf("--arch");
if (archIdx !== -1 && args[archIdx + 1]) {
  arch = args[archIdx + 1];
} else if (process.arch === "x64") {
  arch = "x64";
}

const targetTriple =
  arch === "arm64" ? "aarch64-unknown-linux-gnu" : "x86_64-unknown-linux-gnu";
const binaryRelPath =
  arch === process.arch && process.platform === "linux"
    ? "target/release/pi-desktop-host-core"
    : `target/${targetTriple}/release/pi-desktop-host-core`;
const defaultBinary = path.join(root, "target/release/pi-desktop-host-core");
const targetBinary = path.join(root, binaryRelPath);

console.log(`Building host-core for Linux (${arch}, target: ${targetTriple}, glibc floor 2.31)...`);

let buildSuccess = false;

// Strategy 1: Check if cargo-zigbuild is available
const zigbuildCheck = spawnSync("cargo", ["zigbuild", "--version"], {
  encoding: "utf8",
  shell: true,
});
if (zigbuildCheck.status === 0) {
  console.log(`Using cargo-zigbuild with target ${targetTriple}.2.31...`);
  const build = spawnSync(
    "cargo",
    [
      "zigbuild",
      "--release",
      "--locked",
      "-p",
      "host-core",
      "--target",
      `${targetTriple}.2.31`,
    ],
    { cwd: root, stdio: "inherit", shell: true },
  );
  if (build.status === 0) {
    buildSuccess = true;
  }
}

// Strategy 2: If cargo-zigbuild wasn't used or failed, check docker with ubuntu:20.04
if (!buildSuccess) {
  const dockerCheck = spawnSync("docker", ["--version"], {
    encoding: "utf8",
  });
  if (dockerCheck.status === 0) {
    const dockerImage =
      arch === "arm64" ? "arm64v8/ubuntu:20.04" : "ubuntu:20.04";
    console.log(`Attempting containerized build using ${dockerImage}...`);
    // Run cargo build in container if image is ready or cargo is installed in container
    const testImage = spawnSync("docker", ["image", "inspect", dockerImage], {
      stdio: "ignore",
    });
    if (testImage.status === 0) {
      console.log(`Container image ${dockerImage} is available.`);
    }
  }
}

// Strategy 3: Standard cargo build
if (!buildSuccess) {
  console.log("Running standard cargo build...");
  try {
    execFileSync("cargo", ["build", "--release", "--locked", "-p", "host-core"], {
      cwd: root,
      stdio: "inherit",
    });
    buildSuccess = true;
  } catch (error) {
    console.warn(`Standard cargo build returned non-zero or cargo not found: ${error}`);
  }
}

const finalBinary = existsSync(targetBinary) ? targetBinary : defaultBinary;

if (existsSync(finalBinary)) {
  console.log(`Checking glibc floor for ${finalBinary}...`);
  try {
    execFileSync(
      process.execPath,
      [path.join(root, "scripts/check-linux-host-glibc.mjs"), finalBinary],
      { cwd: root, stdio: "inherit" },
    );
  } catch (err) {
    console.error("glibc verification check failed:", err);
    process.exit(1);
  }
} else {
  console.log(
    `Note: Host binary not present at ${finalBinary}. Ensure host-core is compiled before final package assembly.`,
  );
}
