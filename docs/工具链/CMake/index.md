# CMake

## -G 制定系统构建生成器

```bash
-G <generator-name>
```

`generator-name` 该选项常用值如下：

- `Ninja`- for the Ninja build system
- `Unix Makefiles` - for GUN Make
- `Visual Studio 17 VS2022` - for Visual Studio and MS Build
- `Xcode` - for Xcode projects

## -B 显式指定生成目录

```bash
-B <path-to-build>
```

## -S 显式指定源目录

```bash
-S <path-to-source>
```

## -D 创建或更新 cmake 缓存条目

```bash
-D <var>[:<type>]=<value>
```

- `-DCMAKE_BUILD_TYPE=Release`
- `_DLLVM_ENABLE_PROJECTS=clang`