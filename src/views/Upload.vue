<template>
  <div class="upload-container">
    <div class="background-blur"></div>
    <div class="content-card">
      <h1 class="title" data-text="上传图片">上传图片</h1>
      <p class="subtitle">选择一张图片，我们将为你进行精准分割</p>
      
      <div class="file-selection">
        <input
          type="file"
          @change="handleFileChange"
          accept="image/*"
          class="file-input"
          id="fileInput"
        />
        <label for="fileInput" class="upload-label">
          点击上传图片
        </label>
        <div v-if="selectedImage" class="preview">
          <img :src="selectedImage" alt="Selected Image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const selectedImage = ref(null);

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      selectedImage.value = event.target.result;
      // 直接跳转到结果页面
      router.push({
        path: '/results',
        query: { image: selectedImage.value }
      });
    };
    reader.readAsDataURL(file);
  }
};
</script>

<style scoped>
/* 保持原有样式不变 */
.upload-container {
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
  max-width: 600px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.file-input {
  display: none;
}

.upload-label {
  display: inline-block;
  padding: 14px 32px;
  background: linear-gradient(90deg, #4ecdc4, #ff6b81);
  color: white;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s;
}

.upload-label:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.preview {
  margin-top: 20px;
}

.preview img {
  max-width: 100%;
  max-height: 300px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>