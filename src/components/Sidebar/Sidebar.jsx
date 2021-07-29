import React from 'react';
import HeartIcon from '../../assets/HeartIcon';
import HomeIcon from '../../assets/HomeIcon';
import LibraryIcon from '../../assets/LibraryIcon';
import Logo from '../../assets/Logo';
import PlusIcon from '../../assets/PlusIcon';
import SearchIcon from '../../assets/SearchIcon';
import "./Sidebar.css"
import {Link} from "react-router-dom"
import { connect } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import { addPlaylist } from '../../redux/actions/_appAction';



function PlayListButton({gradient,Icon,text,handler,user}){
    
    return  <div className="play_list_btn" onClick={()=>handler && user && handler()}>
         <button>
             <div className={`button__icon ${gradient && "gradient_btn"}`}>
            {Icon}
             </div>
             <span className="btn_text">{text}</span>
         </button>
     </div>
 };
 

function Sidebar(props) {

    const createPlaylist = async ()=>{
        try{
            const r = await axios.post(`https://api.spotify.com/v1/users/${props.user.id}/playlists`,
                {
                    name: `New Playlist ${props.userPlaylists.length+1}`,
                    "description": "New playlist description",
                    "public": false
                },
                {
                headers:{
                    "Authorization":"Bearer "+Cookies.get("SPOTIFY_TOKEN")
                }
            
            });

            return r.data;
        }
        catch(e){
            if(e.response && e.response.data){
                return e.response.data
            }
        }
    }

    const handlePlayListCreate = ()=>{
        createPlaylist().then((response)=>{
            console.log(response)
            props.addPlaylist(response);
        }).catch((e)=>{
            console.error(e.message);
        })
    }
    return (
        <div className="sidebar">
            <div className="sidebar__container">
                <div className="logo__banner">
                    <a href="/">
                        <Logo/>
                    </a>
                </div>
                <ul className="nav__links">
                    <li><Link to="/" className={`${props.activePage==="home" && "active_link"}`}><HomeIcon/> Home</Link></li>
                    <li><Link to="/search" className={`${props.activePage==="search" && "active_link"}`}><SearchIcon/> Search</Link></li>
                    <li><Link to="/collections/playlist" className={`${props.activePage.includes("library") && "active_link"}`}><LibraryIcon/> Your Library</Link></li>
                </ul>
                <div className="playlists">
                    <div className="playlist__container">
                    
                            <PlayListButton text="Create a Playlist" Icon={<PlusIcon/>} gradient={false} handler={handlePlayListCreate} user={props.user}/>
                            <PlayListButton text="Liked Songs" Icon={<HeartIcon/>} gradient={true} handler={null}/>

                            <div className="divider">
                                <hr />
                            </div>

                            {props.userPlaylists && 
                            <ul className="user__playlists">
                               
                                   
                                    {
                                        props.userPlaylists.map((playlist,i)=>{
                                            return <li><div> <Link to={`/playlist/${playlist.id}`}><span>{playlist.name}</span></Link></div></li>
                                        })
                                    }
                                   
                                
                            </ul>}
                    </div>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = (state)=>({
    activePage:state.appReducer.activePage,
    userPlaylists:state.appReducer.userPlaylist,
    user:state.appReducer.user

})

const mapDispatchToProps = (dispatch)=>({
    addPlaylist:(playlist)=>dispatch(addPlaylist(playlist))
})

export default connect(mapStateToProps,mapDispatchToProps)(Sidebar)
