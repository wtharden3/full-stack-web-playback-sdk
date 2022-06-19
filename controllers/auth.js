const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
  console.log(`this is the login route`);
})

router.get('/callback', (req, res) => {
  console.log(`this is the callback route`);
})

module.exports = router;