<template>
  <div>
    <h1 class="ap bebra tutut">Страница с постами</h1>
    <my-input v-focus v-model="searchQuery" placeholder="Поиск...">

    </my-input>
    <div class="app__btns">
      <my-button @click="showDialog">Создать пост</my-button>
      <my-select v-model="selectedSort" :options="sortOptions">

      </my-select>
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost"/>
    </my-dialog>
    <post-list :posts="sortedAndSearchedPosts" @remove="removePost" v-if="!isPostsLoading"/>
    <div v-else>Идёт загрузка...</div>
    <div v-intersection="loadMorePosts" class="observer" ref="observer">

    </div>
    <!--    <div class="page__wrapper">-->
    <!--      <div v-for="pageNumber in totalPages" :key="pageNumber" class="page" :class="{-->
    <!--        'current-page': page === pageNumber-->
    <!--      }"-->
    <!--      @click="changePage(pageNumber)"-->
    <!--      >-->
    <!--        {{pageNumber}}-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import axios from "axios";
export default {
  components: {
    PostList, PostForm
  },
  name: "App",
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostsLoading: false,
      selectedSort: '',
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По описанию'},
        {value: 'id', name: 'По ID'},
      ]
    }
  },

  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },

    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id)
    },

    showDialog() {
      this.dialogVisible = true;
    },

    async fetchPosts() {
      try {
        this.isPostsLoading = true;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        })
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = response.data;
        this.isPostsLoading = false;
      } catch (e) {
        alert('Ошибка');
      }
    },

    async loadMorePosts() {
      try {
        this.page += 1;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        })
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = [...this.posts, ...response.data];
      } catch (e) {
        alert('Ошибка');
      }
    },

    // changePage(pageNumber) {
    //   this.page = pageNumber;
    // }
  },

  mounted() {
    this.fetchPosts();

    // с помощью ref в DOM элементе мы можем получать ссылку на DOM-элементы
    // через свойство this.$refs.elementRefName
    // console.log(this.$refs.observer)
    // const options = {
    //   rootMargin: '0px',
    //   threshold: 1.0
    // }
    // const callback = (entries, observer) => {
    //   //entries[0] - Элемент, который мы пересекли
    //   if (entries[0].isIntersecting && this.page < this.totalPages) {
    //     this.loadMorePosts()
    //   }
    // };
    // const observer = new IntersectionObserver(callback, options);
    // //Следим за элементом внизу экрана, при пересечении которого, отрабатывает коллбэк
    // observer.observe(this.$refs.observer);
  },

  watch: {
    // selectedSort(newValue) {
    //   this.posts.sort((post1, post2) => {
    //     return newValue === 'id'
    //     ? post1[newValue] - post2[newValue]
    //     : post1[newValue]?.localeCompare(post2[newValue])
    //   })
    // }

    // page() {
    //   this.fetchPosts();
    // }
  },

  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => {
        return this.selectedSort === 'id'
            ? post1[this.selectedSort] - post2[this.selectedSort]
            : post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      })
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
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

}

</style>