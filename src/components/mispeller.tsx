import React from 'react';
import {misspellText} from '../libs/TextMisspeller'
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Paper } from '@material-ui/core';
import { Container } from '@material-ui/core';

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
      <Container maxWidth="md">
        <Paper>
          <h3>drunkentoddlerbrokenkeyboard.com</h3>
          <form onSubmit={this.handleSubmit}>
            <TextField
              id="outlined-multiline-static"
              label="type your words"
              multiline
              rows={6}
              fullWidth
              variant="outlined"
              value={this.state.inputText}
              onChange={this.handleChange}
            />
            <br/>
            <Button variant="contained" onClick={() => { this.changeTheText(); }}>Go</Button>
            <p>
              {this.state.mispeledText}
            </p>
          </form>
        </Paper>
        <a href="http://humbletoolsmith.com/2021/04/16/what-is-the-opposite-of-a-spell-checker/" >Why?</a>
      </Container>
    );
  }

  handleChange(e : any) {
    this.setState({ inputText: e.target.value });
  }

  handleSubmit(e : any) {
    e.preventDefault();
    this.changeTheText();
  }

  changeTheText(){
    if (this.state.inputText.length === 0) {
      return;
    }
    this.setState(state => ({
      inputText: "",
      mispeledText: misspellText(this.state.inputText)
    }));
  }
}