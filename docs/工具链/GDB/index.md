# GDB

- [GDB: The GNU Project Debugger](https://www.gnu.org/software/gdb/)

> GDB（GDB: The GUN Project Debugger），GUN 项目调试器，用于查看另一个程序在执行过程中正在执行的操作，或该程序崩溃时正在执行的操作。

## 快速参考

- `help`：列出命令类型，获取命令帮助。
- `start`：启动程序并立即在程序的入口（通常是 `main` 函数）处设置一个断点。

- `run [arglist]`：启动你的程序（可以指定 `arglist`）。
- `bt`（`backtrace`）：显示程序调用栈的回溯信息。

- `break [file:][function|line]`：在**函数**或**行**（**文件**中）设置断点。

  - `clear`：清除一处断点
  - `info break` / `info watch`：显示关于断点和监视点的信息
- `p`（`print`）`expr`：打印 `expr` 的值。

  - `info locals`：显示当前栈帧中所有局部变量的名称及其当前值。
- `s`（`step`）：执行下一行程序（停止后）；碰到函数调用时单步进入（step into）。
- `n`（`next`）：执行下一行程序（停止后）；碰到函数调用时单步跳过（step over）。
- `c`（`continue`）：继续运行程序。
- `attach pid`：将 GDB 绑定到一个正在运行的进程上，这样就可以对其进行调试。

  - `detach`：将 GDB 与进程解绑
- `list`：列出接下来的10行源代码，加上一个 `-` 可以列出之前的 10 行源代码。
- `quit`/ `exit`：退出 GDB 。

## 有用选项

- `-tui`：启动 GDB 的文本用户界面（Text User Interface）。

- `-x`：用于指定一个脚本文件，GDB 在启动时会自动从该文件中读取并执行其中的 GDB 命令。

  ```bash
  gdb -x <命令文件> <可执行文件>
  ```