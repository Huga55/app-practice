import { useCallback, useMemo, useState } from "react";
import { type IUserInfo, UserContext } from "./UserContext";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);

  const changeUserInfo = useCallback((userInfo: IUserInfo) => {
    setUserInfo(userInfo);
  }, []);

  const value = useMemo(
    () => ({
      userInfo,
      changeUserInfo,
    }),
    [changeUserInfo, userInfo]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
