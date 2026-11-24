# ADR 0347: Kylin ARM64 Offline Target and glibc 2.31 Floor

- Status: Accepted
- Date: 2026-11-24
- Related: ADR 0145, ADR 0318, Issue #1, Issue #2

## Context

Upstream PI-Desktop packages Linux x64 and arm64 targets built on Ubuntu 22.04 with a glibc floor of 2.35. While the Electron frontend binary can launch on systems with older glibc, the Rust `host-core` binary fails on Galaxy Kylin (银河麒麟) V10 SP1 (2403) ARM64 because Kylin ships with glibc 2.31, lacking symbols introduced in GLIBC_2.32, 2.33, and 2.34. Furthermore, the application startup check in `linux-glibc.ts` strictly rejects runtimes below glibc 2.35, preventing core process initialization.

Additionally, default `electron-builder` `.deb` packaging includes legacy and unavailable dependencies (e.g., `gconf2`, `libappindicator1`) that fail `dpkg -i` on clean, offline Kylin systems without internet access or configured package repositories.

## Decision

1. **glibc Floor Lowering to 2.31**:
   - Update `MIN_LINUX_GLIBC` to `{ major: 2, minor: 31 }`.
   - Update `LINUX_GLIBC_DISTROS` to encompass Ubuntu 20.04+, Debian 11+, 银河麒麟 V10 SP1+, and Fedora 36+.
   - Update `scripts/check-linux-host-glibc.mjs` and startup assertions to permit glibc 2.31.
   - Host-core binaries built for Linux release must not reference dynamic symbols newer than GLIBC_2.31.

2. **Clean Offline deb Packaging**:
   - Explicitly configure `deb.depends` in `apps/desktop/package.json` with only the essential runtime libraries:
     `["libc6 (>= 2.31)", "libgtk-3-0", "libnss3", "libasound2", "libxss1", "libxtst6"]`.
   - Strip obsolete and non-default dependencies such as `gconf2`, `gconf-service`, and `libappindicator1`.
   - All specified dependencies are pre-installed by default on 银河麒麟 V10 SP1 (2403) Desktop edition (UKUI).

3. **Version & Upstream Baseline**:
   - The candidate package version line is frozen at `0.23.0`, aligned with upstream release `v0.23.0` (commit `95df2e0f9d124ba281fc99e6700ca6649766c77e`).
   - All `@earendil-works/pi-*` patches are preserved.

## Consequences

- 银河麒麟 V10 SP1 (2403) ARM64 can install the generated `.deb` package directly via `dpkg -i` in an offline environment without dependency errors.
- The desktop shell and the `host-core` sidecar both execute correctly on glibc 2.31 systems.
- Packaging verification ensures no binary symbol leaks beyond the 2.31 floor.
