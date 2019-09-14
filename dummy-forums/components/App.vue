<template>
	<div class="container">
	<div class="row">
  		<section class="panel panel-success">
          
          <app-header></app-header>

          
          <router-view></router-view>
          
          
      </section>
          
  </div>
</div>
</template>

<script>

	import Header from './Header.vue';

	export default {
		components: {
			'app-header': Header
		}
	}
</script>