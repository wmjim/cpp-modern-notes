`override` 说明符：用于显式标记派生类中的虚函数，声明它要覆盖基类的虚函数。

> [!info]  信息说明
> 覆盖虚函数时始终使用 `override` 关键字，可以避免许多微妙的错误。

```cpp
class Base {
public:
    virtual void foo() const;
	virtual void bar();
};

class Derived : public Base {
public:
    void foo() const override;	// 正确：覆盖了基类的 foo
	void bar() override;		// 正确：覆盖了基类的 bar
	void baz() override;		// 错误：基类没有 baz 虚函数
};
```

**主要作用**：

1. 编译时检查：如果派生类中的函数没有正确覆盖基类的虚函数，编译器会报错
2. 代码可读性：让阅读代码的人一眼看出这是覆盖函数

**覆盖条件**：要成功覆盖基类虚函数，派生类函数必须匹配：

- 函数名相同
- 参数类型和个数相同
- 返回类型兼容
- `const` 限定符相同
- 异常规范兼容