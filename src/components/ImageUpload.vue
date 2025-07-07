<template>
  <div class="image-upload">
    <input
      type="file"
      @change="handleFileChange"
      accept="image/*"
      class="file-input"
    />
    <label for="file-input" class="upload-label">
      点击上传图片
    </label>
    <div v-if="selectedImage" class="preview">
      <img :src="selectedImage" alt="Selected Image" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 使用 ref 定义响应式的 selectedImage，初始值为 null
const selectedImage = ref(null); 

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      selectedImage.value = event.target.result; 
      // 假设父组件监听了 image-uploaded 事件，这里可通过 emits 触发（如果需要）
      // emit('image-uploaded', selectedImage.value);
    };
    reader.readAsDataURL(file);
  }
};
</script>

<style scoped>
/* 样式部分保持不变 */
</style>