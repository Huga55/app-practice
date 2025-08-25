export const addPrefixToRoutes = (
  routes: Record<string, string>,
  prefix: string
) => {
  return Object.fromEntries(
    Object.entries(routes).map(([key, value]) => [key, `${prefix}/${value}`])
  );
};
