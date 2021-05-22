const {conn, syncAndSeed, models: {Facilities, Member, Booking}} = require('./db')
const express = require('express')
const app = express();


















const run = async() => {
  try {
    await syncAndSeed();
    const port = 3000;
    app.listen(port, () => {
      console.log(`listenning on port ${port}`);
    })
  }
  catch (err){
    console.log(err)
  }
}

run()