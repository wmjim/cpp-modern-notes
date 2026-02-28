# static

|用法|作用|
| --- | --- |
|`static` 局部变量|函数内持久化，保留值|
|`static` 全局变量|仅当前文件可见|
|`static` 成员变量|类所有对象共享|
|`static` 成员函数|无需对象可调用|


## 局部静态变量

函数内的 `static` 变量：生命周期为程序运行期间，作用域在函数内部。

```cpp
void counter() {
    static int count = 0;  // 只初始化一次
    count++;
    std::cout << "Count: " << count << std::endl;
}

int main() {
    counter();  // Count: 1
    counter();  // Count: 2
    counter();  // Count: 3
}
```

**特点**：
- 第一次调用时初始化
- 函数结束后不销毁，保留值
- 整个程序运行期间存在

## 静态全局变量

文件内的 `static` 变量：仅当前文件可见。

```cpp
// file1.cpp
static int globalVar = 10;  // 仅 file1.cpp 可访问

// file2.cpp
// extern int globalVar;  // 错误！无法访问
```

**特点**：
- 限制作用域为当前翻译单元
- 避免命名冲突
- 替代 C++ 的匿名命名空间

## 静态成员变量

类的 `static` 成员：所有对象共享一份。

```cpp
class Player {
public:
    static int playerCount;  // 声明
    // C++17 写法
    inline static int playerCount = 0;

    Player() { playerCount++; }
    ~Player() { playerCount--; }
};

// 定义（类外）
int Player::playerCount = 0;

int main() {
    Player p1, p2;
    std::cout << Player::playerCount << std::endl;  // 2
}
```

## 静态成员函数

类的 `static` 函数：无需对象即可调用。

```cpp
class Config {
    static int maxPlayers;
public:
    static int getMaxPlayers() {
        return maxPlayers;
    }
};

int main() {
    int max = Config::getMaxPlayers();  // 无需对象
}
```

**特点**：
- 不能访问 `this` 指针
- 不能访问非 `static` 成员
- 可通过类名直接调用