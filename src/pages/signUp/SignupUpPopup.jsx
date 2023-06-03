import style from "./signupPopup.module.css";
import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
// import { Snackbar } from "@mui/material";
import Joi from "@hapi/joi";
import { useSelector, useDispatch } from "react-redux";
import { userSlice } from "../../component/storeComponent/reducer";
import { AiFillCloseCircle } from "react-icons/ai";
import swal from "sweetalert2";
import { useNavigate } from "react-router";

let id;
let idPassword;
let idPhone;
function SignupUpPopup(props) {
  const { setOpen, open } = props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setpassword] = useState("");
  const [date, setDate] = useState("");
  const [isExists, setIsExists] = useState(false);
  const userData = useSelector((state) => state.user);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phoneError, setphoneErorr] = useState("");
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const handleChangeName = (event) => {
    const { value } = event.target;
    setName(value);
  };

  // console.log(
  //   email.length === 0 ||
  //     phone ||
  //     emailError ||
  //     passwordError ||
  //     (phoneError && true)
  // );

  const handleChangePassword = (event) => {
    const { value } = event.target;
    setpassword(value);
    clearTimeout(idPassword);
    idPassword = setTimeout(() => {
      const res = ValidatePassword(value);
      if (res) {
        setPasswordError(res);
      } else {
        setPasswordError(null);
      }
    }, 2500);
  };

  const handleChangePhone = (event) => {
    const { value } = event.target;
    setPhone(value);
    clearTimeout(idPhone);
    idPhone = setTimeout(() => {
      const res = Validatephone(value);
      if (res) {
        setphoneErorr(res);
      } else {
        setphoneErorr(false);
      }
    }, 2500);
  };
  const handleDateChange = (event) => {
    const { value } = event.target;
    setDate(value);
  };
  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
    clearTimeout(id);
    id = setTimeout(() => {
      const res = validate(value);
      if (res === true) {
        setEmailError(false);

        const isPresent = findEmail(value);
        setIsExists(isPresent);
        if (isPresent) {
          return;
        }
      } else {
        setEmailError(res);
      }
    }, 2500);
  };

  function validate(email) {
    const schema = Joi.object({
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
    });

    const { error } = schema.validate({ email: email });
    if (error) {
      return error.message;
    }
    return true;
  }

  function ValidatePassword(password) {
    const schema = Joi.object({
      password: Joi.string().alphanum().min(6).max(30),
    });
    const { error } = schema.validate({ password: password });

    if (error) {
      return error.message;
    }
  }

  function findEmail(email) {
    let user = userData.find((user) => user.email === email);

    if (!user) {
      return false;
    }
    return true;
  }

  function Validatephone(number) {
    const schema = Joi.object({
      number: Joi.number().min(10),
    });
    const { error } = schema.validate({ number: number });
    if (error) {
      return error.message;
    }
    return false;
  }

  const handleSubmit = () => {
    const userData = {
      name,
      email,
      password,
      phone,
      date,
    };

    dispatch(userSlice.actions.addUser(userData));
    setEmail("");
    setName("");
    setPhone("");
    setpassword("");
    setDate("");
    swal.fire({
      icon: "success",
      title: "😎😎😎😎 ",
      text: "Signup Succces!",
      // footer: '<a href="">Why do I have this issue?</a>'
    });

    setTimeout(() => {
      Navigate("/signin");
    }, 2000);
  };

  return (
    <div className={style.container}>
      <div className={style.overlay}>
        <span className={style.closeBtn}>
          <AiFillCloseCircle
            onClick={() => setOpen(false)}
            className={style.closeIcon}
          />
        </span>
        <h1>Create your account</h1>
        <TextField
          label="Name"
          autoComplete="true"
          type="text"
          placeholder="Name"
          sx={{ width: "82%", marginTop: "1rem" }}
          onChange={handleChangeName}
          value={name}
        />
        <TextField
          label="Phone"
          autoComplete="true"
          type="text"
          placeholder="Phone"
          sx={{ width: "82%", marginTop: "1rem" }}
          onChange={handleChangePhone}
          value={phone}
        />

        <TextField
          label="Email"
          autoComplete="true"
          variant="filled"
          type="text"
          placeholder="Email"
          sx={{ width: "82%", marginTop: "1rem" }}
          onChange={handleEmailChange}
          value={email}
        />

        {isExists && <p>User Exists</p>}
        {emailError && <p>{emailError}</p>}

        <TextField
          label="Password"
          autoComplete="true"
          variant="filled"
          type="text"
          placeholder="Password"
          sx={{ width: "82%", marginTop: "1rem" }}
          onChange={handleChangePassword}
          value={password}
        />
        {passwordError && <p>{passwordError}</p>}

        <TextField
          autoComplete="true"
          type="Date"
          placeholder="Date"
          sx={{ width: "82%", marginTop: "1rem" }}
          onChange={handleDateChange}
          value={date}
        />

        <h1 className={style.textcontent}>Date of birth</h1>
        <p className={style.para}>
          This will not be shown publicly. Confirm your own age, even if this
          account is for a business, a pet, or something else.
        </p>

        <Button
          disabled={email.length === 0 || !phone || !password || !date}
          onClick={handleSubmit}
          variant="contained"
          sx={{ width: "82%", marginTop: "2rem", marginBottom: "1rem" }}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
}

export default SignupUpPopup;
