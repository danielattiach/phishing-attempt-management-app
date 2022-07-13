import { useState, createContext, useEffect } from 'react';
import axios from 'axios';

export const authContext = createContext(null);
export const AuthContextProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    const config = {
        headers: {
            authorization: token ? `JWT ${token}` : '',
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    };
    const client = axios.create(config);

    useEffect(() => {
        if (token) {
            localStorage.setItem('phishingAppToken', token);
        }
    }, [token])

    useEffect(() => {
        const getAndSetUser = async token => {
            try {
                const res = await client.get('/user/getUser', {
                    headers: {
                        ...config.headers,
                        authorization: `JWT ${token}`,
                    },
                });
                setUser(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        const token = localStorage.getItem('phishingAppToken');
        if (token) {
            setToken(token);
            getAndSetUser(token);
        }
    }, [])

    return (
        <authContext.Provider value={{ client, setToken, user, setUser }}>
            {children}
        </authContext.Provider>
    );
};
