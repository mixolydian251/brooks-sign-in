import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter } from '../actions/filters';

class CustomerSearch extends React.Component {
  componentDidMount() {
    this.props.dispatch(setTextFilter(''));
  }

  render() {
    return (
      <div className="search_bar_container">
        <input
          autoFocus
          placeholder="Search"
          className="search_bar"
          type="text"
          value={this.props.filters.text}
          onChange={e => {
            this.props.dispatch(setTextFilter(e.target.value));
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    filters: state.filters
  };
};

export default connect(mapStateToProps)(CustomerSearch);
