const express = require("express"); // here express module exports express function
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const weather = require("./utils/weather");
const weather1 = require("./utils/weather");

const app = express();

const viewspath = path.join(__dirname, "../templates/views");
const partialspath = path.join(__dirname, "../templates/partials");

// setup handle bars engine
app.set("view engine", "hbs");
app.set("views", viewspath);
hbs.registerPartials(partialspath);

//setup static directory to serve
app.use(express.static(path.join(__dirname, "../public")));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "VishnuTeja",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "VishnuTeja",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "VishnuTeja",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.search) {
    return res.send({ Error: "provide the address" });
  }

  geocode(req.query.search, (t1, t2 = {}) => {
    if (t1) {
      return res.send({ error: t1 });
    }

    weather1({ latitude: t2.latitude, longitude: t2.longitude }, (p1, p2) => {
      if (p1) {
        return res.send({ error: p1 });
      }

      res.send({
        forecast: p2,
        location: t2.location,
        address: req.query.search,
      });
    });
  });
});

app.get("*", (req, res) => {
  res.send("404 page");
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
