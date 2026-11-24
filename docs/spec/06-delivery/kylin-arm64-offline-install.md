# 银河麒麟 V10 SP1 ARM64 离线安装与启动指南 (Kylin ARM64 Offline Delivery)

## 1. 交付目标与版本

- **候选包名称**: `pi-desktop_0.23.0_arm64.deb`
- **目标架构**: `arm64` (`aarch64`)
- **上游基线**: `v0.23.0` (提交: `95df2e0f9d124ba281fc99e6700ca6649766c77e`)
- **glibc 基线**: `2.31`
- **目标操作系统**: 银河麒麟桌面/服务器操作系统 V10 SP1（2403）ARM64

## 2. 离线依赖核对与裁剪

### 2.1 主包声明依赖
为确保在无外网、无配置软件源的银河麒麟环境中执行 `dpkg -i` 一次成功，安装包去除了上游默认包含但在麒麟上缺失或过时的包（如 `gconf2`, `libappindicator1`），精简为麒麟桌面必备基础库：

| 依赖包名称 | 最低版本要求 | 银河麒麟 V10 SP1 (2403) 桌面版默认状态 | 说明 |
| :--- | :--- | :--- | :--- |
| `libc6` | `>= 2.31` | 系统内置 (2.31) | 基础 C 库，核心进程兼容门槛已降为 2.31 |
| `libgtk-3-0` | 无 | 系统内置 (3.24.x) | UKUI / GNOME 桌面基础 GUI 库 |
| `libnss3` | 无 | 系统内置 | 网络与安全服务库 |
| `libasound2` | 无 | 系统内置 | ALSA 音频库 |
| `libxss1` | 无 | 系统内置 | X11 屏保扩展库 |
| `libxtst6` | 无 | 系统内置 | X11 测试扩展库 |

### 2.2 离线安装结论
在干净安装的银河麒麟 V10 SP1（2403）ARM64 桌面环境（UKUI）中，以上所有基础依赖均已由系统自带。主包 `pi-desktop_0.23.0_arm64.deb` 可直接独立完成安装，无需额外拉取或补充离线 deb 包。

### 2.3 极简/服务器环境备用补充依赖（若未安装图形桌面）
若目标机为未经定制的最小化 Server 安装且未安装桌面环境，则需预先备齐并按顺序安装以下离线包：
1. `libxss1_<version>_arm64.deb`
2. `libxtst6_<version>_arm64.deb`
3. `libasound2_<version>_arm64.deb`
4. `libnss3_<version>_arm64.deb`
5. `libgtk-3-0_<version>_arm64.deb`
6. `pi-desktop_0.23.0_arm64.deb`

安装命令：
```bash
# 存在依赖目录时：
sudo dpkg -i deps/*.deb
sudo dpkg -i pi-desktop_0.23.0_arm64.deb
```

## 3. 安装步骤与验证

### 3.1 离线安装命令
在目标机器终端执行：
```bash
sudo dpkg -i pi-desktop_0.23.0_arm64.deb
```
验证安装返回码为 0，无未满足的依赖项（Dependency errors）。

### 3.2 启动核心进程与应用
安装完成后，程序安装于 `/opt/PI-Desktop/`：
- 可从麒麟系统开始菜单（开发工具分类）点击 **PI-Desktop** 图标启动；
- 或在终端执行启动命令：
```bash
/opt/PI-Desktop/pi-desktop
```

### 3.3 兼容性与运行核对清单
1. **主进程与渲染进程启动**: Electron 界面正常渲染，无白屏或 crash 弹窗。
2. **核心 Rust 进程 (`pi-desktop-host-core`)**:
   - 二进制路径: `/opt/PI-Desktop/resources/bin/pi-desktop-host-core`
   - 不再报 `GLIBC_2.32`, `GLIBC_2.33`, `GLIBC_2.34 not found` 错误；
   - 启动时的 glibc 检查 (`assertLinuxGlibcSupported`) 检测到系统 glibc 2.31 顺利放行；
   - 状态栏显示连接成功。
3. **打开本地项目**:
   - 在应用内选择“打开本地项目”或指定本地代码目录；
   - 验证能够正确遍历目录文件树、读取本地代码、创建并加载工作区。
