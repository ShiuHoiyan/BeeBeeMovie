<template>
  <div id = "movies">
    <h1>请选择电影</h1>
    <div class="select-bar">

      <div class="type">
        <label>类型 - - - - </label>
        <ul class="select-line">
          <li v-for = "item in types" class="select-item" @click="submitType($event, item.id)">{{item.type}}</li>
        </ul>
      </div>
        
      <div class="area">
        <label>区域 - - - - </label>
        <ul class="select-line">
          <li v-for= "item in areas" class="select-item" @click="submitArea($event, item.id)">{{item.area}}</li>
        </ul>
      </div>

      <div class="sort-bar">
        <label>排序顺序     </label>
        <select v-model="sortSelect">
          <option v-for="sort in sorts" class="select-item">{{sort}}</option>
        </select>
      </div>
    </div>

    <div class="container">
    <ul class="movie-list">
      <li class="movie-item" v-for="movie in movies">
        <img :src="movie.poster">
        <p class="movietitle">{{movie.name}}</p>
        <button @click="buyTicket(movie.name,movie.id)" class="btn buy_ticket">购票</button>
      </li>
    </ul>

    </div>
  </div>
</template>


<script>
export default {
  name: 'movies',
  data() {
  	return {
  		username:" ",
      types:[{
        type: '全部',
        id: -1,
      },{
        type: '爱情',
        id: 0,
      }, {
        type: '喜剧',
        id: 1,
      }, {
        type: '冒险',
        id: 2,
      }, {
        type: '恐怖',
        id: 3,
      }, {
        type: '动作',
        id: 4,
      }, {
        type: '其他',
        id: 5,
      }],
      areas: [{
        area:'全部',
        id: -1,
      }, {
        area:'大陆',
        id: 0,
      }, {
        area: '美国',
        id: 1,
      }, {
        area: '日本',
        id: 2,
      }, {
        area: '其他',
        id: 3,
      }],
      sorts: ["热门","时间","评价"],
      selected: {
        type: -1,
        area: -1,
        shortId: 1,
      },
      sortSelect: '热门',
      sortSelectId: 1,
      movies: []
  	}
  },
  watch: {
    sortSelect: function(val) {
      if (val == '热门') {
        this.sortSelectId = 1;
      } else if (val == '时间') {
        this.sortSelectId = 2;
      } else if (val == '评价') {
        this.sortSelectId = 3;
      }
    },
    sortSelectId: function(){
      this.submit();
    }
  },
  created: function(){
    this.init();
  },
  methods: {
    init: function(){
      this.$http.get('movie/film')
        .then(res => {
          console.log("获取电影成功");
          this.movies = res.data;
          this.movies.forEach(function(item){
            let posUrl = item.id;
            item.poster = require("../assets/poster/" + posUrl + ".jpg");
          });
        })
        .catch(e => {
          console.log(e);
        })
    },
    submitType: function(e, type) {
      this.select(e);
      this.selected.type = type;
      this.submit();
    },
    select: function(e) {
      let target = e.target;
      let children = target.parentNode.children;
      for(var i = 0; i < children.length; i++) {
        var classnames = children[i].className.split(' ');
        var pos = classnames.indexOf('selected');
        if (pos != -1) {
          classnames.splice(pos, 1);
          children[i].className = classnames.join(' ');
        }
      }
      var tClassnames = target.className.split(' ');
      tClassnames.push('selected');
      target.className = tClassnames.join(' ');
    },
    submitArea: function(e, area) {
      this.select(e);
      this.selected.area = area;
      this.submit();
    },
    submit: function() {
      let query = '';
      if (this.selected.type != -1) {
        query = query + 'showtypeid=' + this.selected.type + '&';
      }
      if (this.selected.area != -1) {
        query = query + 'areaid=' + this.selected.area + '&';
      }
      query = query + 'sortid=' + this.sortSelectId;
      this.$http.get('movie/film?' + query)
        .then(res => {
          this.movies = res.data;
          console.log(this.movies);
          this.movies.forEach(function(item){
            let posUrl = item.id;
            item.poster = require("../assets/poster/" + posUrl + ".jpg");
          });
        })
        .catch(e => {
          console.log(e);
        })
    },
    buyTicket: function(title,id){
      this.$router.push(`/movie/detail/${title}?id=${id}`);
    }
  }
}

</script>

<style scoped>
img {
  width: 10em;
}
label {
  color: #ff8585;
}
#movies {
  width: 1000px;
  margin: 20px auto;
}
.select-line {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.movie-list {
  list-style-type: none;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.movie-item {
  position: relative;
  border: 1px #ffff8c solid;
  padding: 20px;
  text-align: center;
  margin:10px;
  width: 150px;
  height: 290px;
}
ul { 
  list-style-type: none;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.select-item {
  margin: 0 5px;
  font-size: 8pt;
}
.select-item:hover {
  color: lightgrey;
  cursor: pointer;
}
.selected {
  color: #ff8585;
}
.buy_ticket {
  position: absolute;
  right: 5px;
  bottom: 5px;
}
.sort-bar {
  text-align: right;
}
select {
  margin-right: 50px;
}
</style>