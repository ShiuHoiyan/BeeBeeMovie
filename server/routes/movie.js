const express = require('express')
const request = require('request')
const router = express.Router()


const movies = [{
    id: 0,
    name: '海边的曼彻斯特'
},{
    id: 1,
    name: '一条狗的使命'
},{
    id: 2,
    name: '斯隆女士'
},{
    id: 3,
    name: '爱乐之城'
},{
    id: 4,
    name: '太空旅客'
},{
    id: 5,
    name: '四月是你的谎言'
}];

const cinemas = [{
    id: 1,
    name: 'CGV影城',
},{
    id: 2,
    name: 'SFC上影影城',
}, {
    id: 3,
    name:'UA影院',
}, {
    id: 4,
    name: 'UME国际影城',
}, {
    id: 5,
    name: '百老汇影城'
}]
const playlist = [{
    id:1,
    time: 1200,
    price: 34,
    room: 3,
  },{
    id:2,
    time: 1340,
    price: 32,
    room: 5,
  },{
    id:3,
    time: 1410,
    price: 32,
    room: 1,
  },{
    id:4,
    time: 1455,
    price: 32,
    room: 2,
  },{
    id:5,
    time: 1630,
    price: 32,
    room: 4,
  },{
    id:6,
    time: 1840,
    price: 34,
    room: 1,
}]
const movieWithSession= [{
        filmid: 1,
        name: "海边的曼彻斯特",
        playlists:[{
          id: 1,
          time: 1200,
          price: 34,
          room: 2,
        },{
          id: 2,
          time: 1140,
          price: 32,
          room: 1,
        },{
          id: 3,
          time: 1500,
          price: 28,
          room: 6,
        },{
          id: 4,
          time: 1830,
          price: 34,
          room: 2,
        },{
          id: 5,
          time: 1900,
          price: 34,
          room: 1,
        },{
          id: 6,
          time: 2045,
          price: 34,
          room: 5,
        }],
      },{
        filmid: 3,
        title: '斯隆女士',
        playlists:[{
          id: 7,
          time: 1200,
          price: 34,
          room: 2,
        },{
          id: 8,
          time: 1140,
          price: 32,
          room: 1,
        },{
          id: 9,
          time: 1500,
          price: 28,
          room: 6,
        },{
          id: 10,
          time: 1830,
          price: 34,
          room: 2,
        },{
          id: 11,
          time: 1900,
          price: 34,
          room: 1,
        },{
          id: 12,
          time: 2045,
          price: 34,
          room: 5,
        }],
      },{
        filmid: 4,
        name: '爱乐之城',
        playlists:[{
          id: 13,
          time: 1200,
          price: 34,
          room: 2,
        },{
          id: 14,
          time: 1140,
          price: 32,
          room: 1,
        },{
          id: 15,
          time: 1500,
          price: 28,
          room: 6,
        },{
          id: 16,
          time: 1830,
          price: 34,
          room: 2,
        },{
          id: 17,
          time: 1900,
          price: 34,
          room: 1,
        },{
          id: 18,
          time: 2045,
          price: 34,
          room: 5,
        }],
      }]

router.get('/film', (req,res) => {
	res.send(movies);
})

router.get('/', (req,res) => {
  res.send(movies);
})
router.get('/coming', (req,res) => {
	res.send(movies);
})

router.get('/guess', (req,res) => {
	res.send(movies);
})
router.get('/topmovie', (req,res) => {
    res.send(topMovies);
})

router.get('/cinema', (req,res) => {
    res.send(cinemas);
})
router.get('/cinema/:cinemaid', (req,res) => {
    res.send(movieWithSession);
})
router.get('/film/:id', (req,res) => {
    res.send(cinemas);
})
router.get('/film/:id/:cinema/:date', (req, res) => {
    res.send(playlist);
})
router.get('/seat/:id', (req, res) => {
    res.send(getseats());
})

function getseats() {
  let arr = [];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        arr.push({
          row: i+1,
          col: j+1,
          seatid: i*j*j,
          available: Math.round(Math.random()),
        })
      }
    }
  return arr;
}
module.exports = router