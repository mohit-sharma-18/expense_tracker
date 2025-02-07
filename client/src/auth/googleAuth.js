import { useEffect } from "react";
import callApi from "../utility/callApi";

const GoogleAuthLogin = ({ email }) => {
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
                { theme: "outline", size: "large" }
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
                console.log("User Info:", userData);
                const userEmail = userData.email;
                console.log("User's Email:", userEmail);
                email(userEmail)
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