import "./App.css";
import { Login } from "./features/auth/components/Login";
import { Counter } from "./features/counter/Counter";
import SignupPage from "./pages/SignupPage";
import Signup from "./features/auth/components/Signup";
import Home from "./pages/Home.js";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/signup",
    element: <Signup></Signup>,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
