import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import professionService from "../services/professionService";
import toast from "react-hot-toast";

const ProfessionContext = React.createContext();

export const useProfession = () => useContext(ProfessionContext);

const ProfessionProvider = ({ children }) => {
    const [professions, setProfessions] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    const getProfessions = async () => {
        try {
            const { content } = await professionService.fetchAll();
            setProfessions(content);
        } catch (error) {
            errorCatcher(error);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => { getProfessions(); }, []);

    const getProfessionById = (id) => professions.find(({ _id }) => _id === id).name;

    const errorCatcher = (error) => setError(error?.response?.data?.message);
    useEffect(() => { error && toast.error(error); }, [error]);

    return (
        <ProfessionContext.Provider value={{ isLoading, professions, getProfessionById }}>
            {children}
        </ProfessionContext.Provider>
    );
};

ProfessionProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ProfessionProvider;
