import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="home-container">
        <div className="main">
          <div className="title-container">
            <h1>Tropical Bot</h1>
            <p>
              Levelup your Discord Server with the best Leveling and
              Multi-Purpose Discord Bot! Arcane will increase server activity
              while keeping the server squeaky clean. What are you waiting for?
            </p>
            <div className="main-button-container">
              <button className="add">Add To Server</button>
              <button className="discord">Discord Server</button>
              <Link>
                <button className="dashboard">Dashboard</button>
              </Link>
            </div>
          </div>
          <img src="/logo.png" alt="" />
        </div>
      </div>
    </>
  );
}
