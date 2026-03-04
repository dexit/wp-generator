import React from 'react';
import ReactDOM from 'react-dom/client';
import { GeneratorProvider } from './state/GeneratorContext';
import Layout from './views/Layout.jsx';
import Home from './views/Home.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GeneratorProvider>
        <Layout>
            <Home />
        </Layout>
    </GeneratorProvider>
  </React.StrictMode>
);
