import App from './App';
import './index.scss';
import { AuthClient } from '@dfinity/auth-client';

let authClient = null;

async function init() {
    authClient = await AuthClient.create();
    new App(authClient);
}
document.addEventListener('DOMContentLoaded', init);