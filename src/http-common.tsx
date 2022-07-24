
import axios from "axios";
export default axios.create({
    baseURL: "http://localhost:4000",
    headers: {
        "Content-type": "application/json",
    }
});


export function getConfigHttpRequest(token: any){
    return {
        baseURL: "http://localhost:4000",
        headers: {
            "Content-type": "application/json",
            'Authorization': 'Bearer '+ token
        }
    };
}