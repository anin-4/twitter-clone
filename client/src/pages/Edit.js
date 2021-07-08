import React, { useState, useEffect } from "react";
import { Card, Button, Image, Container, Form } from "semantic-ui-react";
import moment from "moment";
import { useHistory } from "react-router-dom";
export default function Edit(props) {
  let postId = props.match.params.postID;
  const url = `http://localhost:4000/tweets/${postId}`;
  let [data, setData] = useState({});
  let [editTweet, setEditTweet] = useState("");
  let token = localStorage.getItem("token");
  let sendToken = `Bearer ${token}`;
  let history = useHistory();
  const getData = async () => {
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
    setEditTweet(newData.tweet);
  };
  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({
        tweet: editTweet,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        authorization: sendToken,
      },
    });
    history.push(`/tweets/${postId}`);
  };

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
          <Form>
            <Form.Field>
              <label>Edit</label>
              <input
                type="text"
                value={editTweet}
                onChange={(e) => {
                  setEditTweet(e.target.value);
                }}
              />
            </Form.Field>
            <Button type="Submit" color="teal" onClick={handleSubmit}>
              Change
            </Button>
          </Form>
        </Card.Content>
      </Card>
    </Container>
  );
}
