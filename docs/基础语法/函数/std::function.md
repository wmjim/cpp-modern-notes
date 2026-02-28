# std::function<>

`std::function` 是 C++11 引入的标准库模板，可以封装任意可调用对象（函数、函数指针、lambda、函数对象）。

## 基本语法

```cpp
#include <functional>

std::function<返回类型(参数类型列表)> name;

// 封装返回 int、接受两个 int 的可调用对象
std::function<int(int, int)> operation;

// 封装无参数无返回值的可调用对象
std::function<void()> callback;
```

## 基本用法

### 封装普通函数

```cpp
int add(int a, int b) { return a + b; }

int main() {
    std::function<int(int, int)> func = add;
    int result = func(3, 5);  // result = 8
}
```

### 封装 lambda

```cpp
std::function<int(int, int)> multiply = [](int a, int b) {
    return a * b;
};

int result = multiply(4, 5);  // result = 20
```

### 封装函数对象

```cpp
struct Multiply {
    int operator()(int a, int b) const {
        return a * b;
    }
};

std::function<int(int, int)> func = Multiply();
int result = func(3, 5);  // result = 15
```

## 作为函数参数

### 回调函数的现代化写法

```cpp
#include <functional>

void process(std::function<void()> callback) {
    // ... 处理逻辑
    if (callback) {
        callback();
    }
}

int main() {
    process([]() { std::cout << "Done!\n"; });
}
```

### 可存储多种可调用对象

```cpp
class Calculator {
public:
    std::function<int(int, int)> operation;

    int calculate(int a, int b) {
        return operation ? operation(a, b) : 0;
    }
};

int main() {
    Calculator calc;

    calc.operation = [](int a, int b) { return a + b; };
    std::cout << calc.calculate(3, 5);  // 8

    calc.operation = [](int a, int b) { return a * b; };
    std::cout << calc.calculate(3, 5);  // 15
}
```

## std::function vs 函数指针

|特性|函数指针|`std::function`|
| --- | --- | --- |
|支持 lambda| ❌  | ✅  |
|支持函数对象| ❌ | ✅ |
|可为空| ❌（需额外 flag） | ✅（可直接判断） |
|类型安全| 较差 | 好 |
|开销| 小 |  略大（类型擦除） |

