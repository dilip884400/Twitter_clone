import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import SignIn from "./pages/signIn/SignIn.jsx";
import SignUp from "./pages/signUp/SignUp.jsx";
import Home from "./pages/homePage/Home.jsx";
import { Provider } from "react-redux";
import store from "./component/storeComponent/store";
import { authAtom } from "./component/recoil/atom";
import { useRecoilState} from "recoil";
import { useEffect, useRef } from "react";

const PR = ({ children }) => {
  const navigate = useNavigate(); 
  const [auth, setAuth] = useRecoilState(authAtom);
  useEffect(() => {
    // console.log("First signup");
    if (!auth?.isLoggedIn) {
      navigate("/signin");
      // console.log("working");
    }
  }, [auth]);

  return children;
};

function App() {
  const [auth, setAuth] = useRecoilState(authAtom);
  // const navigate = useNavigate();

  const isFirstRender = useRef(true);

  useEffect(() => {
    // console.log("second render");
    if (isFirstRender.current) {
      const authFromLocal = JSON.parse(localStorage.getItem("auth"));
      setAuth(authFromLocal);
    } else {
      localStorage.setItem("auth", JSON.stringify(auth));
    }

    isFirstRender.current = false;
  }, [auth]);

  return (
    <div className="App">
      <Provider store={store}>
        <Routes>
          <Route
            path="/"
            element={
              <PR>
                <Home />
              </PR>
            }
          />

          <Route
            path="/signin"
            element={
              <PR>
                <SignIn />
              </PR>
            }
          />
          <Route
            path="/signup"
            element={
              <PR>
                <SignUp />
              </PR>
            }
          />

          <Route
            path="/*"
            element={
              <PR>
                <Home />
              </PR>
            }
          />
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
