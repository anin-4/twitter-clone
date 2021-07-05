import React from "react";
import { Button } from "semantic-ui-react";

export default function DeleteButton() {
  return (
    <Button
      color="red"
      onClick={() => {
        console.log("delete me!!");
      }}
    >
      Delete
    </Button>
  );
}
