import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { capitalize } from "../utils/index"

const CustomerListItem = ({ id, firstName, lastName, age, dependants }) => {
  const handleDependants = () => {
    if(dependants){
      return dependants.length;
    }
    return 0;
  };
  return (
    <Link className="list_items" to={`/view/${id}`}>
      <h3>{`${capitalize(firstName)} ${capitalize(lastName)}`}</h3>
      <span>{`Age: ${age}`}</span>
      <span>{`Dependants: ${handleDependants()}`}</span>
    </Link>
  );
};

export default connect()(CustomerListItem);
