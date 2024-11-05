import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import { Link } from 'react-router-dom'


const TitleCards = ({title, category}) => {

  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YTViMGE5N2RjMDE5ZTY2MzliNDEyMDYzNmM3ZWYzYSIsIm5iZiI6MTcyOTU4MDY2MC42OTY0MTQsInN1YiI6IjY3MTI5NGE2MjVjNzBiOGIxZDY3ZDA3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bc7uK-IPrqP8nfg_Kn4KQz4XvrBb95fy4KYkjxa1zek'
    }
  };

  const handleWheel = (event)=>{
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }

  useEffect(()=>{

    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));
    cardsRef.current.addEventListener('wheel', handleWheel);
  },[])
 
  return (

    <div className="titlecards">
      <h2>{title?title:"popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>{
        apiData.map((card,index)=>{
          return <Link to={`/player/${card.id}`}className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt=""/>
            <p>{card.original_title}</p>
          </Link>
        })}

      </div>

    </div>
  )
}

export default TitleCards
