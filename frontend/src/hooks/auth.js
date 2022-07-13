import { useContext } from 'react';
import { authContext } from '../context/authContext';

export default function useAuthContext() {
    return useContext(authContext);
}
