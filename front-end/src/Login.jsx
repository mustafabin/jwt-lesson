import React from "react";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/userReducer.js";
export default function Login() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({});

  let handleSubmit = (e) => {
    e.preventDefault();
    let loginOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    };

    fetch("http://localhost:3000/login", loginOptions)
      .then((res) => res.json())
      .then((data) => {
        data["error"]
          ? alert(data["error"])
          : dispatch(
              setUser({
                profile: data,
              })
            );
        localStorage.setItem("jwt", data["token"]);
      })
      .catch((err) => alert(err));
  };

  let updateForm = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          type="text"
          name="email"
          label="Email"
          placeholder="Email Address"
          autoComplete="email"
          onChange={updateForm}
          value={form["email"] || ""}
          required
        />
        <TextField
          type="password"
          name="password"
          label="Password"
          onChange={updateForm}
          value={form["password"] || ""}
          required
        />
        <input type="submit" />
      </form>
    </>
  );
}
