<div align="center">

<img src="https://raw.githubusercontent.com/w4yne00/Pie-Code/pie-code/apps/desktop/build/linux-icons/512x512.png" alt="Pie Code logo" width="104" />

# Pie Code

*Ars longa, vita brevis.*

A desktop coding workspace for Galaxy Kylin ARM64 and networks without public internet access.

**[Download for Kylin ARM64](https://github.com/w4yne00/Pie-Code/releases/download/pie-code-v0.23.0/pie-code_0.23.0_arm64.deb)** ·
[Release notes](https://github.com/w4yne00/Pie-Code/releases/tag/pie-code-v0.23.0) ·
[简体中文](README.zh-CN.md)

</div>

## What Pie Code changes

Pie Code is a fork of [PI-Desktop](https://github.com/vastsa/PI-Desktop). It keeps the project and session workspace, and adapts installation, model setup, and the desktop experience for Kylin.

- **Offline installation on Kylin.** The ARM64 Debian package targets Galaxy Kylin V10 SP1 (2403) with glibc 2.31 or later. The `0.23.0` package is the current delivery for the `0.23.x` line.
- **Local or intranet models.** Connect a custom OpenAI-compatible service, discover the models it exposes, or add a model ID manually. The bundled model catalog can be browsed without public internet access; it contains metadata, not model weights.
- **Coding in a local project.** Review changes and test results in the workspace. Ask mode lets you approve file edits and shell commands, and you can stop a streaming response or reopen a saved session.
- **Optional intranet MCP.** Add an HTTP MCP server from settings when you need it. The coding workspace also works without MCP servers.
- **Separate installation and appearance.** Pie Code has its own icon, coral theme accents, and Linux launcher. It can run alongside PI-Desktop: their default settings and sessions are separate. Pie Code uses `~/.pie-code` for its settings and sessions.

## Install or update

Download `pie-code_0.23.0_arm64.deb`, then copy it to the target computer if it has no public internet access.

```sh
sudo dpkg -i ./pie-code_0.23.0_arm64.deb
```

Open **Pie Code** from the application menu. To update an existing `0.23.0` installation, quit Pie Code and run the same command with the newly downloaded package. Sign out and back in to refresh the desktop and taskbar icons.

The package was verified on an existing Kylin installation. A clean machine may need additional dependency packages; see the [offline installation guide](https://github.com/w4yne00/Pie-Code/blob/pie-code/docs/spec/06-delivery/kylin-arm64-offline-install.md). This release publishes an ARM64 Debian package only.

## Connect a model

1. In **Settings → Model configuration**, add an OpenAI-compatible service reachable from the desktop, such as a local model server or an intranet gateway.
2. Enter its API URL and, if required, its API key. Discover its models or enter a known model ID manually.
3. Open a local project, choose the configured model, and start a session. Install and run the model service separately from Pie Code.

## Source and license

The [`pie-code` maintenance branch](https://github.com/w4yne00/Pie-Code/tree/pie-code) contains the Pie Code changes, based on PI-Desktop `v0.23.0`. The default `main` branch tracks the upstream PI-Desktop `0.24.x` source line. The release notes identify the source commit for the published package.

Pie Code is distributed under the [GNU Lesser General Public License v3.0](LICENSE). Report Pie Code issues in the [issue tracker](https://github.com/w4yne00/Pie-Code/issues).
