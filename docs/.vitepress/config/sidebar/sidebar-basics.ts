export const sidebarBasics = {
  "/基础语法/": [
    {
      text: "基础语法",
      items: [
        {
          text: "基本概念",
          collapsed: true,
          items: [
            {
              text: "注释",
              link: "/基础语法/基本概念/注释.md",
            },
          ],
        },
        {
          text: "字面量",
          collapsed: true,
          link: "/基础语法/字面量/字面量.md",
          items: [
            {
              text: "整型字面量",
              link: "/基础语法/字面量/整型字面量.md",
            },
            {
              text: "浮点字面量",
              link: "/基础语法/字面量/浮点字面量.md",
            },
            {
              text: "字符字面量",
              link: "/基础语法/字面量/字符字面量.md",
            },
            {
              text: "字符串字面量",
              link: "/基础语法/字面量/字符串字面量.md",
            },
            {
              text: "布尔字面量",
              link: "/基础语法/字面量/布尔字面量.md",
            },
            {
              text: "空指针字面量",
              link: "/基础语法/字面量/空指针字面量.md",
            },
            {
              text: "用户自定义字面量",
              link: "/基础语法/字面量/用户自定义字面量.md",
            },
          ],
        },
        {
          text: "类型系统",
          collapsed: true,
          items: [
            {
              text: "基本数据类型",
              link: "/基础语法/类型系统/基本数据类型.md",
            },
            {
              text: "数组",
              link: "/基础语法/类型系统/数组.md",
            },
            {
              text: "指针",
              link: "/基础语法/类型系统/指针.md",
            },
            {
              text: "引用",
              link: "/基础语法/类型系统/引用.md",
            },
            {
              text: "结构体",
              link: "/基础语法/类型系统/结构体.md",
            },
            {
              text: "共用体",
              link: "/基础语法/类型系统/共用体.md",
            },
            {
              text: "枚举",
              link: "/基础语法/类型系统/枚举.md",
            },
            {
              text: "C 风格字符串",
              link: "/基础语法/类型系统/C 风格字符串.md",
            },
            {
              text: "类型分类",
              link: "/基础语法/类型系统/类型分类.md",
            },
          ],
        },
        {
          text: "函数",
          collapsed: true,
          link: "/基础语法/函数/函数.md",
          items: [
            {
              text: "函数参数传递",
              link: "/基础语法/函数/函数参数传递.md",
            },
            {
              text: "作用域和生命周期",
              link: "/基础语法/函数/作用域和生命周期.md",
            },
            {
              text: "函数返回值",
              link: "/基础语法/函数/函数返回值.md",
            },
            {
              text: "默认参数",
              link: "/基础语法/函数/默认参数.md",
            },
            {
              text: "函数重载",
              link: "/基础语法/函数/函数重载.md",
            },
            {
              text: "函数指针与回调函数",
              link: "/基础语法/函数/函数指针与回调函数.md",
            },
            {
              text: "Lambda 表达式",
              link: "/基础语法/函数/Lambda表达式.md",
            },
            {
              text: "std::function",
              link: "/基础语法/函数/std::function.md",
            },
            {
              text: "内联函数",
              link: "/基础语法/函数/内联函数.md",
            },
            {
              text: "递归函数",
              link: "/基础语法/函数/递归函数.md",
            },
            {
              text: "如何设计一个好的函数",
              link: "/基础语法/函数/如何设计一个好的函数.md",
            },
          ],
        },
        {
          text: "对象和类",
          collapsed: true,
          items: [
            {
              text: "构造函数和析构函数",
              link: "/基础语法/对象和类/构造函数和析构函数.md",
            },
            {
              text: "访问和修改类私有成员",
              link: "/基础语法/对象和类/访问和修改类私有成员.md",
            },
          ],
        },
        {
          text: "内存管理",
          collapsed: true,
          items: [
            {
              text: "内存布局",
              link: "/基础语法/内存管理/内存布局.md",
            },
          ],
        },
        {
          text: "多态",
          collapsed: true,
          items: [
            {
              text: "多态",
              link: "/基础语法/多态/多态.md",
            },
            {
              text: "虚函数",
              link: "/基础语法/多态/虚函数.md",
            },
            {
              text: "基类指针",
              link: "/基础语法/多态/基类指针.md",
            },
            {
              text: "纯虚函数与抽象类",
              link: "/基础语法/多态/纯虚函数与抽象类.md",
            },
            {
              text: "虚继承",
              link: "/基础语法/多态/虚继承.md",
            },
            {
              text: "虚析构函数",
              link: "/基础语法/多态/虚析构函数.md",
            },
          ],
        },
        {
          text: "名称空间",
          collapsed: true,
          items: [
            {
              text: "类型别名",
              link: "/基础语法/名称空间/类型别名.md",
            },
            {
              text: "命名空间别名",
              link: "/基础语法/名称空间/命名空间别名.md",
            },
          ],
        },
        {
          text: "输入输出",
          collapsed: true,
          items: [
            {
              text: "cout",
              link: "/基础语法/输入输出/cout.md",
            },
            {
              text: "控制台输入",
              link: "/基础语法/输入输出/控制台输入.md",
            },
            {
              text: "std::format",
              link: "/基础语法/输入输出/format.md",
            },
            {
              text: "文件输入输出",
              link: "/基础语法/输入输出/文件输入输出.md",
            },
            {
              text: "stringstream",
              link: "/基础语法/输入输出/stringstream.md",
            },
            {
              text: "流的状态与错误处理",
              link: "/基础语法/输入输出/流的状态与错误处理.md",
            },
            {
              text: "二进制序列化",
              link: "/基础语法/输入输出/二进制序列化.md",
            },
          ],
        },
      ],
    },
  ],
};
