# Valgrind

> Valgrind 是一个强大的内存分析工具。

```bash
valgrind --leak-check=full --show-leak-kinds=all ./your_program
```

- `--leak-check=full` **：检测内存泄漏**
- `--show-leak-kinds=all` **：显示所有类型的内存泄露**