<template>
  <div id = "signup">
    <p class="em">{{errMsg}}</p>
    <form @submit.prevent="validateBeforeSubmit">
      <div class="form-container">
      <section class="content bgcolor-4">
        <span class="input input--akira">
          <input class="input__field input__field--akira email" type="text"  v-validate:email.initial="'required|email'" @blur="checkEmail" v-model="user.email"/> 
          <label class="input__label input__label--akira">
            <span class="input__label-content input__label-content--akira">邮箱</span>
          </label>
          <p v-show="errors.has('email')">{{ errors.first('email') }}</p>
        </span>
        

        <span class="input input--akira">
          <input class="input__field input__field--akira" type="password" name="password" v-validate:password.initial="'required'" v-model="user.password" />
          <label class="input__label input__label--akira">
            <span class="input__label-content input__label-content--akira">密码</span>
          </label>
          <p v-show="errors.has('password')">{{ errors.first('password') }}</p>
        </span>
        

        <span class="input input--akira">
          <input class="input__field input__field--akira" type="password" name="password" v-validate:repeated.initial="'required|confirmed:password'"/>
          <label class="input__label input__label--akira">
            <span class="input__label-content input__label-content--akira">重复密码</span>
          </label>
          <p span v-show="errors.has('repeated')">{{ errors.first('repeated') }}</p>
        </span>
        

        <span class="input input--akira">
          <input class="input__field input__field--akira" type="text" name="nickname" v-model="user.nickname"/>
          <label class="input__label input__label--akira">
            <span class="input__label-content input__label-content--akira">昵称</span>
          </label>
        </span>

        <span class="input input--akira">
          <input class="input__field input__field--akira" type="text" name="phone" v-model="user.phone" v-validate:phone.initial="'numeric'"/>
          <label class="input__label input__label--akira">
            <span class="input__label-content input__label-content--akira">手机</span>
          </label>
          <p v-show="errors.has('phone')">{{ errors.first('phone') }}</p>
        </span>
        

        <span class="input input--akira">
          <div class="per input__field input__field--akira">
            <input type="checkbox" id="Romance" value="Romance" v-model="user.preference">
            <label for="Romance">爱情</label>
            <input type="checkbox" id="Comedy" value="Comedy" v-model="user.preference">
            <label for="Comedy">喜剧</label>
            <input type="checkbox" id="Adventure" value="Adventure" v-model="user.preference">
            <label for="Adventure">冒险</label>
            <input type="checkbox" id="Horror" value="Horror" v-model="user.preference">
            <label for="Horror">恐怖</label>
            <input type="checkbox" id="Action" value="Action" v-model="user.preference">
            <label for="Action">动作</label>
            <input type="checkbox" id="Others" value="Others" v-model="user.preference">
            <label for="Others">其它</label>
          </div> 
          <label class="input__label input__label--akira">
            <span class="input__label-content input__label-content--akira">喜好</span>
          </label>
        </span>
      </section>
      </div>
      <input class="btn" type="submit" value="注册">
    </form> 
  </div>
</template>

<script>
export default {
  name: 'signup',
  data() {
    return {
      user: {
        email: '',
        password: '',
        phone: '',
        nickname:'',
        preference: []
      },
      email_vaild: false,
      errMsg: ''
    }
  },
  methods: {
    checkEmail: function() {
      var fData = {
        email: this.user.email,
      }
      this.$http.post('/checkemail', fData)
      .then(res=>{
        if (res.status == 200){
          this.errMsg = '';
          this.email_valid = true;
        }
      })
      .catch(e => {
        this.errMsg = '用户已存在';
        this.email_valid = false;
      })
    },
    validateBeforeSubmit: function() {
      this.$validator.validateAll().then(() => {
        //通过验证
        if(!this.email_valid) return; //邮箱已存在
        else {
          console.log(this.user);
          this.$http.post('/register', this.user)
          .then(res => {
            if (res.status == 200) {
              console.log('注册成功');
              window.location.reload();
              this.$router.push('/index');
            }
          })
          .catch(e => {
              this.errMsg = "注册失败";
              console.log("服务器异常！");
              console.log(e)
            })
        }
      }).catch(() => {
        // 没通过验证
        alert('资料没填对啊!');
      });
    }
  }
}
</script>

<style scoped>

.em {
  text-align: center;
  margin-right: 10px;
  color: red;
}
form {
  display: flex;
  flex-direction:column;
  margin: 0 auto;
}


p {
  font-size: 8pt;
  color: red;
  width: 100%;
  text-align: right;
  position: absolute;
  bottom: -30px;
}

.form-container {
  margin: 0 auto;
  width: 100%;
  display: flex;
  align-items: center;
}
.per {
  width: 100%;
  font-size: 8pt;
  display: flex;
  justify-content:space-around;
  align-items: center;
}

.btn {
  width: 80px;
  margin: 0 auto;
}

.input {
  position: relative;
  z-index: 1;
  display: inline-block;
  margin: 1em;
  width: 450px;
  vertical-align: top;
}

.input__field {
  position: relative;
  display: block;
  float: right;
  padding: 0.8em;
  width: 60%;
  border: none;
  border-radius: 0;
  background: #f0f0f0;
  color: #aaa;
  font-weight: bold;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  -webkit-appearance: none; /* for box shadows to show on iOS */
}

.input__field:focus {
  outline: none;
}

.input__label {
  display: inline-block;
  float: right;
  padding: 0 1em;
  width: 40%;
  color: #6a7989;
  font-weight: bold;
  font-size: 70.25%;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.input__label-content {
  text-align: left;
  position: relative;
  display: block;
  padding: 1.6em 1em;
  width: 100%;
}  
.input--akira {
  margin-top: 2em;
}

.input__field--akira {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  display: block;
  padding: 0 1em;
  width: 100%;
  height: 100%;
  background: transparent;
  text-align: center;
}

.input__label--akira {
  padding: 0;
  width: 100%;
  background: #ffff8c;
  color: #cc6055;
  cursor: text;
}

.input__label--akira::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  -webkit-transform: scale3d(0.97, 0.85, 1);
  transform: scale3d(0.97, 0.85, 1);
  -webkit-transition: -webkit-transform 0.3s;
  transition: transform 0.3s;
}

.input__label-content--akira {
  -webkit-transition: -webkit-transform 0.3s;
  transition: transform 0.3s;
}

.input__field--akira:focus + .input__label--akira::before,
.input--filled .input__label--akira::before {
  -webkit-transform: scale3d(0.99, 0.95, 1);
  transform: scale3d(0.99, 0.95, 1);
}

.input__field--akira:focus + .input__label--akira,
.input--filled .input__label--akira {
  cursor: default;
  pointer-events: none;
}

.input__field--akira:focus + .input__label--akira .input__label-content--akira,
.input--filled .input__label-content--akira {
  -webkit-transform: translate3d(0, -3.5em, 0);
  transform: translate3d(0, -3.5em, 0);
}

.per {
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>