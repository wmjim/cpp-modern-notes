`auto` 类型推导关键字，编译器会自动根据初始化表达式推导变量的类型。

```cpp
auto x = 10;        // x -> int
auto y = 3.14;      // y -> double
auto z = "hello";   // z -> const char*
```

## 最佳实践

| 场景        | 推荐写法 |
| ------------- | ---------- |
| 迭代器      | `auto it = container.begin();`         |
| 范围 for    | `for (auto& elem : container)`         |
| 不修改的值  | `for (const auto& elem : container)`         |
| 复杂类型    | `auto it = map.find(key);`         |
| lambda 参数 | `auto lambda = [](auto a, auto b) { return a + b; };`         |

## 常见用法

```cpp
// 1. 基础类型推导
auto a = 42;           // int
auto b = 3.14f;        // float
auto c = true;         // bool
auto d = 'a';          // char

// 2. 迭代器配合容器
std::vector<int> vec {1, 2, 3};
for (auto it = vec.begin(); it != vec.end(); ++it) {
	std::cout << *it << " ";
}

// C++11 范围 for（更简洁）
for (auto& elem : vec) {
	elem *= 2;
}

// 3. 函数返回类型推导
auto add(int a, int b) -> int {
	return a + b;
}
// C++14 起可直接写
auto multiply(int a, int b) {
	return a * b;
}

// 4. 泛型编程
template<typename T>
void process(const T& container) {
	for (auto it = container.begin(); it != container.end(); ++it) {
		// 无需知道容器具体类型
	}
}

// 5. 复杂类型简化
// 原始写法
std::map<std::string, std::vector<int>>::iterator it;
// 使用 auto
auto it = myMap.begin();
// 函数指针
void (*funcPtr)(int, int);
auto funcPtr = &myFunction;

// 6. 配合 decltype 使用
std::vector<int> vec {1, 2, 3};
decltype(vec)::value_type x; // 等价 int x
```

## 注意事项

### 必须初始化

```cpp
auto x;			// 错误！无法推导类型
auto x = 10;	// 正确
```

### 引用和顶层 const 处理

```cpp
int a = 10;
int& ref = a;

auto b = ref;  		// b 是 int，不是 int&（引用被丢弃）
auto& c = ref; 		// c 是 int&，保持引用特性
auto d = &a;   		// d 是 int*

const int e = 10;
auto f = e;    		// f 是 int（顶层const 被丢弃）
auto const g = e; 	// g 是 int（等价 auto g = e）
auto& h = e;      	// h 是 const int&（保留顶层 const）
```

### 模板类型推导 vs auto

```cpp
template<typename T>
void f(T param);  	// T 推导为 int
void f(int& param);	// T 推导为 int

// auto 推导规则与模板参数推导相似
auto x = expr;		// 类似 T param = expr
auto& x = expr;		// 类似 T& param = expr
auto&& x = expr;	// 类似 T&& param = expr（完美转发）
```

### 列表初始化

```cpp
// C++17 起支持
auto x = {1, 2, 3};		// x -> std::initializer_list<int>
auto x {1, 2, 3};		// 同上

// C++11/14 中
auto x = {1, 2, 3};    	// std::initializer_list<int>
auto x {1};				// int（C++17，C++11/14 中是 std::initializer_list<int>） 
```

### 数组和函数指针

```cpp
int arr[10] = {1, 2, 3};
auto p = arr;  // p -> int*

auto f = +[](int x) { return x; } // C++14 起普通函数指针
```

### 潜在的性能问题

```cpp
std::vector<std::vector<int>> matrix;

// 错误：每次循环都拷贝
for (auto row : matrix) {   // row 是 std::vector<int>，拷贝开销大
	// ...
}

// 正确：使用引用
for (const auto& row : matrix) {
	// ...
}
```
