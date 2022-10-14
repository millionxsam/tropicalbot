const fragment = new URLSearchParams(window.location.hash.slice(1));
const [login_type, login_token] = [
  fragment.get("token_type"),
  fragment.get("access_token"),
];

if (login_type && login_token) {
  localStorage.setItem("token", login_token);
  localStorage.setItem("token_type", login_type);
  window.location = "/";
}

const [token, type] = [
  localStorage.getItem("token"),
  localStorage.getItem("token_type"),
];

if (window.location.pathname === "/dashboard" && !token && !type) {
  window.location =
    "https://discord.com/api/oauth2/authorize?client_id=1012772241290821693&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=token&scope=identify%20email%20connections%20guilds%20guilds.join%20rpc";
}

if (token && type) {
  const guildsEle = document.querySelector(".guilds");
  if (guildsEle) {
    fetch("/api/guilds")
      .then((res) => res.json())
      .then((guilds) => {
        fetch("/api/guildsSize")
          .then((res) => res.json())
          .then((size) => {
            document.querySelector(
              "[data-guild-amount]"
            ).innerHTML = `${size} total servers`;
          });
        guilds.forEach((guild) => {
          const guildEle = document.createElement("a");
          guildEle.href = `/dashboard/${guild.id}`;
          document.querySelector(".guilds").appendChild(guildEle);

          const guildContainer = document.createElement("div");
          guildEle.appendChild(guildContainer);

          if (guild.icon) {
            const img = document.createElement("img");
            img.src = `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=96`;
            guildContainer.appendChild(img);
          } else {
            const h1 = document.createElement("h1");
            h1.innerHTML = guild.name;
            guildContainer.appendChild(h1);
          }

          const p = document.createElement("p");
          p.innerHTML = guild.name;
          guildContainer.appendChild(p);
        });
      });
  }

  fetch("https://discord.com/api/users/@me", {
    headers: {
      authorization: `${type} ${token}`,
    },
  })
    .then((res) => res.json())
    .then((user) => {
      const usernameEle = document.querySelector(
        ".navbar ul a.login-container"
      );
      usernameEle.remove();

      const navbarList = document.querySelector(".navbar ul");

      const newUsernameEle = document.createElement("div");
      newUsernameEle.classList.add("username-container");
      navbarList.appendChild(newUsernameEle);

      const i = document.createElement("i");
      i.classList.add("fa-solid");
      i.classList.add("fa-caret-down");
      newUsernameEle.appendChild(i);

      const img = document.createElement("img");
      img.src = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=128`;
      newUsernameEle.appendChild(img);

      const usernameText = document.createElement("h3");
      usernameText.innerHTML = user.username;
      newUsernameEle.appendChild(usernameText);

      const guildNameEle = document.querySelector(
        ".guild-dashboard .guild-name h1"
      );

      const guildIconEle = document.querySelector(
        ".guild-dashboard .guild-name img"
      );

      if (guildIconEle && guildNameEle) {
        const id = window.location.pathname.split("/").pop();

        fetch("/api/guilds")
          .then((res) => res.json())
          .then((guilds) => {
            let guildInfo;

            guilds.forEach((guild) => {
              if (guild.id == id) guildInfo = guild;
            });

            if (!guildInfo) window.location = "/dashboard";

            console.log(guildInfo);

            guildNameEle.innerHTML = guildInfo.name;

            if (guildInfo.icon) {
              guildIconEle.src = `https://cdn.discordapp.com/icons/${guildInfo.id}/${guildInfo.icon}.png?size=96`;
            } else {
              guildIconEle.remove();
            }
          });
      }
    });
}
