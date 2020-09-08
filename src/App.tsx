import React from 'react';
import './App.css';
import NavBarApp from "./components/navbar"
import MoviesPage from './components/pages/movies-page';
import AboutPage from './components/pages/about-page';
import ConfigurationPage from './components/pages/configuration-page';
import FavoritePage from './components/pages/favorite-page';
import SearchResultPage from './components/pages/search-result-page';
import MoviePage from "./components/pages/movie-page"
import { Switch, BrowserRouter as Router } from "react-router-dom";
import RoutesConfiguration, { IRoute } from './components/routes-configuration'

const Routes: Array<IRoute> = [{ component: MoviesPage, path: "/", name: "Movies", exact: true, isVisible: true },
{ component: ConfigurationPage, path: "/configuration", name: "configuration", isVisible: true },
{ component: AboutPage, path: "/about", name: "about", isVisible: true },
{ component: FavoritePage, path: "/favorites", name: "favorites", isVisible: true },
{ component: SearchResultPage, path: "/search-result", name: "Search Result", isVisible: true },
{ component: MoviePage, path: "/movie/:movieId", name: "Movie page? do i need it?", isVisible: false },
    // { component: () => { return <div> Not Found</div> }, path: "**" }
];


function App() {
    return <Router>
        <div className="container">
            <NavBarApp Routes={Routes}/>
            <Switch>
                <RoutesConfiguration routes={Routes} />
            </Switch>
        </div>
    </Router>
}

export default App;
