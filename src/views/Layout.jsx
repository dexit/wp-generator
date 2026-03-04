import React from 'react';

const Layout = ({ children }) => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <header className="navbar navbar-dark bg-dark shadow-sm py-3">
                <div className="container-fluid px-4">
                    <a className="navbar-brand d-flex align-items-center fw-bold" href="#">
                        <i className="fab fa-wordpress me-2 text-info"></i>
                        WP GENERATOR <span className="badge bg-info ms-2 small" style={{ fontSize: '10px' }}>PRO</span>
                    </a>
                    <div className="d-flex gap-3">
                        <a href="https://github.com/kapilpaul/wp-generator" target="_blank" className="btn btn-sm btn-outline-light">
                            <i className="fab fa-github me-1"></i>GitHub
                        </a>
                    </div>
                </div>
            </header>

            <main className="flex-grow-1">
                {children}
            </main>

            <footer className="bg-white border-top py-4 mt-auto">
                <div className="container text-center">
                    <p className="text-muted mb-0 small">
                        Modern WordPress Plugin Generator • PHP 8.2+ • WP 6.9+ • Built with React & Vite
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
