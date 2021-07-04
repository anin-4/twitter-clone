import React, { useState, useEffect } from "react";
import Tweet from "../components/Tweet";
import { Grid } from "semantic-ui-react";
import { useGlobalContext } from "../context";
import Post from "../components/Post";
const url = "http://localhost:4000/tweets";
export default function Home() {
  let [data, setData] = useState([]);
  let { login } = useGlobalContext();
  const getData = async () => {
    let response = await fetch(url);
    let final = await response.json();
    setData(final);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Grid columns={3}>
        <Grid.Row>
          <h1>Recent Posts</h1>
        </Grid.Row>
        <Grid.Row>
          {login ? <Post></Post> : ""}
          {data.map(({ tweet, user, _id }) => {
            const { date, userName } = user;
            return <Tweet value={{ date, tweet, userName }} key={_id}></Tweet>;
          })}
        </Grid.Row>
      </Grid>
    </>
  );
}