import React from 'react';
import logo from './logo.svg';
import './App.css';
import { TodoList } from './components/todoList'

interface IAppProps {
}

interface IAppState {
}

class App extends React.Component<IAppProps, IAppState> {

  render() {
    return (
      <div>
        <TodoList initialText="baz" />
      </div>
    );
  }

}



export default App;
