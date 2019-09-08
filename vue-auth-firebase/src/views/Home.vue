<template>
  <div>
    <header class="page-header">
      <div class="container-fluid">
        <h3 class="mb-0">Dashboard</h3>
      </div>
    </header>
    <section class="dashboard">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-6">
            <div class="card emp-info">
              <div class="card-body">
                <div class="item d-flex align-items-center">
                  <div class="image">
                    <img
                      src="https://d19m59y37dris4.cloudfront.net/admin/1-4-5/img/avatar-1.jpg"
                      alt="..."
                      class="img-fluid rounded-circle"
                    />
                  </div>
                  <div class="text">
                    <a href="#">
                      <h3 class="h5">{{loggeduserinfo.fullname}}</h3>
                    </a>
                    <small>{{loggeduserinfo.role}}</small>
                  </div>
                </div>

                <hr>
                <div class="mt-3 mb-3">
                  <h6>Personal Information</h6>
                </div>
                <div class="user-content">
                  <label class="form-control-label">Employee Code</label>
                  <div class="empcode">{{loggeduserinfo.empcode}}</div>
                </div>
                <div class="user-content">
                  <label class="form-control-label">Email</label>
                  <div class="email">{{loggeduserinfo.email}}</div>
                </div>
                <div class="user-content">
                   <label class="form-control-label">Mobile Number</label>
                  <div class="mobno">{{loggeduserinfo.mobno}}</div>
                </div>
                <div class="user-content">
                   <label class="form-control-label">Address</label>
                  <div class="address">{{loggeduserinfo.address}}</div>
                </div>
                
                
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<style scoped>
.dashboard {
  padding: 50px 0px;
}

.emp-info .item .image {
  min-width: 70px;
  max-width: 70px;
  height: 70px;
  margin-right: 15px;
}

.emp-info .text a {
  text-decoration: none !important;
  display: block;
  margin-bottom: 0;
  color: #555;
}

.emp-info .text a h3 {
  text-transform: capitalize;
}

.user-content{
  font-size: 0.9em;
  display:flex;
}

.user-content label{
  width:30%;
}
.user-content div{
  width:50%;
}
</style>
<script>
export default {
  name: "Dashboard",
  data() {
    return {
      checkLoginEmail: this.$store.state.userEmail
    };
  },
  computed: {
    loggeduserinfo: function() {
     
       return !this.$store.getters.users ? false : this.$store.getters.users;
    }
  },
   created(){
    this.$store.dispatch("fetchUser");
  }
  
};
</script>
