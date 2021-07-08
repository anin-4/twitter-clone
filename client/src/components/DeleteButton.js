import React from "react";
import { Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

export default function DeleteButton({ value }) {
  const url = `http://localhost:4000/tweets/${value}`;
  let token = localStorage.getItem("token");
  let sendToken = `Bearer ${token}`;
  let history = useHistory();
  const getData = async () => {
    try {
      await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: sendToken,
        },
      });
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Button
      color="red"
      onClick={() => {
        getData();
      }}
    >
      Delete
    </Button>
  );
}
