# 小馨宝 (Xiaoxinbao)

一个温暖、安全、非评判性的AI心理支持聊天应用。

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **图标**: Lucide React
- **网络请求**: Axios
- **Markdown渲染**: react-markdown

## 设计理念

- **氛围**: 温暖、安全、非评判性
- **配色**: Cream & Sage 调色板
  - 背景色: `#FDFCF8` (Warm White)
  - 强调色: `#8DA399` (Sage)
- **设计**: 移动优先，原生应用体验

## 快速开始

### 安装依赖

```bash
npm install
```

### 配置环境变量

创建 `.env.local` 文件：

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 运行开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

## 项目结构

```
xiaoxinbao/
├── app/
│   ├── layout.tsx          # 根布局
│   ├── page.tsx            # 聊天主页面
│   └── globals.css         # 全局样式
├── components/
│   ├── ChatLayout.tsx      # 聊天布局组件
│   ├── MessageBubble.tsx   # 消息气泡组件
│   ├── InputArea.tsx       # 输入区域组件
│   └── Toast.tsx           # 提示消息组件
├── types/
│   └── message.ts          # 消息类型定义
├── utils/
│   └── api.ts             # API 工具函数
└── package.json
```

## 功能特性

- ✅ 实时聊天界面
- ✅ Markdown 消息渲染
- ✅ 移动端优化
- ✅ 加载状态指示
- ✅ 错误提示
- ✅ 医疗免责声明

## 重要提示

**医疗免责声明**: AI响应仅用于情感支持，不用于医疗诊断。

## 构建生产版本

```bash
npm run build
npm start
```

