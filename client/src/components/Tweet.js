import React from "react";
import { Button, Card, Grid, Image } from "semantic-ui-react";
import moment from "moment";

export default function Tweet({ value }) {
  const { date, tweet, userName } = value;
  return (
    <Grid.Column>
      <Card>
        <Card.Content>
          <Image
            floated="right"
            size="mini"
            src="https://react.semantic-ui.com/images/avatar/large/molly.png"
          />
          <Card.Header>{userName}</Card.Header>
          <Card.Meta>{moment(date).fromNow()}</Card.Meta>
          <Card.Description>{tweet}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button basic color="green">
              Approve
            </Button>
            <Button basic color="red">
              Decline
            </Button>
          </div>
        </Card.Content>
      </Card>
    </Grid.Column>
  );
}
