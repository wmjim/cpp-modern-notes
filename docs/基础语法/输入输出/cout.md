# cout 

## 基本语法

`std::cout`（console output）用于向终端打印内容，定义于 `<iostream>` 头文件中，是标准输出流对象。

```cpp
#include <iostream>
std::cout << "Hello, World!" << std::endl;
```

- `<<`：插入运算符（insertion operator），用于向输出流插入数据。
- `std::endl`：表示输出一个换行符，并刷新缓冲区。

## 标准输出格式控制

C++ 提供 `<iomanip>` 头文件，用于对控制台输出的格式进行细粒度控制。

```cpp
#include <iostream>
#include <iomanip>
using namespace std;

// 1. 设置浮点数精度
double pi = 3.1415926;
cout << fixed << setprecision(2) << pi << endl; // 输出 3.14

// 2. 设置对齐方式
cout << setw(10) << "Name" << setw(5) << "Age" << endl; //       Name  Age

// 3. 填充字符
cout << setfill('*') << setw(10) << 42 << endl; // ********42
```

| 控制器 | 含义                     |
| -------- | -------------------------- |
| `dec`       | 为整数 I/O 使用十进制    |
| `oct`       | 为整数 I/O 使用八进制    |
| `hex`       | 为整数 I/O 使用十六进制  |
| `setw(n)`       | 设置字段宽度为 n         |
| `setfill(c)`       | 用字符`c`填充字段空白       |
| `setprecision(n)`       | 设置精度（浮点输出位数） |
| `fixed`       | 固定小数点位格式输出     |
| `scientific`       | 科学计数法输出           |
| `defaultfloat`       | 恢复默认浮点输出方式     |
| `left`/`right`      | 左/右对齐                |
| `internal`       | 符号靠左，数值右对齐     |
| `showbase`       | 显示进制前缀（如 0x，0） |
| `showpos`       | 显示正数的`+`符号           |
| `uppercase`       | 大写十六进制字母         |
| `boolalpha`       | 输出布尔值为 true/false  |
| `noboolalpha`       | 输出布尔值为 1/0         |

## 输出控制细节

```cpp
// 使用 endl 会频繁刷新缓冲区，影响性能
cout << "Hello" << endl;	// 换行 + 刷新缓冲区
// 推荐使用 \n，不要频繁刷新缓冲区
cout << "Hello\n";			// 换行 + 不刷新缓冲区（更高效）
```