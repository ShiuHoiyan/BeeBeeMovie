<template>
  <div id = "welcome">
    <div class="left-part">
      <div id="left-part-container">
        <img src = "../assets/movingbee.gif">
        <h1>欢迎来到 <span>BeeBee Movie</span>!</h1>
        <div class="enter">
          <router-link to="/index">直接进入--></router-link>
        </div>
      </div>
    </div>
    <div class="right-part">
      <router-view></router-view>
    </div>
  </div>
</template>



<script>

export default {
  name: 'welcome',
  created: function() {
  }
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#welcome {
  text-align: center;
  width: 100%;
  height: 500px;
  padding-left: 500px;
  box-sizing: border-box;
}
.left-part {
  float: left;
  margin-top: 80px;
  width: 100%;
  height: 100%;
  margin-left: -600px;
  text-align: center;
  display: flex;
  align-items:center;
}
#left-part-container {
  width: 100%;
}
img {
  height: 50%;
  width: 50%;
}
.right-part {
  padding-top: 40px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items:center;
}
h1 {
  font-weight: normal;
  font-size: 25pt;
}

h1>span {
  color: #ff8585;
  text-shadow:2pt 2pt 2pt lightgrey;
}


.btn {
  margin: 30px;
}
.enter {
  font-size: 10pt;
  margin-bottom: 10px;
  position: relative;
  left: 150px;
}
a {
  text-decoration: none;
}
</style>
