import React, { Component } from 'react';
import { getCategories } from '../services/api';

class Aside extends Component {
  state = {
    categoriesList: [],
  };

  async componentDidMount() {
    const ResultCategories = await getCategories();
    this.setState({
      categoriesList: ResultCategories,
    });
  }

  render() {
    const { categoriesList } = this.state;
    return (
      <>
        <div>Aside</div>
        { categoriesList.map((category) => (
          <button key={ category.id } data-testid="category">{ category.name }</button>
        ))}
      </>

    );
  }
}

export default Aside;
