<template>
  <div>
    <header class="header-main">
      <nav>
        <router-link to="/" class="logo" rel="home"><span>wp generator</span></router-link>
        <div class="nav-toggle"></div>

        <ul class="inline">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/about">About</router-link></li>
          <li><router-link to="/restapi">Rest API</router-link></li>
          <li>
            <a href="https://github.com/kapilpaul/wp-generator" target="_blank">GitHub</a>
          </li>
        </ul>
      </nav>
    </header>

    <main>
      <router-view />
    </main>

    <footer class="footer-main bg-light">
      <p class="copyright">
        <span>Made with ❤️ by </span>
        <a href="https://kapilpaul.me/" target="_blank">Kapil Paul</a>
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  mounted() {
    this.mobileMenuToggle();
  },
  methods: {
    mobileMenuToggle() {
      const toggle = document.querySelector(".nav-toggle");
      if (toggle) {
        toggle.addEventListener("click", () => {
          document.body.classList.toggle("no-scroll");
          document.querySelector(".header-main").classList.toggle("active");
        });
      }
    },
  },
};
</script>

<style scoped>
</style>
