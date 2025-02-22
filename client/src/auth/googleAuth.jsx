import { useEffect } from "react";
import callApi from "../utility/callApi";
import { useNavigate } from "react-router";

const GoogleAuthLogin = ({ gmail }) => {
    const navigate = useNavigate()
    useEffect(() => {
        const script = document.createElement('script')
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true
        script.defer = true
        document.body.appendChild(script)

        script.onload = () => {
            window.google.accounts.id.initialize({
                client_id: '30018128688-7e2rrt9u30ipmmtu1aasfegp59ej3fil.apps.googleusercontent.com',
                callback: handleGmailRes
            })
            window.google.accounts.id.renderButton(
                document.getElementById("google-login-button"),
                { theme: "outline", size: "large", width: 322 }
            );
        }

        return () => {
            document.body.removeChild(script);
        }
    }, []);

    const handleGmailRes = (res) => {
        const token = res.credential;
        fetch("https://oauth2.googleapis.com/tokeninfo?id_token=" + token)
            .then((res) => res.json())
            .then((userData) => {
                const userEmail = userData.email;
                gmail(userEmail)
                if (userData) {
                    callApi('/login', 'POST', { email: userEmail, googleAuth: true }).then((data) => {
                        if (data.auth === true) {
                            return navigate(data.resPath)
                        }
                    })
                }
            })
            .catch((error) => {
                console.error("Error fetching user info:", error);
            });
    }

    return <>
        <div id="google-login-button"></div>
    </>
}

export default GoogleAuthLogin