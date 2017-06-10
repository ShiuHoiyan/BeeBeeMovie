<template>
  <div id="container">
    <moviedetail></moviedetail>
    <div class = "border"></div>
    <detailcinemaselector @getMovies="submit"></detailcinemaselector>
    <div class = "border"></div>

    <ul class="session-list">
      <li v-for="play in playlist" class="session-item">
            <div class="session-inner-box">
              <span class='time'>{{play.time}}</span>
              <span class='room'>{{play.room}}号厅</span>
              <span class='price'>{{play.price}}元</span>
            </div>
            
            <button class="btn book_btn" @click="book(play)">订座</button>
          </li>
    </ul>
      
  </div>
  	
</template>

<script>
import moviedetail from '../components/movie-detail'
import detailcinemaselector from '../components/film-detail-selector'
export default {
  components: {
    moviedetail,
    detailcinemaselector
  },
  data() {
    return {
      cinemaid: 0,
      cinemaname: '',
      playlist: [],
    }
  },
  methods: {
    submit: function(data) {
      this.cinemaid = data.cinema.id;
      this.cinemaname = data.cinema.name;
      this.$http.get(`movie/film/${this.$route.query.id}/${data.cinema.id}/${data.date}`)
        .then(res => {
          this.playlist = res.data;
        })
        .catch(e => {
          console.log(e);
        })
    },
    book: function(play) {
      this.$router.push(`/movie/seats/${play.id}/${this.$route.params.title}/${this.cinemaname}/${play.time}/${play.room}/${play.price}`);
    }
  }

}
</script>

<style scoped>


#container {
  position: relative;
  width: 1000px;
  margin: 0 auto;
}
.detail{
  padding-left: 200px;
  box-sizing:border-box;
  margin-top: 50px;
}
.detail-left{
  height: 274px;
  width: 200px;
  float: left;
  margin-left: -200px;
}
.detail-right{
  width: 100%;
  height: 274px;
  margin: 30px;
}
h1 {
  float: right;
  font-size: 24px;
  font-family: SimHei;
}
.movie-poster {
  height: 274px;
}
.content {
  color: grey;
  font-size: 8pt;
}
.label {
  font-size: 9pt;
  color: lightgrey;
}
.border {
  background-color: #ffeb3b;
  margin-top: 50px;
  margin-bottom: 50px;
  width: 1050px;
  height: 1px;
}

ul { 
  list-style-type: none;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
a {
  text-decoration: none;
}
.buyticket {
  font-size: 14pt;
  margin-left: 150px;
  font-weight: bold;
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
