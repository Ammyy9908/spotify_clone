import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import DeviceInfo from '../../components/DeviceInfo/DeviceInfo';
import Main from '../../components/Main/Main';
import Player from '../../components/Player/Player';
import Sidebar from '../../components/Sidebar/Sidebar';
import { setActivePage } from '../../redux/actions/_appAction';
import "./Library.css"

function Library(props) {

    React.useEffect(()=>{

        props.setActivePage(`library:${props.type}`);
    },[props])
    return (
        <div className="home__container">
             <Helmet>
                <meta charSet="utf-8" />
                <title>Spotify Clone-Your Library</title>
            </Helmet>
            <Sidebar/>
            <Main/>
            <Player/>
            <DeviceInfo/>
        </div>
    )
}

const mapDispatchToProps = (dispatch)=>({
    setActivePage:(activePage)=>dispatch(setActivePage(activePage))
})
export default connect(null,mapDispatchToProps)(Library)
