export const sidebarFeatures = {
  "/新特性/": [
    {
      text: "新特性",
      items: [
        { text: "列表初始化", link: "/新特性/列表初始化.md" },
        {
          text: "移动语义",
          collapsed: true,
          items: [
            {
              text: "值类别",
              link: "/新特性/移动语义/值类别.md",
            },
            {
              text: "左值引用",
              link: "/新特性/移动语义/左值引用.md",
            },
            {
              text: "右值引用",
              link: "/新特性/移动语义/右值引用.md",
            },
            {
              text: "std::forward 详解",
              link: "/新特性/移动语义/std::forward详解.md",
            },
            {
              text: "emplace 与性能优化",
              link: "/新特性/移动语义/emplace与性能优化.md",
            },
          ],
        },
        {
          text: "智能指针",
          collapsed: true,
          items: [
            {
              text: "智能指针基础",
              link: "/新特性/智能指针/智能指针基础.md",
            },
            {
              text: "unique_ptr",
              link: "/新特性/智能指针/unique_ptr.md",
            },
            {
              text: "shared_ptr",
              link: "/新特性/智能指针/shared_ptr.md",
            },
            {
              text: "weak_ptr",
              link: "/新特性/智能指针/weak_ptr.md",
            },
          ],
        },
      ],
    },
  ],
};
