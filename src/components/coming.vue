<template>
  <div id = "coming">
    <h1>即将上映</h1>
    <ul>
      <li v-for="movie in movies" @click="showDetail(movie.title, movie.filmId)">
        <img :src="movie.poster">
        <p class="movietitle">{{movie.title}}</p>
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
        filmId: 1,
        title: "海边的曼彻斯特",
      }
      ]
    }
  },
  methods: {
    getMovies() {
      this.$http.get('/movie/hot')
      .then(res => {
        console.log("获取成功");
        this.movies = res.data;

        this.movies.forEach(function(item){
          //let context = "../assets/poster/";
          let posUrl = item.filmId;
          item.poster = require("../assets/poster/" + posUrl + ".jpg");
        });
      })
      .catch(e => {
        console.log("服务器异常！");
        console.log(e);
      })
    },
    showDetail(title, id) {
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
  width: 220px;
  height: 300px;
}
.buy_ticket {
  position: absolute;
  right: 5px;
  bottom: 5px;
}

.movietitle {
  font-family: SimHei;
}
</style>