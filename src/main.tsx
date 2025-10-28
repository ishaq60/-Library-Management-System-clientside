import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom"; // fixed import
import router from "./route/route";
import  "./index.css"
import { Provider } from "react-redux";
import { store } from "./redux/Api/store";
import { Toaster } from "./components/ui/toaster";
const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(root).render(
  <Provider store={store}>
    <>
      <RouterProvider router={router} />
      <Toaster /> {/* ✅ global toast container */}
    </>
  </Provider>
);

