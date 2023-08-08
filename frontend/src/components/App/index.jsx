import { useEffect,useState } from 'react' ;
import jwt_decode from 'jwt-decode';

export default function App() {

    const [user, setUser] = useState({});

    function handleCallbackResponse(response) {
        console.log('Encoded JWT ID Token: '+ response.credential);
        const userObject = jwt_decode(response.credential);
        console.log(userObject);
        setUser(userObject);
        document.getElementById("signInDiv").hidden= true;
    }

    useEffect(() => {
        /*global google */
        google.accounts.id.initialize({
            client_id:'129182167933-q9t8p2reh79v6bu2ric0tsedeeh67elu.apps.googleusercontent.com',
            callback: handleCallbackResponse
        });

        google.accounts.id.renderButton (
            document.getElementById("signInDiv"),
            { theme: "outline", size: "large"}
        );

    },[]);



    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <div id="signInDiv"></div>
            {user && (
                <div>
                    <img src={user.picture} alt={user.name} />
                    <h3>{user.name}</h3>
                </div>
            )}
        </div>
    );}    