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

  familySizeDemographics = () => {
    const demographic = {
      size1: 0,
      size2: 0,
      size3: 0,
      size4: 0,
      size5: 0,
      size6: 0,
      size7: 0,
      size8_or_more: 0,
    };
    this.data.map(customer => customer.dependants ? customer.dependants.length + 1 : 1 )
      .forEach( size => {
        switch (true) {
          case (size === 1) :
            demographic.size1++;
            break;
          case (size === 2) :
            demographic.size2++;
            break;
          case (size === 3) :
            demographic.size3++;
            break;
          case (size === 4) :
            demographic.size4++;
            break;
          case (size === 5) :
            demographic.size5++;
            break;
          case (size === 6) :
            demographic.size6++;
            break;
          case (size === 7) :
            demographic.size7++;
            break;
          default:
            demographic.size8_or_more++;
        }
      });
    return demographic
  };

  ageDemographics = () => {
    const demographic = {
      age_unlisted: 0,
      age18_24: 0,
      age25_39: 0,
      age40_60: 0,
      age60_and_up: 0
    };
    this.data.map(customer => Number(customer.age))
      .forEach( age => {
        switch (true) {
          case (age < 1) :
            demographic.age_unlisted++;
            break;
          case (age < 25) :
            demographic.age18_24++;
            break;
          case (age < 40) :
            demographic.age25_39++;
            break;
          case (age < 60) :
            demographic.age40_60++;
            break;
          default:
            demographic.age60_and_up++;
            break;
        }
      });
    return demographic
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