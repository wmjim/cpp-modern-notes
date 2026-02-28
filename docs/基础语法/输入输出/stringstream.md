# stringstream

`std::stringstream` 是内存中的字符流，用于在字符串和其他类型之间进行转换，属于 `<sstream>` 头文件。

## 基本用法

```cpp
#include <sstream>
#include <iostream>
#include <string>

int main() {
    // 从字符串读取（类似 istringstream）
    std::string str = "42 3.14 hello";
    std::stringstream ss(str);

    int num;
    double d;
    std::string word;

    ss >> num >> d >> word;
    std::cout << num << " " << d << " " << word << std::endl;
    // 输出: 42 3.14 hello
}
```

## 类型转换

### 数值转字符串

```cpp
#include <sstream>

int num = 42;
double d = 3.14;

std::stringstream ss;
ss << num << " " << d;
std::string str = ss.str();  // "42 3.14"
```

### 字符串转数值

```cpp
#include <sstream>
#include <iostream>

std::string s = "123";
int num;
std::stringstream ss(s);
ss >> num;  // num = 123

// 更简洁的方式（C++11+）
int num2 = std::stoi(s);
double d = std::stod("3.14");
```

## 常见应用场景

### 1. 格式化输出到字符串

```cpp
std::stringstream ss;
ss << "Name: " << "Alice"
   << ", Age: " << 25
   << ", Score: " << 95.5;
std::string result = ss.str();
```

### 2. 解析带分隔符的字符串

```cpp
std::string data = "apple,banana,orange";
std::stringstream ss(data);
std::string item;

while (std::getline(ss, item, ',')) {
    std::cout << item << std::endl;
}
```

### 3. 清除流内容重复使用

```cpp
std::stringstream ss;
ss << 1 << " " << 2;
std::cout << ss.str() << std::endl; // "1 2"

// 清空重新使用
ss.str("");
ss.clear();
ss << 3 << " " << 4;
std::cout << ss.str() << std::endl; // "3 4"
```

> 注意：`str("")` 清空内容，`clear()` 清除流状态（用于重置 `eofbit` 等）。

## 与 std::format 对比

`stringstream` 是 C++98 就有的传统方式，`std::format`（C++20）更简洁：

```cpp
// stringstream
std::stringstream ss;
ss << "Hello, " << name << "!";
std::string result = ss.str();

// std::format (C++20)
std::string result = std::format("Hello, {}!", name);
```
