import React, { useState } from "react";
import { Button, Form, Container } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { useGlobalContext } from "../context";
import Error from "../components/Error";

const url = "http://localhost:4000/register";

export default function Register() {
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [errors, setErrors] = useState([]);
  let { login } = useGlobalContext();
  let history = useHistory();
  if (login) {
    history.push("/");
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "" && password === "" && email === "") {
      let newErrors = [
        "username is required",
        "password is required",
        "email is required",
      ];
      setErrors(newErrors);
    } else if (password === "") {
      let newErrors = ["password is required"];
      setErrors(newErrors);
    } else if (email === "") {
      let newErrors = ["email is required"];
      setErrors(newErrors);
    } else if (username === "") {
      let newErrors = ["username is required"];
      setErrors(newErrors);
    } else {
      getData();
    }
  };
  let getData = async () => {
    let response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        userName: username,
        email: email,
        password: password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    let data = await response.json();
    if ("reason" in data) {
      let newErrors = [data.reason];
      setErrors(newErrors);
    } else {
      history.push("/login");
    }
  };
  return (
    <Container>
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
        <Button type="submit" onClick={handleSubmit} color="teal">
          Submit
        </Button>
      </Form>
      {errors.length !== 0
        ? errors.map((error) => {
            return <Error value={error}></Error>;
          })
        : ""}
    </Container>
  );
}
