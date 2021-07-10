import React, { useState } from "react";
import { Button, Form, Container } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { useGlobalContext } from "../context";
import Error from "../components/Error";

const url = "http://localhost:4000/login";

export default function Login() {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [errors, setErrors] = useState([]);
  let history = useHistory();
  let { loginUser, login } = useGlobalContext();
  if (login) {
    history.push("/");
  }
  const handleSubmit = (e) => {
    if (password === "" && username === "") {
      let newErrors = ["username is required", "password is required"];
      setErrors(newErrors);
    } else if (username === "") {
      let newErrors = ["username is required"];
      setErrors(newErrors);
    } else if (password === "") {
      let newErrors = ["password is required"];
      setErrors(newErrors);
    } else {
      getData();
    }
    e.preventDefault();
  };
  let getData = async () => {
    let response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        userName: username,
        password: password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    let data = await response.json();

    if ("Error" in data) {
      let newErrors = ["username or password is invalid"];
      setErrors(newErrors);
    } else {
      loginUser(data);
      history.push("/");
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
