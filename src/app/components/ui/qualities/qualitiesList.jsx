import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useQuality } from "../../../hooks/useQuality";

const QualitiesList = ({ qualities }) => {
    const { isLoading, getQualityByIds } = useQuality();
    return (
        <>
            {!isLoading && getQualityByIds(qualities).map((qual) => (
                <Quality key={qual._id} {...qual} />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
