import React, { useState } from "react";
import { Button, Card, Grid, Form } from "semantic-ui-react";

const url = "http://localhost:4000/tweets";

export default function Post({ value }) {
  let [tweet, setTweet] = useState("");
  let token = localStorage.getItem("token");
  let sendToken = `Beaer ${token}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        tweet: tweet,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        authorization: sendToken,
      },
    })
      .then((response) => response.json())
      .then((json) => value(json));
    setTweet("");
  };
  return (
    <Grid.Column>
      <Card>
        <Card.Content>
          <Form>
            <Form.Field>
              <label>Cuckoo</label>
              <input
                type="text"
                placeholder="Whats on your mind..."
                value={tweet}
                onChange={(e) => {
                  setTweet(e.target.value);
                }}
              />
            </Form.Field>
            <Button type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        </Card.Content>
      </Card>
    </Grid.Column>
  );
}
