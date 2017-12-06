import React from 'react';
import CustomerForm from './CustomerForm'
import { startAddCustomer } from "../actions/customers";
import { connect } from 'react-redux'

const CreateCustomerPage = (props) => {
    return (
        <div>
            <h1 className="section_label">Create a new customer</h1>
            <CustomerForm
                onSubmitCustomer={(customer) => {
                    console.log(customer);
                    props.dispatch(startAddCustomer(customer));

                    // redirect user back to dashboard
                    props.history.push('/dashboard')
                }}/>
        </div>
    );
};

export default connect()(CreateCustomerPage)