import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'


const TitleCards = ({ title, category }) => {
  const cardRef = useRef()
  const [apiData,setApiData]=useState([])
 
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMDI3ODU4NWViNmYxNTg4MGRlOTY3ODUxMzY1MGFmYiIsInN1YiI6IjY2M2YwM2QwYmUyMjk0ZDgwNjQ3OWJjYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TwAy0uN_PdhhoptysU9ZNp1Ae_dykUYi0FstFnRRiI0'
    }
  };
   useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));
   },[])
 

  useEffect(() => {
    cardRef.current.addEventListener('wheel', (event) => {
      event.preventDefault()
      cardRef.current.scrollLeft += event.deltaY
    })
  }, [])

  return (
    <div className='title-cards'>
      <h2>{title ? title : "Popular on Netfliex"}</h2>
      <div className="card-list" ref={cardRef}>
        {apiData?.map((item, index) => {
          return (
            <>
              <Link to={`/player/${item.id}`} className="card" key={index}>
                <img src={`https://image.tmdb.org/t/p/w500`+item.backdrop_path} alt="" />
                <p>{item.original_title}</p>
              </Link>
            </>
          )
        })}
      </div>
    </div>
  )
}

export default TitleCards