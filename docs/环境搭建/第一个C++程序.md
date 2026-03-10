# 第一个 C++ 程序

## Hello, World!

```c++
#include <iostream>

int main() {
	std::cout << "Hello, World!" << std::endl;
	return 0;
}
```

## 头文件和预处理器指令

程序的第一行 `#include <iostream>` 是一个预处理器指令，它告诉编译器包含头文件 `iostream` 。

头文件提供了我们可以在 C++程序中使用的**函数**和**类声明**。

```c++
#include <iostream>
```

## `main()` 函数

在 C++中， `main()` 函数作为程序的入口点。操作系统通过调用这个 `main()` 函数来运行你的程序。它应在程序中**仅定义一次**，并且**必须返回一个整数**。关键字 `int` 是该函数的返回类型，即整数。与 C 语言不同，在 C++中， `main` 函数的返回类型必须为 `int` 。

```c++
int main() {
	// Your code goes here.
}
```

## 输出到控制台

要在控制台输出文本，我们使用 `std::cout` 对象和插入操作符 `<<` 。在“Hello, World!”示例中，我们使用了以下代码行将“Hello, World!”打印到控制台：

```c++
std::cout << "Hello, World!" << std::endl;
```

- `std`：这是 C++ 标准库实体（类和函数）所在的命名空间，它代表 "标准"，是标准模板库（STL）的缩写。
- `std::cout`：标准 "字符输出" 流，用于写入控制台。
- `"Hello, World!"`：要打印的字符串字面量。
- `std::endl`："结束行" 操作符，用于插入换行符并刷新输出缓冲区。

## 返回声明

最后，`return 0;` 语句通知操作系统程序已成功执行。返回任何其他整数值则表示发生了错误：

```c++
return 0;
```