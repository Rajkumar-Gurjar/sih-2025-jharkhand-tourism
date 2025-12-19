/**
 * Entry point for the React application.
 * - Imports global styles
 * - Creates the React root and mounts the application inside React StrictMode
 * - Wraps the application with BrowserRouter for client-side routing
 */

import { StrictMode } from 'react'; // Enable additional checks and warnings in development
import { createRoot } from 'react-dom/client'; // New React 18+ root API for concurrent features
import { BrowserRouter } from 'react-router'; // Client-side routing provider
import './index.css'; // Global stylesheet for the application
import App from './App.tsx'; // Root application component (default export)

/**
 * Locate the DOM mount node and bootstrap the React application.
 * - `document.getElementById('root')!` uses a non-null assertion because the mount element
 *   is expected to exist in `index.html`.
 * - `createRoot(...).render(...)` mounts the React tree; wrapping with `StrictMode`
 *   enables additional runtime checks in development.
 * - BrowserRouter enables client-side routing using the HTML5 History API
 */
createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</StrictMode>,
);
