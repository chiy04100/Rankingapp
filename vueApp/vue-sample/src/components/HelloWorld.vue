<template>
  <div>
    <h2>POSTの一覧</h2>
    <table>
      <tbody>
        <tr v-for="post in posts" :key="post.id">
          <td>{{ post.id }}.</td>
          <td>{{ post.title }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      posts: [],
    };
  },
  mounted() {
    this.fetchPosts();
  },
  methods: {
    async fetchPosts() {
      try {
        const response = await axios.get('http://localhost:3000/posts');
        this.posts = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
