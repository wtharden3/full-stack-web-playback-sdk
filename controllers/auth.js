require('dotenv').config();
const express = require('express');
const router = express.Router();
const request = require('request');

const spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;

const spotify_redirect_uri = 'http://localhost:3000/auth/callback'

let generateRandomString = length => {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

router.get('/login', (req, res) => {
  // console.log(`this is the login route`);
  try {
    let scope = `streaming user-read-email user-read-private`;
    let state = generateRandomString(16);

    let auth_query_parameters = new URLSearchParams({
      response_type: "code",
      client_id: spotify_client_id,
      scope: scope,
      redirect_uri: spotify_redirect_uri,
      state: state
    });

    res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());

    console.log(`login endpoint works if you see state: ${state}`);

  } catch (err) {
    console.error(err)
  }
})


router.get('/callback', (req, res) => {
  try {
    let code = req.query.code;
    
    console.log(`code: ${code}`);
    let authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: "http://localhost:3000/auth/callback",
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString('base64')),
        'Content-Type' : 'application/x-www-form-urlencoded'
      },
      json: true
    };

    console.log(`authOptions: ${authOptions}`);
    
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        let access_token = body.access_token;
        res.redirect('/');
      } else {
        console.log(`[SERVER]: something went wrong ❗️❗️`);
      }
    });

    console.log(`this is the callback route`);
    
  } catch (err) {
    console.error(err);
  }
})

router.get('/token', (req, res) => {
  res.json(
     {
        access_token: access_token
     })
})

module.exports = router;