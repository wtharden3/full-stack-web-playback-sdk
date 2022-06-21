require('dotenv').config();
const express = require('express');


// const spotify_client_id = process.env.SPOTIFY_CLIENT_ID
// const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET
const port = process.env.PORT;;

const app = express();
app.use(express.json());

const controllers = require("./controllers");

// /auth/login to request user authorization by getting an Authorization Code.
// /auth/callback to request the Access Token using the Authorization Code requested in the previous step
app.use("/auth", controllers.authcontroller);

app.listen(port, () => {
  try {
    console.log(`Jamming on http://localhost:${port} 🎧`); 
  } catch (err) {
    console.log(`[SERVER]: Error ❗️`);
    console.error(err.message);
  }
})


