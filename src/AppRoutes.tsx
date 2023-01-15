import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom"

import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import Profile from "./pages/Profile";

import { AuthContext, AuthProvider } from "./contexts/auth";
import { useContext } from "react";

const AppRoutes = () => {
    const Private = ({children}: any) => {
        const { authenticated, loading } = useContext(AuthContext);

        if(loading) {
            return <div className="loading">Carregando...</div>
        }

        if(!authenticated) {
            return <Navigate to={"/login"} />
        }

        return children;
    };

    return(
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={ <Home /> } />
                    <Route path="/login" element={ <LoginPage /> } />
                    <Route path="/profile" element={
                        <Private>
                            <Profile />
                        </Private> }
                    />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default AppRoutes;