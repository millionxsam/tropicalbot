const express = require("express");
const app = express();
const port = 3000;
const { Client } = require("discord.js");
const client = new Client({
  intents: 32767,
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

client.login(
  "OTYyODU3NDMyNjk3MTc2MDk0.GZqwW1.qCSqoGbWd4xgcuxJev_E6xfGxKJBA48oBlZqCY"
);

app.listen(port, () => {
  console.log("👂 Listening on port 3000");
});

app.use(express.static("public"));

app.set("view engine", "html");

app.engine("html", require("ejs").renderFile);

app.set("views", "public");

const api = express.Router();

app.use("/api", api);

// Pages

app.get("/dashboard", (req, res) => {
  res.render("dashboard.html");
});

app.get("/dashboard/:guildId", (req, res) => {
  res.send("hi");
});

// API Requests

api.get("/guilds", (req, res) => {
  return res.send(client.guilds.cache.map((guild) => guild));
});
