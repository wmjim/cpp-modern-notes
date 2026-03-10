# ar

**ar**（archiver）是 Unix/Linux 系统中用来创建、修改和提取静态库（archive files，通常以 `.a` 为扩展名）的命令行工具。

它主要用于管理目标文件（`.o`）组成的静态库。

## 创建静态库

```bash
ar rcs libname.a file1.o file2.o
```

- `r`：向归档文件中插入文件，若存在则替换
- `c`：若归档文件不存在，则创建它（避免警告）
- `s`：写入索引（等价于运行 `ranlib`），加快链接速度

## 列出归档文件

```bash
ar t libname.a
```

- `t`：列出归档中的所有成员文件名