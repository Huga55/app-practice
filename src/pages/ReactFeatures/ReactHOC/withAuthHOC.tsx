export const withAuth = <T extends object>(
  Component: React.ComponentType<T & { isAuth: boolean }>
): React.FC<T> => {
  return (props: T) => {
    const isAuth = localStorage.getItem("isAuth") === "true";

    return <Component {...props} isAuth={isAuth} />;
  };
};
