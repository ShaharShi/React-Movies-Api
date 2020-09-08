import React, { useState, useEffect }  from 'react';
import axios from "axios";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from "react-router-dom";
import { IRoute } from '../routes-configuration'


export default function NavBarApp(props: any) {
    const { Routes } = props

    const [userDetails, setUserDetails] = useState(null)
    const [flag, setFlag] = useState(null)

    async function getUserDetailsApi() {
        try {
            const { data } = await axios.get("https://randomuser.me/api/?results=1")
            const user = data.results[0]
            setUserDetails(user)
            const responseCountries = await axios.get(`https://restcountries.eu/rest/v2/name/${user.location.country}`)
            const [country] = responseCountries.data
            setFlag(country.flag);
        } catch{
            // alert no details
        } finally {
            // cancel loader
        }
    }
    useEffect(() => {
        getUserDetailsApi()
    }, [])

    return (<Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Movies Api</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                {Routes.filter((route: IRoute) => route.isVisible).map((route: IRoute) => {
                    const { path, name } = route;
                    return <Link to={path}> {name} </Link>
                })}
            </Nav>
        </Navbar.Collapse>

        {userDetails ? <UserDetails user={userDetails} /> : < Spinner animation="border" role="status"> </Spinner>}
        {flag ? <Flagush f={flag} /> : < Spinner animation="border" role="status"> </Spinner>}
    </Navbar>)


}

function UserDetails(props: any) {
    const acronym = getUserAcronymsName(props.user.name.first, props.user.name.last)
    
    return <div> 
        <span style={{fontWeight: 'bold'}}>{acronym}</span> 
        <img src={props.user.picture.thumbnail} style={styleUserAvatar}/>
        </div>

        function getUserAcronymsName(first: string, last: string) {
            return first.slice(0,1) + last.slice(0,1)
        }
}

function Flagush(props: any) {
    return <img src={props.f} height="50" width="50" style={styleUserAvatar}/>
}

const styleUserAvatar: any = {
    'borderRadius': "50%",
    'width': '50px',
    'height': '50px',
    'marginLeft': '10px',
    'boxShadow': '0 0 2px'
}