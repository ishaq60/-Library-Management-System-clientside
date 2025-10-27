import { createBrowserRouter } from "react-router-dom";

import Home from "../components/Home";
import Root from "../root/Root";
import Addbooks from "@/components/Addbooks";
import Books from "@/components/Books";
import Booksummary from "@/components/Booksummary";




const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      {
path:"/books",
Component:Books
      },
      {
        path:"/create-book",
        Component:Addbooks
      },
      {
        path:"/borrow-summary",
        Component:Booksummary
      }
    //   { path: "about", Component: About },
    //   {
    //     path: "auth",
    //     Component: AuthLayout,
    //     children: [
    //       { path: "login", Component: Login },
    //       { path: "register", Component: Register },
    //     ],
    //   },
    //   {
    //     path: "concerts",
    //     children: [
    //       { index: true, Component: ConcertsHome },
    //       { path: ":city", Component: ConcertsCity },
    //       { path: "trending", Component: ConcertsTrending },
    //     ],
    //   },
    ],
  },
]);

export default router
