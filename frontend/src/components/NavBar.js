import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function NavBar() {
    const { user } = useAuthContext();
    const navigate = useNavigate();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Phishing
                    </Typography>
                    <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
                    {user ? (
                        <Typography variant="body2">Hi, {user.firstName} {user.lastName}</Typography>
                    ) : (
                        <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
