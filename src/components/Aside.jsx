import PropTypes from 'prop-types';
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
    console.log(ResultCategories);
  }

  render() {
    const { categoriesList } = this.state;
    const { handleQuery } = this.props;
    return (
      <aside>
        { categoriesList.map((category) => (
          <button
            onClick={ handleQuery }
            key={ category.id }
            data-testid="category"
            id={ category.id }
          >
            { category.name }

          </button>
        ))}
      </aside>

    );
  }
}

Aside.propTypes = {
  handleQuery: PropTypes.func.isRequired,
};

export default Aside;
