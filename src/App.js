import { Provider } from 'react-redux';
import './App.css';

import store from './store';

import GameContainer from './components/GameContainer';
import { BlockchainProvider } from './blockchain';

function App() {
  return (
    <Provider store={store}>
      <BlockchainProvider>
        <div className="App">
            <GameContainer/>
        </div>
      </BlockchainProvider>
    </Provider>
  );
}

export default App;
