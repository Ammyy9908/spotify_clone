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



function Tooltip(){
    return(
        <div className="logout__tooltip">
            <div className="tooltip__content">
                <div className="tooltip__content__wrapper">
                    <div className="tooltip__title">
                        <p>Create a Playlist</p>
                    </div>
                    <div className="tool__top__text">
                        <p>Log in to create and share playlists.</p>
                    </div>
                    <div className="tooltip__actions">
                        <button>Not now</button>
                        <button>Login</button>
                    </div>
                </div>
            </div>
            <div className="tooltip__arrow"></div>
        </div>
    )
}

function PlayListButton({gradient,Icon,text}){
    
    return  <div className="play_list_btn">
         <button>
             <div className={`button__icon ${gradient && "gradient_btn"}`}>
            {Icon}
             </div>
             <span className="btn_text">{text}</span>
         </button>
     </div>
 };
 

function Sidebar(props) {
    return (
        <div className="sidebar">
            <div className="sidebar__container">
                <div className="logo__banner">
                    <a href="#">
                        <Logo/>
                    </a>
                </div>
                <ul className="nav__links">
                    <li><Link to="/" className={`${props.activePage==="home" && "active_link"}`}><HomeIcon/> Home</Link></li>
                    <li><Link to="/search" className={`${props.activePage==="search" && "active_link"}`}><SearchIcon/> Search</Link></li>
                    <li><Link to="/library" className={`${props.activePage==="library" && "active_link"}`}><LibraryIcon/> Your Library</Link></li>
                </ul>
                <div className="playlists">
                    <div className="playlist__container">
                    
                            <PlayListButton text="Create a Playlist" Icon={<PlusIcon/>} gradient={false}/>
                            <PlayListButton text="Liked Songs" Icon={<HeartIcon/>} gradient={true}/>
                    </div>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = (state)=>({
    activePage:state.appReducer.activePage
})

export default connect(mapStateToProps,null)(Sidebar)
