import React from 'react'
import { connect } from 'react-redux'
import customerSelector from '../selectors/customers'
import CustomerListItem from './CustomerListItem'

const ExpenseList = (props) => {
    const displayNumber = (number) => {
        const displayedCustomers = [];
        for (let i = 0; i < number; i++){
            if (props.customers[i]){
                displayedCustomers.push(<CustomerListItem key={props.customers[i].id} {...props.customers[i]}/>)
            } else { break }

        }
        return displayedCustomers
    };

    return (
        <div className="start_prompt">
            {props.filters.text === '' ?

                <h3>Enter a name in the search bar..</h3> :

                <div className="list">{displayNumber(5)}</div>
            }
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        customers: customerSelector(state.customers, state.filters),
        filters: state.filters
    }
};

export default connect(mapStateToProps)(ExpenseList);