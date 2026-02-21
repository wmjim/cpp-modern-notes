`decltype` 用于获取表达式的类型而不实际求值。它在编译时推到类型，常用于泛型编程、类型声明和返回值类型推导。

```cpp
int x = 10;
decltype(x) y = 20;  	// y -> int

const int& ref = x;
decltype(ref) z = x; 	// z -> const int&
```

## 最佳实践

```cpp
// 1. 模板返回值推导
template<typename T, typename U>
auto max(T a, U b) -> decltype(a > b ? a : b) {
    return (a > b) ? a : b;
}

// 2. 条件类型
template<typename T>
using Ptr = decltype(new T);  // 类型别名

// 3. 保持推导结果
decltype(auto) result = compute();  // C++14 起
```

## 常见用法

### 1. 配合 auto 推导返回类型

```cpp
// 1. 配合 auto 推导返回类型
template<typename T, typename U>
auto add(T a, U b) -> decltype(a + b) {
	return a + b;
}

// C++14 起可简化为
template<typename T, typename U>
auto add(T a, U b) {
	return a + b;
}
```

### 2. 获取容器迭代器类型

```cpp
// 2. 获取容器迭代器类型
std::map<std::string, int> m;
decltype(m.begin()) it = m.find("key");  // it -> std::map<std::string, int>::iterator
```

### 3. 类型别名

```cpp
// 3. 类型别名
std::vector<int> vec = {1, 2, 3};
using VecType = decltype(vec);           // VecType -> std::vector<int>

// 复杂类型
using MapIter = decltype(std::declval<std::map<int, int>>().begin());
```

### 4. 在模板编程中获取关联类型

```cpp
template<typename Container>
void process(const Container& c) {
	// 获取 value_type
	typename Container::value_type x;      // 传统写法
	decltype(c.begin())::value_type y;     // 使用 decltype

	// 获取键值类型
	using KeyType = typename Container::key_type;
	using ValueType = typename Container::mapped_type;
}
```

### 5. 判断表达式类型

```cpp
int a = 1, b = 2;
decltype(a + b) c = a;     	// c -> int
decltype(a = b) d = a;		// d -> int&（赋值表达式返回引用）
decltype(++a) e = a;		// d -> int&（前置++返回引用）
decltype(a++) f = a;		// f -> int（后置++返回副本）
```

### 6. 配合 std::declval (模板元编程)

```cpp
#include <type_traits>

template<typename T>
typename std::decay<T>::type foo() {
	// 不实际构造对象，获取其返回类型
	return decltype(std::declval<T>() + std::declval<T>())(1, 2);
}

// 示例：获取成员函数返回类型
struct Foo {
	int bar(int x) { return x; }
};

decltype(std::declval<Foo>().bar(0)) result; // result -> int;
```

## 注意事项

### 1. 不执行表达式，只推导类型

```cpp
int x = 10;
decltype(x++);    // 不执行 x++，只推导类型为 int
decltype(++x);    // 推导类型为 int&
```

### 2. 引用和 cv 限定符

```cpp
const int c = 10;
decltype(c) x;    // x -> const int (保留 const)

volatile int v = 5;
decltype(v) y;    // y -> volatile int

const int& ref = c;
decltype(ref) z;  // z -> const int& (保留引用和 const)
```

### 3. 括号对类型的影响

```cpp
int x = 10;
decltype(x) a;    // a -> int
decltype((x)) b;   // b -> int& (双括号使表达式成为左值，推导为引用)

const int c = 10;
decltype(c) d;     // d -> const int
decltype((c)) e;   // e -> const int& (左值引用)
```

### 4. 函数类型推导

```cpp
int foo(int x) { return x; }

decltype(foo) f;        // f -> int(int) (函数类型)
decltype(&foo) pf;      // pf -> int(*)(int) (函数指针)

auto g = &foo;          // C++11 起更简洁
```

### 5. 数组和指针

```cpp
int arr[10];
decltype(arr) brr;      // brr -> int[10] (保持数组类型)

int* p = arr;
decltype(p) q;         // q -> int*
```

## decltype 对比 auto

| 特性   | `auto`               | `decltype`                         |
| -------- | ---------------- | -------------------------- |
| 初始化 | 必须初始化     | 不需要，可用于任意表达式 |
| 引用   | `auto&`               | `decltype(expr)` 保留引用                |
| `const`       | 丢弃 cv        | 保留 cv 限定符           |
| 用途   | 变量声明       | 类型推导、泛型编程       |
| 求值   | 需要求值表达式 | 只推导类型，不求值       |