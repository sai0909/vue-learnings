<template>
  <nav class="side-navbar">
    <!-- Sidebar Header-->
    <div class="sidebar-header d-flex align-items-center">
      <div class="avatar">
        <img
          src="https://d19m59y37dris4.cloudfront.net/admin/1-4-5/img/avatar-1.jpg"
          alt="..."
          class="img-fluid rounded-circle"
        />
      </div>
      <div class="title">
        <h6 class="text-capitalize" v-if="userinfo.email === checkLoginEmail">{{userinfo.fullname}}</h6>
        <p v-if="userinfo.email === checkLoginEmail">{{userinfo.role}}</p>
      </div>
    </div>
    <!-- Sidebar Navidation Menus-->
    <span class="heading">Main</span>

    <ul class="list-unstyled">
      <li>
        <router-link :to="{name: 'Dashboard'}" active-class="active">
          <i class="fa fa-tachometer" aria-hidden="true"></i> Dashboard
        </router-link>
      </li>
      <li>
        <router-link :to="{name: 'User-Profile'}" active-class="active">
          <i class="fa fa-user" aria-hidden="true"></i> Update Profile
        </router-link>
      </li>
      <li>
        <a href="#">
          <i class="icon-mail"></i>
        </a>
      </li>
      <li>
        <a href="#">
          <i class="icon-picture"></i>
        </a>
      </li>
    </ul>
  </nav>
</template>
<style scoped>
nav.side-navbar {
  background: #fff;
  min-width: 250px;
  max-width: 250px;
  color: #686a76;
  -webkit-box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
  z-index: 9;

}

nav.side-navbar a {
  color: inherit;
  position: relative;
  font-size: 0.9em;
}

nav.side-navbar a[data-toggle="collapse"]::before {
  content: "\f104";
  display: inline-block;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  font-family: "FontAwesome";
  position: absolute;
  top: 50%;
  right: 20px;
}

nav.side-navbar a[aria-expanded="true"] {
  background: #eef5f9;
}

nav.side-navbar a[aria-expanded="true"]::before {
  content: "\f107";
}

nav.side-navbar a i {
  font-size: 1.2em;
  margin-right: 10px;
  -webkit-transition: none;
  transition: none;
}

nav.side-navbar a .badge {
  vertical-align: middle;
}

nav.side-navbar .sidebar-header {
  padding: 30px 15px;
}

nav.side-navbar .avatar {
  width: 55px;
  height: 55px;
}

nav.side-navbar .title {
  margin-left: 10px;
}

nav.side-navbar .title h4 {
  color: #333;
}

nav.side-navbar .title h4:empty {
  height: 10px;
  margin: 10px;
  animation: pulse 1s infinite ease-in-out;
}

nav.side-navbar .title p:empty {
  height: 10px;
  margin: 10px;
  animation: pulse 1s infinite ease-in-out;
}

nav.side-navbar .title p {
  font-size: 0.9em;
  font-weight: 200;
  margin-bottom: 0;
  color: #aaa;
}

nav.side-navbar span.heading {
  text-transform: uppercase;
  font-weight: 400;
  margin-left: 20px;
  color: #ccc;
  font-size: 0.8em;
}

nav.side-navbar ul {
  padding: 15px 0;
}

nav.side-navbar ul li a {
  padding: 10px 15px;
  text-decoration: none;
  display: block;
  font-weight: 300;
  border-left: 4px solid transparent;
}

nav.side-navbar ul li a:hover {
  background: #796aee;
  border-left: 4px solid #3b25e6;
  color: #fff;
}

nav.side-navbar ul li li a {
  padding-left: 50px;
  background: #eef5f9;
}

nav.side-navbar ul li a.router-link-exact-active {
  background: #796aee;
  color: #fff;
  border-left: 4px solid #3b25e6;
}

nav.side-navbar ul li> a.router-link-exact-active:hover {
  background: #796aee;
}

nav.side-navbar ul li li > a.router-link-exact-active {
  background: #8e81f1;
}

nav.side-navbar ul li ul {
  padding: 0;
}

nav.side-navbar.shrinked {
  min-width: 90px;
  max-width: 90px;
  text-align: center;
}

nav.side-navbar.shrinked span.heading {
  margin: 0;
}

nav.side-navbar.shrinked ul li a {
  padding: 15px 2px;
  border: none;
  font-size: 0.8em;
  color: #aaa;
  -webkit-transition: color 0.3s, background 0.3s;
  transition: color 0.3s, background 0.3s;
  overflow: hidden;
  text-overflow: ellipsis;
}

nav.side-navbar.shrinked ul li a[data-toggle="collapse"]::before {
  content: "\f107";
  -webkit-transform: translateX(50%);
  transform: translateX(50%);
  position: absolute;
  top: auto;
  right: 50%;
  bottom: 0;
  left: auto;
}

nav.side-navbar.shrinked
  ul
  li
  a[data-toggle="collapse"][aria-expanded="true"]::before {
  content: "\f106";
}

nav.side-navbar.shrinked ul li a:hover {
  color: #fff;
  border: none;
}

nav.side-navbar.shrinked ul li a:hover i {
  color: #fff;
}

nav.side-navbar.shrinked ul li a i {
  margin-right: 0;
  margin-bottom: 2px;
  display: block;
  font-size: 1rem;
  color: #333;
  -webkit-transition: color 0.3s;
  transition: color 0.3s;
}

nav.side-navbar.shrinked ul li.active > a {
  color: #fff;
}

nav.side-navbar.shrinked ul li.active > a i {
  color: #fff;
}

nav.side-navbar.shrinked .sidebar-header .title {
  display: none;
}

@media (max-width: 1199px) {
  nav.side-navbar {
    margin-left: -90px;
    min-width: 90px;
    max-width: 90px;
    text-align: center;
    overflow: hidden;
  }
  nav.side-navbar span.heading {
    margin: 0;
  }
  nav.side-navbar ul li a {
    padding: 15px 2px;
    border: none;
    font-size: 0.8em;
    color: #aaa;
    -webkit-transition: color 0.3s, background 0.3s;
    transition: color 0.3s, background 0.3s;
  }
  nav.side-navbar ul li a[data-toggle="collapse"]::before {
    content: "\f107";
    -webkit-transform: translateX(50%);
    transform: translateX(50%);
    position: absolute;
    top: auto;
    right: 50%;
    bottom: 0;
    left: auto;
  }
  nav.side-navbar
    ul
    li
    a[data-toggle="collapse"][aria-expanded="true"]::before {
    content: "\f106";
  }
  nav.side-navbar ul li a:hover {
    color: #fff;
    border: none;
  }
  nav.side-navbar ul li a:hover i {
    color: #fff;
  }
  nav.side-navbar ul li a i {
    margin-right: 0;
    margin-bottom: 5px;
    display: block;
    font-size: 1.6em;
    color: #333;
    -webkit-transition: color 0.3s;
    transition: color 0.3s;
  }
  nav.side-navbar ul li.active > a {
    color: #fff;
  }
  nav.side-navbar ul li.active > a i {
    color: #fff;
  }
  nav.side-navbar .sidebar-header .title {
    display: none;
  }
  nav.side-navbar.shrinked {
    margin-left: 0;
  }
}
</style>
<script>
export default {
  data() {
    return {
      checkLoginEmail: this.$store.state.userEmail
    };
  },
  computed: {
    userinfo() {
      return !this.$store.getters.users ? false : this.$store.getters.users;
    }
  }
};
</script>