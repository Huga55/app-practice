import {
  Box,
  CardContent,
  Card,
  Typography,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import { postsQuery } from "./postsQuery";
import { useCallback, useEffect, useState } from "react";

const getPostsQuery = `
  query getPosts($options: PageQueryOptions) {
    posts(options: $options) {
      data {
        id
        title
        body
      }
    }
  }
`;

const updatePostQuery = `
  mutation updatePost($id: ID!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      id
      body
    }
  }
`;

interface IPost {
  id: string;
  title: string;
  body: string;
}

export const Mutations = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [editedPost, setEditedPost] = useState<IPost | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const getPosts = useCallback(async (page: number) => {
    const posts = await postsQuery(getPostsQuery, {
      options: { paginate: { page, limit: 5 } },
    });

    setPosts(posts.data.posts.data);
  }, []);

  useEffect(() => {
    getPosts(1);
  }, [getPosts]);

  const handleUpdatePost = useCallback(async () => {
    if (!editedPost) {
      return;
    }

    try {
      setIsEditing(true);
      await postsQuery(updatePostQuery, {
        id: editedPost.id,
        input: { body: editedPost.body },
      });

      setPosts((prevPosts) => {
        return prevPosts.map((post) =>
          post.id === editedPost.id ? editedPost : post
        );
      });
      setEditedPost(null);
    } catch (error) {
      console.error(error);
    } finally {
      setIsEditing(false);
    }
  }, [editedPost]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Mutations GraphQL
      </Typography>

      {posts.map((post) => {
        const isEdited = editedPost?.id === post.id;

        return (
          <Card key={post.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {post.title}
              </Typography>
              {isEdited ? (
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  value={editedPost.body}
                  onChange={(e) =>
                    setEditedPost({ ...editedPost, body: e.target.value })
                  }
                />
              ) : (
                <Typography variant="body1" color="text.secondary">
                  {post.body}
                </Typography>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  editedPost?.id === post.id
                    ? handleUpdatePost()
                    : setEditedPost(post)
                }
                sx={{ mt: 2 }}
                disabled={!!editedPost?.id && !isEdited}
              >
                {isEdited ? "Save" : "Edit"}
              </Button>
              {isEdited && isEditing && <CircularProgress size={20} />}
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};
