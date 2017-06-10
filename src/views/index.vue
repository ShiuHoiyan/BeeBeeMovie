<template>
  <div id = "movies">
    <photoslider></photoslider>
    <div class="container">
      <hot></hot>
    </div>
  </div>
</template>


<script>
import hot from '../components/hot'
import photoslider from '../components/photoslider'
export default {
  name: 'movies',
  data() {
  	return {
  	}
  },
  components: {
    hot,
    photoslider
  }
}

</script>

<style scoped>

  a {
    text-decoration:none;
    color: #b9b9b9;
  }

  a:visited {
    color: #b9b9b9;
  }

  a:hover {
    color: white;
  }

</style>