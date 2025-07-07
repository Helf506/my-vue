<template>
  <div class="results-container">
    <div class="background-blur"></div>   
    <div class="content-card">
      <h1 class="title" data-text="图像分割结果">图像分割结果</h1>
      
      <div class="image-wrapper">
        <div 
          class="image-container" 
          ref="imageContainer"
          v-show="!segmentedImageUrl"
        >
          <img 
            :src="imageUrl" 
            alt="原始图片" 
            class="preview-image"
            @click="handleImageClick"
            ref="previewImage"
            @load="imageLoaded"
          />
          <div 
            class="coordinate-marker" 
            v-for="(point, index) in coordinates" 
            :key="index"
            :style="getMarkerStyle(point)"
          >
            {{ point.label || index + 1 }}
          </div>
        </div>
        
        <div 
          class="result-image-container"
          v-show="segmentedImageUrl"
        >
          <h3>分割结果</h3>
          <img :src="segmentedImageUrl" alt="分割结果" class="segmented-image" />
        </div>
      </div>
      
      <!-- 只在未显示分割结果时展示控件 -->
      <div class="controls" v-if="!segmentedImageUrl">
        <select v-model="currentLabel" class="label-select">
          <option v-for="label in labels" :key="label.name" :value="label.name">
            {{ label.name }}
          </option>
        </select>
        <button @click="segmentImage" class="action-btn">开始分割</button>
        <button @click="saveCoordinates" class="action-btn">保存坐标</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const imageUrl = ref(route.query.image || '');
    const segmentedImageUrl = ref('');
    const coordinates = ref([]);
    const currentLabel = ref('');
    const previewImage = ref(null);
    const imageContainer = ref(null);
    const imageSize = ref({ width: 0, height: 0 });
    const scaleFactor = ref(1);
    
    // 从localStorage获取标签设置
    const labels = ref(JSON.parse(localStorage.getItem('imageLabels')) || [
      { name: 'Car', color: '#FF5733' },
      { name: 'Person', color: '#33FF57' },
      { name: 'Building', color: '#3357FF' } 
    ]);
    
    onMounted(() => {
      if (labels.value.length > 0) {
        currentLabel.value = labels.value[0].name;
      }
    });
    
    const imageLoaded = () => {
      if (previewImage.value) {
        // 计算图片实际显示尺寸和缩放比例
        const naturalWidth = previewImage.value.naturalWidth;
        const naturalHeight = previewImage.value.naturalHeight;
        const displayedWidth = previewImage.value.clientWidth;
        const displayedHeight = previewImage.value.clientHeight;
        
        scaleFactor.value = {
          x: displayedWidth / naturalWidth,
          y: displayedHeight / naturalHeight
        };
      }
    };
    
    const getMarkerStyle = (point) => {
      return {
        left: `${point.x * scaleFactor.value.x}px`,
        top: `${point.y * scaleFactor.value.y}px`,
        backgroundColor: getLabelColor(point.label)
      };
    };
    
    const getLabelColor = (labelName) => {
      const label = labels.value.find(l => l.name === labelName);
      return label ? label.color : '#ff6b81';
    };
    
    const handleImageClick = (e) => {
      if (!previewImage.value) return;
      
      const rect = previewImage.value.getBoundingClientRect();
      const x = (e.clientX - rect.left) / scaleFactor.value.x;
      const y = (e.clientY - rect.top) / scaleFactor.value.y;
      
      coordinates.value.push({
        x: Math.round(x),
        y: Math.round(y),
        label: currentLabel.value
      });
    };
    
    const saveCoordinates = () => {
      const data = {
        imageUrl: imageUrl.value,
        coordinates: coordinates.value,
        labels: labels.value
      };
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'segmentation_data.json';
      a.click();
      URL.revokeObjectURL(url);
    };
    
    const segmentImage = async () => {
      // 这里应该是调用后端API进行分割
      // 模拟分割结果
      segmentedImageUrl.value = imageUrl.value;
    };
    
    return {
      imageUrl,
      segmentedImageUrl,
      coordinates,
      currentLabel,
      labels,
      previewImage,
      imageContainer,
      handleImageClick,
      saveCoordinates,
      segmentImage,
      getMarkerStyle,
      imageLoaded
    };
  }
};
</script>

<style scoped>
/* 保持原有样式不变 */
.results-container {
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

.image-wrapper {
  position: relative;
  margin: 20px 0;
  min-height: 300px; /* 确保有分割结果和原始图片切换时高度不变 */
}

.image-container {
  position: relative;
  display: inline-block;
}

.preview-image {
  max-width: 100%;
  max-height: 60vh;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  cursor: crosshair;
}

.coordinate-marker {
  position: absolute;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  transform: translate(-50%, -50%);
  pointer-events: none;
  border: 2px solid white;
  font-weight: bold;
}

.controls {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin: 20px 0;
}

.label-select {
  padding: 10px 15px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background: rgba(255, 255, 255, 0.8);
}

.action-btn {
  padding: 10px 20px;
  background: linear-gradient(90deg, #4ecdc4, #ff6b81);
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

/* 新增的分割结果容器样式 */
.result-image-container {
  text-align: center;
}

.segmented-image {
  max-width: 100%;
  max-height: 60vh;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>