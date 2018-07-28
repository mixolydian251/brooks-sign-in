import database, { firebase } from '../firebase/firebase';

export default class Analytics {
  constructor(data) {
    this.data = data;
  }

  totalCustomers = () => this.data.length;

  sortByMostVisits = () => {
    return this.data
      .map(customer => ({
        name: `${customer.firstName} ${customer.lastName}`,
        visits: customer.visits.length
      }))
      .filter(customer => customer.visits)
      .sort((a, b) => b.visits - a.visits);
  };

  sortByMostDependants = () => {
    return this.data
      .map(customer => ({
        name: `${customer.firstName} ${customer.lastName}`,
        familySize: customer.dependants ? customer.dependants.length + 1 : 1
      }))
      .sort((a, b) => b.familySize - a.familySize);
  };

  ageRange = () => {
    return this.data
      .map(customer => ({
        name: `${customer.firstName} ${customer.lastName}`,
        age: customer.age
      }))
      .sort((a, b) => b.age - a.age);
  };
}

// Customer Data Model

// firstName = '',
// lastName = '',
// age = 0,
// address = {
//   address: '',
//   city: '',
//   state: ''
// },
// coats = false || [],
// shoes = false || [],
// phoneNumber = '',
// dependants = false || [],
// visits = false || []

// getCustomers = async () => {
//   console.log("grabbing customers...");
//   const { uid } = this.state;
//   const customers = [];
//   const data = await database.ref(`users/${uid}/customers`).once('value');
//   await data.forEach(childSnapshot => {
//     customers.push({
//       id: childSnapshot.key,
//       ...childSnapshot.val()
//     });
//   });
//
//   console.log("retrieved data!")
//   return customers;
// };
