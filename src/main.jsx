import ReactDOM from "react-dom/client";
import Snowfall from "react-snowfall";
import App from "./App.jsx";
import "./index.css";

const snowflake1 = document.createElement("img");
snowflake1.src = "../public/snow.png";

// const snowflake3 = document.createElement("img");
// snowflake3.src = "../public/snow2.png";
const snowflake4 = document.createElement("img");
snowflake4.src = "../public/snow3.png";

const images = [snowflake1, snowflake4];

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <div
      style={{
        height: "100vh",
        width: "100%",
        position: "absolute",
      }}
      className="bg-[url('./background.png')] bg-cover bg-center bg-no-repeat"
    >
      <Snowfall images={images} radius={[1, 30]} snowflakeCount={200} />
    </div>

    <App />
  </>
);
