import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@/store/store.ts';

async function prepare() {
  if (process.env.NODE_ENV === 'development') {
    const { makeServer } = await import('./mocks/server');
    makeServer();
  }
}

prepare().then(() => {
  createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
  );
});
