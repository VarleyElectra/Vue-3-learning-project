<template>
  <form @submit.prevent>
    <h4>Создание поста</h4>
    <my-input v-focus v-model="post.title" type="text" placeholder="Название"/>
    <my-input v-model="post.body" type="text" placeholder="Описание"/>
    <my-button @click="createPost" style="align-self: flex-end; margin-top: 15px">
      Создать
    </my-button>
  </form>
</template>

<script>
import MyButton from "@/components/UI/MyButton";
import MyInput from "@/components/UI/MyInput";
export default {
  //Попробовать убрать импорт компонентов
  components: {MyInput, MyButton},
  data() {
    return {
      post: {
        title: '',
        body: ''
      }
    }
  },

  methods: {
    createPost() {
      this.post.id = Date.now()
      //Генерация события в дочернем компоненте, чтобы передать данные в родительский компонент
      this.$emit('create', this.post)
      this.post = {
        title: '',
        body: ''
      }
    },
  },

  // watch: {
  //Отслеживание(глубокое) для поста
  //   post: {
  //     handler(newVal) {
  //       console.log(newVal)
  //     },
  //     deep: true,
  //   }
  // }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
</style>