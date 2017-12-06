import React from 'react';
const svg = require('../images/doubleRing.svg');

export default () => (
    <div id="loading" className="loading_container">
        <h1>Loading...</h1>
        <img src={svg}/>
    </div>
)