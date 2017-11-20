import * as React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import reducers from './reducers';
import Menu from './menu/menu';
import Home from './home/home';
import Entries from './entries/entries';
import EntryViewer from './entries/entry-viewer';
import ProgressBar from './components/progress.bar';
import axios from 'axios';
import './App.css';

axios.defaults.baseURL = 'https://acompanho.azurewebsites.net/api/';
axios.defaults.headers['x-ms-client-principal-id'] = '10208635091468660'; //DEBUG ENV ONLY!!!

class App extends React.Component<{}, {}> {
  render() {
    return (
      <Provider store={createStore(reducers)}>
        <Router>
          <div className="App">
            <Menu />
            <ProgressBar />
            <Route exact path="/" component={Home} />
            <Route exact path="/categories/:categoryId/feeds/:id" component={Entries} />
            <Route exact path="/categories/:categoryId/feeds/:feedId/entries/:id" component={EntryViewer} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
