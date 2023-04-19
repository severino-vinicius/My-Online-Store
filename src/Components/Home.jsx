import React, { Component } from 'react';

class home extends Component {
  render() {
    // const { research } = this.props;
    return (
      <>
        <div>home</div>
        <input type="text" name="research" id="" data-testid="home-initial-message" />
        { research && <p>Digite algum termo de pesquisa ou escolha uma categoria.</p> }
      </>
    );
  }
}

export default home;
