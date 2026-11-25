<div align="center">

<img src="https://raw.githubusercontent.com/w4yne00/Pie-Code/pie-code/apps/desktop/build/linux-icons/512x512.png" alt="Pie Code 图标" width="104" />

# Pie Code

*Ars longa, vita brevis.*

面向银河麒麟 ARM64 和无公网环境的桌面编程工作台。

**[下载麒麟 ARM64 安装包](https://github.com/w4yne00/Pie-Code/releases/download/pie-code-v0.23.0/pie-code_0.23.0_arm64.deb)** ·
[发布说明](https://github.com/w4yne00/Pie-Code/releases/tag/pie-code-v0.23.0) ·
[English](README.md)

</div>

## Pie Code 做了哪些改造

Pie Code 基于 [PI-Desktop](https://github.com/vastsa/PI-Desktop) 开发，保留项目和会话工作台，针对麒麟调整了安装方式、模型配置和桌面体验。

- **麒麟离线安装。** ARM64 Debian 安装包面向银河麒麟桌面操作系统 V10 SP1（2403），要求 glibc 2.31 或以上。当前 `0.23.x` 发布线提供 `0.23.0` 安装包。
- **本地或内网模型。** 可接入自定义 OpenAI 兼容服务，自动发现该服务提供的模型，也能手动填写模型 ID。内置模型目录可断网查看，只包含模型信息，不含模型权重。
- **在本地项目中编程。** 在工作台查看文件改动和测试结果。Ask 模式可审批文件修改和终端命令，也可中止正在生成的回复，或重新打开已保存的会话。
- **可选的内网 MCP。** 有需要时，可在设置中添加 HTTP MCP 服务。没有 MCP 服务也能使用编程工作台。
- **独立安装与外观。** Pie Code 使用自己的图标、珊瑚色主题和 Linux 启动项。它可以与 PI-Desktop 同机使用，默认设置和会话各自保存；Pie Code 使用 `~/.pie-code`。

## 安装或更新

下载 `pie-code_0.23.0_arm64.deb`。如果目标机器没有公网连接，先在其他机器下载，再把安装包复制过去。

```sh
sudo dpkg -i ./pie-code_0.23.0_arm64.deb
```

安装后，从应用菜单打开 **Pie Code**。覆盖更新已有的 `0.23.0` 时，先退出 Pie Code，再用新下载的包执行同一条命令。注销并重新登录可刷新桌面和任务栏图标。

安装包已在现有麒麟环境中验证。全新系统若缺少依赖，可参照[离线安装指南](https://github.com/w4yne00/Pie-Code/blob/pie-code/docs/spec/06-delivery/kylin-arm64-offline-install.md)准备依赖包。本次仅发布 ARM64 Debian 安装包。

## 连接模型

1. 在 **设置 → 模型配置**中添加桌面可访问的 OpenAI 兼容服务，例如本机模型服务或内网网关。
2. 填写服务的 API 地址；服务需要鉴权时，再填写 API 密钥。随后发现模型，或手动输入已知的模型 ID。
3. 打开本地项目，选择配置好的模型并开始会话。模型服务需单独安装并运行。

## 源码与许可

[`pie-code` 维护分支](https://github.com/w4yne00/Pie-Code/tree/pie-code)包含基于 PI-Desktop `v0.23.0` 的产品改造。默认 `main` 分支跟踪上游 PI-Desktop 的 `0.24.x` 源码。已发布安装包的源码提交以发布说明为准。

项目采用 [GNU 宽通用公共许可证 v3.0](LICENSE)。Pie Code 的问题可提交到 [Issues](https://github.com/w4yne00/Pie-Code/issues)。
