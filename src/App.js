import { Provider } from 'react-redux';
import './App.css';
import Tabs from './components/Tabs';
import { store } from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <div className='container'>
        <Tabs/>
      </div>
    </Provider>
  );
}

export default App;
