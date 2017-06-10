<template>
	<div id="cinemalist">
		<ul>
			<li ></li>
		</ul>
	</div>
</template>
<script>
	export default {
		name:"cinemalist",
		created() {
    		this.getCinemas(this.$route.params.title);
  		},
  		methods: {
  			getCinemas:function(title) {
  				this.$http.post()
  			}
  		}
	}
</script>

<style>
	
</style>