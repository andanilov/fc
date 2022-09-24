import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import QualityService from "../services/qualityService";

const QualityContext = React.createContext();

export const useQuality = () => useContext(QualityContext);

const QualityProvider = ({ children }) => {
    const [qualities, setQuality] = useState([]);
    const [isLoading, setIsLoadind] = useState(true);
    const [error, setError] = useState();

    const getQualities = async () => {
        try {
            const { content } = await QualityService.fetchAll();
            setQuality(content);
        } catch (error) {
            errorCatcher(error);
        } finally {
            setIsLoadind(false);
        }
    };
    useEffect(() => { getQualities(); }, []);

    const getQualityByIds = (ids) => qualities.filter(({ _id }) => ids.includes(_id));

    const errorCatcher = (error) => setError(error?.response?.data?.message);
    useEffect(() => { error && toast.error(error); }, [error]);

    return (
        <QualityContext.Provider value={{
            qualities,
            isLoading,
            getQualityByIds
        }}>
            {children}
        </QualityContext.Provider>
    );
};

QualityProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default QualityProvider;
