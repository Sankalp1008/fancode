import React, { useEffect, useRef, useState } from 'react'
import Header from './components/Header'
import axios from 'axios'
import MovieCards from './components/MovieCards'
import { Grid, makeStyles } from '@material-ui/core'
import InfiniteScroll from 'react-infinite-scroll-component'


const useStyles = makeStyles(theme => ({

  movies: {
    margin: '0 auto',
    padding: '2%',
  },
  heading: {
    color: 'white',
    fontSize: 20,
    fontWeight: 600,
    padding: '2%',

  },

  listings: {
    marginTop: 10,
  }

}))


const Home = () => {
  const [filterData, setFilterData] = useState([])
  const [genreValue, setGenreValue] = useState([])
  const api_key = '18d6e20cf4a6513047912ef9c6a8455a'
  const [currentYear, setCurrentYear] = useState(2012)
  const [movieList, setMovieList] = useState([])
  const [movieGroups, setMovieGroups] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const classes = useStyles()

  useEffect(() => {
    getGenres()
  }, [])

  useEffect(() => {
    getMovies(currentYear)
  }, [genreValue])

  const handleChange = (e, newValue) => {
    const index = genreValue.indexOf(newValue)
    if (index === -1) {
      setMovieGroups([])
      setCurrentYear(2012)
      setGenreValue((prevSelectedTabs) => [...prevSelectedTabs, newValue])

    } else {
      setMovieGroups([])

      setGenreValue((prevSelectedTabs) => prevSelectedTabs.filter((tab) => tab !== newValue));

    }
  }

  const getGenres = () => {
    axios.get('https://api.themoviedb.org/3/genre/movie/list?language=en', {
      params: { api_key }
    })
      .then((res) => {
        setFilterData(res.data.genres)

      })
  }

  const getMovies = (year) => {
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d&sort_by=popularity.desc&primary_release_year=${year}&page=1&vote_count.gte=100&with_genres=${genreValue}`, {

    })
      .then((res) => {
        setMovieList(res.data.results)
        const newMovies = res.data.results
        const groupedMovies = newMovies.reduce((acc, movie) => {
          const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : 'Unknown'
          if (!acc[releaseYear]) {
            acc[releaseYear] = [];
          }

          acc[releaseYear].push(movie);
          return acc;
        }, {})
        setMovieGroups((prevGroups) => [...prevGroups, groupedMovies]);


      })
  }

  const fetchNextYear = () => {
    if (currentYear < 2023) {

      setCurrentYear((prevYear) => prevYear + 1);
      getMovies(currentYear + 1)
    } else {
      setHasMore(false)
    }
  }

  const fetchPreviousYear = () => {
    if (currentYear > 2012) {
      setCurrentYear((prevYear) => prevYear - 1);
      getMovies(currentYear - 1);
    }
  }



  const findGenreById = (gId, dataArray) => {
    return gId.map((id) => {
      const item = dataArray.find((item) => item.id === id)
      return item ? item.name : 'not found'
    })

  }




  return (
    <div>
      <Header
        filterData={filterData}
        handleChange={handleChange}
        genreValue={genreValue}
      />
      <div className={classes.movies} >
        <InfiniteScroll
          dataLength={movieGroups.length}
          next={fetchNextYear}
          hasMore={hasMore}

        >
          {movieList.length > 0 ? movieGroups.map((group, index) => (
            <div className={classes.listings} >
              <div className={classes.heading}>{Object.keys(group)[0]}</div>
              <Grid container spacing={0}>
                {group[Object.keys(group)[0]].map((movie) => (
                  <Grid key={movie.id} item xs={6} >
                    <MovieCards
                      image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                      title={movie.title}
                      rating={movie.vote_average}
                      genre={findGenreById(movie.genre_ids, filterData).join(', ')}
                      desc={movie.overview}
                    />
                  
                  </Grid>
                ))}
              </Grid>
            </div>
          )) : <div style={{color:'white', margin:'0 auto', fontWeight:700, fontSize:20}}></div>}

        </InfiniteScroll>


      </div>
    </div>
  )
}

export default Home