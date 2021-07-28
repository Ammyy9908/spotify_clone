import React from 'react'
import { connect } from 'react-redux'
import Main from '../../components/Main/Main'
import Player from '../../components/Player/Player'
import Sidebar from '../../components/Sidebar/Sidebar'
import { setActivePage, setDrop } from '../../redux/actions/_appAction'
import "./Playlist.css"

function Playlist(props) {

    React.useEffect(()=>{
        props.setActivePage("playlist");
    },
    // eslint-disable-next-line
    [])
    return (
        <div className="home__container">
            <Sidebar/>
            <Main id={props.id}/>
            <Player/>
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
