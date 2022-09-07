import React from 'react'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllVideogames } from '../actions/index';
import { Link } from 'react-router-dom';

const Home = () => {

  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);

  useEffect(() => {
    dispatch(getAllVideogames());
  }, [])

  return (
    <div>

    </div>
  )
}

export default Home