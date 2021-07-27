import React from 'react';
import { connect } from 'react-redux';
import Main from '../../components/Main/Main';
import Sidebar from '../../components/Sidebar/Sidebar';
import { setAccessToken, setActivePage, setDrop, setToken } from '../../redux/actions/_appAction';
import "./Home.css"
import {useLocation,useHistory} from "react-router-dom";
import Cookies  from 'js-cookie';
import axios from 'axios';
import Player from '../../components/Player/Player';

function Home(props) {
    const {search} = useLocation();
    const history = useHistory();
    
    

   
   
    React.useEffect(()=>{
        props.setActivePage("home");   
        

    },[]);


    const handleCancel = (e)=>{
        console.log(e.target);
        if(!e.target.classList.contains("auth_drop") && !e.target.classList.contains("avatar__image__nav") && !e.target.classList.contains("arrow__icon")
         && !e.target.classList.contains("account__btn") && !e.target.classList.contains("logout__btn") && !e.target.classList.contains("profile__btn")){
            props.setDrop(false);
        }
    }
    return (
        <div className="home__container" onClick={handleCancel}>
            <Sidebar/>
            <Main/>
            <Player/>
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
