<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link>|
    <router-link to="/login">Login</router-link>|
    <router-link to="/register">Register</router-link>
  </div>-->
  <nav id="navbar" class="navbar">
    <div class="container-fluid">
      <div class="navbar-holder d-flex align-items-center justify-content-between">
        <div class="navbar-header">
          <!-- Navbar Brand -->
          <a href="index.html" class="navbar-brand d-none d-sm-inline-block">
            <div class="brand-text d-none d-lg-inline-block">
              <strong>LOGO</strong>
            </div>
            <div class="brand-text d-none d-sm-inline-block d-lg-none">
              <strong>LOGO</strong>
            </div>
          </a>
          <!-- Toggle Button-->
          <a id="toggle-btn" href="#" class="menu-btn active">
            <span></span>
            <span></span>
            <span></span>
          </a>
        </div>
        <ul class="nav-menu list-unstyled d-flex flex-md-row align-items-md-center">
            <li class="nav-item">
            <router-link class="nav-link " to="/">
              <span class="d-none d-sm-inline">Home</span>
            </router-link>
           
          </li>
          <li v-if="!auth" class="nav-item">
            <router-link class="nav-link" to="/login">
              <span class="d-none d-sm-inline">Login</span>
            </router-link>
          </li>
          <li v-if="!auth" class="nav-item">
            <router-link class="nav-link" to="/register">
              <span class="d-none d-sm-inline">Register</span>
            </router-link>
          </li>
          <!-- Login    -->
          <li v-if="auth" class="nav-item">
            <a class="nav-link btn btn-danger logout" @click="logout">
              <span class="d-none d-sm-inline">Logout</span>
              <i class="fa fa-sign-out"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<style scoped>
nav.navbar {
  background: #1c1f25;
  padding-top: 15px;
  padding-bottom: 15px;
  color: #fff;
  position: relative;
  border-radius: 0;
  -webkit-box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
  z-index: 10;
  padding-left: 0;
  padding-right: 0;
}

nav.navbar .badge {
  width: 22px;
  height: 22px;
  line-height: 22px;
  text-align: center;
  padding: 0;
  border-radius: 50%;
}

nav.navbar .navbar-holder {
  width: 100%;
}

nav.navbar a {
  color: inherit;
}

nav.navbar .container-fluid {
  width: 100%;
}

nav.navbar .menu-btn {
  margin-right: 20px;
  font-size: 1.2em;
  -webkit-transition: all 0.7s;
  transition: all 0.7s;
  display: inline-block;
}

nav.navbar .menu-btn span {
  width: 20px;
  height: 2px;
  background: #fff;
  display: block;
  margin: 4px auto 0;
  -webkit-transition: all 0.3s cubic-bezier(0.81, -0.33, 0.345, 1.375);
  transition: all 0.3s cubic-bezier(0.81, -0.33, 0.345, 1.375);
}

nav.navbar .menu-btn span:nth-of-type(2) {
  position: relative;
  width: 35px;
  -webkit-transform: rotateY(180deg);
  transform: rotateY(180deg);
}

nav.navbar .menu-btn span:nth-of-type(2)::before,
nav.navbar .menu-btn span:nth-of-type(2)::after {
  content: "";
  width: 6px;
  height: 2px;
  display: block;
  background: #fff;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  position: absolute;
  top: 2px;
  left: 0;
  -webkit-transition: all 0.7s;
  transition: all 0.7s;
}

nav.navbar .menu-btn span:nth-of-type(2)::after {
  -webkit-transform: rotate(145deg);
  transform: rotate(145deg);
  position: absolute;
  top: -2px;
  left: 0;
}

nav.navbar .menu-btn.active span:first-of-type {
  -webkit-transform: translateY(12px);
  transform: translateY(12px);
}

nav.navbar .menu-btn.active span:nth-of-type(2) {
  -webkit-transform: none;
  transform: none;
}

nav.navbar .menu-btn.active span:last-of-type {
  -webkit-transform: translateY(-12px);
  transform: translateY(-12px);
}

nav.navbar .nav-link {
  position: relative;
}

nav.navbar .nav-link span.badge-corner {
  position: absolute;
  top: 0;
  right: 0;
  font-weight: 400;
  font-size: 0.7em;
}

nav.navbar .nav-link.language span {
  margin-left: 0.3rem;
  vertical-align: middle;
}

nav.navbar .nav-link.logout i {
  margin-left: 10px;
}

nav.navbar .nav-menu {
  margin-bottom: 0;
}

nav.navbar .search-box {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  padding: 0;
  background: #fff;
  z-index: 12;
  border-radius: 0;
  display: none;
}

nav.navbar .search-box .dismiss {
  position: absolute;
  top: 50%;
  right: 20px;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5em;
  color: #999;
}

nav.navbar .search-box form {
  height: 100%;
}

nav.navbar .search-box form input {
  height: 100%;
  border: none;
  padding: 20px;
}

nav.navbar .dropdown-toggle::after {
  border: none !important;
  content: "\f107";
  vertical-align: baseline;
  font-family: "FontAwesome";
  margin-left: 0.3rem;
}

nav.navbar .dropdown-menu {
  right: 0;
  min-width: 250px;
  left: auto;
  margin-top: 15px;
  margin-bottom: 0;
  padding: 15px 0;
  max-width: 400px;
  border-radius: 0;
  border: none;
  -webkit-box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1),
    -2px 0 2px rgba(0, 0, 0, 0.1);
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1), -2px 0 2px rgba(0, 0, 0, 0.1);
}

nav.navbar .dropdown-menu .dropdown-item {
  background: #fff;
  padding: 10px 20px;
  font-size: 0.8rem;
  color: #777;
  width: 100%;
}

nav.navbar .dropdown-menu .dropdown-item:hover {
  background: #f5f5f5;
}

nav.navbar .dropdown-menu .dropdown-item i {
  width: 30px;
  height: 30px;
  line-height: 30px;
  background: #796aee;
  text-align: center;
  color: #fff;
  border-radius: 50%;
  margin-right: 10px;
}

nav.navbar .dropdown-menu .dropdown-item small {
  margin-left: 40px;
}

nav.navbar .dropdown-menu span {
  position: static;
  font-size: 0.9em;
  color: #999;
}

nav.navbar .dropdown-menu strong {
  font-weight: 700;
}

nav.navbar .dropdown-menu .msg-profile {
  width: 45px;
  height: 45px;
  margin-right: 10px;
}

nav.navbar .dropdown-menu h3 {
  font-weight: 500;
}

@media (max-width: 1199px) {
  nav.navbar .menu-btn {
    margin-right: 20px;
    font-size: 1.2em;
    -webkit-transition: all 0.7s;
    transition: all 0.7s;
  }
  nav.navbar .menu-btn span:first-of-type {
    -webkit-transform: translateY(12px);
    transform: translateY(12px);
  }
  nav.navbar .menu-btn span:nth-of-type(2) {
    -webkit-transform: none;
    transform: none;
  }
  nav.navbar .menu-btn span:nth-of-type(2)::before,
  nav.navbar .menu-btn span:nth-of-type(2)::after {
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  nav.navbar .menu-btn span:nth-of-type(2)::after {
    -webkit-transform: rotate(145deg);
    transform: rotate(145deg);
    position: absolute;
    top: -2px;
    left: 0;
  }
  nav.navbar .menu-btn span:last-of-type {
    -webkit-transform: translateY(-12px);
    transform: translateY(-12px);
  }
  nav.navbar .menu-btn.active span:first-of-type {
    -webkit-transform: none;
    transform: none;
  }
  nav.navbar .menu-btn.active span:nth-of-type(2) {
    -webkit-transform: rotateY(180deg);
    transform: rotateY(180deg);
  }
  nav.navbar .menu-btn.active span:last-of-type {
    -webkit-transform: none;
    transform: none;
  }
}

@media (max-width: 575px) {
  nav.navbar {
    font-size: 14px;
  }
  nav.navbar .badge {
    width: 19px;
    height: 19px;
  }
  nav.navbar .nav-item > a {
    font-size: 13px;
  }

nav.navbar .nav-item {
    cursor: pointer;
  }

  nav.navbar .dropdown {
    position: static;
  }
  nav.navbar .dropdown-menu {
    width: 90vw;
    right: 2.5vw;
    left: 2.5vw;
    margin: 0 auto;
  }
}
</style>
<script>
export default {
    computed:{
        auth(){
            return this.$store.getters.isAuthenticated;
        }
    },
    methods:{
        logout:function(){
            this.$store.dispatch('logout');
        }
    }

};
</script>