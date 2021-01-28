<template>
  <div class="header">
    <ContentContainer>
      <div class="logo-wrap d-flex">
        <img src="../assets/images/ice3plainblue.png" class="logo-img" alt="" />
      </div>
    </ContentContainer>
  </div>
</template>

<script>
import ContentContainer from "./ContentContainer.vue";

export default {
  name: "Header",
  components: {
    ContentContainer
  }
};
</script>

<style scoped>
.logo-img {
  width: 120px;
}
</style>
