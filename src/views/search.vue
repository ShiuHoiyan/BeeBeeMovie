<template>
  <div id="search">
    <h1>搜索结果</h1>
    <div></div>
  </div>

</template>


<script>
export default {
  name: 'search',
	data() {
    return {
      search_str: this.$route.params.str
    }
	},
	created() {
    	this.search(this.search_str);
  },
  methods: {
  		search: function(str) {
  			console.log(str);
  		}
  	}
}
</script>

<style scoped>
	
</style>