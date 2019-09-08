<template>
  <!-- <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <p>{{email}}</p>
  </div>-->
  <div class="home page-content d-flex align-items-stretch">
    <!-- sidebar -->
    <app-sidebar></app-sidebar>
    <div class="content-inner">
      <router-view />
    </div>
  </div>
</template>
<style>
/******* Layout Content **************/
.content-inner {
    position: relative;
    width: calc(100% - 250px);
    min-height: calc(100vh - 70px);
    padding-bottom: 60px;
}
@media (max-width: 1199px) {
  .content-inner {
    width: 100%;
  }
  .content-inner.active {
    width: calc(100% - 90px);
  }
}

/********* Page Header ****************/
.page-header {
  background: #fff;
  padding: 20px;
  -webkit-box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 8;
  text-align: left;
  text-transform: capitalize;
}
/************** Card Styles ****************/
.card {
  background-color: #fff;
  border: 0 solid #eee;
  border-radius: 0;
  margin-bottom: 30px;
  -webkit-box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1),
    -1px 0 2px rgba(0, 0, 0, 0.05);
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1), -1px 0 2px rgba(0, 0, 0, 0.05);
}

.card-header {
  padding: 1rem 1.25rem;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  -webkit-box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.05);
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.05);
}

/* Form Control**/

.form-control {
  height: calc(2.25rem + 2px);
  border: 1px solid #dee2e6;
  border-radius: 0;
  padding: 0.375rem 0.75rem;
}

.form-control::-moz-placeholder {
  font-size: 0.9em;
  font-weight: 300;
  font-family: "Poppins", sans-serif;
  color: #aaa;
}

.form-control::-webkit-input-placeholder {
  font-size: 0.9em;
  font-weight: 300;
  font-family: "Poppins", sans-serif;
  color: #aaa;
}

.form-control:-ms-input-placeholder {
  font-size: 0.9em;
  font-weight: 300;
  font-family: "Poppins", sans-serif;
  color: #aaa;
}

.form-control:focus {
  color: #495057;
  background-color: #fff;
  border-color: #796aee;
  outline: none;
  -webkit-box-shadow: 0 0 0 0.2rem rgba(121, 106, 238, 0.25);
  box-shadow: 0 0 0 0.2rem rgba(121, 106, 238, 0.25);
}

.form-control-sm {
  height: calc(1.8125rem + 2px);
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
}

.form-control-lg {
  height: calc(2.875rem + 2px);
  padding: 0.5rem 1rem;
  font-size: 1.25rem;
  line-height: 1.5;
}

textarea.form-control {
  height: auto;
}

select.form-control[size],
select.form-control[multiple] {
  height: auto;
}

select.form-control option {
  color: #999;
}

.input-group .dropdown-menu {
  padding: 15px;
  color: #777;
  border-radius: 0;
}

.container-fluid {
    padding: 0 30px;
}
</style>
<script>
import sidebar from "../sidebar.vue";
export default {
  name: "Layout",
  components: { "app-sidebar": sidebar },
  computed: {},
   created(){
    this.$store.dispatch("fetchUser");
  }
};
</script>