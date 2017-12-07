import React from 'react';
import moment from 'moment';
import uuid from 'uuid';
import DependantFormItem from './DependantFormItem';
import { addDependant } from '../actions/customers';
import { Link } from 'react-router-dom';

class CustomerForm extends React.Component {
  state = {
    name: this.props.customer ? this.props.customer.name : '',
    age: this.props.customer ? this.props.customer.age : '',
    address: this.props.customer
      ? {
          address: this.props.customer.address.address,
          city: this.props.customer.address.city,
          state: this.props.customer.address.state
        }
      : {
          address: '',
          city: 'Raleigh',
          state: 'North Carolina'
        },
    coats: this.props.customer && this.props.customer.coats,
    shoes: this.props.customer && this.props.customer.shoes,
    phoneNumber: this.props.customer ? this.props.customer.phoneNumber : '',
    dependants: this.props.customer && this.props.customer.dependants,
    visits: this.props.customer && this.props.customer.visits,
    currentlyShopping: this.props.customer
      ? this.props.customer.currentlyShopping
      : false,
    phoneNumberError: false,
    error: false
  };
  addDependantItem = () => {
    if (this.state.dependants) {
      this.setState(prevState => ({
        dependants: prevState.dependants.concat(
          addDependant({ name: '', age: '' })
        )
      }));
    } else {
      this.setState(prevState => ({
        dependants: [addDependant({ name: '', age: '' })]
      }));
    }
  };
  removeDependantItem = id => {
    if (this.state.dependants) {
      this.setState(prevState => ({
        dependants: prevState.dependants.filter(dependant => {
          return dependant.id !== id;
        })
      }));
    }
  };
  onNameChange = e => {
    const name = e.target.value;
    this.setState(() => ({ name }));
  };
  onAgeChange = e => {
    const age = e.target.value;
    this.setState(() => ({ age }));
  };
  onDependantChange = (id, dependantObject) => {
    if (this.state.dependants) {
      this.setState(prevState => ({
        dependants: prevState.dependants.map(dependant => {
          if (dependant.id === id) {
            return dependantObject;
          }
          return dependant;
        })
      }));
    }
  };
  onAddressChange = e => {
    const address = e.target.value;
    this.setState(() => ({
      address: {
        address: address,
        city: this.state.address.city,
        state: this.state.address.state
      }
    }));
  };
  onAddressCityChange = e => {
    const city = e.target.value;
    this.setState(() => ({
      address: {
        address: this.state.address.address,
        city: city,
        state: this.state.address.state
      }
    }));
  };
  onAddressStateChange = e => {
    const state = e.target.value;
    this.setState(() => ({
      address: {
        address: this.state.address.address,
        city: this.state.address.city,
        state: state
      }
    }));
  };
  onPhoneNumberChange = e => {
    const phoneNumber = e.target.value;
    this.setState(() => ({ phoneNumber }));
  };
  SubmitCustomer = e => {
    e.preventDefault();
    if (
      this.state.name &&
      this.state.age &&
      this.state.address.address &&
      (!this.state.phoneNumber ||
        this.state.phoneNumber.match(
          /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/
        ))
    ) {
      this.setState(() => ({ error: false }));
      this.props.onSubmitCustomer({
        name: this.state.name,
        age: this.state.age,
        address: {
          address: this.state.address.address,
          city: this.state.address.city,
          state: this.state.address.state
        },
        phoneNumber: this.state.phoneNumber,
        coats: this.state.coats ? this.state.coats : false,
        shoes: this.state.shoes ? this.state.shoes : false,
        visits: this.state.visits ? this.state.visits : false,
        dependants: this.state.dependants ? this.state.dependants : false
      });
    } else {
      if (
        this.state.phoneNumber &&
        !this.state.phoneNumber.match(
          /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/
        )
      ) {
        this.setState(() => ({ phoneNumberError: true }));
      } else {
        this.setState(() => ({ error: true }));
      }
    }
  };
  render() {
    return (
      <div>
        <form className="form_container" onSubmit={this.SubmitCustomer}>
          <div className="form_item">
            <div className="form_label">Name:</div>
            <input
              autoFocus
              className="form_text_bar"
              type="text"
              placeholder="Name"
              value={this.state.name}
              onChange={this.onNameChange}
            />
          </div>

          <div className="form_item">
            <div className="form_label">Age:</div>
            <input
              className="form_text_bar"
              type="number"
              placeholder="Age"
              value={this.state.age}
              onChange={this.onAgeChange}
            />
          </div>

          <div className="form_item">
            <div className="form_label">Address:</div>
            <input
              className="form_text_bar"
              type="text"
              placeholder="Address"
              value={this.state.address.address}
              onChange={this.onAddressChange}
            />
          </div>

          <div className="form_item">
            <div className="form_label">City:</div>
            <input
              className="form_text_bar"
              type="text"
              placeholder="City"
              value={this.state.address.city}
              onChange={this.onAddressCityChange}
            />
          </div>

          <div className="form_item">
            <div className="form_label">State:</div>
            <input
              className="form_text_bar"
              type="text"
              placeholder="State"
              value={this.state.address.state}
              onChange={this.onAddressStateChange}
            />
          </div>

          <div className="form_item">
            <div className="form_label">Phone Number:</div>
            <input
              className="form_text_bar"
              type="text"
              placeholder="Phone Number"
              value={this.state.phoneNumber}
              onChange={this.onPhoneNumberChange}
            />
          </div>

          {this.state.phoneNumberError && (
            <h4 className="error">Invalid phone number</h4>
          )}

          <div className="form_item">
            <div className="form_label">Dependants:</div>
          </div>

          {this.state.dependants && (
            <div className="dependant">
              {this.state.dependants.map(dependant => {
                return (
                  <DependantFormItem
                    dependant={dependant}
                    key={dependant.id}
                    onDependantChange={this.onDependantChange}
                    removeDependantItem={this.removeDependantItem}
                  />
                );
              })}
            </div>
          )}

          <div>
            <button
              className="add_dependant"
              type="button"
              onClick={this.addDependantItem}
            >
              Add Dependant +
            </button>
          </div>

          {this.state.error && (
            <h4 className="error">
              Fill out the following fields to submit. ( Name, Age, Address )
            </h4>
          )}

          <div className="button_layout">
            <button className="sign_in_button" type="submit">
              Save Customer
            </button>
            <Link className="edit_button_container" to={'/dashboard'}>
              <button className="cancel_button">Cancel</button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default CustomerForm;
