import { useEffect, useState } from 'react';
import { useAuthContext } from '../../hooks';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [phishingAttempts, setPhishingAttempts] = useState([]);
    const [email, setEmail] = useState('');
    const { client } = useAuthContext();

    const sendPhishingAttempt = async () => {
        const res = await client.post('/phishingAttempt', { email });
        setPhishingAttempts(currentPhishingAttempts => [res.data, ...currentPhishingAttempts]);
    };

    useEffect(() => {
        const getPhishingAttempts = async () => {
            const res = await client.get('/phishingAttempts');
            setPhishingAttempts(res.data);
            setLoading(false);
        };
        getPhishingAttempts();
    }, [client]);

    return (
        <>
            <Box my={1} display="flex" justifyContent="center" width="100%">
                <FormGroup sx={{ width: '100%', maxWidth: 400 }}>
                    <Box
                        my={2}
                        component={TextField}
                        type="email"
                        label="Email"
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Button onClick={sendPhishingAttempt}>Send</Button>
                </FormGroup>
            </Box>
            {loading ? (
                <Typography variant="h5">Loading phishing attempts...</Typography>
            ) : phishingAttempts.map(attempt => (
                <Box component={Card} mb={2} key={attempt._id} sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Status: {attempt.status}
                        </Typography>
                        <Typography variant="h5" component="div">
                            {attempt.email}
                        </Typography>
                        <Typography variant="body2">
                            {attempt.emailContent}
                        </Typography>
                    </CardContent>
                </Box>
            ))}
        </>
    );
}
