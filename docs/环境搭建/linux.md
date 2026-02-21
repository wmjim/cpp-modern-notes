# 搭建现代 C++ 开发环境

## 下载安装 Clang21

Clang 是当前最流行的 C++ 编译器之一，紧跟最新的 C++ 标准，以具备良好的错误消息而闻名。

笔者目前最新的 clang release 版本是 21.1.8，后面可以自己更新最新的版本。

```bash
wget https://apt.llvm.org/llvm.sh
chmod +x llvm.sh
sudo ./llvm.sh 21 all
```

该脚本将:

1. 添加官方的 llvm apt 仓库
2. 安装 Clang 21 及其相关工具
3. 更新软件包列表和依赖项

完成后，验证安装：

```bash
~ clang-21 --version
Ubuntu clang version 21.1.8 (++20251221032922+2078da43e25a-1~exp1~20251221153059.70)
Target: x86_64-pc-linux-gnu
Thread model: posix
InstalledDir: /usr/lib/llvm-21/bin
```

目前 clang-21 已经安装在系统上，通过使用 `update-alternatives` 设置 `clang-21` 的别名 `clang` 。

```bash
sudo update-alternatives --install /usr/bin/clang clang /usr/bin/clang-21 100
sudo update-alternatives --install /usr/bin/clang++ clang++ /usr/bin/clang++-21 100
sudo update-alternatives --install /usr/bin/clangd clangd /usr/bin/clangd-21 100
sudo update-alternatives --install /usr/bin/lldb lldb /usr/bin/lldb-21 100
sudo update-alternatives --install /usr/bin/lld lld /usr/bin/lld-21 100
sudo update-alternatives --install /usr/bin/clang-tidy clang-tidy /usr/bin/clang-tidy-21 100
```

执行以上命令将确保 `clang-21` 是系统上的默认 `clang`，此外也将 `clang` 相关的多个工具也设置为使用 `clang-21` 版本。

验证以下工具是否可以正常访问：

```bash
clang --version
clang++ --version
clangd --version
lldb --version
lld --version
clang-tidy --version
```

## 安装 CMake 

CMake 是一个在 C++ 社区中广泛使用的流行构建系统生成器。

它用于生成各种构建系统的构建文件，如 `Ninja`、`Make`、`Visual Studio`。

1、在 [CMake 下载页面](https://cmake.org/download/)，找到适用于 Linux 的最新安装脚本，然后执行安装：

```bash
# 1. 下载该脚本
wget https://github.com/Kitware/CMake/releases/download/v4.2.3/cmake-4.2.3-linux-x86_64.sh
# 2. 使脚本可执行
chmod +x cmake-4.2.3-linux-x86_64.sh
# 3. 执行脚本以安装 CMake
sudo mkdir -p /opt/cmake-4.2.3
sudo ./cmake-4.2.3-linux-x86_64.sh --prefix=/opt/cmake-4.2.3 --skip-license
```

以上命令将把 CMake 安装在 `/opt/cmake-4.2.3` 目录，也可以通过 `--prefix` 选项修改你要安装 cmake 的目录。

2、将 CMake 添加到系统 PATH

```bash
sudo update-alternatives --install /usr/bin/cmake cmake /opt/cmake-4.2.3/bin/cmake 100
sudo update-alternatives --install /usr/bin/ctest ctest /opt/cmake-4.2.3/bin/ctest 100
sudo update-alternatives --install /usr/bin/cpack cpack /opt/cmake-4.2.3/bin/cpack 100
```

之后就可以通过 `cmake`、`ctest`、`cpack` 命令访问。

## 安装 Ninja

Ninja 是一个与 CMake 搭配使用的快速构建系统，比 Make 更快。

在 [Ninja 下载页面](https://github.com/ninja-build/ninja/releases)，找到适用于 Linux 的最新软件压缩包。

```bash
# 1. 获取 ninja 压缩包
wget https://github.com/ninja-build/ninja/releases/download/v1.13.2/ninja-linux.zip
# 2. 解压缩
unzip ninja-linux.zip
# 3. 将 ninja 可执行文件移动到 /usr/bin 目录
sudo mv ninja /usr/bin/ninja
# 4. 为 ninja 添加可执行权限
sudo chmod +x /usr/bin/ninja
# 5. 验证安装
~ ninja --version
1.13.2
```

## 安装 vcpkg

vcpkg 是一个 C++ 包管理器，用于简化安装和管理 C++ 库的过程，与 CMake 集成良好。

```bash
# 1. 切换安装 vcpkg 目录，可安装到用户目录
cd ~
# 2. 克隆 vcpkg 仓库
git clone https://github.com/microsoft/vcpkg.git
# 3. 切换到 vcpkg 目录
cd vcpkg
# 4. 运行以下命令用以初始化 vcpkg，将构建 vcpkg 可执行文件
./bootstrap-vcpkg.sh
```

设置 `VCPKG_ROOT` 环境变量来指向 vcpkg 目录，以便于在 CMake 中更方便地使用 vcpkg。

修改 `~/.config/fish/config.fish`，在文件中添加以下行：

```fish
set -gx VCPKG_ROOT $HOME/vcpkg
fish_add_path /opt/cmake-4.2.3/bin
fish_add_path $VCPKG_ROOT
```

运行以上命令将执行：

1. 将 CMake 二进制目录添加到 PATH 环境变量中
2. 将 `VCPKG_ROOT` 环境变量设置为 vcpkg 目录
3. 将 vcpkg 目录添加到 PATH 环境变量中

## 安装 VSCode

1. 下载并安装 VSCode
2. 安装以下扩展

   - clangd (from llvm)
   - CodeLLDB (from Vadim Chugunov)
   - CMake (from twxs)
   - CMake Tools (from Microsoft)