<template>
  <div>
    <Navber></Navber>
    <div class="container-fluid">
      <div class="row">
        <Sidebar></Sidebar>
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
  import Sidebar from './Sidebar.vue';
  import Navber from './Navber.vue';

  export default {
    components: {
      Sidebar,
      Navber,
    },
    created() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      this.$http.defaults.headers.common.Authorization = `${token}`;
    },
  }
</script>  