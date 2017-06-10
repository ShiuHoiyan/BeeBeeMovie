<template>
  <div id = "cinema">
    <h1>请选择影院</h1>
    <cinemaselector @getMovies="submit"></cinemaselector>

    <div class="movies">
      <ul class="movies-list">
        <li v-for="movie in movies" class="movie-item">
          <div class="movie-left-part">
            <img :src="movie.poster">
            <p class="movietitle">{{movie.name}}</p>
          </div>
          
          <ul class="session-list">
            <li v-for="session in movie.playlists" class="session-item">
              <div class="session-inner-box">
                <span class='time'>{{session.time}}</span>
                <span class='room'>{{session.room}}号厅</span>
                <span class='price'>{{session.price}}元</span>
              </div>
              
              <button class="btn book_btn" @click="book(session, movie.name)">订座</button>
            </li>
          </ul>
      </li>
      </ul>
    </div>
  </div>
</template>



<script>
import cinemaselector from '../components/cinema-selector'
export default {
  name: 'cinema',
  components: {
    cinemaselector
  },
  data() {
  	return {
      cinemaid: 0,
      cinemaname: '',
  		movies: [],
  	}
  },

  methods: {
    submit: function(data) {
      this.cinemaid = data.cinema.id.toString();
      this.cinemaname = data.cinema.name;
      const query = 'date=' + data.date;
      this.$http.get(`movie/cinema/${data.cinema.id}?`+ query)
        .then(res => {
          console.log("获取电影场次成功");
          this.movies = res.data;
          this.movies.forEach(function(item){
            let posUrl = item.filmid;
            item.poster = require("../assets/poster/" + posUrl + ".jpg");
          });
        })
        .catch(e => {
          console.log(e);
        })
    },
    book: function(play,name) {
      this.$router.push(`/movie/seats/${play.id}/${name}/${this.cinemaname}/${play.time}/${play.room}/${play.price}`);
    }
  }
}
</script>

<style scoped>
#cinema {
  width: 1000px;
  margin: 0 auto;
}

.select-line {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}


ul { 
  list-style-type: none;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.movie-list {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.movie-item {
  position: relative;
  border: 1px #ffff8c solid;
  padding: 20px;
  text-align: center;
  width: 100%;
  margin:10px;
}
.movie-left-part {
  float: left;
}
img {
  width: 160px;
}

.buy_ticket {
  position: absolute;
  right: 5px;
  bottom: 5px;
}

select {
  margin-right: 50px;
}
.session-list {
  display: flex;
  flex-direction:column;
  justify-content:space-around;
}
.session-item {
  padding: 5px;
  border-bottom: 1px dotted #ffff8c;
  position: relative;
}
.session-item:last-child {
  border-bottom: none;
}
.book_btn {
  float: right;
  display: block;
}
.price {
  float:  right;
  font-size: 18pt;
  color:  #ff8585;
}
.session-inner-box{
  display: flex;
  justify-content: space-around;
  margin-bottom: 5px;
}
.room{
  font-size: 10pt;
  color: lightgrey;
}
</style>

