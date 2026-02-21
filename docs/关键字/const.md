## const 的含义

<mark>**常类型**</mark> 是指使用类型修饰符 `const` 说明的类型，常类型的变量或对象的值是不能被更新的。


## `const` 定义常量

```cpp
const int a { 100 };
a = 20; // 错误，将只读变量 a 赋值

const char *msg { "hello" };
// msg[0] = 'H'; // ❌：字符串常量不可修改
```

```bash
main.cpp:5:7: error: assignment of read-only variable 'a'
    5 |     a = 20;
      |     ~~^~~~
```

- `const` 定义常量，不可更改
- `const` 定义常量，**必须初始化**

### `const` 定义常量 与 define 宏定义常量 区别

```cpp
const int num {100};
#define NUM 100
```

- `const` 定义常量具有类型，编译器可以**进行安全检查**；
- `#define` 宏定义没有数据类型，只是简单的字符串替换，**不进行安全检查**；

## `const` 修饰指针

### 指向常量的指针

```cpp
const int v {20};
// 指向常量的指针，const 修饰的是数据，指针指向的值不可变
const int *p {&v}; // p is a pointer to int const，p 是一个指向整型常量的指针
int const *p {&v}; // p is a pointer to int const，...
*p = 20;           // ❌：不能通过 p 修改值
p = &other;        // ✅：指针可指向其它地址
```

- 不能在 非`const int` 指针中存储 `const int` 

```cpp
int *p {&v};
```

```bash
main.cpp:5:13: error: invalid conversion from 'const int*' to 'int*' [-fpermissive]
    5 |     int *p {&v};
      |             ^~
      |             |
      |             const int*
```

-  可以将 非 `const` 变量赋 `p`，但不能通过 `p` 修改 非`const` 变量的内容

```cpp
int v {10};
const int *p {&v};
*p = 20;
```

```bash
main.cpp:6:8: error: assignment of read-only location '* p'
    6 |     *p = 20;
      |     ~~~^~~~
```

### 常量指针

```cpp
int d {20};
// 常量指针，const 修饰的是指针，存储在指针中的地址不能被修改
int * const p {&d}; // p is a const pointer to int，p 是一个指向整型的常量指针
*p = 30;            // ✅：可以修改指向的值
p = &other;         // ❌：指针指向不可变
```

- 如果将 `d` 声明为常量，则不能用 `&d` 初始化 `p`

```cpp
const int d {20};
int * const p {&d}; // 指针 p 只能指向 int 类型的 非const 变量
```

```bash
main.cpp:5:20: error: invalid conversion from 'const int*' to 'int*' [-fpermissive]
    5 |     int * const p {&d};
      |                    ^~
      |                    |
      |                    const int*
```

### 指向常量的常量指针

```cpp
// 指向常量的常量指针，指针和值都不可变
const int v {20};
const int * const p {&v};
*p = 30;      // ❌    
p = &other;   // ❌
```

## `const` 对象默认为文件局部变量

```cpp
/* 未被 const 修饰的变量在不同文件的访问 */
// file1.cpp
int ext;
// file2.cpp
extern int ext;

/* const 常量在不同文件的访问 */
// file1.cpp
extern const int ext {12};
// file2.cpp
extern const int ext;
```

- 非`const` 变量默认情况下链接性为 [[extern]]
- `const` 变量默认为 非[[extern]]
- 要使 `const` 变量能够在其它文件中访问，必须在文件中显式指定为 `extern`

## `const` 修饰函数参数

### 修饰值传递的参数

```cpp
void func(const int x); // 无实际意义
```

- 对于基本类型按值传递时，加 `const` 修饰无实际作用，因为形参是实参的副本。

>[!tip]
>建议：值传递的基本类型参数一般不加 `const`

### 修饰指针参数

```cpp
// 1. 指向常量的指针
void func(const char* str); // str is a pointer to char const
```

- 表明函数不会修改 `str` 所指向的数据
- 调用者可以传入 `const char*` 或 `char*` ，兼容性好
- ✅这是**最常见的用法之一**，常用于字符串或数组输入。

```cpp
// 2. 常量指针
void func(char* const ptr); // ptr is a const pointer to char
```

- 表明 `ptr` 本身不能被重新赋值，不能指向其它地址，但可以修改其所指内容
- **通常意义不大**，除非在函数内部需要强调指针不变

```cpp
// 3. 指向常量的常量指针
void func(const char* const ptr); // ptr is a const pointer to char const
```

- 既不能修改指针，也不能修改所指内容

### 修改引用参数

```cpp
void func(const std::string& s);
```

- 使用引用避免拷贝大对象（提高效率）
- `const` 保证函数不会修改传入的对象
- 允许绑定**临时对象**和 `const` **对象**

> [!tip]
> 对于非基本类型的输入参数，优先使用 `const T&`

### 与函数重载的关系

```cpp
void func(const std::string& s); // 只读版本
void func(std::string& s);       // 可修改版本
```

- 编译器根据实参是否为 `const`，自动选择合适版本

## `const` 修饰函数返回值

### 按值返回

```cpp
const std::string getValue(); // 返回 const 值
```

- 对基本类型或类对象按值返回时，返回的是一个临时对象（[[右值]]）
- 即使加上 `const`，调用者也无法通过该返回值修改原始数据（因为是数据副本）
- #cpp11 之后，`const` 修饰按值返回的对象反而会禁用移动语义（因为移动构造函数通常接受非 `const` 的[[右值引用]]），导致性能下降

> [!warning]
> 不要对按值引用的类型加 `const`

### 返回 `const` 引用

```cpp
const std::string& getName();
```

- 返回的引用是只读的，防止调用者修改返回引用指向的内容
- 返回的引用必须指向**生命周期足够长**的对象（如静态变量、全局变量），不能是局部变量

### 返回 `const` 指针

> [!tip]
> 若需返回指针且禁止修改内容，推荐使用 `const T*`

```cpp
// 1. 指向常量的指针
const char* getData() const;
```

- 表示不能通过返回的指针修改所指数据，可用于安全地暴露内部数据
- 兼容 `const` 和 非 `const` 源数据

```cpp
// 2. 常量指针
char* const getData(); // 指针本身是 const，但内容可改
```

- 意义不大，因为返回的是指针副本，`const` 在函数外无效。

## 在类中使用 `const`

### `const` 修饰成员变量

```cpp
class A {
	const int x;  // 必须在初始化列表中初始化
public:
	A(int v) : x(v) {} // ✅ 合法
};
```

- 常量成员变量 **必须使用初始化列表初始化**
- 一旦赋值后，不可更改

```cpp
class B {
public:
	static const int N = 100; // 类内直接初始化
};
```

- `static const` 整数 / 枚举成员可在类内直接初始化
- `static const` 不占实例空间，是类级别的常量

### `const` 修饰成员函数

在类中，成员函数的 `const`​ 修饰符出现在**函数签名的末尾**，作用是**限定该函数不能修改类的成员变量**（除非是 `mutbale`​ 成员）。

```cpp
class MyClass {
private:
	int x;
	// 加关键字 mutable：特殊变量，即使是 const 对象，其 mutable 成员也可修改
	mutable int y;
public:
	int getX() const; // 声明为 const 成员函数
};

// 定义中也需 const
int MyClass::getX() const {
	return x;
}
```

- 修饰隐式的 `this` 指针：将其变为 `const MyClass*` ，确保函数不会修改对象状态。
- `const` 成员函数不能修改非 `mutable` 成员变量
- `const` 成员函数不能调用非 `const` 成员函数
- 把不修改对象的成员函数声明为 `const` 是良好的实践

### `const` 修饰对象

```cpp
const MyClass obj;
obj.getX();     // ✅：只读访问
obj.setX(10);   // ❌：不能修改，不能调用非 const 成员函数
```

- `const` 对象只能调用 `const` 成员函数
- `const` 对象的任何成员变量都是 `const` 变量，不能修改

### `const` 成员函数重载

```cpp
class MyClass {
public:
	// 非 const 成员函数：可修改
	string& getName();				// 非 const 版本
	// const 成员函数：只读
	const string& getName() const; 	// const 版本
};

// 根据上下文对象的 const 性质自动选择合适的版本
void readName(const MyClass& b) {
	string s = b.getName();         // 调用 const 版本
}

void writeName(MyClass& b) {
	s.getName() = "Alice";          // 调用 非const 版本
}
```

- `string& getName()` 只能被非 `const` 对象调用，返回一个可写的引用
- `const string& getName() const` 只能被 `const` 对象调用，返回一个只读 `const` 引用。

