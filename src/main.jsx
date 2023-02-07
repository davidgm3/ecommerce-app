import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import "./index.css";
import "animate.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContextProvider";
import { CartContextProvider } from "./contexts/CartContextProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<AuthContextProvider>
			<CartContextProvider>
				<App />
			</CartContextProvider>
		</AuthContextProvider>
	</BrowserRouter>
);
