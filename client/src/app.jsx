import React from "react";
// import styled from 'styled-components';
import ReactDOM from "react-dom";
import Carousel from "./carousel.jsx";
import axios from "axios";
// === STYLES === //

const Wrapper = window.styled.section`
background: #eaeaea;
`;

// === DEFINE APP === //

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cast: [],
      urlID: window.location.pathname.slice(1),
      title: "2001: A SPACE ODYSSEY"
    };
    this.getCast = this.getCast.bind(this);
  }

  // === GET CAST MEMBERS BASED ON MOVIE ID === //

  getCast() {
    axios
      .get(`/actors/${this.state.urlID}`)
      .then(res => {
        console.log(res.data);
        this.setState({ cast: res.data });
      })
      .catch(err => {
        console.log(`getCast error=${err}`);
      });
  }
  // === GET CAST MEMBERS BASED ON COMPONENT MOUNT === //

  componentDidMount() {
    this.getCast();
  }

  // === RENDER LIST OF CAST MEMBERS (for testing purposes) === //

  render() {
    return (
      <Wrapper>
        <Carousel castInfo={this.state.cast} title={this.state.title} />
      </Wrapper>
    );
  }
}

export default App;
