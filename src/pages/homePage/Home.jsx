import LeftSideBar from "../../component/leftsidebar/Leftsidebar";
import RightSideBar from "../../component/rightSidebar/RightSideBar";
import LiveTweet from "../../component/liveTweet/LiveTweet";
import style from "./home.module.css";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authAtom } from "../../component/recoil/atom";

const Home = () => {
  const auth = useRecoilValue(authAtom);
  const setAuth = useSetRecoilState(authAtom); 
  const navigate = useNavigate();

  useEffect(() => {
    console.log(auth);
    if (!auth?.isLoggedIn) {
      navigate("/signin");
    }
  }, [auth]);
  return (
    <div className={style.homeContainer}>
      <div className={style.LeftSideBar}>
        <LeftSideBar />
      </div>
      <div className={style.TweetContainer}>
        <LiveTweet />
      </div>

      <div>
        <RightSideBar />
      </div>
    </div>
  );
};

export default Home;

//jjjj
