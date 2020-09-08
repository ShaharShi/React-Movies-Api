import React, { useEffect, useState } from "react";
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
    return (<div>
    <h1> {currentMovieData.title}</h1>
        <h2> Movie id: {movieId} </h2>
        <Button onClick={() => history.push(`/`)} > Go Back to Movies Page</Button>
    </div>)
}

function mappingMovieData(data: any) {
    const { Title, Genre, language, plot, Poster, Released, Actors, Type, country, Year, imdbRating } = data
    return {
        title: Title,
        genre: Genre, 
        language: language, 
        plot: plot, 
        poster: Poster, 
        released: Released, 
        actors: Actors,
        type: Type,
        country: country,
        year: Year,
        imdbRating: imdbRating
    }
}