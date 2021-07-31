import React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import DeviceInfo from '../../components/DeviceInfo/DeviceInfo'
import Main from '../../components/Main/Main'
import Player from '../../components/Player/Player'
import Sidebar from '../../components/Sidebar/Sidebar'
import { setActivePage, setDrop } from '../../redux/actions/_appAction'
import "./Playlist.css"

function Playlist(props) {

    const [currentPlaylist,setPlaylist] = React.useState(null);
    console.log(currentPlaylist);

    React.useEffect(()=>{
        props.setActivePage("playlist");
    },
    // eslint-disable-next-line
    [])
    return (
        <div className="home__container">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Spotify Clone-Web Player</title>
            </Helmet>
            <Sidebar/>
            <Main id={props.id} setPlaylist={setPlaylist}/>
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
   
    setDrop:(dropdown)=>dispatch(setDrop(dropdown))
})
export default connect(mapStateToProps,mapDispatchToProps)(Playlist)
