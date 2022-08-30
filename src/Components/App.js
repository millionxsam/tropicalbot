import "../index.css";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import "../Media/css/all.css";
import Home from "./Home";
import Dashboard from "./Dashboard";

function App() {
  window.onload = () => {
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const [type, token] = [
      fragment.get("token_type"),
      fragment.get("access_token"),
    ];

    if (token) {
      axios
        .get("https://discord.com/api/users/@me", {
          headers: {
            authorization: `${type} ${token}`,
          },
        })
        .then((res) => res.data)
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
        });
    }
  };

  return (
    <>
      <div className="navbar">
        <Link to="/">
          <div className="logo">
            <h1>Tropical Bot</h1>
          </div>
        </Link>
        <ul>
          <Link to="/">Dashboard</Link>
          <a
            className="login-container"
            href="https://discord.com/api/oauth2/authorize?client_id=1012772241290821693&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=token&scope=identify%20email%20connections%20guilds%20guilds.join%20rpc"
          >
            <button className="login">Log In</button>
          </a>
        </ul>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
