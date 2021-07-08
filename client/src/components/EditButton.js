import React from "react";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function EditButton({ value }) {
  return (
    <Button color="teal" as={Link} to={`/tweets/${value}/edit`}>
      Edit
    </Button>
  );
}
