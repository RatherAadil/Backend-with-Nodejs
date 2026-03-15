import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

const GOOGLE_CLIENTID =
  '892369161941-g99qleria2ejrfsrffj49s1349qg0es7.apps.googleusercontent.com';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENTID}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
);
