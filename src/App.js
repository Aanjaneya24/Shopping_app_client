import React,{Component} from 'react';
import Appnavbar from './components/AppNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import ItemModal from './components/ItemModal';
import {Provider}from 'react-redux';
import { Container } from 'reactstrap';
import store from './store';
import ShoppingList from './components/ShoppingList';
import { loadUser } from './actions/authActions';

import './App.css';


class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Appnavbar />
          <Container>
          <ItemModal />

          <ShoppingList />
          </Container>
        </div>
      </Provider>
    );
  }
}
export default App;
