import React, { useEffect, useState } from "react";
import { Card, Button, Icon, Label, Image } from "semantic-ui-react";
import moment from "moment";

export default function SinglePost(props) {
  let postId = props.match.params.postID;
  const url = `http://localhost:4000/tweets/${postId}`;
  let [data, setData] = useState({});
  const getData = async () => {
    let token = localStorage.getItem("token");
    let sendToken = `Bearer ${token}`;
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        authorization: sendToken,
      },
    });
    let val = await response.json();
    // console.log(val);
    setData(val);
    console.log(data);
  };
  useEffect(() => {
    getData();
  }, []);
  return <h1>hey</h1>;
}
