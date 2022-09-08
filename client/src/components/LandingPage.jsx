import React from 'react'
import { Link } from 'react-router-dom';
import './styles/LandingPage.css'


const LandingPage = () => {
  return (
    <div className='container_landing'>
      <h1 className='landing_title'>Welcome to LolixGames</h1>
      <Link to='/home'>
        <button className='landing_btn'>
          Press to Start 🎮
        </button>
      </Link>
    </div>
  )
}

export default LandingPage