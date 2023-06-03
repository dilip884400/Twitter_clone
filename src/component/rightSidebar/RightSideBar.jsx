import React from 'react'
import SearchBar from './searchbar/SearchBar';
import TrendingBar from './whatsHappeningBar/TrendingBar'
import WhoToFollow from './whoToFollowBar/WhoToFollow'
import style from './RightSideBar.module.css'

const RightSideBar = () => {
  return (
    <div className={style.RightSideBar}>
        <SearchBar />     
        <TrendingBar/> 
        <WhoToFollow />
    </div>
  )
}

export default RightSideBar