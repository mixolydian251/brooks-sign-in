import React from 'react';
import styled from 'styled-components'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import customerSelector from '../selectors/customers';
import CustomerListItem from './CustomerListItem';

const Wrapper = styled.div`
  width: 100%;
`;

const Container = styled.div`
  width: 60vw;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  p{
    margin: 0;
  }
  
  a {
    margin: 10px 0;
  }
  
  @media only screen and (max-width: 700px) {
    flex-direction: column;
  }
`;

const CustomerList = props => {
  const displayNumber = number => {
    const displayedCustomers = [];
    for (let i = 0; i < number; i++) {
      if (props.customers[i]) {
        displayedCustomers.push(
          <CustomerListItem key={props.customers[i].id} {...props.customers[i]} />
        );
      } else {
        break;
      }
    }
    return displayedCustomers;
  };

  return (
    <Wrapper>
      {props.filters.text === '' ? (
        <Container>
          <p>Enter a name in the search bar..</p>
          <Link to="/analytics">View analytics</Link>
        </Container>
      ) : (
        <div className="list">{displayNumber(10)}</div>
      )}
    </Wrapper>
  );
};

const mapStateToProps = state => {
  return {
    customers: customerSelector(state.customers, state.filters),
    filters: state.filters
  };
};

export default connect(mapStateToProps)(CustomerList);
