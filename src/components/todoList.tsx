import React from 'react';

interface ITodoListItem {
    id: string;
    text: string;
}

interface ITodoListProps {
    initialText : string
}

interface ITodoListState {
  items : ITodoListItem[];
  text : string;
}

export class TodoList extends React.Component<ITodoListProps, ITodoListState> {
  constructor(props : ITodoListProps) {
    super(props);
    // this.state = { items: [], text: '' };
    this.state = {
      items: [{id: "1", text:"a"}, {id: "2", text: "b"}],
      text: props.initialText
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div>
        <h3>TODO</h3>
        <TodoListItemView items={this.state.items} />
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


interface ITodoListItemProps {
  items : ITodoListItem[];
}

interface ITodoListItemState {
}

class TodoListItemView extends React.Component<ITodoListItemProps, ITodoListItemState> {
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

export default TodoList;