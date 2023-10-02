import './app.css'
import App from './App.svelte'

let element = document.getElementById('app');
if (element === null) {
    throw new Error("failed to get element by id");
}

const app = new App({
    target: element,
})

export default app
