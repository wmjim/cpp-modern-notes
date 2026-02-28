# format

`std::format` 是 #cpp20 引入的格式化库，提供类似 Python f-string 的类型安全字符串格式化功能。

## 基本用法

```cpp
#include <format>
#include <iostream>

int main() {
    std::string s = std::format("Hello, {}!", "World");
    std::cout << s << std::endl;  // Hello, World!
}
```

## 位置参数

```cpp
// 按顺序填充
std::format("{} {} {}", "a", "b", "c");     // a b c

// 指定位置
std::format("{0} {1} {0}", "Hello", "World");  // Hello World Hello
```

## 格式化选项

### 对齐与填充

```cpp
std::format("{:>10}", "Hi");     // "        Hi"（右对齐，宽度10）
std::format("{:>10}", "Hello"); // "     Hello"

std::format("{:<10}", "Hi");    // "Hi        "（左对齐）

std::format("{:^10}", "Hi");    // "    Hi    "（居中）

std::format("{:0>5}", "3");     // "00003"（用0填充）
```

### 数值格式

```cpp
// 整数
std::format("{:d}", 42);       // "42"
std::format("{:05d}", 42);     // "00042"（宽度5，补0）

// 进制
std::format("{:b}", 42);       // "101010"（二进制）
std::format("{:o}", 42);        // "52"（八进制）
std::format("{:x}", 42);        // "2a"（十六进制）
std::format("{:X}", 42);        // "2A"（大写十六进制）

// 浮点数
std::format("{:f}", 3.14159);   // "3.141590"（定点）
std::format("{:e}", 3.14159);   // "3.141590e+00"（科学计数）
std::format("{:g}", 3.14159);   // "3.14159"（自动选择）
std::format("{:0.2f}", 3.14159); // "3.14"（保留2位小数）
```

### 字符串

```cpp
std::format("{:s}", "hello");   // "hello"
std::format("{:10s}", "hi");    // "hi        "（宽度10）
std::format("{:.3s}", "hello"); // "hel"（截断）
```

### 正负号

```cpp
std::format("{:+}", 42);        // "+42"
std::format("{:+}", -42);       // "-42"
std::format("{: }", 42);        // " 42"（空格显示正号）
```

