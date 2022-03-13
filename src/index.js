import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import App from './App.js';
import root from './root.js';

ReactDOM.render(<React.StrictMode>
	<HashRouter>
		<App />
	</HashRouter>
</React.StrictMode>, root);