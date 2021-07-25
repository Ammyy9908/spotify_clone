import React from 'react';
import Main from '../../components/Main/Main';
import Sidebar from '../../components/Sidebar/Sidebar';
import "./Home.css"

function Home() {
    return (
        <div className="home__container">
            <Sidebar/>
            <Main/>
        </div>
    )
}

export default Home
