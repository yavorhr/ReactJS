import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as service from './service/gamesService.js'
import uniqid from 'uniqid';

import { Header } from './components/common/Header.js';
import { Home } from './components/Home/Home.js';
import { Login } from './components/Login/Login.js';
import { Register } from './components/Register/Register.js';
import { Create } from './components/Create/Create.js';
import { Edit } from './components/Edit/Edit.js';
import { Details } from './components/Details/Details.js';
import { Catalog } from './components/Catalog/Catalog.js';

function App() {
  const [games, setGames] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    service.getAll()
      .then(games => setGames(games))
  }, []);

  const createGameHandler = (newGame) => {
    setGames(state => [
      ...state,
      {
        ...newGame,
        _id: uniqid()
      }
    ])
    navigate('/catalog');
  }

  const addCommentHandler = (gameId, comment) => {
    setGames(state => {
      const game = state.find(game => game._id == gameId);
      const comments = game.comments || [];
      comments.push(comment);

      return [...state.filter(game => game._id != gameId),
      { ...game, comments }]
    })
  }

  const editGameHandler = (gameId, changedGame) => {
    setGames(state => [...state.filter(g => g._id != gameId),
      changedGame])
    navigate('/catalog');
  }

  const deleteGameHandler = (e, gameId) => {
    e.preventDefault();
    setGames(state => state.filter(g => g._id != gameId))
    navigate('/catalog');
  }

  return (
    <div id="box">
      <Header></Header>

      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home games={games}></Home>} />
          <Route path="/login" element={<Login></Login>} />
          <Route path="/register" element={<Register></Register>} />
          <Route path="/catalog/:gameId" element={<Details games={games} addComment={addCommentHandler} deleteHandler={deleteGameHandler}></Details>} />
          <Route path="/edit/:gameId" element={<Edit games={games} onEditGame={editGameHandler}></Edit>} />
          <Route path="/create" element={<Create createGame={createGameHandler} ></Create>} />
          <Route path="/catalog" element={<Catalog games={games}></Catalog>} />
        </Routes>
      </main>
    </div>

  );
}

export default App;
