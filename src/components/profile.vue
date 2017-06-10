<template>
	<div id="profile">
		<h1>基本信息</h1>
		<form @submit.prevent="submit">
			<div class="line">
	        	<label>邮箱：</label>
	        	<input type="email" class="email" v-model="email" readonly="readonly">
	      	</div>
	      	<div class="line">
	        	<label>昵称：</label>
	        	<input type="text" name="nickname" class="nickname" v-model="nickname" >
	      	</div>
	      	<div class="line">
	        	<label>电话：</label>
	        	<input type="text" name="phone" v-model="phone">
	      	</div>
	      	<div class="line">
	        	<label>喜好：</label>
	        	<div class="per">
		          <input type="checkbox" id="Romance" value="Romance" v-model="preference">
		          <label for="Romance">爱情</label>
		          <input type="checkbox" id="Comedy" value="Comedy" v-model="preference">
		          <label for="Comedy">喜剧</label>
		          <input type="checkbox" id="Adventure" value="Adventure" v-model="preference">
		          <label for="Adventure">冒险</label>
		          <input type="checkbox" id="Horror" value="Horror" v-model="preference">
		          <label for="Horror">恐怖</label>
		          <input type="checkbox" id="Action" value="Action" v-model="preference">
		          <label for="Action">动作</label>
		          <input type="checkbox" id="Others" value="Others" v-model="preference">
		          <label for="Others">其它</label>
		        </div>
		      </div>
        <button class="btn" @click="modifypassword">修改密码</button>
	      <input class="btn" type="submit" value="提交">
	    </form>
	</div>
</template>

<script>
export default {
	name: 'profile',
	data() {
		return {
		  email: '',
	    phone: '',
		  nickname: '',
	    preference: [],
		  modifyUser: {}
		}
	},
	created: function() {
    	this.getUser();
    	this.getPre();
  	},
  	watch: {
  		phone: function(val, oldVal) {
  			if(oldVal != '') this.modifyUser.phone = val;
  		},
  		nickname: function(val, oldVal) {
  			if(oldVal != '') this.modifyUser.nickname = val;
  		},
  		preference:function(val, oldVal) {
  			if(oldVal != []) this.modifyUser.preference = val;
  		}
  	},
  	methods: {
  		getUser: function() {
  			this.$http.get('user/getinfo')
      		.then(res => {
        		console.log("获取用户资料成功");
        		this.email = res.data.email;
        		this.phone = res.data.phone;
        		this.nickname = res.data.nickname;
      		})
      		.catch(e => {
        		console.log("服务器异常！");
        		console.log(e);
      		})
  		},
  		getPre: function() {
  			this.$http.get('user/getpreference')
  			.then(res => {
  				this.preference = res.data;
  			})
  			.catch(e => {
        		console.log("服务器异常！");
        		console.log(e);
      		})
  		},
  		submit: function() {
  			console.log(this.modifyUser);
  			this.$http.post('user/modifyuser', this.modifyUser)
  				.then(res => {
  					alert("修改成功");
  				})
  				.catch(e => {
  					console.log('服务器异常: ' + e);
  				})
  		},
  		modifypassword: function() {
  			var password_ = prompt("请输入要修改的密码","");//将输入的内容赋给变量password ，
  			if (password_) {
          var data = {
            password: password_
          }
     			this.$http.post('user/modifypassword', data)
     				.then(res => {
     					console.log("密码修改成功");
     				})
     				.catch(e => {
     					console.log(e);
     				})
          }
   			}
  		}
}
</script>

<style scoped>
	form {
		margin-left: 100px;
	}
	h1 {
		margin-left: 100px;
	}
	.per {
		display: inline-block;
	}
	.line {
		margin-bottom: 10px;
	}
  .email:hover {
    cursor: not-allowed;
  }
  button{
    height: 25px;
  }
</style>