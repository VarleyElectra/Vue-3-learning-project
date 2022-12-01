<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "my-button"
}
</script>

<style scoped>
.btn {
  padding: 10px 15px;
  background: none;
  color: teal;
  border: 1px solid teal;
}
.btn:hover {
  color: white;
  background-color: teal;
  cursor: pointer;
  transition: 0.5s;
}
</style>