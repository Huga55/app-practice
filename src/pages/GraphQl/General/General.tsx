import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { rickAndMortyQuery } from "./rickAndMortyQuery";

interface ICharacter {
  id: string;
  name: string;
  status: "Alive" | "Dead" | "unknown";
}

const fragment = `
  fragment CharacterFragment on Character {
    id
    name
    status
  }
`;

const query = `
  query getCharacters($page: Int, $withPages: Boolean!) {
    characters(page: $page) {
      info @include(if: $withPages) {
        pages
      }
      results {
        ...CharacterFragment
      }
    }
  }

  ${fragment}
`;

const mutation = `
  mutation addCharacter($name: String!, $status: String!) {
    createCharacter(name: $name, status: $status) {
      ...CharacterFragment
    }
  }

  ${fragment}
`;

export const General = () => {
  const [data, setData] = useState<ICharacter[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("");

  const requestData = useCallback(async (page: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await rickAndMortyQuery(query, {
        page,
        withPages: page > 1,
      });

      setData(data.characters.results);
      setPages(data.characters.info?.pages || "Not found");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unknown error");
    } finally {
      setIsLoading(false);
      setPage(page);
    }
  }, []);

  useEffect(() => {
    requestData(1);
  }, [requestData]);

  const handleAddCharacter = () => {
    rickAndMortyQuery(mutation, { name, status })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        General GraphQL
      </Typography>

      <Box sx={{ mb: 3, display: "flex", alignItems: "center" }}>
        <Button
          variant="contained"
          onClick={() => requestData(Math.max(1, page - 1))}
          disabled={page === 1 || isLoading}
          sx={{ mr: 2 }}
        >
          Предыдущая
        </Button>
        <Typography variant="body1">Страница: {page}</Typography>
        <Button
          variant="contained"
          onClick={() => requestData(page + 1)}
          disabled={isLoading}
          sx={{ ml: 2 }}
        >
          Следующая
        </Button>
      </Box>

      <Typography variant="body1">Страниц: {pages}</Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {isLoading && <CircularProgress />}

      {data && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Персонажи:
          </Typography>
          <Grid container spacing={3}>
            {data.map((character) => (
              <Grid key={character.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {character.name}
                    </Typography>
                    <Chip
                      label={character.status}
                      color={
                        character.status === "Alive"
                          ? "success"
                          : character.status === "Dead"
                          ? "error"
                          : "default"
                      }
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};
