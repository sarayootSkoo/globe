import { mount } from 'svelte';
import { get } from 'svelte/store';
import App from './App.svelte';
import './app.css';
import { initPersistence } from './lib/stores/persist';
import { initRouter } from './lib/router';
import { theme } from './lib/stores/appState';

// Restore saved settings before first render
initPersistence();

// Initialize URL-based routing (/ = globe, /board = kanban)
initRouter();

// Apply theme to DOM immediately to prevent flash of wrong colors
document.documentElement.dataset.theme = get(theme);

const app = mount(App, { target: document.getElementById('app')! });

export default app;
