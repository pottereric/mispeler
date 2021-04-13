import React from 'react';
// import logo from './logo.svg';
import './App.css';
// import { TodoList } from './components/todoList'
import { Mispeler } from './components/mispeller';

interface IAppProps {
}

interface IAppState {
}

class App extends React.Component<IAppProps, IAppState> {

  render() {
    return (
      <div>
        {/* <TodoList initialText="baz" /> */}
        <Mispeler initialText="" />
      </div>
    );
  }

}



export default App;
