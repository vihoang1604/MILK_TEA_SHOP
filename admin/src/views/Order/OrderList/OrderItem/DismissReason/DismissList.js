import React from 'react';
import PropTypes from 'prop-types';

const DismissList = ({ type = 'checkbox', name, checked = false, onChange }) => (
        <input id="checkboxDismiss" type={type} name={name} checked={checked} onChange={onChange} />
);

DismissList.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
}

export default DismissList;