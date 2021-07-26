import React from 'react';
import { connect } from 'react-redux';
import Main from '../../components/Main/Main';
import Sidebar from '../../components/Sidebar/Sidebar';
import { setAccessToken, setActivePage, setToken } from '../../redux/actions/_appAction';
import "./Home.css"
import {useLocation,useHistory} from "react-router-dom";
import Cookies  from 'js-cookie';

function Home(props) {
    const {search} = useLocation();
    const history = useHistory();
    console.log(search.slice(6))

    if(search.length>0){
        props.setToken(search.slice(6))
    }
   
    React.useEffect(()=>{
        props.setActivePage("home");   
        props.setAccessToken(search.slice(6))
        

    },[]);
    return (
        <div className="home__container">
            <Sidebar/>
            <Main/>
        </div>
    )
}


const mapDispatchToProps = (dispatch)=>({
    setActivePage:(activePage)=>dispatch(setActivePage(activePage)),
    setToken:(token)=>dispatch(setToken(token)),
    setAccessToken:(accessToken)=>dispatch(setAccessToken(accessToken))
})
export default connect(null,mapDispatchToProps)(Home)
