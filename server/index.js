const express = require("express");
// const cors = require("cors");
// const bodypars= require('body-parser')
const app = express();
// app.use(cors());
// app.use(bodypars.json())

const regroute = require("./route/registerRoute")
const loginroute = require("./route/loginRoute")
const deleteroute = require("./route/deleteRoute")

app.use("/", regroute);
app.use("/", loginroute);
app.use("/", deleteroute);

const PORT = 4000;

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
