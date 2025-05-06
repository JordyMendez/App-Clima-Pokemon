import axios from "axios";

const API = "http://localhost:5000/users";

export const loginUser = async (username: string, password: string) => {
    const response = await axios.get(API, {
    params: {
        username,
        password,
    },
    });
    if (response.data.length === 0) {
    throw new Error("Credenciales incorrectas");
    }
    return response.data[0];
};
