import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/mainLayout";
import QuestionLayout from "../layouts/questionLayout";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import ManageLayout from "../layouts/manageLayout";
import Trash from "../pages/manage/Trash";
import List from "../pages/manage/Lists";
import Star from "../pages/manage/Stars";

// lazy
// eslint-disable-next-line react-refresh/only-export-components
const Edit = lazy(() => import(/*editpage*/ "../pages/question/edit"));
// eslint-disable-next-line react-refresh/only-export-components
const Stat = lazy(() => import(/*statpage*/ "../pages/question/stat"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "manage",
        element: <ManageLayout />,
        children: [
          {
            path: "list",
            element: <List />,
          },
          {
            path: "star",
            element: <Star />,
          },
          {
            path: "trash",
            element: <Trash />,
          },
        ],
      },
    ],
  },
  {
    path: "question",
    element: <QuestionLayout />,
    children: [
      {
        path: "edit/:id",
        element: <Edit />,
      },
      {
        path: "stat/:id",
        element: <Stat />,
      },
    ],
  },
]);

export default router;

// 常用的路由，常量
export const HOME_PATHNAME = "/";
export const LOGIN_PATHNAME = "/login";
export const REGISTER_PATHNAME = "/register";
export const MANAGE_INDEX_PATHNAME = "/manage/list";

export function isLoginOrRegister(pathname: string) {
  if ([LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) return true;
  return false;
}
export function isNoNeedUserInfo(pathname: string) {
  if ([HOME_PATHNAME, LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname))
    return true;
  return false;
}
