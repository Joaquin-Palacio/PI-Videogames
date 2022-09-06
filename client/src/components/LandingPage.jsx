import React from 'react'
import { Link } from 'react-router-dom';


const LandingPage = () => {
  return (
    <div>
      <h1>Welcome to LolixGames</h1>
      <Link to='/home'>
        <button>
          Press to Start 🎮
        </button>
      </Link>
    </div>
  )
}

export default LandingPage