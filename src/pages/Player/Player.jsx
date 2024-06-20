import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow from '../../assets/back_arrow_icon.png'
import { Link, useParams } from 'react-router-dom'

const Player = () => {
  const [apiData,setApiData]=useState()
  const {id}=useParams()
  console.log(apiData)
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMDI3ODU4NWViNmYxNTg4MGRlOTY3ODUxMzY1MGFmYiIsInN1YiI6IjY2M2YwM2QwYmUyMjk0ZDgwNjQ3OWJjYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TwAy0uN_PdhhoptysU9ZNp1Ae_dykUYi0FstFnRRiI0'
    }
  };
 
  
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(response => response.json())
    .then(response =>setApiData(response.results[0]))
    .catch(err => console.error(err));
  },[])

  return (
    <div className='player'>
      <Link to='/'><img  src={back_arrow} alt="" /></Link>
      <iframe width="90%" height="90%" src={`https://www.youtube.com/embed/${apiData?.key}`} title="tralier" frameborder="0"  referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      {/* <iframe width="90%" height="90%" src={`https://www.youtube.com/embed/=N9KS_4XD7J8`} title='tralier' frameBorder='0' allowFullScreen></iframe> */}
      <div className="player-info">
        <p>{apiData?.published_at.slice(0,10)}</p>
        <p>{apiData?.name}</p>
        <p>{apiData?.type}</p>
      </div>
    </div>
  )
}

export default Player