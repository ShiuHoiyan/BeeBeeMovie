const express = require('express')
const router = express.Router()

const user = {
  email: '453139577@qq.com',
  password: 'kaixin',
  phone: '15099976063',
  nickname: 'kaixin',
  preference: ['Romance','Comedy']
}





router.get('/getinfo', (req, res) => {
  var data = {
    email: user.email,
    password: user.password,
    phone: user.phone,
    nickname: user.nickname
  }
  console.log('用户信息为；' + data.email);
  res.send(data);
})

router.get('/getpreference', (req, res) => {
  res.send(user.preference);
})
router.post('/modifyuser', (req, res) => {
  res.status(200);
  res.send();
})

router.post('/modifypassword', (req, res) => {
  res.status(200);
  res.send("ok");
})

router.get('/getnickname', (req,res) => {
  res.send('开心');
})

const orders = [{
    oid: 123456789,
    date: '5月10号',
    moviename: '喜欢你',
    movietime: '12：00',
    cinema: '开心电影院',
    ticketamount: 2,
    price: 82,
    screeningroom: '1号厅',
  },{
    oid: 987654321,
    date: '4月28号',
    moviename: '摔跤吧！爸爸',
    movietime: '17：45',
    cinema: '伤心电影院',
    ticketamount: 1,
    price: 41,
    screeningroom: '3号厅',
  }]

router.get('/getorderforms', (req, res) => {
  res.send(orders);

})

router.post('/addorderform', (req, res) => {
  res.send();
})

router.post('/deleteorderform', (req, res) => {
  res.send();
})
module.exports = router