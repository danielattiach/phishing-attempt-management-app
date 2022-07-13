import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import { NavBar } from './components';
import Login from './pages/login';
import Home from './pages/home';
import { useAuthContext } from './hooks';

function App() {
    const { user } = useAuthContext();
    return (
        <Router>
            <NavBar />
            <Container>
                <Routes>
                    <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
                    <Route path="/" element={user ? <Home /> : <Navigate to="/login" replace />} />
                </Routes>
            </Container>
        </Router>
    );
}

export default App;
