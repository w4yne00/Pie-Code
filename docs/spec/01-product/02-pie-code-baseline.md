# Pie Code Baseline Specification: Kylin ARM64 Offline Edition

## 1. Upstream Official Baseline

Pie Code is maintained as a fork of `vastsa/PI-Desktop`, extending it for offline enterprise and national Linux environments (specifically Galaxy Kylin / 银河麒麟 ARM64).

- **Upstream Repository**: `https://github.com/vastsa/PI-Desktop`
- **Upstream Release Tag**: `v0.23.0`
- **Upstream Tag Hash**: `919938f4092d35e408ea263084c5ae60330723a2`
- **Upstream Commit Hash**: `95df2e0f9d124ba281fc99e6700ca6649766c77e`
- **Commit Message**: `Merge pull request #2448 from vastsa/fix/settings-dialog-menu-layer`
- **Packaged Version Line**: `0.23.0`

## 2. Pi Kernel Patches

The candidate package preserves and continues the pinned `@earendil-works/pi-*` kernel patch set:
1. `patches/@earendil-works__pi-agent-core@1.5.2.patch`: Pi Agent core engine patches.
2. `patches/@earendil-works__pi-ai@1.5.2.patch`: Pi AI transport, streaming, tool call handling, and token tracking.
3. `patches/@earendil-works__pi-coding-agent@1.5.2.patch`: Coding agent mutation, tool invocation, and steering.

## 3. Platform & Target Specification

- **Target OS**: 银河麒麟 V10 SP1 (2403) (Galaxy Kylin V10 SP1)
- **Architecture**: `linux-arm64` (`aarch64`)
- **glibc Floor**: `2.31`
- **Package Format**: `.deb`
- **Network Environment**: Offline (no internet access, no external package repositories)
