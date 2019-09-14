<template>
	<div>
		<section class="row panel-body">
			<div class="col-md-12">
				<form method="post" class="form-inline" v-on:submit.prevent="login">

					<div class="alert alert-danger" v-if="this.errors.length > 0">
						<ul>
							<li v-for="(error, index) in this.errors" :key="index">{{ error }}</li>
						</ul>
					</div>

					<div class="form-group">
		    			<label for="email">Email address</label>
		    			<input type="email" class="form-control" id="email" placeholder="Email" v-model="email">
		  			</div>
		  			<div class="form-group">
		  				<label for="password">Password</label>
		  				<input type="password" name="password" class="form-control" placeholder="Password" v-model="password">
		  			</div>

		  			<button type="submit" class="btn btn-success" v-on:keydown.enter.prevent="login"><i v-show="isLoading" class="fa fa-refresh fa-lg fa-spin btn-load-indicator"></i> Sign in</button>
				</form>
			</div>
		</section>
	</div>
</template>

<script>
	
	import api from '../../helper/api'

	export default {
		data() {
			return {
				isLoading: false,
				errors: []
			}
		},
		computed: {
			email: {
				get() {
					return this.$store.state.auth.email
				},
				set(value) {
					this.$store.commit('setAuthEmail', value)
				}
			},
			password: {
				get() {
					return this.$store.state.auth.password
				}, 
				set(value) {
					this.$store.commit('setAuthPassword', value)
				}
			}
		},
		methods: {
			login()
			{
				var self = this;

				this.errors = [];

				if(this.$store.state.auth.email == "") {
					this.errors.push('Email address required');
				}

				if(this.$store.state.auth.password == "") {
					this.errors.push('Password required');
				}

				if(this.$store.state.auth.email !="" && !this.validateEmail(this.$store.state.auth.email)) {
					this.errors.push('Invalid email address');
				}

				if(this.$store.state.auth.password !="" && this.$store.state.auth.password.length < 6) {
					this.errors.push('Password must be at least 6 characters long');
				}

				if(this.errors.length > 0) {

					return false;
				}

				this.isLoading = true;

				// if everthing ok authenticate
				api.authenticate(this.$store.state.auth.email, this.$store.state.auth.password, function(user) {

							api.getUserByUID(user.user.uid, function(key, val) {
								
								self.isLoading = false;
								
								if(key != null && val != null) {
									
								
									// save these info into store
									self.$store.commit('setCurrUserId', key);
									self.$store.commit('setCurrUserName', user.user.displayName);
									self.$store.commit('setCurrUserEmail', user.user.email);
									self.$store.commit('setCurrUserUid', user.user.uid);
									self.$store.commit('setCurrUserStatus', 1);

									// load user forums
									api.userForums(user.user.uid, function(response) {
										self.$store.commit('setUserForums', response);
									});

									self.$router.push('/');
								} else {
									alert("Incomplete user info! try creating account with a different email");
								}
							});
				}, function(error) {

					alert(error.message)
				})

			},
			validateEmail(email) {
 			   var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    			return re.test(String(email).toLowerCase());
			}
		}
	}

</script>