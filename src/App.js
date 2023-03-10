import logo from "./logo.svg";
import "./App.css";
import Header from "./App/Header";
import SideBar from "./App/SideBar";
import Content from "./App/Content";
import classes from "./App/custom/application.scss";
import "jquery/dist/jquery.min.js";
import { ThemeProvider, createTheme } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    primary: {
      main: "#8e855b",
    },
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="wrapper">
        <Header />
        <SideBar />
        <Content />
      </div>
    </ThemeProvider>
  );
}

export default App;
