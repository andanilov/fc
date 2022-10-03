import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/userService";
import toast from "react-hot-toast";
import config from "../../config.json";
import { setToken } from "../services/localStorageService";

const httpAuth = axios.create();

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [error, setError] = useState();

    const signIn = async ({ email, password }) => {
        try {
            const { data } = await httpAuth.post(
                config.firebaseSignInEndpoint + process.env.REACT_APP_FIREBASE_KEY,
                { email, password, returnSecureToken: true }
            );
            setToken(data);
            setCurrentUser(await userService.getById(data.localId));
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error?.response?.data?.error;
            let newError = error;
            code === 400 && message === "EMAIL_NOT_FOUND" && (newError = { email: `Логин или пароль не верные!` });
            code === 400 && message === "INVALID_PASSWORD" && (newError = { email: `Логин или пароль не верные!` });
            throw newError;
        }
    };

    const signUp = async ({ email, password, ...rest }) => {
        try {
            const { data } = await httpAuth.post(
                config.firebaseSignUpEndpoint + process.env.REACT_APP_FIREBASE_KEY,
                { email, password, returnSecureToken: true }
            );
            setToken(data);
            createUser({ ...rest, _id: data.localId, email, password });
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error?.response?.data?.error;
            let newError = error;
            code === 400 && message === "EMAIL_EXISTS" && (newError = { email: `Пользователь с email: ${email} уже существует` });
            throw newError;
        }
    };

    const createUser = async (data) => {
        try {
            const { content } = await userService.create(data);
            setCurrentUser(content);
            toast.success(`Пользователь ${data.email} успешно зарегистрирован!`);
        } catch (error) {
            errorCatcher(error);
        }
    };

    const errorCatcher = (error) => setError(error?.response?.data?.message);
    useEffect(() => { error && toast.error(error); }, [error]);

    return (
        <AuthContext.Provider value={{ signUp, signIn, currentUser }}>
            { children }
        </AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
