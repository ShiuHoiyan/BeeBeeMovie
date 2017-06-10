 <template>
  <div id = "signin">
    <p class="msg">{{errMsg}}</p>
    <form @submit.prevent="validateBeforeSubmit">
      <div class="form-container">
        <span class="input input--akira">
          <input class="input__field input__field--akira email" type="text" v-model="user.email" name="email" v-validate:email.initial="'required|email'"/> 
          <label class="input__label input__label--akira">
            <span class="input__label-content input__label-content--akira">邮箱</span>
          </label>
          <p v-show="errors.has('email')">{{ errors.first('email') }}</p>
        </span>
        

        <span class="input input--akira">
          <input class="input__field input__field--akira" type="password" name="password" v-validate:password.initial="'required'" v-model="user.password"/>
          <label class="input__label input__label--akira">
            <span class="input__label-content input__label-content--akira">密码</span>
          </label>
          <p v-show="errors.has('password')">{{ errors.first('password') }}</p>
        </span>
        
      </div>
        <input class="btn" type="submit" value="登陆">
    </form> 
  </div>
</template>

<script>
export default {
  name: 'signin',
  data() {
    return {
      user: {
        email: '',
        password: ''
      },
      errMsg: ''
    }
  },
  methods: {
    validateBeforeSubmit: function() {
      this.$validator.validateAll().then(() => {
        //通过验证
        this.$http.post('/Login', this.user)
        .then(res => {
            if (res.status == 200) {
              //登陆成功
              window.location.reload();
              this.$router.push('/index');
            }
          })
        .catch(e => {
          if (e.status == 404) {
            this.errMsg = "用户不存在";
          } else if (e.status == 401) {
            this.errMsg = "密码错误";
          } else {
            this.errMsg = "注册失败";
          }
          console.log("注册失败");
        })
      }).catch(() => {
        // 没通过验证
        alert('资料没填对啊!');
      });
    }
  }
}
</script>

<style scoped>
  form {
    display: flex;
    flex-direction:column;
    margin: 0 auto;
  }
  .form-line {
    display: flex;
    flex-direction:row;
    justify-content: flex-start;
    width: 400px;
    margin-bottom: 10px;
  }
  .form-container {
    margin: 0 auto;
  }
  label {
    width: 100px;
    font-size: 10pt;
    text-align: right;
  }
  .text{
    width: 150px;
    font-size: 8pt;
    border: 3px double #ffff8c;
    border-radius: 5px;
    height: 15px;
    margin-left: 10px;
  }
  p {
  font-size: 8pt;
  color: red;
  width: 100%;
  text-align: right;
  position: absolute;
  bottom: -30px;
}
  .btn {
    width: 80px;
    margin: 0 auto;
  }
  .msg {
    color: red;
    margin-bottom: 0;
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

</style>