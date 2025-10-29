import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom"; // fixed import
import router from "./route/route";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/Api/store";
import { Toaster } from "./components/ui/toaster";
const root = document.getElementById("root");
if (!root) {
    throw new Error("Root element not found");
}
ReactDOM.createRoot(root).render(_jsx(Provider, { store: store, children: _jsxs(_Fragment, { children: [_jsx(RouterProvider, { router: router }), _jsx(Toaster, {}), " "] }) }));
