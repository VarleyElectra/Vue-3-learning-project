<template>
  <div>
    <h1>Страница с постами</h1>
    <my-input
        v-model="searchQuery"
        placeholder="Поиск...."
        v-focus
    />
    <div class="app__btns">
      <my-button @click="showDialog"
      >
        Создать пост
      </my-button>
      <my-select
          v-model="selectedSort"
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
<!--    <div v-intersection="fetching" class="observer"></div>-->
<!--    <div class="page__wrapper">-->
<!--      <div-->
<!--          v-for="pageNumber in totalPages"-->
<!--          :key="pageNumber"-->
<!--          class="page"-->
<!--          :class="{-->
<!--              'current-page': page === pageNumber-->
<!--            }"-->
<!--          @click="setPage(pageNumber)"-->
<!--      >-->
<!--        {{ pageNumber }}-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script>
import PostForm from "/src/components/PostForm";
import PostList from "/src/components/PostList";
import MyInput from "../components/UI/MyInput";
import MySelect from "../components/UI/MySelect";
import MyButton from "../components/UI/MyButton";
import {usePosts} from "/src/hooks/usePosts";
import useSortedPosts from "/src/hooks/useSortedPosts";
import useSortedAndSearchedPosts from "/src/hooks/useSortedAndSearchedPosts";

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
      sortOptions: [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По содержимому'},
      ]
    }
  },
  methods: {
    showDialog() {
      this.dialogVisible = true;
    },
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id);
    },
  },
  setup(props, context) {
    const {posts, totalPages, isPostsLoading} = usePosts(10);
    const {sortedPosts, selectedSort} = useSortedPosts(posts);
    const {searchQuery, sortedAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts);

    console.log('context', context);

    return {
      posts,
      totalPages,
      isPostsLoading,
      sortedPosts,
      selectedSort,
      searchQuery,
      sortedAndSearchedPosts,
    }
  }
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
  height: 30px;
  background: green;
}
</style>
