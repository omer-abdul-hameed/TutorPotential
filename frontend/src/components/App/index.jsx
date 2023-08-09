import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import HomePage from '../HomePage';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';

export default function App() {

    const [user, setUser] = useState({});
    const navigate = useNavigate();

    function handleCallbackResponse(response) {
        console.log('Encoded JWT ID Token: ' + response.credential);
        const userObject = jwt_decode(response.credential);
        console.log(userObject);
        setUser(userObject);
        navigate('/');
    }

    function handleSignOut(event) {
        setUser({});
        navigate('/signin'); 
    }

    useEffect(() => {
        /*global google */
        google.accounts.id.initialize({
            client_id: '129182167933-q9t8p2reh79v6bu2ric0tsedeeh67elu.apps.googleusercontent.com',
            callback: handleCallbackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: "outline", size: "large" }
        );

        google.accounts.id.prompt();
    }, []);

    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <Routes>
                <Route path="/" element={
                    Object.keys(user).length === 0 ? (
                        navigate('/signin')
                    ) : (
                        <>
                            <HomePage />
                            <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
                            <div className='flex flex-col items-center justify-center h-screen'>
                                <img src={user.picture} alt={user.name} />
                                <h3 className='text-3xl'>{user.name}</h3>
                            </div>
                        </>
                    )
                } />
                
                <Route path="/signin" element={
                    Object.keys(user).length === 0 ? (
                        <div id="signInDiv"></div>
                    ) : (
                        navigate('/')
                    )
                } />
            </Routes>
        </div>
    );
}
