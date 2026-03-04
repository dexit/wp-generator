import React from 'react';

const FormTextInput = ({ label, value, onChange, placeholder, helptext, disabled, col = 12 }) => {
    return (
        <div className={`col-md-${col} mb-3`}>
            <div className="form-group">
                {label && <label className="form-label">{label}</label>}
                {helptext && <span className="form-text d-block mb-1">{helptext}</span>}
                <input
                    type="text"
                    className="form-control"
                    placeholder={placeholder}
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    disabled={disabled}
                    autoComplete="off"
                />
            </div>
        </div>
    );
};

export default FormTextInput;
