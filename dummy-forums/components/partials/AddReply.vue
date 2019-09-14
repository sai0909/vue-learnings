<template>
	<div>
		<form method="POST" v-on:submit.prevent="addReply">
			<div class="panel panel-default">
				<div class="panel panel-header">
					<strong>Use any of these emotions: </strong>
					<ul class="emotion-list">
						<li v-for="(val, index) in emotionList" :key="index" v-html="val" @click="insertEmo">
							
						</li>
					</ul>
				</div>
	            <div class="panel panel-body">
	            	
	                	<textarea rows="3" name="reply" class="form-control" v-model="reply"></textarea>
	            </div>
	            <div class="panel panel-footer">
	            	<button type="submit" class="btn btn-success" :disabled="disabled()"><i v-show="isLoading" class="fa fa-refresh fa-lg fa-spin btn-load-indicator"></i> Add</button>	
	            </div>    
		    </div>
	    </form>
	</div>
</template>

<script>

	import api from '../../helper/api'

	export default {
		data() {
			return {
				isLoading: false,
				emotionList: [
					"&#x1F601;",
					"&#x1F602;",
					"&#x1F603;",
					"&#x1F605;",
					"&#x1F606;",
					"&#x1F609;",
					"&#x1F60A;",
					"&#x1F60B;",
					"&#x1F60C;",
					"&#x1F60D;",
					"&#x1F60F;",
					"&#x1F612;",
					"&#x1F613;",
					"&#x1F614;",
					"&#x1F616;",
					"&#x1F618;",
					"&#x1F61A;",
					"&#x1F61C;",
					"&#x1F61D;",
					"&#x1F61E;",
					"&#x1F620;",
					"&#x1F621;",
					"&#x1F622;",
					"&#x1F623;",
					"&#x1F624;",
					"&#x1F625;",
					"&#x1F628;",
					"&#x1F629;",
					"&#x1F62A;",
					"&#x1F62B;",
					"&#x1F62D;",
					"&#x1F630;",
					"&#x1F631;",
					"&#x1F632;",
					"&#x1F633;",
					"&#x1F635;",
					"&#x1F637;",
					"&#x1F638;",
					"&#x1F639;",
					"&#x1F63A;",
					"&#x1F63B;",
					"&#x1F63C;",
					"&#x1F63D;",
					"&#x1F63F;",
					"&#x1F640;",
					"&#x1F645;",
					"&#x1F646;",
					"&#x1F647;",
					"&#x1F648;"
				]
			}
		},
		computed: {
			reply: {
				get() {
					return this.$store.state.reply
				},
				set(value) {
					this.$store.commit('setReply', value)
				}
			}
		},
		methods: {
			disabled() {
				if(this.$store.state.reply == "") {
					return true
				} 

				return false
			},
			insertEmo(e) {
				let reply = this.$store.state.reply;

				reply += e.target.innerHTML;

				this.$store.commit('setReply', reply)
			},
			addReply() {
				var self = this;

				if(self.$store.state.reply != "") {

					self.isLoading = true

					api.addReply(self.$store.state.reply, self.$route.params.id, self.$store.state.currentUser.id)

					setTimeout(
						() => { 
							
							self.$store.commit('setReplies', [])

							// reload replies
							api.updateRepliesByTopicKey(self.$route.params.id, function(response) {

								self.$store.commit('addToReplies', response)

								self.isLoading = false
							});

							self.$store.commit('setReply', "")
					},
						1500
					)

				}
			}
		}
	}
</script>