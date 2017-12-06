import React from 'react';
import CustomerList from './CustomerList';
import CustomerSearch from './CustomerSearch';
const logo = require('../images/brooks_search.svg');
export default () => (
    <div>
        <div className="search_container">
            <img className="logo" src={logo}/>
            <CustomerSearch/>
        </div>
        <CustomerList/>
    </div>
);