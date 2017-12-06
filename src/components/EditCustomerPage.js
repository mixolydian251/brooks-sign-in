import React from 'react';
import CustomerForm from './CustomerForm';
import { connect } from 'react-redux';
import {startEditCustomer, startRemoveCustomer} from "../actions/customers";

const EditCustomerPage = (props) => {
    return (
        <div>
            <h1 className="section_label">Editing customer info</h1>
            <CustomerForm
                customer={props.customer}
                onSubmitCustomer={(customer) => {
                    props.dispatch(startEditCustomer(props.customer.id, customer));
                    // redirect user back to dashboard
                    props.history.push('/dashboard')
                }}/>
            <div className="remove_button_layout">
                <div className="remove_button_container">
                    <button
                        className="remove_button"
                        onClick={() => {
                            const remove = confirm('Are you sure you want to remove this customer?' +
                                ' This cannot be undone.');
                            if (remove){
                                props.dispatch(startRemoveCustomer({ id: props.customer.id }));
                                props.history.push('/dashboard')
                            }
                        }}> Remove Customer </button>
                </div>
            </div>

        </div>
    );
};

const mapStateToProps = (state, props) => {
    return {
        customer: state.customers.find((customer) => customer.id === props.match.params.id)
    }
};

export default connect(mapStateToProps)(EditCustomerPage);