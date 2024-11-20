# 下载依赖

`[npm | yarn | pnpm] install`

# 配置油猴

找到 `tampermonkey.config` 文件，完善配置。下面是配置示例：

```txt
// ==UserScript==
// @name         xxx-script
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  xx站内优化脚本
// @author       xiwenge
// @match        *://link.juejin.cn/*
// @run-at       document-start
// ==/UserScript==
```

@name 指脚本名称\
@namespace 指脚本命名空间\
@version 指脚本版本\
@description 指脚本描述\
@match 指脚本生效的网站\
@run-at 指脚本运行时机，一般是 document-start 和 document-end

更多配置项请参考 [tampermonkey](https://www.tampermonkey.net/documentation.php?ext=iikm&version=5.1.1) 官方文档。

# 启动项目

`[npm run | yarn run | pnpm] dev`

# 开发调试

1.确保浏览器安装了油猴插件\
2.将 `run dev` 命令生成的 `tampermonkey.js` 内容拷贝到油猴并保存

# 代码刷新

油猴由于 run-at 的机制，只在页面某个事件触发时才会执行脚本，所以代码修改后需要刷新页面才能生效。

# 开发完成

将 dist 目录下的 *.iife.js 最终产物复制粘贴到油猴并保存。
