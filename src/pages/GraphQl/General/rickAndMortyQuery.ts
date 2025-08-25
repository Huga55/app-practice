export const rickAndMortyQuery = async (
  query: string,
  variables?: Record<string, unknown>
) => {
  const response = await fetch("https://rickandmortyapi.com/graphql", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ query, variables }),
  });

  const data = await response.json();

  return data.data;
};
