<template>
  <div>
    <h1>Vue 3 learn project</h1>
    <div>
      <router-link class="link" to="/posts">Посты</router-link>
      <router-link class="link" to="/about">О приложении</router-link>
    </div>

  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.link {
  font-size: 24px;
  text-decoration: none;
  margin: 25px 15px 0 0;
  color: black;
}
.link:hover {
  color: teal;
}
</style>