<template>
  <!-- <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <p>{{email}}</p>
  </div> -->
  <div class="home page-content d-flex align-items-stretch">
    <!-- sidebar -->
    <app-sidebar></app-sidebar>
    <div class="content-inner">
      <header class="page-header">
            <div class="container-fluid">
              <h3 class="mb-0">{{this.$options.name}}</h3>
            </div>
          </header>
    </div>
  </div>
</template>
<style scoped>
.content-inner {
    position: relative;
    margin-left: 250px;
    padding-bottom: 60px;
    width: 100%;
}
.page-header {
	background: #fff;
	padding: 20px;
	-webkit-box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
	box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
	position: relative;
	z-index: 8;
  text-align:left ;
  text-transform: capitalize;
}
</style>
<script>
import sidebar from '../components/sidebar.vue'
export default {
  name: "dashboard",
  components: {'app-sidebar':sidebar},
  computed: {
  },
  created(){
    this.$store.dispatch('fetchUser');
  }
};
</script>
