import React from 'react';
import DependantFormItem from './DependantFormItem';
import { addDependant } from '../actions/customers';
import { Link } from 'react-router-dom';

class CustomerForm extends React.Component {
  state = {
    firstName: this.props.customer ? this.props.customer.firstName : '',
    lastName: this.props.customer ? this.props.customer.lastName : '',
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
    currentlyShopping: this.props.customer ? this.props.customer.currentlyShopping : false,
    phoneNumberError: false,
    error: false
  };
  addDependantItem = () => {
    if (this.state.dependants) {
      this.setState(prevState => ({
        dependants: prevState.dependants.concat(addDependant({ name: '', age: '' }))
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
  onFirstNameChange = e => {
    const firstName = e.target.value;
    this.setState(() => ({ firstName }));
  };
  onLastNameChange = e => {
    const lastName = e.target.value;
    this.setState(() => ({ lastName }));
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
      this.state.firstName &&
      this.state.lastName &&
      this.state.age &&
      this.state.address.address &&
      (!this.state.phoneNumber ||
        this.state.phoneNumber.match(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/))
    ) {
      this.setState(() => ({ error: false }));
      this.props.onSubmitCustomer({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
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
        !this.state.phoneNumber.match(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/)
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
          <div className="form_name_item">
            <div className="form_label">Name:</div>

            <div className="text_bar_container">
              <input
                autoFocus
                className="name_text_bar"
                type="text"
                placeholder="First Name"
                value={this.state.firstName}
                onChange={this.onFirstNameChange}
              />
              <input
                className="name_text_bar"
                type="text"
                placeholder="Last Name"
                value={this.state.lastName}
                onChange={this.onLastNameChange}
              />
            </div>
          </div>

          <div className="form_item">
            <div className="form_label">Age:</div>
            <div className="text_bar_container">
              <input
                className="form_text_bar"
                type="number"
                placeholder="Age"
                value={this.state.age}
                onChange={this.onAgeChange}
              />
            </div>
          </div>

          <div className="form_item">
            <div className="form_label">Address:</div>

            <div className="text_bar_container">
              <input
                className="form_text_bar"
                type="text"
                placeholder="Address"
                value={this.state.address.address}
                onChange={this.onAddressChange}
              />
            </div>
          </div>

          <div className="form_item">
            <div className="form_label">City:</div>

            <div className="text_bar_container">
              <input
                className="form_text_bar"
                type="text"
                placeholder="City"
                value={this.state.address.city}
                onChange={this.onAddressCityChange}
              />
            </div>
          </div>

          <div className="form_item">
            <div className="form_label">State:</div>

            <div className="text_bar_container">
              <input
                className="form_text_bar"
                type="text"
                placeholder="State"
                value={this.state.address.state}
                onChange={this.onAddressStateChange}
              />
            </div>
          </div>

          <div className="form_item">
            <div className="form_label">Phone Number:</div>

            <div className="text_bar_container">
              <input
                className="form_text_bar"
                type="text"
                placeholder="Phone Number"
                value={this.state.phoneNumber}
                onChange={this.onPhoneNumberChange}
              />
            </div>
          </div>

          {this.state.phoneNumberError && <h4 className="error">Invalid phone number</h4>}

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
            <button className="add_dependant" type="button" onClick={this.addDependantItem}>
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
