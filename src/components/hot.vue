<template>
  <div id = "hot">
    <h1>正在热映</h1>
  	<ul>
  		<li v-for="movie in movies">
  			<img :src="movie.poster">
  			<p class="movietitle">{{movie.name}}</p>
        <button @click="buyTicket(movie.name,movie.filmid)" class="btn buy_ticket">购票</button>
  		</li>
  	</ul>
  </div>
</template>

<script>
export default {
  name: 'hot',
  created: function(){
    this.getMovies();
  },
  data() {
    return {
      movies: [{
      	id: 0,
      	name: "海边的曼彻斯特"
      }
      ]
    }
  },
  methods: {
    getMovies() {
      this.$http.get('/movie/')
      .then(res => {
        console.log("获取成功");
        this.movies = res.data;

        this.movies.forEach(function(item){
          let posUrl = item.id;
          item.poster = require("../assets/poster/" + posUrl + ".jpg");
        });
      })
      .catch(e => {
        console.log("服务器异常！");
        console.log(e);
      })
    },
    buyTicket(title,id) {
      this.$router.push(`/movie/detail/${title}?id=${id}`);
    }
  }
}
</script>

<style scoped>
img {
	width: 10em;
}
ul {
	list-style-type: none;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

li {
  position: relative;
	border: 1px #ffff8c solid;
  padding: 20px;
  text-align: center;
  margin:10px;
  width: 150px;
  height: 290px;
}

.buy_ticket {
  position: absolute;
  right: 5px;
  bottom: 5px;
}

.movietitle {
  font-family: SimHei;
}

h1 {
  color: #ff8585;
  background-color: #ffff8c;
  margin-left: 0px;
  padding-left: 100px;
  padding-bottom: 5px;
  padding-top: 5px;
}
</style>