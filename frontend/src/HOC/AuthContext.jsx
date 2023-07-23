import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(
		localStorage.getItem("user") || false
	);
	console.log(isAuthenticated, "fromcontext");
	return (
		<AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
			{children}
		</AuthContext.Provider>
	);
};
