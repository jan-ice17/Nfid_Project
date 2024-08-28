import { html, render } from 'lit-html';
import { NFID_project_janice_backend } from 'declarations/NFID_project_janice_backend';
import logo from './logo2.svg';

class App {
    greeting = '';
    principalId = '';
    authClient = null;

    constructor(authClient) {
        this.authClient = authClient;
        this.render();
    }

    handleLogin = async() => {
        if (!this.authClient) throw new Error("AuthClient not initialized");

        this.authClient.login({
            onSuccess: this.handleSuccess,
        });
    };

    handleSuccess = () => {
        const principalId = this.authClient.getIdentity().getPrincipal().toText();
        this.principalId = `Your PrincipalId: ${principalId}`;
        this.render();
    };

    handleSubmit = async(e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        this.greeting = await NFID_project_janice_backend.greet(name);
        this.render();
    };

    render() {
        const body = html `
      <main>
        <img src="${logo}" alt="DFINITY logo" />
        <br />
        <br />
        <div>
          <button @click=${this.handleLogin}>Log me in !!!!!!!!</button>
        </div>
        <div id="principalId">${this.principalId}</div>
        <form @submit=${this.handleSubmit}>
          <label for="name">Enter your name!!!!!!!!: &nbsp;</label>
          <input id="name" alt="Name" type="text" />
          <button type="submit">Click Me!</button>
        </form>
        <section id="greeting">${this.greeting}</section>
      </main>
    `;
        render(body, document.getElementById('root'));
    }
}

export default App;