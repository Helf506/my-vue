<template>
  <img :src="imageUrl" alt="Segmented Image" />
</template>

<script>
export default {
  props: {
    imageUrl: String
  }
};
</script>