<template>
  <div class = "silder">

    <div class="main">
    	<div class="main-item" v-for="(movie,index) in topmovies" :id="'main_'+index">
    		<img :src="movie.poster">
    	</div>
    </div>
    
    <div class="ctrl">
    	<span class="ctrl-item" v-for="(movie,index) in topmovies" :id="'ctrl_'+index" @click="clickSwitchSlider(index)"></span>
    </div>
  </div>
</template>

<script>
export default {
	data() {
		return {
			topmovies: [{
				poster: require('../assets/top/top1.jpg'),
			    title: '速度与激情8'
			},{
			    poster: require('../assets/top/top2.jpg'),
			    title:'蓝精灵'
			},{
			    poster: require('../assets/top/top3.jpg'),
			    title:'神秘家族'
			},{
			    poster: require('../assets/top/top4.jpg'),
			    title:'志明救春娇'
			},{
			    poster: require('../assets/top/top4.jpg'),
			    title:'喜欢你'
			}],
			nowIndex: 1,
			timer: ''
		}
	},
	mounted: function() {
		this.initSlider();
		this.timer = setInterval(this.autoSlide,3000);
	},
	methods:{
		clickSwitchSlider: function(index) {
			clearInterval(this.timer);
			this.switchSlider(index);
			this.nowIndex = index;
			this.timer = setInterval(this.autoSlide,3000);
		},
		initSlider: function(){
			var firstCtrl = document.querySelector('#ctrl_0');
			var firstMain = document.querySelector('#main_0');
			firstCtrl.className += ' ctrl-item_active';
			firstMain.className += ' main-item_active';
		},
		switchSlider: function(index) {
			if(this.checkChange()) clearInterval(this.timer);
			this.clearActive();
			var ctrl_active = document.querySelector('#ctrl_' + index);
			var main_active = document.querySelector('#main_' + index);
			ctrl_active.className += ' ctrl-item_active';
			main_active.className += ' main-item_active';
		},
		clearActive: function() {
			var ctrls = document.querySelectorAll('.ctrl-item');
			var mains = document.querySelectorAll('.main-item');
			for (var i = 0; i < ctrls.length; i++) {
				ctrls[i].className = 'ctrl-item';
				mains[i].className = 'main-item';
			}
		},
		autoSlide: function() {
			this.switchSlider(this.nowIndex);
			this.nowIndex++;
			if(this.nowIndex === 5) this.nowIndex = 0;
		},
		checkChange: function() {
			if (document.URL.indexOf('index') == -1) return true;
			else return false;
		}
	}

}
</script>
<style scoped>

.slider, .main, .main-item{
	width: 1000px;
	height: 400px;
	margin: 0 auto;
	position: relative;
}

.main {
	overflow: hidden;
}

.main-item {
	opacity: 0;
	position: absolute;
	right: 50%;
	top:0;
	-webkit-transition:all .5s;
}
.main-item_active {
	right: 0;
	opacity: 1;
}
.main-item img{
	width: 100%;
	position: absolute;
	left: 0;
	top: 0;
}

.ctrl {
	width: 100%;
	height: 13px;
	line-height: 13px;
	text-align: center;
	position: absolute;
	bottom: 220px;
}
.ctrl-item {
	display: inline-block;
	width: 16px;
	height: 16px;
	margin: 0 10px;
	border-radius: 8px;
	background-color: #666;
	opacity: 0.5;
	box-shadow: 0 1px 1px rgba(0,0,0,.3);
}
.ctrl-item_active {
	background-color: #000;
}
.ctrl-item:hover {
	background-color: #F0F0F0;
}
</style>