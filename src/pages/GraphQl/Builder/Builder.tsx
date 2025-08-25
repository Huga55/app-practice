import * as gql from "gql-query-builder";
import { postsQuery } from "../Mutations/postsQuery";
import { useCallback, useEffect, useState } from "react";
import { Box, CardContent, Card, Typography, Button } from "@mui/material";

const query = gql.query([
  {
    operation: "posts",
    fields: [
      {
        data: ["id", "title", "body"],
      },
    ],
    variables: {
      options: {
        type: "PageQueryOptions",
      },
    },
  },
]);

const updatePostQuery = gql.mutation({
  operation: "updatePost",
  variables: {
    id: {
      type: "ID",
      required: true,
    },
    input: {
      type: "UpdatePostInput",
      required: true,
    },
  },
  fields: ["id", "body"],
});

interface IPost {
  id: string;
  title: string;
  body: string;
}

export const Builder = () => {
  const [posts, setPosts] = useState<IPost[]>([]);

  const getPosts = useCallback(async () => {
    const data = await postsQuery(query.query, {
      options: { paginate: { page: 1, limit: 5 } },
    });

    setPosts(data.data.posts.data);
  }, []);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const handleUpdatePost = async (id: string, body: string) => {
    await postsQuery(updatePostQuery.query, {
      id,
      input: { body },
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Builder GraphQL
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="body1">Query:</Typography>
        <Typography variant="body1">{query.query}</Typography>
        <Typography variant="body1">Mutation:</Typography>
        <Typography variant="body1">
          {JSON.stringify(updatePostQuery.query)}
        </Typography>
      </Box>

      <Box>
        {posts.map((post) => (
          <Card key={post.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {post.title}
              </Typography>
              <Button
                variant="contained"
                onClick={() => handleUpdatePost(post.id, "Hello, world!")}
              >
                Update
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};
