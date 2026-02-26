`final` 用于 **限制** 类或虚函数被继承/重写，可出现在类声明或虚函数声明 **末尾** 。

| 关键字 | 作用对象 | 效果                 |
| -------- | ---------- | ---------------------- |
| `final`       | 类       | 禁止被继承           |
| `final`       | 虚函数   | 禁止被重写           |
| `override`       | 虚函数   | 显式表明重写基类函数 |
| `final` + `override`    | 虚函数   | 最终实现，不可再重写 |

```cpp
class Base final {};				// 禁止继承
class Derived : public Base {};		// 错误：Base 已被声明为 final

class A {
	virtual void foo() final;		// 禁止重写
};
```

## 常见用法

### 1. 禁止类被继承

```cpp
class Base final {
public:
	void process() {}
};

// 编译错误：无法继承 final 类
class Derived : public Base {};
```

### 2. 禁止虚函数被重写

```cpp
class Base {
public:
    virtual void foo() final { }		// 子类不能重写
	virtual void bar() { }				// 子类可以重写
};

class Derived : public Base {
public:
    void foo() { }		// 错误：foo 被声明为 final
	void bar() { }		// 正确 
};
```

### 3. 配合 override 使用（最佳实践）

```cpp
class Base {
	virtual void foo();
};

class Derived : public Base {
	// final 放在 override 后
	void foo() override final { }	// 覆盖 Base::foo，而且禁止继续被覆盖	
};
```

### 4. 在模板中限制继承

```cpp
template<typename T>
class Widget final { };

// 限制模板实例被继承
template<typename T>
class GenericContainer {
	class Inner final { };
};
```

## 使用场景

```cpp
// 1. 效率关键的类
class String final {
	// 禁止继承，确保内联等优化
};

// 2. 安全设计
class AuthToken final {
	// 禁止继承，防止子类绕过安全检查
};

// 3. 库设计
// 明确告知用户此类不应被继承
class NonInheritable { };
// 
```


## 注意事项

### 1. 语法位置

```cpp
class A final { };					// 类：final 在类名后
class B final : public A {};		// 继承：final 在类名后
virtual void f() final { }			// 虚函数：final 在函数名后
```

### 2. 只能修饰虚函数

```cpp
class Base {
	void foo() final { }			// 错误：非虚函数不能使用 final
	virtual void foo() final { } 	// 正确
};
```

### 3. **类**不能同时用 `virtual` 和 `final`

```cpp
virtual class A { };  // ❌ 语法错误，类没有 virtual 修饰符
class A final { };    // ✅ 禁止被继承
```