import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { CookiesProvider } from 'react-cookie';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
<CookiesProvider>
    <App />
</CookiesProvider>, document.getElementById('root'));
registerServiceWorker();
