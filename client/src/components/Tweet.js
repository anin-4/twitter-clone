import React from "react";
import { Button, Card, Grid, Image, Icon, Label } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

export default function Tweet({ value }) {
  const { date, tweet, userName, _id } = value;
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
          <Card.Meta as={Link} to={`/tweets/${_id}`}>
            {moment(date).fromNow()}
          </Card.Meta>
          <Card.Description>{tweet}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button as="div" labelPosition="right">
            <Button color="teal">
              <Icon name="heart" />
              Like
            </Button>
            <Label as="a" basic color="teal" pointing="left">
              feature coming soon..
            </Label>
          </Button>
        </Card.Content>
      </Card>
    </Grid.Column>
  );
}
