<template>
  <div class="home-container">
    <!-- 背景模糊层 -->
    <div class="background-blur"></div>
    
    <!-- 内容卡片（玻璃拟态） -->
    <div class="content-card">
      <!-- 渐变标题 -->
      <h1 class="title" data-text="欢迎使用图像分割工具">
        欢迎使用图像分割工具
      </h1>
      <p class="subtitle">
        这是一个基于 AI 的图像分割应用，上传图片即可体验精准分割功能！
      </p>
      <!-- 呼吸动效按钮 -->
      <button 
        class="cta-button" 
        @mouseenter="handleHover"
        @mouseleave="handleLeave"
        @click="goToUpload"
      >
        前往上传
        <div class="ripple" :style="rippleStyle"></div>
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const rippleStyle = ref({});

    // 按钮波纹效果
    const handleClick = (e) => {
      const x = e.clientX - e.target.offsetLeft;
      const y = e.clientY - e.target.offsetTop;
      rippleStyle.value = {
        top: `${y}px`,
        left: `${x}px`,
        opacity: 1,
        transform: 'scale(2)'
      };
      setTimeout(() => {
        rippleStyle.value.opacity = 0;
      }, 600);
    };

    // 按钮 hover 扩散
    const handleHover = (e) => {
      e.target.style.setProperty('--scale', '1.05');
    };
    const handleLeave = (e) => {
      e.target.style.setProperty('--scale', '1');
    };

    // 跳转上传页
    const goToUpload = () => {
      router.push('/upload');
    };

    return {
      rippleStyle,
      handleClick,
      handleHover,
      handleLeave,
      goToUpload
    };
  }
}
</script>

<style scoped>
/* 背景模糊层（渐变+模糊） */
.home-container {
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

/* 玻璃卡片 */
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

/* 渐变标题（文字描边+渐变） */
.title {
  font-size: 3rem;
  font-weight: 800;
  color: #333;
  margin-bottom: 20px;
  position: relative;
  display: inline-block;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s forwards;
}
.title::before {
  content: attr(data-text);
  position: absolute;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  background-image: linear-gradient(45deg, #ff6b81, #4ecdc4);
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  z-index: -1;
}

/* 副标题 */
.subtitle {
  font-size: 1rem;
  color: #555;
  line-height: 1.6;
  margin-bottom: 30px;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s 0.2s forwards;
}

/* 按钮样式（呼吸动效+波纹） */
.cta-button {
  position: relative;
  padding: 14px 32px;
  font-size: 1rem;
  background: linear-gradient(90deg, #4ecdc4, #ff6b81);
  color: #fff;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  --scale: 1;
  transform: scale(var(--scale));
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s 0.4s forwards;
}
.cta-button:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
}
/* 波纹效果 */
.ripple {
  position: absolute;
  width: 10px;
  height: 10px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  transform: scale(0);
  opacity: 0;
  pointer-events: none;
  transition: all 0.6s ease-out;
}

/* 动画定义 */
@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>