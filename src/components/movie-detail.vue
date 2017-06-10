<template>
<div class="detail">
      <div class="detail-left">
        <img class="movie-poster"/>
      </div>

      <div class="detail-right">
        <h1>{{ movie.title }} {{ movie.original_title}}</h1>
        <p>
          <span class="label">评分: </span>
          <span class="content">{{movie.rating.average}}</span> 
        </p>
        <p>
          <span class="label">国家: </span>
          <span class="content">{{movie.countries.join('')}} ({{movie.year}})</span> 
        </p>
        <p>
          <span class="label">导演: </span>
          <span class="content"><a :href="dir.alt" v-for="dir of movie.directors">{{dir.name}}</a></span> 
        </p>
        <p>
          <span class="label">演员: </span>
          <span class="content"><a v-for="actor of movie.casts" :href="actor.alt">{{actor.name}} / </a></span> 
        </p>
        <p>
          <span class="label">简介: </span>
          <span class="content">{{movie.summary}}</span> 
        </p>
        
        </div>
   </div>
</template>

<script>
export default {
	name: 'moviedetail',
	data: function() {
		return {
			movie: {},
		}
	},
	created() {
	   this.getMovie(this.$route.params.title)
	},
	methods: {
		getMovie: function(title) {
	      let searchUrl = 'https://bird.ioliu.cn/v1/?url=http://api.douban.com/v2/movie/search?q='
	      this.$http.get(`${searchUrl}${title}`)
	        .then(res => {
	            let movieUrl = 'https://bird.ioliu.cn/v1/?url=http://api.douban.com/v2/movie/subject'
	            let movieId = res.data.subjects[0].id
	            if(!!movieId){
	              this.$http.get(`${movieUrl}/${movieId}`)
	              .then(res => {
	                if (!!res.data) {
	                  this.movie = res.data
	                  setTimeout(()=>{
	                    document.querySelector('.movie-poster').src = this.movie.images.large
	                  },0)
	                }
	              })
	              .catch(e => console.log(e))
	            }
	        })
	        .catch(e => console.log(e))
    	},
	}
}	
</script>

<style scoped>
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

a {
  text-decoration: none;
  color:#1456bd;
}
</style>