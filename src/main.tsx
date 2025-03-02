import { createRoot } from 'react-dom/client'
import AppRouter from '@routes/AppRouter';

// redux
import { Provider } from 'react-redux';
import { store, persistor } from "@store/index";
import { PersistGate } from 'redux-persist/integration/react';
// Style
import 'bootstrap/dist/css/bootstrap.min.css';
// Axios
import "./services/axios-global.js";

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppRouter/>
    </PersistGate>
  </Provider>  
)
