import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class JoinNetwork extends Component {
  state = {
    urls: [],
    url: ''
  }

  get_peers = () => {
    fetch('/peers', {method: "GET"})
      .then((res) => res.json()).then((data) => {
        console.log("urls: ", data);
        this.setState({urls: data});
      });
  };

  join_network = (event) => {
    let body = {url: this.state.url};
    fetch('/joinNetwork', {
      method: "POST", 
      body: JSON.stringify(body), 
      headers: {
        "Content-Type": "application/json",
      }
    }).then((res) => {
      event.preventDefault();
      event.target.reset();
    });
  }

  componentDidMount = () => {
    this.get_peers();
  }

  render() {
    return(
      <div>
        <h1>Join Network</h1>
        <Form onSubmit={this.join_network}>
          <Form.Group>
            <Form.Label>Please enter an url in the network to join</Form.Label>
            <Form.Control onChange={(e) => this.setState({url: e.target.value})}></Form.Control>
          </Form.Group>
          <Button type="submit">
            JOIN
          </Button>
        </Form>

        <h4>Connected Peers</h4>
        {this.state.urls.map((url) => {
          return (
            <p>{url}</p>
          )
        })}
      </div>
    )
  }

}

export default JoinNetwork;