import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom"; // fixed import
import router from "./route/route";
import  "./index.css"
const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(root).render(
  <RouterProvider router={router} />
);
