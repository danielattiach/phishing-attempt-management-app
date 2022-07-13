import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useAuthContext } from '../../hooks';
import { Typography } from '@mui/material';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { client, setToken, setUser } = useAuthContext();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const res = await client.post('/auth/login', { email, password })
            const { token, user } = res.data;
            setToken(token);
            setUser(user);
            navigate('/');
        } catch (error) {
            setError(error.response.data.message)
        }
    }
    return (
        <Box my={1} display="flex" justifyContent="center" width="100%">
            <FormGroup sx={{ width: '100%', maxWidth: 400 }}>
                <Box my={2} component={TextField} type="email" label="Email" onChange={e => {
                    setError('');
                    setEmail(e.target.value)
                }} />
                <TextField type="password" label="Password" onChange={e => {
                    setError('');
                    setPassword(e.target.value)
                }} />
                <Typography color="error">
                    {error}
                </Typography>
                <Button onClick={handleSubmit}>Login</Button>
            </FormGroup>
        </Box>
    )
}