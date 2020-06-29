import React from 'react';

const Home = (props) => <h1>Hello, {props.user?.name || 'player'}</h1>;

export default Home;
