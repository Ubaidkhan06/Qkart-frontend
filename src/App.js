import Register from "./components/Register";
import Login from "./components/Login";
import Thanks from './components/Thanks'
import Products from "./components/Products";
import Checkout from "./components/Checkout";
import ipConfig from "./ipConfig.json";
import { Route, Switch } from "react-router-dom";

export const config = {
  endpoint: `http://${ipConfig.workspaceIp}:8082/api/v1`,
};

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Products}>
          <Products />
        </Route>
        <Route path="/register" component={Register}>
          <Register />
          </Route>
        <Route path="/login" component={Login}>
          <Login />
        </Route>
        <Route path="/checkout" component={Checkout}>
          <Checkout />
        </Route>
        <Route path="/thanks" component={Thanks}>
          <Thanks />
        </Route>
      </Switch>
    </div>
  );
}

