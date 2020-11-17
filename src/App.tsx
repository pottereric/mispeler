import React from 'react';
import logo from './logo.svg';
import './App.css';

interface IAppProps {

}

interface IAppState {
  items : ITodoListItem[];
  text : string;
}

class App extends React.Component<IAppProps, IAppState> {
  constructor(props : IAppProps) {
    super(props);
    // this.state = { items: [], text: '' };
    this.state = {
      items: [{id: "1", text:"a"}, {id: "2", text: "b"}],
      text: "none"
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div>
        <h3>TODO</h3>
        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="new-todo">
            What needs to be done?
          </label>
          <input
            id="new-todo"
            onChange={this.handleChange}
            value={this.state.text}
          />
          <button>
            Add #{this.state.items.length + 1}
          </button>
        </form>
      </div>
    );
  }

  handleChange(e : any) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e : any) {
    e.preventDefault();
    if (this.state.text.length === 0) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now().toString()
    };
    this.setState(state => ({
      items: state.items.concat(newItem),
      text: ''
    }));
  }
}

interface ITodoListItem {
  id: string;
  text: string;
}
interface ITodoListProps {
  items : ITodoListItem[];
}

interface ITodoListState {
  text : string;
}

class TodoList extends React.Component<ITodoListProps, ITodoListState> {
  render() {
    return (
      <ul>
        {this.props.items.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    );
  }
}

export default App;
