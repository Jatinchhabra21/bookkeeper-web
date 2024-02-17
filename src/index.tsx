import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store/store';

// eslint-disable-next-line no-undef
const root = createRoot(document.getElementById('root') as Element);
root.render(
	<Provider store={store}>
		<App />
	</Provider>
);
