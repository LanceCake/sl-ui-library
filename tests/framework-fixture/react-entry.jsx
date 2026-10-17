import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import Harness from './Harness.jsx';
import {registry} from './registry-react.js';
const root=createRoot(document.querySelector('#root'));
root.render(<StrictMode><Harness registry={registry}/></StrictMode>);
