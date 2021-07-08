import React, { useEffect, useState } from "react";
import { Card, Button, Icon, Label, Image, Container } from "semantic-ui-react";
import moment from "moment";
import "../App.css";
import { useGlobalContext } from "../context";
import DeleteButton from "../components/DeleteButton";

export default function SinglePost(props) {
  let postId = props.match.params.postID;
  const url = `http://localhost:4000/tweets/${postId}`;
  let [data, setData] = useState({});
  let { user: loggedIn } = useGlobalContext();
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
    let { neededTWeet: final } = val;
    let { tweet, user } = final;
    let { userName, date, _id } = user;
    let newData = { tweet, userName, date, _id };
    setData(newData);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Container>
      <Card style={{ width: "50vw", margin: "auto" }}>
        <Card.Content>
          <Image
            floated="right"
            size="mini"
            src="https://react.semantic-ui.com/images/avatar/large/molly.png"
          />
          <Card.Header>{data.userName}</Card.Header>
          <Card.Meta>{moment(data.date).fromNow()}</Card.Meta>
          <Card.Description>{data.tweet}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button as="div" labelPosition="right">
            <Button color="teal">
              <Icon name="heart" />
              Like
            </Button>
            <Label as="a" basic color="teal" pointing="left">
              0
            </Label>
          </Button>
          {data._id == loggedIn.id ? (
            <DeleteButton value={postId}></DeleteButton>
          ) : (
            ""
          )}
        </Card.Content>
      </Card>
    </Container>
  );
}
