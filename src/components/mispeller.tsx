import React from 'react';
import {misspellText} from '../libs/TextMisspeller'

interface IMispelerProps {
    initialText : string
}

interface IMispelerState {
  inputText : string;
  mispeledText : string;
}

export class Mispeler extends React.Component<IMispelerProps, IMispelerState> {
  constructor(props : IMispelerProps) {
    super(props);
    this.state = {
      inputText: props.initialText,
      mispeledText: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div>
        <h3>MISPEL!</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="new-todo">
            What text needs to change?
          </label>
          <input
            id="new-todo"
            onChange={this.handleChange}
            value={this.state.inputText}
          />
          <button>
            Mispel
          </button>
          <p>
          {this.state.mispeledText}
          </p>
        </form>
      </div>
    );
  }

  handleChange(e : any) {
    this.setState({ inputText: e.target.value });
  }

  handleSubmit(e : any) {
    e.preventDefault();
    if (this.state.inputText.length === 0) {
      return;
    }
    this.setState(state => ({
      inputText: "",
      mispeledText: misspellText(this.state.inputText)
    }));
  }
}