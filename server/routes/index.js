const express = require('express')
const router = express.Router()
const user = {
  email: '',
  password: '',
  phone: '',
  nickname: '',
  pereference: []
}


router.get('/', (req,res) => {
  res.send('This is a server!')
})


module.exports = router