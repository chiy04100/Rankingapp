<template>
  <div class="container">
    <h1 class="mt-4">サインイン</h1>
    <form @submit="handleSignin">
      <div class="mb-3">
        <label for="username" class="form-label">ユーザー名</label>
        <input
          type="text"
          class="form-control"
          id="username"
          v-model="username"
        />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">メールアドレス</label>
        <input
          type="email"
          class="form-control"
          id="email"
          v-model="email"
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">パスワード</label>
        <input
          type="password"
          class="form-control"
          id="password"
          v-model="password"
        />
      </div>
      <button type="submit" class="btn btn-primary">サインイン</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import router from 'vue-router';

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
    };
  },
  methods: {
    async handleSignin(event) {
      event.preventDefault();
      try {
        const response = await axios.post('http://localhost:3000/users', {
          user: {
            username: this.username,
            email: this.email,
            password: this.password,
          },
        });
        router.push('/');
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
