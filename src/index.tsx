import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { LocaleProvider } from 'antd';
import ptBR from 'antd/lib/locale-provider/pt_BR';


ReactDOM.render(
  <LocaleProvider locale={ptBR}>
    <App />
  </LocaleProvider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
