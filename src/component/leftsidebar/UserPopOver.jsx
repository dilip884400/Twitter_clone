import React from "react";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import style from "./UserPopOver.module.css";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authAtom } from "../recoil/atom";

const PopOver = () => {
  const auth = useRecoilValue(authAtom);
  const setAuth = useSetRecoilState(authAtom);
  const navigate = useNavigate();

  function Loggedout() {
    setAuth({
      isLoggedIn: false,
      user: null,
    });
  }

  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <button
            className={style.btn}
            {...bindTrigger(popupState)}
            style={{ cursor: "pointer", padding: "0 10px" }}
          >
            <img
              src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
              alt=""
              className={style.photo}
            />
            {auth?.user?.name || ""} <MoreHorizOutlinedIcon />
          </button>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
          >
            <Typography sx={{ p: 2, cursor: "pointer" }}>
              Add an existing account
            </Typography>
            <Typography sx={{ p: 2, cursor: "pointer" }} onClick={Loggedout}>
              Log out{" "}
            </Typography>
          </Popover>
        </div>
      )}
    </PopupState>
  );
};

export default PopOver;
