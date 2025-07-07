<template>
  <div class="sam-demo-layout">
    <!-- 左侧工具栏 -->
    <aside class="sam-demo-sidebar">
      <div class="sidebar-header">
        <h3>工具</h3>
      </div>
      <div class="sidebar-section">
        <button 
          class="tool-btn" 
          @click="openUploadDialog"
        >
          <i class="fa fa-upload mr-2"></i>上传
        </button>
        <button class="tool-btn">
          <i class="fa fa-image mr-2"></i>画廊
        </button>
      </div>
      <div class="sidebar-section">
        <h4>悬停并点击</h4>
        <p class="hint-text">
          单击对象一次选多次，按住 Shift 键并单击可删除片段。
        </p>
        <div class="tool-group">
          <button 
            class="tool-btn" 
            :class="{ active: currentTool === 'add' }"
            @click="currentTool = 'add'"
          >
            <i class="fa fa-plus"></i> 添加蒙版
          </button>
          <button 
            class="tool-btn" 
            :class="{ active: currentTool === 'remove' }"
            @click="currentTool = 'remove'"
          >
            <i class="fa fa-minus"></i> 移除区域
          </button>
        </div>
        <div class="tool-actions">
          <button class="small-btn">重置</button>
          <button class="small-btn">撤消</button>
          <button class="small-btn">重做</button>
        </div>
      </div>
      <div class="sidebar-section">
        <button class="tool-btn">多重蒙版</button>
        <button class="tool-btn">剪切对象</button>
      </div>
      <div class="sidebar-section">
        <button class="tool-btn">箱</button>
        <button class="tool-btn">万事</button>
        <button class="tool-btn">切口</button>
      </div>
    </aside>

    <!-- 中间画布 + 引导提示 -->
    <main class="sam-demo-main">
      <!-- 引导提示弹窗 -->
      <div 
        class="guide-modal" 
        v-if="showGuide"
      >
        <div class="modal-content">
          <h4>如何使用选择工具</h4>
          <img 
            src="https://segment-anything.com/assets/images/selection-tool.png" 
            alt="工具说明"
            class="guide-img"
          >
          <p>
            添加和减去区域<br />
            通过添加点来遮罩区域。选择 Add Area（添加区域），然后选择对象。通过选择“移除区域”来优化蒙版，然后选择该区域。
          </p>
          <button class="close-btn" @click="showGuide = false">关闭</button>
        </div>
      </div>

      <!-- 画布区域（可替换为实际图像预览） -->
      <div class="canvas-container">
        <img 
          src="https://segment-anything.com/assets/images/demo-art.jpg" 
          alt="演示图像"
          class="demo-image"
        >
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentTool: 'add', // 当前选中工具：add/remove
      showGuide: true,    // 是否显示引导提示
    };
  },
  methods: {
    openUploadDialog() {
      // 可扩展：调用上传组件或路由跳转
      alert('即将打开上传对话框！');
    },
  },
};
</script>

<style scoped>
.sam-demo-layout {
  display: flex;
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
}

/* 左侧工具栏 */
.sam-demo-sidebar {
  width: 220px;
  background-color: #fff;
  border-right: 1px solid #e5e5e5;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.sidebar-header {
  margin-bottom: 20px;
}

.sidebar-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.sidebar-section {
  margin-bottom: 30px;
}

.tool-btn {
  width: 100%;
  text-align: left;
  padding: 10px 12px;
  margin: 5px 0;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.tool-btn:hover {
  background-color: #fafafa;
  border-color: #dcdcdc;
}

.tool-btn.active {
  background-color: #42b983;
  color: #fff;
  border-color: #42b983;
}

.hint-text {
  font-size: 14px;
  color: #666;
  margin: 10px 0;
  line-height: 1.4;
}

.tool-group {
  display: flex;
  gap: 10px;
  margin: 10px 0;
}

.tool-actions {
  display: flex;
  gap: 5px;
}

.small-btn {
  padding: 6px 10px;
  font-size: 12px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
}

.small-btn:hover {
  background-color: #fafafa;
}

/* 中间画布区域 */
.sam-demo-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 40px;
}

.canvas-container {
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  overflow: hidden;
}

.demo-image {
  max-width: 800px;
  width: 100%;
  height: auto;
  display: block;
}

/* 引导提示弹窗 */
.guide-modal {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
}

.guide-img {
  max-width: 100%;
  border-radius: 4px;
  margin: 10px 0;
}

.close-btn {
  padding: 8px 16px;
  background-color: #42b983;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

.close-btn:hover {
  background-color: #357a5e;
}
</style>