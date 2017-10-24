import * as React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import Menu from './menu/menu';
import './App.css';
import 'antd/dist/antd.css';

interface AppProps {
}
interface AppState {
}

class App extends React.Component<AppProps, AppState> {
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
