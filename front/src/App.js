import './App.css';
import LandingPage from "./screens/landing/LandingPage";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LoginPage from "./screens/login/LoginPage";
import RegisterPage from "./screens/register/RegisterPage";
import HomePage from "./screens/home/HomePage";
import GamePage from "./screens/game/GamePage";
import PrivateRoute from "./components/privateRoute/privateRoute";
import {Box} from "@material-ui/core";


const privateRoutes = () => {
    return (
        <Box>
            <Switch>
                <PrivateRoute component={HomePage} path="/home" exact={false}/>
                <PrivateRoute component={GamePage} path="/snake" exact={false}/>
            </Switch>
        </Box>
    )
}

function App() {
  return (
      <BrowserRouter>
        <Switch>
            <Route path="/" exact>
                <LandingPage/>
            </Route>
            <Route path="/login">
                <LoginPage/>
            </Route>
            <Route path="/register">
                <RegisterPage/>
            </Route>
            {privateRoutes()}
        </Switch>
      </BrowserRouter>
  );
}

export default App;
