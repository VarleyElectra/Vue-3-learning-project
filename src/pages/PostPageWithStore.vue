<template>
  <div>
    <h1>{{$store.state.isAuth ? 'Пользователь авторизован' : 'Пользователь не авторизован'}}</h1>
    <h1>Лимит постов: {{limit}}</h1>
    <h1>Страница с постами</h1>
<!--    Работа с стором Vuex внутри разметки-->
<!--    <my-button @click="$store.commit('post/setSelectedSort', 'id')">-->
<!--      Тык-->
<!--    </my-button>-->
    <my-input
        :model-value="searchQuery"
        @update:model-value="setSearchQuery"
        placeholder="Поиск...."
        v-focus
    />
    <div class="app__btns">
      <my-button @click="showDialog">
        Создать пост
      </my-button>
      <my-select
          :model-value="selectedSort"
          @update:model-value="setSelectedSort"
          :options="sortOptions"
      />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form
          @create="createPost"
      />
    </my-dialog>
    <post-list
        :posts="sortedAndSearchedPosts"
        @remove="removePost"
        v-if="!isPostsLoading"
    />
    <div v-else>Идет загрузка...</div>
    <div v-intersection="loadMorePosts" class="observer"></div>
    <div class="page__wrapper">
      <div
          v-for="pageNumber in totalPages"
          :key="pageNumber"
          class="page"
          :class="{
              'current-page': page === pageNumber
            }"
          @click="setPage(pageNumber)"
      >
        {{ pageNumber }}
      </div>
    </div>
  </div>
</template>
<script>
import PostForm from "/src/components/PostForm";
import PostList from "/src/components/PostList";
import axios from 'axios';
import MyInput from "../components/UI/MyInput";
import MySelect from "../components/UI/MySelect";
import MyButton from "../components/UI/MyButton";
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

export default {
  components: {
    MyInput,
    MySelect,
    MyButton,
    PostList, PostForm
  },
  data() {
    return {
      dialogVisible: false,
    }
  },
  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort',
      setPosts: 'post/setPosts',
    }),
    ...mapActions({
      loadMorePosts: 'post/loadMorePosts',
      fetchPosts: 'post/fetchPosts'
    }),
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      let newPosts = this.posts.filter(p => p.id !== post.id)
      this.setPosts(newPosts);
    },
    showDialog() {
      this.dialogVisible = true;
    },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      isPostsLoading: state => state.post.isPostsLoading,
      selectedSort: state => state.post.selectedSort,
      searchQuery: state => state.post.searchQuery,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages,
      sortOptions: state => state.post.sortOptions
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
    })
  },
}
</script>

<style>

.app__btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}
.page__wrapper {
  display: flex;
  margin-top: 15px;
}
.page {
  border: 1px solid black;
  padding: 10px;
}
.current-page {
  border: 2px solid teal;
}

.observer {
  height: 40px;
}
</style>