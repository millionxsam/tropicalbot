(async () => {
  require("dotenv").config();
  const express = require("express");
  const app = express();
  const port = 3000;
  const { Client } = require("discord.js");
  const client = new Client({
    intents: 32767,
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
  });
  // const { Database } = require("quickmongo");
  // const db = new Database(
  //   "mongodb+srv://TropicGalxy:Drake0826@tropicalbot.mpuunsn.mongodb.net/?retryWrites=true&w=majority"
  // );
  // await db.connect();

  // db.on("ready", () => console.log("Connected To Database"));

  client.login(process.env.TOKEN);

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

  app.get("/commands", (req, res) => {
    res.render("commands.html");
  });

  app.get("/dashboard/:guildId", (req, res) => {
    res.render("guild.html");
  });

  // API Requests

  api.get("/guilds", (req, res) => {
    return res.send(client.guilds.cache.map((guild) => guild));
  });

  api.get("/guildsSize", (req, res) => {
    return res.send(`${client.guilds.cache.size}`);
  });
})();
