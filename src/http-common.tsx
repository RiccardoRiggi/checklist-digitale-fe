
import axios from "axios";
export default axios.create({
    baseURL: "http://localhost:4000",
    headers: {
        "Content-type": "application/json",
        "Authorization":getTokenBearer(),
    }
});

function getTokenBearer(){
    let token: any = sessionStorage.getItem("token") != null ? "Bearer "+sessionStorage.getItem("token") : "";
    console.warn("TOKEN: "+token);
    return token;
}