# constexpr

`constexpr` 用于声明**编译时常量表达式**，其核心目的是让某些计算在**编译期完成**。

## `constexpr`：修饰变量

```cpp
constexpr int x {42};
```

- 必须使用常量表达式初始化
- 隐含 `const`：`constexpr int x` 等价于 `const int x`（但更严格）

## `constexpr`：修饰函数

```cpp
constexpr int square(int n) {
	return n * n;
}

constexpr int a = square(5); // 编译期计算
int b = square(get_input()); // 运行期计算，get_input() 非 constexpr
```

- #cpp11 ：函数体只能包含单条 `return` 语句，不能有循环、局部变量等。
- #cpp14 ：允许多条语句、支持循环、条件分支、支持局部变量
- `constexpr` 修饰函数，若函数传入编译期参数则要求在编译期计算，若传入运行时参数则作为普通函数。

## `constexpr`：修饰构造函数

```cpp
struct Point {
	constexpr Point(int x, int y) : x(x), y(y) {}
	constexpr int distance_sq() const {
		return x * x + y * y;
	}
	int x;
	int y;
};

constexpr Point p{3, 4};
constexpr int d = p.distance_sq(); // 25, 编译期计算
```

- 成员变量必须是字面类型

