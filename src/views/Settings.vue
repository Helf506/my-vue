<template>
  <div class="settings-container">
    <div class="background-blur"></div>
    
    <div class="content-card">
      <h1 class="title">设置</h1>
      
      <div class="settings-section">
        <h3>标签管理</h3>
        <div class="labels-list">
          <div v-for="(label, index) in labels" :key="index" class="label-item">
            <input v-model="label.name" type="text" class="label-input">
            <input v-model="label.color" type="color" class="color-picker">
            <button @click="removeLabel(index)" class="remove-btn">删除</button>
          </div>
        </div>
        <button @click="addLabel" class="add-btn">添加标签</button>
        <button @click="saveLabels" class="save-btn">保存标签</button>
      </div>
      
      <div class="settings-section">
        <h3>导出设置</h3>
        <div class="export-options">
          <label>
            <input type="checkbox" v-model="exportSettings.includeCoordinates"> 包含坐标数据
          </label>
          <label>
            <input type="checkbox" v-model="exportSettings.includeMetadata"> 包含元数据
          </label>
        </div>
      </div>
      
      <button @click="goBack" class="back-btn">返回</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labels: [
        { name: 'Car', color: '#FF5733' },
        { name: 'Person', color: '#33FF57' },
        { name: 'Building', color: '#3357FF' }
      ],
      exportSettings: {
        includeCoordinates: true,
        includeMetadata: true
      }
    };
  },
  methods: {
    addLabel() {
      this.labels.push({ name: '', color: '#000000' });
    },
    removeLabel(index) {
      this.labels.splice(index, 1);
    },
    saveLabels() {
      localStorage.setItem('imageLabels', JSON.stringify(this.labels));
      localStorage.setItem('exportSettings', JSON.stringify(this.exportSettings));
      alert('设置已保存！');
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  created() {
    const savedLabels = localStorage.getItem('imageLabels');
    if (savedLabels) {
      this.labels = JSON.parse(savedLabels);
    }
    
    const savedSettings = localStorage.getItem('exportSettings');
    if (savedSettings) {
      this.exportSettings = JSON.parse(savedSettings);
    }
  }
};
</script>

<style scoped>
.settings-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.background-blur {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #fde6f3, #e0f3ff);
  filter: blur(10px);
  z-index: -1;
  transform: scale(1.1);
}

.content-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  max-width: 800px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.settings-section {
  margin-bottom: 30px;
  text-align: left;
}

.labels-list {
  margin-bottom: 15px;
}

.label-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.label-input {
  flex: 1;
  padding: 8px; 
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
}

.color-picker {
  width: 40px;
  height: 40px;
  margin-right: 10px;
  cursor: pointer;
}

.remove-btn {
  background-color: #ff6b81;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
}

.add-btn, .save-btn {
  padding: 10px 15px;
  margin-right: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-btn {
  background-color: #42b983;
  color: white;
}

.save-btn {
  background-color: #4ecdc4;
  color: white;
}

.back-btn {
  padding: 10px 20px;
  background-color: #666;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
}

.export-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>