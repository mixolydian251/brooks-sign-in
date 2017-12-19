import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const CustomerListItem = ({ id, firstName, lastName, age, dependants }) => {
  return (
    <Link className="list_items" to={`/view/${id}`}>
      <h3>{`${firstName} ${lastName}`}</h3>
      <span>{`Age: ${age}`}</span>
      <span>{`Dependants: ${
        dependants === false ? 0 : dependants.length
      }`}</span>
    </Link>
  );
};

export default connect()(CustomerListItem);
