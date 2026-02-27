# std::forward 详解

`std::forward` 是 C++11 引入的模板函数，用于实现**完美转发**（Perfect Forwarding）。它能够保留参数的原始值类别（左值/右值），在模板中正确地将参数转发给其他函数。

## 完美转发的问题

考虑以下场景：我们想编写一个包装函数，将参数转发给另一个函数：

```cpp
void process(int& x) { std::cout << "lvalue\n"; }
void process(int&& x) { std::cout << "rvalue\n"; }

template<typename T>
void wrapper(T&& arg) {
    process(arg);  // 无论传入什么，arg 始终是左值！
}

int main() {
    int a{10};
    wrapper(a);   // 输出 "lvalue"
    wrapper(20);  // 输出 "lvalue" ← 错误！应该是 "rvalue"
}
```

问题在于：`wrapper` 中的 `arg` 是一个**具名变量**，所以它永远是左值。

## std::forward 的作用

`std::forward<T>` 能够根据模板参数 `T` 的类型，恢复参数的原始值类别：

```cpp
template<typename T>
void wrapper(T&& arg) {
    process(std::forward<T>(arg));  // 正确转发
}

int main() {
    int a{10};
    wrapper(a);   // 输出 "lvalue" ✓
    wrapper(20);  // 输出 "rvalue" ✓
}
```

## 引用折叠规则

理解 `std::forward` 的关键在于 **引用折叠规则**：

| T 的类型 | T&& 的结果 |
|----------|------------|
| `int&`   | `int&`     |
| `int&&`  | `int&&`    |
| `int`    | `int&&`    |

**核心规则**：
- `& + & = &`
- `& + && = &`
- `&& + & = &`
- `&& + && = &&`

## std::forward 的实现原理

`std::forward` 的实现其实非常简单：

```cpp
template<typename T>
T&& forward(std::remove_reference_t<T>& arg) noexcept {
    return static_cast<T&&>(arg);
}

template<typename T>
T&& forward(std::remove_reference_t<T>&& arg) noexcept {
    static_assert(!std::is_lvalue_reference_v<T>,
                  "Cannot forward an rvalue as an lvalue");
    return static_cast<T&&>(arg);
}
```

关键在于：
- 当 `T` 是 `int&` 时，`forward<int&>` 返回 `int&`
- 当 `T` 是 `int` 时，`forward<int>` 返回 `int&&`

## 推导规则详解

```cpp
template<typename T>
void wrapper(T&& arg) { ... }
```

- `wrapper(int& a)` → `T` 推导为 `int&` → `T&&` 折叠为 `int&`
- `wrapper(int&& a)` → `T` 推导为 `int` → `T&&` 为 `int&&`

```cpp
template<typename T>
void wrapper(T&& arg) {
    // a 是左值
    int a = 5;

    // 根据 T 的类型决定转发为什么
    std::forward<T>(a);  // 如果 T = int&，转发为左值
                         // 如果 T = int，转发为右值
}
```

## 使用场景

### 1. 工厂函数

```cpp
template<typename T, typename... Args>
std::unique_ptr<T> make_unique(Args&&... args) {
    return std::unique_ptr<T>(new T(std::forward<Args>(args)...));
}
```

### 2. 委托构造函数

```cpp
class Widget {
public:
    Widget() : Widget(0, 0) {}

    Widget(int x, int y) : Widget(x, y, nullptr) {}

    Widget(int x, int y, std::string&& name)
        : x_(x), y_(y), name_(std::move(name)) {}

private:
    int x_, y_;
    std::string name_;
};
```

### 3. 泛型代码中的参数转发

```cpp
template<typename Func, typename... Args>
void invoke(Func&& f, Args&&... args) {
    f(std::forward<Args>(args)...);
}
```

## 常见误区

### 1. 滥用 std::forward

```cpp
// 不必要地使用 forward
template<typename T>
void foo(T&& x) {
    bar(std::forward<T>(x));  // 只有当 x 需要被转发时才用 forward
}
```

### 2. 对非转发参数使用 std::forward

```cpp
// 错误示例
template<typename T>
void foo(T&& x) {
    std::string local = std::forward<T>(x);  // 错误！x 会被消费两次
}
```

### 3. 在 return 语句中遗漏 std::forward

```cpp
// 正确写法
template<typename T>
T&& bar(T&& x) {
    return std::forward<T>(x);  // 需要 forward
}
```

## 总结

| 特性 | 说明 |
|------|------|
| 作用 | 完美转发，保留参数原始值类别 |
| 关键机制 | 引用折叠规则 + 模板参数推导 |
| 使用场景 | 泛型代码、工厂函数、委托构造 |
| 核心原则 | 永远与 `T&&` 形参配合使用 |
