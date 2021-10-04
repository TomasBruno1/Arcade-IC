import './App.css';
import LandingPage from "./screens/landing/LandingPage";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LoginPage from "./screens/login/LoginPage";
import RegisterPage from "./screens/register/RegisterPage";

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
        </Switch>
      </BrowserRouter>
  );
}

export default App;
