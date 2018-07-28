import React from 'react';
const search = require('../images/search.png');
const profile = require('../images/profile.png');
const visits = require('../images/visits.png');
const create = require('../images/create.png');
const dependant = require('../images/dependant.png');

export default () => (
  <div className="help_page_wrapper">
    <h1>How the heck do I use this thing?</h1>
    <p>Don't worry.. Follow these simple guidelines and you'll be a Brooks pro in no time!</p>
    <br />
    <h3>Has the customer been to the clothing closet before?</h3>
    <p>
      {' '}
      - Checking if the customer is registered is easy, start by simply typing their name in the
      search bar.
    </p>
    <p> - You can usually find a customer by typing the first few letters of their name.</p>
    <div className="image_container">
      <img className="search" src={search} />
    </div>
    <p> - If you find the customer you're looking for click on their name to open their profile.</p>
    <br />
    <div className="image_container">
      <img className="profile" src={profile} />
    </div>
    <p>
      {' '}
      - Just click the green sign-in button and you will see today's date highlighted in green under
      the "visits" section.
    </p>
    <br />
    <div className="image_container">
      <img className="visits" src={visits} />
    </div>
    <br />
    <p> - If the customer get a coat or shoes click "Add Coat" or "Add Shoes", respectively.</p>
    <br />
    <h4> - Congratulations you've just signed in your first guest!</h4>
    <h4>
      {' '}
      - No need to save anything just head back to the search page to sign in another customer.
    </h4>
    <br />

    <h3>Oh no I cant find the customer in the search bar!</h3>
    <p> - First, double check your spelling.</p>
    <p> - If you still can't find them in the search, they probably haven't registered yet.</p>
    <h3>Creating a new customer</h3>
    <p> - To create a new customer, start by clicking the create link at the top of the page.</p>
    <br />
    <div className="image_container">
      <img className="create" src={create} />
    </div>
    <br />
    <p> - Fill out the customer's information below.</p>
    <p>
      {' '}
      - If the customer is shopping for family members other than themselves, such as a child or
      spouse, make sure to add them as a dependant on their profile.{' '}
    </p>
    <p>
      {' '}
      - To add a dependant click the green 'Add dependant' button. You can add as many as needed.
    </p>
    <p> - Dependants can be removed by using the 'X' to right of the dependant. </p>
    <br />
    <div className="image_container">
      <img className="dependant" src={dependant} />
    </div>
    <br />
    <p> - Once all the info looks good, click the green 'Save Customer' button.</p>
    <br />
    <h4>
      {' '}
      - All done, you have just created a new customer! Now head to the search tab to sign them in
      for today.
    </h4>
    <br />
  </div>
);
