import React, {  useEffect } from "react";
import Tweet from "../liveTweetFeed/Tweet";
import { useDispatch, useSelector } from "react-redux";
import { TweetSlice } from "../storeComponent/reducer";
import style from "./LiveTweet.module.css";
import FlipMove from "react-flip-move";
import PostTweet from "../postTweet/PostTweet";
import Avatar from "antd/es/avatar/avatar";
import { BsTwitter } from "react-icons/bs";
import { RiHome7Fill } from "react-icons/ri";
import { BiSearch } from "react-icons/bi";
import { GrNotification } from "react-icons/gr";
import { MdOutlineEmail } from "react-icons/md";
function LiveTweet() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("/Tweet.json")
      .then((res) => res.json())
      .then((res) => dispatch(TweetSlice.actions.AddAllTweet(res)));
  }, []);

  const TweetData = useSelector((state) => state.Tweets);

  return (
    <div className={style.feed}>
      <div className={style.feed__header}>
        <Avatar
          className={style.Avatar}
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
        />
        <BsTwitter className={style.twitterLogo} />
        <h2>Home</h2>
        
      </div>

      <PostTweet />

      <FlipMove>
        {TweetData.map((tweet, index) => {
          return <Tweet key={index} tweet={tweet} index={index} />;
        })}
      </FlipMove>
      <footer className={style.footer}>
        <RiHome7Fill className={style.footerHome} />
        <BiSearch className={style.footerSearch} />
        <GrNotification className={style.footerNotification} />
        <MdOutlineEmail className={style.footerEmail} />
      </footer>
    </div>
  );
}

export default LiveTweet;
