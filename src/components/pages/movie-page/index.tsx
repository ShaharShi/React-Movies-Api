import React, { useEffect, useState } from "react";
import styles from './styles.module.css'
import { useParams, useHistory } from "react-router-dom"
import Axios from "axios";
import Button from "react-bootstrap/esm/Button";
import Spinner from "react-bootstrap/esm/Spinner";


export default function MoviePage() {
    const initialData: any = {}
    const { movieId } = useParams()
    const history = useHistory()
    const [currentMovieData, setCurrentMovieData] = useState(initialData)

    async function getMovieData() {
        try {
            const { data } = await Axios.get(`http://www.omdbapi.com/?apikey=132549e4&i=${movieId}`)
            const mappedData = mappingMovieData(data)
            setCurrentMovieData(mappedData)
            
        } catch (error) {
            console.error(error)
        }
        
    }

    useEffect(() => {
        getMovieData()
    }, [movieId])
    console.log(currentMovieData);
    
    if(!Object.keys(currentMovieData).length) return < Spinner animation="border" role="status"> </Spinner>
    return (<div className={'row justify-content-around mt-5'}>
        <div className={styles.leftMovieDetails}>
            <img src={currentMovieData.poster} height={'400px'} width={'300px'}></img>
            <h4> {currentMovieData.title}</h4>
            <p>{currentMovieData.type} ({currentMovieData.year})
                <p>{currentMovieData.genre}</p>
            </p>
        </div>
        <div className={`row ${styles.rightMovieDetails}`}>
            <div className={styles.moviePlot}>
                <p>{currentMovieData.plot}</p>
            </div>
            <div className={styles.movieDetails}>
                <span><b>Language:</b> {currentMovieData.language}</span>
                <span><b>Country:</b> {currentMovieData.country}</span>
                <span><b>Released Date:</b> {currentMovieData.released}</span>
                <span><b>Actors:</b> {currentMovieData.actors}</span>
                <span><b>IMDb Rating:</b> {currentMovieData.imdbRating}</span>
            </div>
            <Button className={'m-auto'} onClick={() => history.push(`/`)}> Go Back to Movies Page</Button>
        </div>
    </div>)
}

function mappingMovieData(data: any) {
    const { Title, Genre, Language, Plot, Poster, Released, Actors, Type, Country, Year, imdbRating } = data;
    const defaultPoster = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTIM3fqvuBBZVd-tPsR1fgnUVEsPjVzk3iBtg&usqp=CAU'
    return {
        title: Title,
        year: Year === 'N/A' ? 'No Data' : Year,
        genre: Genre === 'N/A' ? 'No Genre' : Genre, 
        language: Language === 'N/A' ? 'No Data' : Language, 
        plot: Plot === 'N/A' ? 'Nothing to tell about ...' : Plot, 
        poster: Poster === 'N/A' ? defaultPoster : Poster, 
        released: Released === 'N/A' ? 'No Data' : Released, 
        actors: Actors === 'N/A' ? 'No Data' : Actors,
        type: Type === 'N/A' ? 'No Data' : Type,
        country: Country === 'N/A' ? 'No Data' : Country,
        imdbRating: imdbRating === 'N/A' ? 'No Data' : imdbRating
    }
}   
