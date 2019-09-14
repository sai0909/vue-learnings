import 'babel-polyfill';
import Vue from 'vue';
import VueRouter from 'vue-router';
import { routes } from './routes';
import store from './store';

import App from './components/App.vue';

Vue.use(VueRouter);

let router = new VueRouter({
	mode: 'hash',
	routes,
	store
});
console.log('Entry points')
const app = new Vue({
	el: "#app",
	data() {
		return {}
	},
	components: { App },
	router,
	store,
	created: function() {
		document.getElementById("loading").style.display = "block";
	},
	mounted: function() {
	
		// load home forum data
		if(this.$route.name != "Home" && this.$route.name != "ForumDisplay") {

			document.getElementById("loading").style.display = "none"	
	    } 

	    // check for current user if he is still login
	    store.dispatch('getCurrentUser')

	    // if user is already login then load user forums
	    setTimeout(
	    		() => {
	    			if(store.state.currentUser.status == 1) {
	    				store.dispatch('getUserForums', store.state.currentUser);
	    			}
	    		}, 
	    		2000
	    	)
	},
	updated: function() {
		
	}
});