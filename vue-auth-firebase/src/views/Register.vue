<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <h5 class="card-title text-center">Register</h5>
            <form class="form-signup" @submit.prevent="onSubmit">
              <div :class="{'form-error':$v.fullname.$error}" class="form-label-group">
                <input
                  type="text"
                  id="fullName"
                  class="form-control"
                  placeholder="Full Name"
                  @input="$v.fullname.$touch()"
                  v-model="fullname"
                />
                <label for="fullName">Full Name</label>
              </div>
              <div class="error" v-if="!$v.fullname.required">Field is required</div>
              <div
                class="error"
                v-if="!$v.fullname.minLength"
              >Name must have at least {{$v.fullname.$params.minLength.min}} letters.</div>
              <div :class="{'form-error':$v.role.$error}" class="form-label-group">
                <input
                  type="text"
                  id="role"
                  class="form-control"
                  placeholder="Apartment, studio, or floor"
                  @input="$v.role.$touch()"
                  v-model="role"
                />
                <label for="role">Designation</label>
              </div>
              <div class="error" v-if="!$v.role.required">Field is required</div>
              <div
                class="error"
                v-if="!$v.role.minLength"
              >Role must have at least {{$v.role.$params.minLength.min}} letters.</div>
              <div :class="{'form-error':$v.address.$error}" class="form-label-group">
                <input
                  type="text"
                  id="Address"
                  class="form-control"
                  placeholder="Apartment, studio, or floor"
                  @input="$v.address.$touch()"
                  v-model="address"
                />
                <label for="Address">Address</label>
              </div>
              <div class="error" v-if="!$v.address.required">Field is required</div>
              <div
                class="error"
                v-if="!$v.address.minLength"
              >Role must have at least {{$v.address.$params.minLength.min}} letters.</div>
              <div :class="{'form-error':$v.email.$error}" class="form-label-group">
                <input
                  type="email"
                  id="email"
                  class="form-control"
                  placeholder="Email address"
                  @input="$v.email.$touch()"
                  v-model="email"
                />
                <label for="email">Email address</label>
              </div>
              <div class="error" v-if="!$v.email.required">Field is required</div>
              <div class="error" v-if="!$v.email.email">Enter valid Email address</div>
              <div :class="{'form-error':$v.password.$error}" class="form-label-group">
                <input
                  type="password"
                  id="password"
                  name="password"
                  class="form-control"
                  placeholder="Password"
                  @input="$v.password.$touch()"
                  v-model="password"
                />
                <label for="password">Password</label>
              </div>
              <div class="error" v-if="!$v.password.required">Field is required</div>
              <div
                class="error"
                v-if="!$v.password.minLength"
              >Password must have at least {{$v.password.$params.minLength.min}} Characters.</div>
              <div :class="{'form-error':$v.confirmPassword.$error}" class="form-label-group">
                <input
                  type="password"
                  id="confirmPassword"
                  class="form-control"
                  name="confirmPassword"
                  placeholder="Repeat password"
                  @input="$v.confirmPassword.$touch()"
                  v-model="confirmPassword"
                />
                <label for="confirmPassword">Repeat password</label>
              </div>
              <div class="error" v-if="!$v.confirmPassword.required">Field is required</div>
              <div class="error" v-if="!$v.confirmPassword.sameAsPassword">Passwords must match</div>
              <button
                class="btn btn-lg btn-primary btn-block mt-2 text-uppercase"
                type="submit"
              >Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.card-signin {
  border: 0;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
}

.card-signin .card-title {
  margin-bottom: 2rem;
  font-weight: 300;
  font-size: 1.5rem;
}

.card-signin .card-body {
  padding: 2rem;
}

.form-signup {
  width: 100%;
}

.form-signup .btn {
  font-size: 80%;
  border-radius: 5rem;
  letter-spacing: 0.1rem;
  font-weight: bold;
  padding: 1rem;
  transition: all 0.2s;
}

.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}

.form-label-group input {
  height: auto;
  border-radius: 2rem;
}

.form-label-group > input,
.form-label-group > label {
  padding: 0.75rem 1.5rem;
}

.form-label-group > label {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  margin-bottom: 0;
  line-height: 1.5;
  color: #495057;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  transition: all 0.1s ease-in-out;
  text-align: left;
}

.form-label-group > label .form-label-group input::-webkit-input-placeholder {
  color: transparent;
}

.form-label-group input:-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-moz-placeholder {
  color: transparent;
}

.form-label-group input::placeholder {
  color: transparent;
}

.form-label-group input:not(:placeholder-shown) {
  padding-top: calc((0.75rem + 0.75rem) * (2 / 3));
  padding-bottom: calc(0.75rem / 3);
}

.form-label-group input:not(:placeholder-shown) ~ label {
  padding-top: calc(0.75rem / 3);
  padding-bottom: calc(0.75rem / 3);
  font-size: 12px;
  color: #777;
}

.btn-google {
  color: white;
  background-color: #ea4335;
}

.btn-facebook {
  color: white;
  background-color: #3b5998;
}

/* Validations
-------------------------------------------------- */

.form-error .form-control {
  border: 1px solid #f57f6c;
}

.error {
  color: #f57f6c;
  font-size: 0.75rem;
  line-height: 1;
  margin-left: 25px;
  margin-top: 0.1rem;
  margin-bottom: 0.9375rem;
  text-align: left;
  display: none;
}

.form-error + .error {
  display: block;
}
/* Fallback for Edge
-------------------------------------------------- */

@supports (-ms-ime-align: auto) {
  .form-label-group > label {
    display: none;
  }
  .form-label-group input::-ms-input-placeholder {
    color: #777;
  }
}

/* Fallback for IE
-------------------------------------------------- */

@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
  .form-label-group > label {
    display: none;
  }
  .form-label-group input:-ms-input-placeholder {
    color: #777;
  }
}
</style>
<script>
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
export default {
  name: "register",
  components: {},
  data() {
    return {
      fullname: "",
      role: "",
      address: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  },
  validations: {
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
    },
    password: {
      required,
      minLength: minLength(6)
    },
    confirmPassword: { required, sameAsPassword: sameAs("password") }
  },
  methods: {
    onSubmit() {
      const formData = {
        fullname: this.fullname,
        role: this.role,
        address: this.address,
        email: this.email,
        password: this.password
      };

      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      console.log("Register form data", formData);
      this.$store.dispatch("signup", formData);
    }
  }
};
</script>