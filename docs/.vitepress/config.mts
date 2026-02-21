import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Modern Cpp Notes",
  description: "待补充",
  head: [
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400&display=swap' }]
  ],
  markdown: {
    typographer: false,
    quotes: '""""'
  },
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
      { text: '新特性', link: '/新特性/' }
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
            { text: 'const', link: '/关键字/const.md' }
          ]
        }
      ],
      '/基础语法/': [
        {
          text: '基础语法',
          items: []
        }
      ],
      '/新特性/': [
        {
          text: '新特性',
          items: []
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
