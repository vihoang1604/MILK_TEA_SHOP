import React from 'react';
import './css/style.css'
export const FormError = ({ formErrors }) => {
    return (
        <div className='formErrors text-danger'>
            <p id="error">{formErrors}</p >
        </div>
    )
}