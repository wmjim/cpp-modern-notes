import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Modern Cpp Notes",
  description: "待补充",
  head: [
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400&display=swap' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@400;700&display=swap' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&display=swap' }],
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.1.0/style.css' }]
  ],
  // markdown: {
  //   typographer: true,
  //   quotes: '""""'
  // },
  base: '/cpp-modern-notes/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    outline: 'deep',
    outlineTitle: '目录',
    nav: [
      { text: 'Home', link: '/' },
      { text: '环境搭建', link: '/环境搭建/index.md' },
      { text: '基础语法', link: '/基础语法/' },
      { text: '关键字', link: '/关键字/index.md' },
      { text: '新特性', link: '/新特性/index.md' },
      { text: '面试题', link: '/面试题/index.md' }
    ],

    sidebar: {
      '/环境搭建/': [
        {
          text: '环境搭建',
          items: [
            { text: 'Linux 平台', link: '/环境搭建/linux.md' }
          ]
        }
      ],
      '/关键字/': [
        {
          text: '关键字',
          items: [
            { text: 'auto', link: '/关键字/auto.md' },
            { text: 'decltype', link: '/关键字/decltype.md' },
            { text: 'const', link: '/关键字/const.md' },
            { text: 'constexpr', link: '/关键字/constexpr.md' },
            { text: 'final', link: '/关键字/final.md' },
            { text: 'override', link: '/关键字/override.md' },
            { text: 'static', link: '/关键字/static.md' },



          ]
        }
      ],
      '/基础语法/': [
        {
          text: '基础语法',
          items: [
            {
              text: '字面量',
              collapsed: true,
              link: '/基础语法/字面量/字面量.md',
              items: [
                { text: '整型字面量', link: '/基础语法/字面量/整型字面量.md' },
                { text: '浮点字面量', link: '/基础语法/字面量/浮点字面量.md' },
                { text: '字符字面量', link: '/基础语法/字面量/字符字面量.md' },
                { text: '字符串字面量', link: '/基础语法/字面量/字符串字面量.md' },
                { text: '布尔字面量', link: '/基础语法/字面量/布尔字面量.md' },
                { text: '空指针字面量', link: '/基础语法/字面量/空指针字面量.md' },
                { text: '用户自定义字面量', link: '/基础语法/字面量/用户自定义字面量.md' },
              ]
            },
            {
              text: '类型系统',
              collapsed: true,
              items: [
                { text: '基本数据类型', link: '/基础语法/类型系统/基本数据类型.md' },
                { text: '数组', link: '/基础语法/类型系统/数组.md' },
                { text: '指针', link: '/基础语法/类型系统/指针.md' },
                { text: '引用', link: '/基础语法/类型系统/引用.md' },
                { text: '结构体', link: '/基础语法/类型系统/结构体.md' },
                { text: '共用体', link: '/基础语法/类型系统/共用体.md' },
                { text: '枚举', link: '/基础语法/类型系统/枚举.md' },
                { text: 'C 风格字符串', link: '/基础语法/类型系统/C 风格字符串.md' }
              ]
            },
            {
              text: '函数',
              collapsed: true,
              link: '/基础语法/函数/函数.md',
              items: [
                { text: '函数参数传递', link: '/基础语法/函数/函数参数传递.md' },
                { text: '作用域和生命周期', link: '/基础语法/函数/作用域和生命周期.md' },
                { text: '函数返回值', link: '/基础语法/函数/函数返回值.md' },
                { text: '默认参数', link: '/基础语法/函数/默认参数.md' },
                { text: '函数重载', link: '/基础语法/函数/函数重载.md' },
                { text: '函数指针与回调函数', link: '/基础语法/函数/函数指针与回调函数.md' },
                { text: 'Lambda 表达式', link: '/基础语法/函数/Lambda表达式.md' },
                { text: 'std::function', link: '/基础语法/函数/std::function.md' },
                { text: '内联函数', link: '/基础语法/函数/内联函数.md' },
                { text: '递归函数', link: '/基础语法/函数/递归函数.md' },
                { text: '如何设计一个好的函数', link: '/基础语法/函数/如何设计一个好的函数.md' }
              ]
            },
            {
              text: '对象和类',
              collapsed: true,
              items: [
                { text: '构造函数和析构函数', link: '/基础语法/对象和类/构造函数和析构函数.md' },
                { text: '访问和修改类私有成员', link: '/基础语法/对象和类/访问和修改类私有成员.md' }
              ]
            },
            {
              text: '多态',
              collapsed: true,
              items: [
                { text: '多态', link: '/基础语法/多态/多态.md' },
                { text: '虚函数', link: '/基础语法/多态/虚函数.md' },
                { text: '基类指针', link: '/基础语法/多态/基类指针.md' },
                { text: '纯虚函数与抽象类', link: '/基础语法/多态/纯虚函数与抽象类.md' },
                { text: '虚继承', link: '/基础语法/多态/虚继承.md' },
                { text: '虚析构函数', link: '/基础语法/多态/虚析构函数.md' },
              ]
            },
            {
              text: '名称空间',
              collapsed: true,
              items: [
                { text: '类型别名', link: '/基础语法/名称空间/类型别名.md' },
                { text: '命名空间别名', link: '/基础语法/名称空间/命名空间别名.md' }
              ]
            },
            {
              text: '输入输出',
              collapsed: true,
              items: [
                { text: 'cout', link: '/基础语法/输入输出/cout.md' },
                { text: '控制台输入', link: '/基础语法/输入输出/控制台输入.md' },
                { text: 'std::format', link: '/基础语法/输入输出/format.md' },
                { text: '文件输入输出', link: '/基础语法/输入输出/文件输入输出.md' },
                { text: 'stringstream', link: '/基础语法/输入输出/stringstream.md' },
                { text: '流的状态与错误处理', link: '/基础语法/输入输出/流的状态与错误处理.md' },
                { text: '二进制序列化', link: '/基础语法/输入输出/二进制序列化.md' }
              ]
            },
          ]
        }
      ],
      '/新特性/': [
        {
          text: '新特性',
          items: [
            { text: '列表初始化', link: '/新特性/列表初始化.md' },
            {
              text: '移动语义',
              collapsed: true,
              items: [
                { text: '值类别', link: '/新特性/移动语义/值类别.md' },
                { text: '左值引用', link: '/新特性/移动语义/左值引用.md' },
                { text: '右值引用', link: '/新特性/移动语义/右值引用.md' },
                { text: 'std::forward 详解', link: '/新特性/移动语义/std::forward详解.md' },
                { text: 'emplace 与性能优化', link: '/新特性/移动语义/emplace与性能优化.md' },

              ]
            },
            {
              text: '智能指针',
              collapsed: true,
              items: [
                { text: '智能指针基础', link: '/新特性/智能指针/智能指针基础.md' },
                { text: 'unique_ptr', link: '/新特性/智能指针/unique_ptr.md' },
                { text: 'shared_ptr', link: '/新特性/智能指针/shared_ptr.md' },
                { text: 'weak_ptr', link: '/新特性/智能指针/weak_ptr.md' }
              ]
            }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/wmjim' }
    ]
  }
})
