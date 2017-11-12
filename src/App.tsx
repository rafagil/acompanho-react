import * as React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import Menu from './menu/menu';
import axios from 'axios';
import './App.css';
import 'antd/dist/antd.css';

axios.defaults.baseURL = 'https://acompanho.azurewebsites.net/api/';
axios.defaults.headers['x-ms-client-principal-id'] = '10208635091468660'; //DEBUG ENV ONLY!!!

class App extends React.Component<{}, {}> {
  render() {
    return (
      <Provider store={createStore(reducers)}>
        <div className="App">
          <Menu />
        </div>
      </Provider>
    );
  }
}

export default App;
