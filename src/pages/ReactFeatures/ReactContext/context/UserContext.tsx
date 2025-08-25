import { createContext } from "react";

export interface IUserInfo {
  name: string;
  age: number;
}

export interface IUserContext {
  userInfo: IUserInfo | null;
  changeUserInfo: (userInfo: IUserInfo) => void;
}

export const UserContext = createContext<IUserContext>({
  userInfo: null,
  changeUserInfo: () => {},
});
