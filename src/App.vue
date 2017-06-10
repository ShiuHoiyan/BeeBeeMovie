<template>
  <div id="app">
  	<header>
  		<div id="logo" @click="mainpage">
	  		<span>BeeBee Movie</span>
	  	</div>
      <div id="nav-container">
        <span>城市</span>
        <router-link to="/movies">电影</router-link>
        <router-link to="/cinemas">影院</router-link>
        <span @click="showSearchBox">搜索</span>
      </div>

      <div class="search-box-hidden">
        <form>
          <input type="text" placeholder="请输入电影名、影院名" v-model="search_str">
          <button class="btn" @click="search(search_str)">搜索</button>
        </form> 
      </div>

	  	<div v-if="login" class="greeting">
			 <router-link to="/account/profile">欢迎回来，{{nickname}}！</router-link>
			 <button @click="logout" class="btn">退出登录</button>
	    </div>
	    <div v-else class="greeting">
	    	<router-link to="/welcome/signin">登陆</router-link> | 
    		<router-link to="/welcome/signup">注册</router-link>
	    </div>
	  		
  	</header>
    <div class="wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
  	return {
      login: false,
      search_str: '',
      nickname: ''
  	}
  },
  created: function(){
    if (document.cookie.length == 0) {
      this.login = false;
    } else {
      this.$http.get('/user/getnickname')
      .then(res => {
        this.nickname = res.data;
        this.login = true;
      })
      .catch(e => {
        console.log("请先登陆");
        this.login = false;
      })
    }
  },
  methods: {
    logout: function() {
      this.$http.get('/logout')
      .then(res => {
          console.log(res.data);
          if (document.cookie.length == 0) {
            window.location.reload();
            this.$router.push('/welcome/signin');
          }
        })
      .catch(e => {
        console.log("服务器异常！");
        console.log(e)
      })
    },
    mainpage: function() {
      this.$router.push('/index');
    },
    search: function(str) {
      console.log(str);
      this.$router.push(`/search/${str}`);
    },
    showSearchBox: function() {
      var box = document.querySelector(".search-box-hidden");
      box.className = "search-box-show";
    },
    getCookie: function(name) {
      var arr,reg =new RegExp("(^| )"+name+"=([^;]*)(;|$)");
      if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
      else
        return null;
    }
  }
}

</script>

<style>

#app {
  font-family: Microsoft Yahei, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: grey;
  height: 100%;
}

header {
  position: relative;
	height: 36px;
	display: flex;
/*	justify-content: space-between;
  flex-direction: row;*/
	align-items: center;
  background-color: #ffff8c;
	border-bottom: 2px #ffff8c solid;
  margin-bottom: 7px;
}

.wrapper {
  width: 1000px;
  min-height: 600px;
  margin: 0 auto;
}
#logo {
	color: #ff8585;
  font-size: 20pt;
  text-shadow:2pt 2pt 2pt lightgrey;
}

#logo:hover {
  cursor: pointer;
}
#nav-container {
  color: #ff8585;
  font-size: 17pt;
  display: flex;
  justify-content: space-around;
  width: 250pt;
  margin-left: 30px;
}
#nav-container *:hover {
  color: #ffc107;
  cursor:pointer;
}
.search-box-hidden {
  visibility: hidden;
}
.search-box-show {
  visibility: visible;
}
input {
  border-radius: 5px;
  -web-kit-appearance: none;
  -moz-appearance: none;
  outline: 0;
  height: 25px;
  border: 1px #DADADA solid;
  padding-left: 5px;
  color: grey;
}
input[placeholder] {
  padding-left: 5px;
  color: grey;
}
.greeting {
  position: absolute;
  right: 10px;
  display: flex;
  justify-content:space-between;
  align-items: center;
}
.greeting *:hover {
  color: #ffc107;
}
.btn {
  padding:0 10px 0 10px;
	background-color: white;
	border: solid 1px #ffff8c;
	border-radius:5px;
	word-break:keep-all;           /* 不换行 */
	white-space:nowrap; 
	color: #ff8585;
}

.btn:hover {
	color: #ffc107;
	cursor:pointer
}

  a {
    text-decoration:none;
  }

  a:visited {
    color: #ff8585;
  }

h1 {
  color: #ffff8c;
}
</style>
