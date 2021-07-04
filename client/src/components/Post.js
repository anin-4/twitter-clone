import React from "react";
import { Button, Card, Grid, Form } from "semantic-ui-react";

export default function Post() {
  return (
    <Grid.Column>
      <Card>
        <Card.Content>
          <Form>
            <Form.Field>
              <label>Cuckoo</label>
              <input type="text" placeholder="Whats on your mind..." />
            </Form.Field>
            <Button type="submit">Submit</Button>
          </Form>
        </Card.Content>
      </Card>
    </Grid.Column>
  );
}
