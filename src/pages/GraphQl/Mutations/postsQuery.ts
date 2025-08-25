export const postsQuery = async (
  query: string,
  variables?: Record<string, unknown>
) => {
  const response = await fetch("https://graphqlzero.almansi.me/api", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ query, variables }),
  });

  return await response.json();
};
