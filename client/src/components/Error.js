import React from "react";
import { Card } from "semantic-ui-react";

export default function Error({ value }) {
  return (
    // <Card.Group style={{}}>
    <Card fluid color="red" header={value} style={{ fontSize: 10 }} />
    // </Card.Group>
  );
}
