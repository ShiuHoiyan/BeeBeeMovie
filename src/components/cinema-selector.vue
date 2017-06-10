<template>
    <div id="selector" class="select-bar">

        <div class="date">
          <label>日期 - - - -</label>
          <ul class="select-line date-list">
            <li v-for = "day in days" class="select-item" @click="selectedDay(day.digDay,$event)">{{day.cnDay}}</li>
          </ul>
        </div>
        
        <div class="area">
          <label>区域 - - - - </label>
          <ul class="select-line area-list">
            <li v-for= "area in areas" class="select-item" @click="selectedArea(area.areaid,$event)">{{area.location}}</li>
          </ul>
        </div>

        <div class="cinema">
          <label>影院 - - - -</label>
          <ul class="select-line cinema-list">
            <li v-for="cinema in cinemas" class="select-item" @click="selectedCinema(cinema,$event)">{{cinema.name}}</li>
          </ul>
        </div>
    </div>
  </template>

<script type="text/javascript">
export default {
  name:'cinema-selector',
  data() {
    return {
      days:[],
      cinemas: [],
      areas: [{
        location: '全部',
        areaid: -1,
      },{
        location: '增城市',
        areaid: 0,
      },{
        location: '白云区',
        areaid: 1,
      },{
        location: '天河区',
        areaid: 2,
      },{
        location: '海珠区',
        areaid: 3,
      },{
        location: '越秀区',
        areaid: 4,
      },{
        location: '荔湾区',
        areaid: 5,
      },{
        location: '黄埔区',
        areaid: 6,
      },{
        location: '番禺区',
        areaid: 7,
      },{
        location: '花都区',
        areaid: 8,
      },{
        location: '南沙区',
        areaid: 9,
      },{
        location: '从化市',
        areaid: 10,
      }],
      getMovie_data: {
        date: '',
        cinema: '000',
      },
      getCinema_data: -1,
    }
  },
  created: function(){
    this.getDays();
    this.getCinema();
  },
  methods: {
    getDays: function() {
      for(var i = 0; i < 7; i++) {
        this.getDayStr(i);
      }
      this.getMovie_data.date = this.days[0].digDay;
    },
    getDayStr: function(addDayCount) {
      var dd = new Date();
      dd.setDate(dd.getDate()+addDayCount);
      var y = dd.getFullYear();
      var m = dd.getMonth()+1;
      var d = dd.getDate();
      var digitDate = y + m.toString().padStart('2', '0') + d.toString().padStart('2', '0');
      this.days.push({
        cnDay: `${m}月${d}日`,
        digDay: digitDate,
      });
    },
    getCinema: function() {
      let query = '';
      if (this.getCinema_data != -1) {
        query = '?locationid=' + this.getCinema_data;
      }
      this.$http.get('movie/cinema' + query)
        .then(res => {
          this.cinemas = res.data;
          this.getMovie_data.cinema = this.cinemas[0].id;
        })
        .catch(e => {
          console.log(e);
        })
    },
    selectedDay: function(day, e) {
      this.getMovie_data.date = day;
      this.selected(e);
    },
    selectedArea: function(id, e) {
      this.getCinema_data = id;
      this.getCinema();
      this.selected(e);
    },
    selectedCinema: function(cinema, e) {
      this.getMovie_data.cinema = cinema;
      this.selected(e);
    },
    selected: function(e) {
      var target = e.target;
      this.clearSelected(target.parentNode);
      target.className += ' selected';
      this.$emit('getMovies', this.getMovie_data); 
    },
    clearSelected: function(parent) {
      var children = parent.children;
      for(var i = 0; i < children.length; i++) {
        var classnames = children[i].className.split(' ');
        var pos = classnames.indexOf('selected');
        if (pos != -1) {
          classnames.splice(pos, 1);
          children[i].className = classnames.join(' ');
        }
      }
    }
  }

}
</script>

<style scoped>
#selector {
  width: 1000px;
  margin: 0 auto;
}

.select-line {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

label {
  color: #ff8585;
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

.sort-bar {
  text-align: right;
}

select {
  margin-right: 50px;
}

</style>
