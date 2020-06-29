import React from 'react';
import { useParams } from 'react-router-dom';

const Game = () => {
  const { id } = useParams();
  return id || -1;
};

export default Game;
