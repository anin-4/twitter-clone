import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { useGlobalContext } from "../context";

const url = "http://localhost:4000/register";

export default function Register() {
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let { login } = useGlobalContext();
  let history = useHistory();
  if (login) {
    history.push("/");
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "" || email === "" || password === "") {
      console.log("cannot be empty"); //render proper client side messages
      return;
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        userName: username,
        email: email,
        password: password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
    setUsername("");
    setEmail("");
    setPassword("");
    history.push("/login");
  };
  return (
    <Form>
      <Form.Field>
        <label>UserName</label>
        <input
          type="text"
          placeholder="User Name"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </Form.Field>
      <Form.Field>
        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </Form.Field>
      <Form.Field>
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </Form.Field>
      <Button type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
}
