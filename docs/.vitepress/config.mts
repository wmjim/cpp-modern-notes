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
            { text: 'final', link: '/关键字/final.md' },
            { text: 'override', link: '/关键字/override.md' },


          ]
        }
      ],
      '/基础语法/': [
        {
          text: '基础语法',
          items: [
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
            }
          ]
        }
      ],
      '/新特性/': [
        {
          text: '新特性',
          items: [
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
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
