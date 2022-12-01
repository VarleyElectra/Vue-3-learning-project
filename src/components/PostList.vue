<template>
  <div v-if="posts.length > 0">
    <h2>Список постов</h2>
    <transition-group name="post-list">
      <post-item :post="post" v-for="post in posts" :key="post.id"
                 @remove="$emit('remove', post)">
      </post-item>
    </transition-group>
  </div>
  <div v-else>
    <h2 style="color: red">
      Список постов пуст
    </h2>
  </div>
</template>

<script>
import PostItem from "@/components/PostItem";
export default {
  components: {PostItem},
  //Нам нужно удалить лист-итем, но т.к. посты в пропсах, их менять нельзя, поэтому
  //мы прокидываем событие remove из PostItem через PostList дальше по цепочку родителей
  props: {
    posts: {
      type: Array,
      required: true,
    }
  },
}
</script>

<style scoped>
.post-list-item {
  display: inline-block;
  margin-right: 10px;
}
.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.4s ease;
}
.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}
.post-list-move {
  transition: transform 0.4s ease;
}
</style>