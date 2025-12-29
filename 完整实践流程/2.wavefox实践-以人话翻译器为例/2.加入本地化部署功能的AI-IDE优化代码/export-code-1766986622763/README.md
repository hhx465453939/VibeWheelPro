# 小白报告解读器 - 本地部署指南

## 📋 项目简介

这是一个基于 React + Vite 构建的医学报告解读应用，能够将复杂的医学报告转换为通俗易懂的生活化解释。

## 🛠️ 技术栈

- **前端框架**: React 18.2
- **构建工具**: Vite 5.2
- **路由**: React Router DOM 6.28
- **样式**: Tailwind CSS 3.4
- **图标库**: Lucide React, Radix UI Icons

## 📦 环境要求

在开始之前，请确保您的系统已安装以下软件：

- **Node.js**: >= 16.0.0 (推荐使用 18.x 或更高版本)
- **npm**: >= 7.0.0 (或使用 yarn/pnpm)

### 检查环境

打开终端（Windows: PowerShell 或 CMD，Mac/Linux: Terminal），运行以下命令检查版本：

```bash
node -v
npm -v
```

如果未安装 Node.js，请访问 [Node.js 官网](https://nodejs.org/) 下载并安装。

## 🚀 快速开始

### 步骤 1: 安装依赖

在项目根目录下，运行以下命令安装所有依赖包：

```bash
npm install
```

> **注意**: 首次安装可能需要几分钟时间，请耐心等待。如果遇到网络问题，可以使用国内镜像：
> ```bash
> npm install --registry=https://registry.npmmirror.com
> ```

### 步骤 2: 启动开发服务器

安装完成后，运行开发命令：

```bash
npm run dev
```

启动成功后，您会看到类似以下输出：

```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://192.168.x.x:3000/
```

### 步骤 3: 访问应用

打开浏览器，访问 `http://localhost:3000` 即可看到应用界面。

## 📝 可用命令

项目提供了以下 npm 脚本命令：

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器（支持热更新） |
| `npm run build` | 构建生产版本（输出到 `dist` 目录） |
| `npm run preview` | 预览生产构建结果 |

## 🏗️ 构建生产版本

如果需要构建用于生产环境的版本：

```bash
npm run build
```

构建完成后，所有文件将输出到 `dist` 目录。您可以使用以下命令预览构建结果：

```bash
npm run preview
```

### 部署到静态服务器

构建后的 `dist` 目录可以部署到任何静态文件服务器，例如：

- **Nginx**: 将 `dist` 目录内容复制到 Nginx 的 `html` 目录
- **Apache**: 将 `dist` 目录内容复制到 Apache 的 `htdocs` 目录
- **Vercel/Netlify**: 直接上传 `dist` 目录或连接 Git 仓库自动部署
- **GitHub Pages**: 使用 GitHub Actions 自动构建和部署

## 🔧 配置说明

### 端口配置

默认开发服务器端口为 `3000`。如需修改，请编辑 `vite.config.js`：

```javascript
server: {
  port: 3000,  // 修改为您想要的端口号
  // ...
}
```

### API 接口配置

当前项目使用的 AI 接口地址在 `src/pages/HomePage.jsx` 中配置：

```javascript
const response = await fetch('https://www.weavefox.cn/api/open/v1/ai_app_proxy/rest/v1/chat/62775', {
  // ...
});
```

如需修改接口地址，请编辑该文件中的相应部分。

## 🐛 常见问题

### 1. 端口被占用

如果 3000 端口已被占用，Vite 会自动尝试下一个可用端口，或者您可以手动修改 `vite.config.js` 中的端口配置。

### 2. 依赖安装失败

- 清除 npm 缓存：`npm cache clean --force`
- 删除 `node_modules` 和 `package-lock.json`，然后重新运行 `npm install`
- 使用国内镜像：`npm install --registry=https://registry.npmmirror.com`

### 3. 样式不生效

确保 `src/index.css` 文件已正确引入 Tailwind CSS 指令，并且 `tailwind.config.js` 中的 `content` 路径配置正确。

### 4. 构建失败

- 检查 Node.js 版本是否符合要求
- 确保所有依赖都已正确安装
- 查看终端错误信息，根据提示解决问题

## 📁 项目结构

```
.
├── index.html              # HTML 入口文件
├── package.json            # 项目配置和依赖
├── vite.config.js          # Vite 构建配置
├── tailwind.config.js      # Tailwind CSS 配置
├── postcss.config.js       # PostCSS 配置
├── src/
│   ├── index.jsx          # React 应用入口
│   ├── index.css          # 全局样式
│   ├── App.jsx            # 主应用组件
│   ├── pages/             # 页面组件
│   │   └── HomePage.jsx
│   ├── components/        # 通用组件
│   │   ├── ReportInputArea.jsx
│   │   ├── InterpretationResult.jsx
│   │   └── DisclaimerFooter.jsx
│   └── ui/                # UI 组件
│       └── Card.jsx
└── dist/                  # 构建输出目录（运行 build 后生成）
```

## 🔐 注意事项

1. **API 接口**: 当前项目依赖外部 AI 接口，请确保网络连接正常
2. **数据隐私**: 本应用会向外部 API 发送用户输入的报告内容，请注意数据隐私
3. **免责声明**: 本应用仅用于辅助理解，不能替代专业医疗诊断

## 📞 获取帮助

如果遇到问题，请：

1. 检查本文档的"常见问题"部分
2. 查看终端中的错误信息
3. 确认所有依赖都已正确安装
4. 验证 Node.js 版本是否符合要求

## 📄 许可证

本项目为私有项目。

---

**祝您使用愉快！** 🎉

