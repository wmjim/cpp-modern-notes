# Lambda 表达式

**Lambda表达式**，也称**匿名函数**：一次性快速定义的小函数。具有两个主要作用：

- 简化代码
- 消除编写可调用对象时常见的大量样板代码

## 定义 lambda 表达式

以下是 C++中 lambda 函数的基本语法：

```c++
[capture-list](parameters) -> return_type {
	// function body
};

// add 是一个变量：本质是 匿名函数对象
// C++14 开始，支持默认形参值
auto add = [](int a = 1, int b) {
    return a + b;
};
int result = add(2, 3);  // 结果是 5
```

- `[capture-list]`（捕获列表）：`[]`成为 lambda 引导，标记 lambda 表达式的开头。
- `(parameters)`（参数列表）：输入参数列表，与常规函数中的类似，**可选**。
- `return_type`（返回类型）：lambda 函数将返回的值的类型。返回类型可以自动推导（**可以省略**）。
- `function body`（函数体）：定义 lambda 函数操作的代码。

## 命名 lambda 闭包

lambda 表达式的计算结果是一个**函数对象**；该函数对象的正式名称 **lambda 闭包** / **lambda 函数** 。

要在变量中存储 lambda 对象，唯一的方法是让编译器自动推断类型。

```cpp
auto add = [](int a = 1, int b) { return a + b; };

// 编译器实质生成
_Lambda8C1 add;
```

`auto` 关键字告诉编译器从赋值操作的右边（lambda 表达式）推断 `add` 的类型。

## 泛型 lambda

```cpp
// 传统 lambda 参数必须指定具体类型
[](int x) { return x + 1; } // 只能接收 int 类型
// C++14引入：泛型 lambda 允许像模板一样，接收任意类型参数
[](auto x) { return x + 1; }
```

- `auto` 在参数列表中充当占位符类型参数。

注意事项：

1. 泛型 lambda 不能推导返回类型中涉及到的 auto（直到 C++14）,所以有时需要手动写 `->`：

```cpp
auto f = [](auto a, auto b) -> decltype(a * b) {
	return a * b;
};
```

2. 不能在C++11中使用，泛型 lambda 是 C++14 起支持的语法。
3. 编译器会为每种调用的参数类型生成一份独立代码。

## 捕获子句

| 捕获形式 | 含义                 |
| ---------- | ---------------------- |
| `[x]`         | ✅**按值捕获** `x`（复制一份进去）   |
| `[&x]`         | ✅**按引用捕获**`x`（直接引用原变量） |
| `[=]`         | ✅**按值捕获所有用到的外部变量**      |
| `[&]`         | ✅**按引用捕获所有用到的外部变量**     |

### 按值捕获

`[=]`：按值捕获封闭作用域中的所有自动变量，但不能修改存储在原始变量中的值。

**缺点**：引入高开销的复制操作。

### 按引用捕获

`[&]`：按引用捕获封闭作用域中的所有自动变量，可以在 lambda 表达式中进行修改。

**缺点**：可能使得变量被无意中修改。

### 捕获特定的变量

在捕获子句中逐个列举，使用 `,` 进行分隔，并且可以指定想要访问的封闭作用域中的特定变量。

每个变量，按值还是按引用捕获**可选**。

```cpp
// 按值捕获示例
int count = 0;
auto f = [count](int x) {
    return x + count;
};
count = 100;
int result = f(5); // result = 5

// 按引用捕获示例
int count = 0;

auto f = [&count](int x) {
    return x + count;
};

count = 100;
int result = f(5);  // result = 105
```

捕获的是被定义时的状态，而非调用时。

### 捕获 this 指针

| 捕获方式 | 捕获的是什么 | 是否能脱离原对象使用？ |
| ---------- | -------------- | ------------------------ |
| `[this]`         | 当前对象的**指针**   | ❌ 依赖原对象生命周期  |
| `[copy = *this]`         | 当前对象的**副本**   | ✅ 可独立使用          |

在类的成员函数中使用 Lambda，如果你要访问成员变量或成员函数，**必须捕获** **`this`** **指针**。

```cpp
class Counter {
private:
    int base;

public:
    Counter(int b) : base(b) {}

    void run() {
        int offset = 2;

        auto f = [this, offset](int x) {
            return base + offset + x;
        };

        int result = f(3);  // result = base + 2 + 3
        std::cout << result << std::endl;
    }
};

```

- 通过捕获 `this` 指针，Lambda 能够访问包含它的成员函数所能访问的所有 **成员变量**和**成员函数**
- `offset` 是局部变量，必须显式捕获。
- 在 C++11/14 中，`[this]` 捕获的是 **指针**，所以如果对象被销毁，Lambda 就会变成“野指针”。

如果像拷贝整个对象，C++17 支持：

```cpp
auto makeRunner() {
    return [copy = *this](int x) {
        return copy.delay + x;  // 使用的是拷贝对象的成员
    };
}
```

在原对象销毁后安全使用，因为捕获的是**对象副本**，不是指针

## 用法示例

以下是几个示例，展示了 C++中 lambda 函数的使用：

- 没有**捕获**、**参数**或**返回类型**的 Lambda 函数。

```c++
auto printHello = []() {
	std::cout << "Hello, World!" << std::endl;
};
printHello(); // 输出：Hello, World!
```

- **带参数**的 Lambda 函数。

```c++
auto add = [](int a, int b) {
	return a + b;
};

int result = add(3, 4); // result = 7
```

- 带有**值捕获**的 Lambda 函数。

```c++
int multiplier = 3;
auto times = [multiplier](int a) {
	return a * multiplier;
};
int result = times(5); // result = 15
```

- 带有**引用捕获**的 Lambda 函数。

```c++
int expiresInDays = 45;
auto updateDays = [&expiresInDays](int newDays) {
	expiresInDay = newDays;
}
updateDays(30); // expiresInDays = 30
```

请注意，当使用引用捕获时，在 lambda 函数内部对捕获变量所做的任何更改都会影响其在周围作用域中的值。