import React from "react";


function CustomButton({  buttonText, btnNext, customCss }) {
  return (
    <button  className={customCss} onClick={btnNext}>
      {buttonText}
    </button>
  );
}

export default CustomButton; 