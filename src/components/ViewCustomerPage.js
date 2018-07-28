import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startEditSingleProp } from '../actions/customers';
import { capitalize } from '../utils/index';

class ViewCustomerPage extends React.Component {
  state = {
    alreadySignedIn: false,
    showAllVisits: false
  };
  showAllVisits = () => {
    this.setState(prevState => ({ showAllVisits: !prevState.showAllVisits }));
  };
  sortVisits = () => {
    if (this.props.customer.visits !== false) {
      return this.props.customer.visits.sort((a, b) => {
        return b - a;
      });
    }
    return [];
  };
  showVisits = number => {
    const visits = this.sortVisits();
    let showVisits = [];
    const generateVisitItems = i => {
      if (moment(visits[i]).format('YYYY-M-D') === moment().format('YYYY-M-D')) {
        return (
          <p className="today" key={visits[i]}>
            {moment(visits[i]).format('MMM Do, YYYY')}
          </p>
        );
      }
      return <p key={visits[i]}>{moment(visits[i]).format('MMM Do, YYYY')}</p>;
    };

    for (let i = 0; i < number; i++) {
      if (visits[i]) {
        showVisits.push(generateVisitItems(i));
      } else {
        break;
      }
    }

    return showVisits;
  };

  signIn = () => {
    if (this.props.customer.visits === false) {
      this.props.dispatch(
        startEditSingleProp(this.props.customer.id, {
          visits: [Number(moment().format('x'))]
        })
      );
    } else if (
      moment(this.props.customer.visits[0]).format('YYYY-MM-DD') !== moment().format('YYYY-MM-DD')
    ) {
      this.props.dispatch(
        startEditSingleProp(this.props.customer.id, {
          visits: this.props.customer.visits.concat(Number(moment().format('x')))
        })
      );
    } else {
      this.setState(() => ({ alreadySignedIn: true }));
    }
  };
  addCoat = () => {
    if (this.props.customer.coats !== false) {
      this.props.dispatch(
        startEditSingleProp(this.props.customer.id, {
          coats: this.props.customer.coats.concat(Number(moment().format('x')))
        })
      );
    } else {
      this.props.dispatch(
        startEditSingleProp(this.props.customer.id, {
          coats: [Number(moment().format('x'))]
        })
      );
    }
  };
  addShoes = () => {
    if (this.props.customer.shoes !== false) {
      this.props.dispatch(
        startEditSingleProp(this.props.customer.id, {
          shoes: this.props.customer.shoes.concat(Number(moment().format('x')))
        })
      );
    } else {
      this.props.dispatch(
        startEditSingleProp(this.props.customer.id, {
          shoes: [Number(moment().format('x'))]
        })
      );
    }
  };
  render() {
    return (
      <div className="view_customer_wrapper">
        <div className="view_customer_items">
          <div className="item">
            <h1>
              {`
                ${capitalize(this.props.customer.firstName)}
                ${capitalize(this.props.customer.lastName)}
              `}
            </h1>
          </div>
          <div className="item">
            <p>
              <b>Age:</b>
              {` ${this.props.customer.age}`}
            </p>
          </div>
          <div className="item">
            <p>
              <b>Address:</b>
              {` ${this.props.customer.address.address},
                        ${this.props.customer.address.city},
                        ${this.props.customer.address.state}`}
            </p>
          </div>
          <div className="item">
            <p>
              <b>Phone Number:</b> {this.props.customer.phoneNumber}
            </p>
          </div>

          <div className="item">
            <b>
              <p>Dependants:</p>
            </b>

            {this.props.customer.dependants !== false &&
              this.props.customer.dependants.map(dependant => {
                return (
                  <p key={dependant.name}>{`${capitalize(dependant.name)}, ${dependant.age}`}</p>
                );
              })}
          </div>
          <div className="item">
            <b>
              <p>Visits:</p>
            </b>
            {this.props.customer.visits !== false &&
            this.state.showAllVisits === true &&
            this.props.customer.visits.length > 3
              ? this.showVisits(this.props.customer.visits.length)
              : this.showVisits(3)}
            <div className="show_visit_container">
              <button className="show_visit_button" onClick={this.showAllVisits}>
                {this.state.showAllVisits ? 'Show less' : 'Show more'}
              </button>
            </div>
          </div>

          <div className="item">
            <p>
              <b>Number of visits this year:</b>
              <span>
                {this.props.customer.visits !== false
                  ? this.props.customer.visits.filter(
                      visit => moment(visit).format('YYYY') === moment().format('YYYY')
                    ).length
                  : 0}
              </span>
            </p>
          </div>
        </div>

        <div className="limited_item_layout">
          <div className="limited_item">
            <div>
              <b>Coats this winter season:</b>
              <span>
                {this.props.customer.coats !== false
                  ? this.props.customer.coats.filter(createdAt => {
                      if (
                        moment(createdAt).format('YYYY') === moment().format('YYYY') /// If coat received in the current year
                      ) {
                        if (
                          Number(moment().format('M')) < 10 || // If the current month is before October, Or
                          Number(moment(createdAt).format('M')) >= 10
                        ) {
                          // (after October) If the coat was received after October, 1st
                          return createdAt;
                        }
                      } else if (
                        Number(moment(createdAt).format('YYYY')) -
                          Number(moment().format('YYYY')) ===
                        -1 // If coat received last year
                      ) {
                        if (
                          Number(moment().format('M')) < 10 && // If the current month is before Oct
                          Number(moment(createdAt).format('M')) >= 10 // and the coat was received after Oct 1st, last year.
                        ) {
                          return createdAt;
                        }
                      }
                    }).length
                  : 0}
              </span>
            </div>
            <p className="reset_text">(Resets October 1st of each year)</p>
            <button className="coat_button" onClick={this.addCoat}>
              Add Coat
            </button>
          </div>

          <div className="limited_item">
            <div>
              <b>Shoes this year:</b>
              <span>
                {this.props.customer.shoes !== false
                  ? this.props.customer.shoes.filter(
                      createdAt => moment(createdAt).format('YYYY') === moment().format('YYYY')
                    ).length
                  : 0}
              </span>
            </div>
            <p className="reset_text">(Resets January 1st of each year)</p>
            <button className="shoes_button" onClick={this.addShoes}>
              Add Pair of Shoes
            </button>
          </div>
        </div>

        <div className="error">
          <h3 className="multiple_sign_in">
            {this.state.alreadySignedIn && 'This customer has already signed in today'}
          </h3>
        </div>

        <div className="button_layout">
          <button className="sign_in_button" onClick={this.signIn}>
            Sign in customer
          </button>
          <Link className="edit_button_container" to={`/edit/${this.props.customer.id}`}>
            <button className="edit_button">Edit Customer Info</button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  customer: state.customers.find(customer => customer.id === props.match.params.id)
});

export default connect(mapStateToProps)(ViewCustomerPage);
