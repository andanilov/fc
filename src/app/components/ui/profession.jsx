import React from "react";
import PropTypes from "prop-types";
import { useProfession } from "../../hooks/useProfession";

const Profession = ({ id }) => {
    const { isLoading, getProfessionById } = useProfession();
    return <>{!isLoading && getProfessionById(id)}</>;
};

Profession.propTypes = {
    id: PropTypes.string.isRequired
};

export default Profession;
