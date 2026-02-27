# emplace 与性能优化

在 C++ 中，向容器添加元素时，`emplace` 系列函数相比传统的 `insert`/`push_back` 能够显著提升性能。本文深入讲解其原理和使用场景。

## 传统插入方式的问题

```cpp
std::vector<std::string> vec;

// 方式 1：push_back 传入临时对象
vec.push_back("hello");  // 创建临时 std::string，然后拷贝/移动

// 方式 2：先构造再插入
std::string s = "hello";
vec.push_back(s);  // s 是左值，会触发拷贝
```

问题在于：`push_back("hello")` 会发生：
1. 创建临时 `std::string` 对象
2. 将临时对象拷贝或移动到 vector 中

## emplace 的优势

`emplace` 直接在容器内部**原地构造**元素，避免了额外的拷贝或移动：

```cpp
std::vector<std::string> vec;

// emplace_back 直接在 vector 内部构造
vec.emplace_back("hello");  // 直接构造，无需临时对象
```

### 性能对比

```cpp
// 对于 pococ 类型的简单元素，两者差异不大
vec.push_back(42);    // 创建临时 int，然后拷贝
vec.emplace_back(42); // 直接构造

// 但对于需要动态分配内存的元素，差异显著
vec.push_back("hello world");     // 创建临时 string（涉及堆分配），再移动
vec.emplace_back("hello world");  // 直接在 vector 内部构造
```

## emplace 的实现原理

```cpp
// std::vector::emplace_back 的典型实现
template<typename... Args>
void emplace_back(Args&&... args) {
    // 检查是否需要扩容
    if (size_ < capacity_) {
        // 在已有内存上原地构造
        new (data_ + size_) T(std::forward<Args>(args)...);
        ++size_;
    } else {
        // 扩容时重新分配并移动
        reallocate_and_emplace_back(std::forward<Args>(args)...);
    }
}
```

关键区别：
- `push_back`：先构造对象，再移动到容器
- `emplace_back`：直接在容器内存中构造

## 适用场景

### 1. 构造参数复杂时

```cpp
class Person {
public:
    Person(const std::string& name, int age) : name_(name), age_(age) {}
private:
    std::string name_;
    int age_;
};

std::vector<Person> people;

// push_back 需要先构造，再拷贝/移动
people.push_back(Person("Alice", 30));

// emplace_back 直接构造
people.emplace_back("Alice", 30);
```

### 2. 不可拷贝只能移动的类型

```cpp
class NonCopyable {
public:
    NonCopyable() = default;
    NonCopyable(const NonCopyable&) = delete;
    NonCopyable(NonCopyable&&) = default;
};

std::vector<NonCopyable> vec;
// vec.push_back(NonCopyable()); // 错误：不可拷贝
vec.emplace_back();  // OK：直接构造
```

### 3. 避免不必要的临时对象

```cpp
std::vector<std::pair<int, std::string>> vec;

// 创建临时 pair 再插入
vec.push_back(std::make_pair(1, "one"));

// 直接原地构造
vec.emplace_back(1, "one");
```

## emplace vs insert 选择

| 场景 | 推荐方式 | 理由 |
|------|----------|------|
| 简单类型（int, double） | 两者皆可 | 差异可忽略 |
| 字符串/容器元素 | `emplace_back` | 避免临时对象 |
| 已存在的对象 | `push_back` | 语义更清晰 |
| 不可拷贝类型 | `emplace_back` | 唯一选择 |
| 批量插入 | `emplace_back` | 性能更好 |

## 注意事项

### 1. 传递参数而非对象

```cpp
std::vector<std::string> vec;

std::string s = "hello";
vec.push_back(s);    // 正确：传入已存在的对象
vec.emplace_back(s); // 也可以，但语义上适合传构造参数
```

### 2. 构造函数参数

```cpp
std::vector<std::unique_ptr<int>> vec;

// push_back 需要先创建智能指针
vec.push_back(std::make_unique<int>(42));

// emplace_back 直接构造
vec.emplace_back(new int(42));  // 注意：raw pointer 不推荐
```

### 3. 异常安全

```cpp
class Widget {
public:
    Widget() { throw std::runtime_error("error"); }
};

std::vector<Widget> vec;
vec.emplace_back();  // 如果构造失败，vector 状态是未定义的
```

某些容器的 `emplace` 在异常情况下可能导致问题，使用时需注意。

## 性能测试示例

```cpp
#include <vector>
#include <string>
#include <chrono>

void test_push_back() {
    std::vector<std::string> vec;
    vec.reserve(100000);
    for (int i = 0; i < 100000; ++i) {
        vec.push_back("hello world");
    }
}

void test_emplace_back() {
    std::vector<std::string> vec;
    vec.reserve(100000);
    for (int i = 0; i < 100000; ++i) {
        vec.emplace_back("hello world");
    }
}
```

对于 `std::string`，`emplace_back` 通常比 `push_back` 快 20-50%，因为避免了临时对象的创建和移动。

## 总结

| 特性 | push_back | emplace_back |
|------|------------|--------------|
| 语义 | 插入对象 | 构造对象 |
| 临时对象 | 需要 | 不需要 |
| 拷贝/移动 | 触发 | 不触发 |
| 适用场景 | 已存在对象 | 构造参数 |
| 性能 | 较低 | 较高 |

**最佳实践**：优先使用 `emplace` 系列函数，除非需要插入已存在的对象。
