__path = process.cwd()

var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(__path + '/views/home.html')
})

router.get('/docs', (req, res) => {
  res.sendFile(__path + '/views/docs.html')
})

router.get('/profile', (req, res) => {
  res.sendFile(__path + '/views/profile.html')
})

router.get('/phlogo', (req, res) => {
  res.sendFile(__path + '/views/phlogo.html')
})

router.get('/game', (req, res) => {
  res.sendFile(__path + '/views/menja.html')
})

router.get('/datakelas', (req, res) => {
  res.sendFile(__path + '/views/datakelas1.html')
})

router.get('/about', (req, res) => {
  res.sendFile(__path + '/views/about.html')
})

module.exports = router
