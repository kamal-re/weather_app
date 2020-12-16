const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utills/geocode");
const forecast = require("./utills/forecast");
const app = express();
const port = 3000;

//paths
const publicDirectoryPath = path.join(__dirname, "../public");
const viewpath = path.join(__dirname, "../templates/views");
const partialspath = path.join(__dirname, "../templates/partials");
//setup handle bars
hbs.registerPartials(partialspath);
app.set("view engine", "hbs");
app.set("views", viewpath);
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "kamal",
    footermsg: "created by kamal",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "kamal",
    footermsg: "created by kamal",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    message: "why fear when kamal is here",
    title: "how can i help you?",
    name: "don't call me brilliant,please",
    footermsg: "created by kamal",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send("error you must provide the address");
  }
  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({error});
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({error});
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 error",
    name: "kamal",
    errormsg: "help article not found",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404 error",
    name: "kamal",
    errormsg: "oops!,page not found",
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
