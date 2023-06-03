import React from "react";
import { Popover, Button, Typography } from "@mui/material";

const PopoverIcon = ({ open, onClose, anchorEl, onNotInterestedClick }) => {
  return (
    <Popover
      open={open}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Typography sx={{ p: 2 }}>
        <Button onClick={onNotInterestedClick}>Not Interested</Button>
        <Button onClick={onClose}>This is spam</Button>
      </Typography>
    </Popover>
  );
};

export default PopoverIcon;
