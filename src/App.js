import logo from "./logo.svg";
import "./App.css";
import Header from "./App/Header";
import SideBar from "./App/SideBar";
import Content from "./App/Content";
import classes from "./App/custom/application.scss";
import Swal from "sweetalert2";
import "jquery/dist/jquery.min.js";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <SideBar />
      <Content />
    </div>
  );
}

export default App;
