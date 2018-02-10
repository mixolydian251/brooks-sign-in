import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const CustomerListItem = ({ id, firstName, lastName, age, dependants }) => {
  const handleDependants = () => {
    if(dependants){
      return dependants.length;
    }
    return 0;
  };
  return (
    <Link className="list_items" to={`/view/${id}`}>
      <h3>{`${firstName} ${lastName}`}</h3>
      <span>{`Age: ${age}`}</span>
      <span>{`Dependants: ${handleDependants()}`}</span>
    </Link>
  );
};

export default connect()(CustomerListItem);
