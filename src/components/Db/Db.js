import React from 'react';
import { useSelector } from 'react-redux';
import { SearchBar } from './SearchBar/SeacrhBar';
import './Db.css';
import { GameCard } from './GameCard/GameCard';


function Db() {
  const games = useSelector((state) => state.chess.gameList);
  return (
    <div className="Db">
    <SearchBar buttonName="Search by name" path="games" query="name"/>
    {games.map((g, index)=><GameCard game={g} index={index} />)}
    </div>
  );
}

export default Db;
