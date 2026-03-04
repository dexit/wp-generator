import React, { useState } from 'react';

const Card = ({ sectionName, children, defaultOpen = true }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="card mb-3 shadow-sm border-0">
            <div
                className="card-header bg-primary text-white cursor-pointer py-3 d-flex justify-content-between align-items-center"
                onClick={() => setIsOpen(!isOpen)}
                style={{ cursor: 'pointer', borderRadius: '8px 8px 0 0' }}
            >
                <h5 className="mb-0">{sectionName}</h5>
                <i className={`fas ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
            </div>
            {isOpen && (
                <div className="card-body p-4">
                    {children}
                </div>
            )}
        </div>
    );
};

export default Card;
