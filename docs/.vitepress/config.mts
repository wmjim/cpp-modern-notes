import { defineConfig } from "vitepress";
import { nav } from "./config/nav";
import {
  sidebarSetup,
  sidebarKeywords,
  sidebarBasics,
  sidebarToolchain,
  sidebarFeatures,
} from "./config/sidebar";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Modern Cpp Notes",
  description: "待补充",
  head: [
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400&display=swap",
      },
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@400;700&display=swap",
      },
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&display=swap",
      },
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.1.0/style.css",
      },
    ],
  ],
  // markdown: {
  //   typographer: true,
  //   quotes: '""""'
  // },
  base: "/cpp-modern-notes/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    outline: "deep",
    outlineTitle: "目录",
    nav,

    sidebar: {
      ...sidebarSetup,
      ...sidebarKeywords,
      ...sidebarBasics,
      ...sidebarToolchain,
      ...sidebarFeatures,
    },

    socialLinks: [{ icon: "github", link: "https://github.com/wmjim" }],
  },
});
