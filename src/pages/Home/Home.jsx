import React from 'react';
import { connect } from 'react-redux';
import Main from '../../components/Main/Main';
import Sidebar from '../../components/Sidebar/Sidebar';
import { setAccessToken, setActivePage, setDrop, setToken } from '../../redux/actions/_appAction';
import "./Home.css"
import {useLocation,useHistory} from "react-router-dom";
// eslint-disable-next-line
import Cookies  from 'js-cookie';
// eslint-disable-next-line
import axios from 'axios';
import Player from '../../components/Player/Player';
import {Helmet} from "react-helmet";
import DeviceInfo from '../../components/DeviceInfo/DeviceInfo';

function Home(props) {
    // eslint-disable-next-line
    const {search} = useLocation();
    // eslint-disable-next-line
    const history = useHistory();
    
    

   
   
    React.useEffect(()=>{
        props.setActivePage("home");   
        

    },
    // eslint-disable-next-line
    []);


    const handleCancel = (e)=>{
        console.log(e.target);
        if(!e.target.classList.contains("auth_drop") && !e.target.classList.contains("avatar__image__nav") && !e.target.classList.contains("arrow__icon")
         && !e.target.classList.contains("account__btn") && !e.target.classList.contains("logout__btn") && !e.target.classList.contains("profile__btn")){
            props.setDrop(false);
        }
    }
    return (
        <div className="home__container" onClick={handleCancel}>
             <Helmet>
                <meta charSet="utf-8" />
                <title>Spotify Clone:Web Player</title>
            </Helmet>
            <Sidebar/>
            <Main/>
           
            <Player/>
            <DeviceInfo/>
        </div>
    )
}



const mapStateToProps = (state)=>({
    accessToken:state.appReducer.accessToken
})
const mapDispatchToProps = (dispatch)=>({
    setActivePage:(activePage)=>dispatch(setActivePage(activePage)),
    setToken:(token)=>dispatch(setToken(token)),
    setAccessToken:(accessToken)=>dispatch(setAccessToken(accessToken)),
    setDrop:(dropdown)=>dispatch(setDrop(dropdown))
})
export default connect(mapStateToProps,mapDispatchToProps)(Home)
