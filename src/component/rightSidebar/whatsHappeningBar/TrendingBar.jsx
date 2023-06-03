import React, { useState } from "react";
import style from "./TrendingBar.module.css";
import { CgMoreO } from "react-icons/cg";
import PopoverIcon from "./PopOver";

const Trends = () => {
  const [trending, setTrendings] = useState([
    {
      id: 1, 
      country: "Trending in World",
      keyword: "#Shahrukh Khan",
      totalKeywords: "7.5M Tweets",
    },
    {
      id: 2,
      country: "Trending in Cricket",
      keyword: "#Ms Dhoni",
      totalKeywords: "6.1M Tweets",
    },
    {
      id: 3,
      country: "Trending",
      keyword: "#GodiMedia",
      totalKeywords: "4.5M Tweets",
    },
    {
      id: 4,
      country: "Trending in Entertainment",
      keyword: "#Anushka Sharma",
      totalKeywords: "3.9M Tweets",
    },
    {
      id: 5,
      country: "Trending in Football",
      keyword: "#Lionel Messi",
      totalKeywords: "2.9M Tweets",
    },
  ]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const handleNotInterested = (id) => {
    const updatedTrending = trending.filter((keyword) => keyword.id !== id);
    setTrendings(updatedTrending);
    setAnchorEl(null);
  };

  const handlePopoverOpen = (event, id) => {
    setSelectedId(id);
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={style.keywords}>
      <div className={style.key}>
        <div className={style.keyword__heading}>
          <h4 className={style.heading4}>What's happening</h4>
        </div>
        {trending.map((keyword) => (
          <div key={keyword.id} className={style.container}>
            <div>
              <div className={style.country}>{keyword.country}</div>
              <div className={style.keyword__name}>
                <strong>{keyword.keyword}</strong>
              </div>
              <div className={style.keyword__tweets}>
                {keyword.totalKeywords}
              </div>
            </div>
            <div
              className={style.btn}
              onClick={(e) => handlePopoverOpen(e, keyword.id)}
            >
              <CgMoreO size={24} />
            </div>
          </div>
        ))}
        {anchorEl && (
          <PopoverIcon
            open={Boolean(anchorEl)}
            onClose={handlePopoverClose}
            anchorEl={anchorEl}
            onNotInterestedClick={() => handleNotInterested(selectedId)}
          />
        )}
      </div>
    </div>
  );
};

export default Trends;
