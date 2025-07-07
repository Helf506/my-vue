# 我的 Vue 项目  

## 项目介绍  
这是一个基于 Vue 的前端项目，主要用于图像分割。  

## 核心功能

- **智能标注** - 点击图像添加标注点，AI 自动完成分割
- **多标签管理** - 自定义标注类别和颜色
- **玻璃拟态 UI** - 时尚的毛玻璃视觉效果
- **响应式设计** - 适配桌面/移动设备
- **PWA 支持** - 可安装为本地应用

## 运行步骤  
### 前置要求
- Node.js 16+ 
- [pnpm](https://pnpm.io/installation)（推荐）或 npm

### 安装依赖
```bash
pnpm install
# 或使用 npm
npm install
```

### 开发模式
```bash
pnpm run serve
# 或使用 npm
npm run serve
```

### 生产构建
```bash
pnpm run build
# 或使用 npm
npm run build
```
## 项目配置

### 开发服务器代理
在 vue.config.js 中配置后端 API：
```bash
devServer: {
  proxy: {
    '/api': {
      target: 'http://localhost:5000',  // 你的后端地址
      changeOrigin: true
    }
  }
}
```

### 环境变量
创建 .env 文件：
```bash
VUE_APP_API_BASE_URL=/api
VUE_APP_DEBUG=true
```

## 目录结构
my-vue/
├── public/               # 静态资源
│   ├── favicon.ico
│   └── logo.png
├── src/
│   ├── assets/           # 全局样式/图片
│   ├── components/       # 可复用组件
│   │   ├── Navigation.vue # 导航栏
│   │   └── ImageUpload.vue # 上传组件
│   ├── views/            # 页面视图
│   │   ├── Home.vue      # 炫酷首页
│   │   ├── Results.vue   # 分割结果页
│   │   └── Upload.vue    # 图像上传
│   ├── router/           # 路由配置
│   ├── App.vue           # 根组件
│   └── main.js           # 应用入口
├── .env                  # 环境配置
├── vue.config.js         # Vue CLI 配置
└── package.json          # 项目依赖

## 技术亮点

### 前端技术栈
技术	       用途	        版本
Vue 3   	   核心框架	    3.2
Vue Router	 页面路由	    4.5
Axios	HTTP   请求	        1.10
FontAwesome	 图标库	      6.7

### 特色实现
1.玻璃拟态效果：
```bash
.content-card {
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(12px);
}
```

2.智能坐标转换:
```bash
// Results.vue 中的坐标缩放算法
scaleFactor.value = {
  x: displayedWidth / naturalWidth,
  y: displayedHeight / naturalHeight
}
```

## 关键设计点说明：
1.动态徽章系统 - 实时显示技术栈版本

2.折叠式高级指南 - 保持文档简洁

3.技术亮点展示 - 突出核心代码实现

4.移动端友好 - 适配 GitHub 移动端查看

5.版本可追溯 - 所有依赖版本明确标注
