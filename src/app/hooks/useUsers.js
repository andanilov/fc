import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import userService from "../services/userService";
import toast from "react-hot-toast";

const UserContext = React.createContext();

export const useUser = () => useContext(UserContext);

const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const { fetchAll } = userService;

    const getUsers = async () => {
        try {
            const { content } = await fetchAll();
            toast.success(`Загружено ${content.length} пользователей`);
            return content;
        } catch (error) {
            errorCatcher(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { getUsers().then((usrs) => setUsers(usrs)); }, []);

    const errorCatcher = (error) => setError(error?.response?.data?.message);
    useEffect(() => { error && toast.error(error); }, [error]);

    return (
        <UserContext.Provider value={{ users }}>
            {loading ? <h1>Loading!</h1> : children}
        </UserContext.Provider>);
};

UserProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default UserProvider;
