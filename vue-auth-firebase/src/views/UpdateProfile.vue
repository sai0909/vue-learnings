<template>
  <div>
    <header class="page-header">
      <div class="container-fluid">
        <h3 class="mb-0">Update profile</h3>
      </div>
    </header>
    <section class="user-profile">
      <div class="container-fluid">
        <div class="col-lg-6">
          <div class="card">
            <div class="card-header d-flex align-items-center">
              <h3 class="h4">Edit / Update Personal Information</h3>
            </div>
            <div class="card-body">
              <form @submit.prevent="updateProfile">
                <div class="form-group" :class="{ 'form-group--error': $v.loggedInUser.fullname.$error }">
                  <label class="form-control-label" for="fullName">Full Name</label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    id="fullName"
                    v-model="loggedInUser.fullname"
                    class="form-control"
                  />
                  <p>{{$v.fullname}}</p>
                </div>
                <div class="form-group" :class="{ 'form-group--error': $v.empcode.$error }">
                  <label class="form-control-label" for="empcode">Employee Code</label>
                  <input
                    type="text"
                    placeholder="Employee Code"
                    id="empcode"
                    v-model="empcode"
                    class="form-control"
                  />
                </div>
                <div class="form-group" :class="{ 'form-group--error': $v.loggedInUser.role.$error }">
                  <label for="role" class="form-control-label">Role</label>
                  <input
                    type="text"
                    id="role"
                    placeholder="Role"
                    class="form-control"
                    v-model="loggedInUser.role"
                  />
                </div>
                <div class="form-group" :class="{ 'form-group--error': $v.mobno.$error }">
                  <label for="mobno" class="form-control-label">Mobile No</label>
                  <input
                    type="text"
                    id="mobno"
                    placeholder="Mobile Number"
                    class="form-control"
                    v-model="mobno"
                  />
                </div>
               
                <div class="form-group" :class="{ 'form-group--error': $v.loggedInUser.address.$error }">
                  <label for="address" class="form-control-label">Address</label>
                  <input
                    id="address"
                    type="text"
                    placeholder="Password"
                    class="form-control"
                    v-model="loggedInUser.address"
                  />
                </div>
                <div class="form-group" :class="{ 'form-group--error': $v.loggedInUser.email.$error }">
                  <label id="email" class="form-control-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email Address"
                    class="form-control"
                    v-model="loggedInUser.email"
                  />
                </div>

                <div class="form-group">
                  <input type="submit" value="Update" class="btn btn-primary" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<style scoped>
.user-profile {
  padding: 50px 0;
}

.form-group--error input {
  border: 1px solid #f57f6c;
}

.form-group--error label {
  color: #f57f6c;
}
</style>
<script>

import {
  required,
  minLength,
  email,
 
} from "vuelidate/lib/validators";
export default {
  name: "UserProfile",
  data() {
    return {
      empcode: "",
      mobno: ""
    };
  },
  validations: {
    loggedInUser: {
      fullname: {
        required,
        minLength: minLength(4)
      },
      role: {
        required,
        minLength: minLength(3)
      },
      address: {
        required,
        minLength: minLength(8)
      },
      email: {
        required,
        email
      }
    },
    empcode: {
      required,
      minLength: minLength(3)
    },
    mobno: {
      required,
      minLength: minLength(10),
    
    }
  },
  computed: {
   
    loggedInUser: function() {

       return !this.$store.getters.users ? false : this.$store.getters.users;
     }
  },
  methods: {
    updateProfile: function() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      const formData = {
        fullname: this.loggedInUser.fullname,
        role: this.loggedInUser.role,
        address: this.loggedInUser.address,
        email: this.loggedInUser.email,
        password: this.loggedInUser.password,
        empcode: this.empcode,
        mobno: this.mobno
      };
      console.log("update profile data", formData);
       this.$store.dispatch("updateUser", formData);
    }
  },
  created() {
    this.$store.dispatch("fetchUser");
  }
};
</script>