import React from 'react';
import HeartIcon from '../../assets/HeartIcon';
import HomeIcon from '../../assets/HomeIcon';
import LibraryIcon from '../../assets/LibraryIcon';
import Logo from '../../assets/Logo';
import PlusIcon from '../../assets/PlusIcon';
import SearchIcon from '../../assets/SearchIcon';
import "./Sidebar.css"


function PlayListButton({gradient,Icon,text}){
   return  <div className="play_list_btn">
        <button>
            <div className={`button__icon ${gradient && "gradient_btn"}`}>
           {Icon}
            </div>
            <span className="btn_text">{text}</span>
        </button>
    </div>
}

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar__container">
                <div className="logo__banner">
                    <a href="#">
                        <Logo/>
                    </a>
                </div>
                <ul className="nav__links">
                    <li><a href="#" className="active_link"><HomeIcon/> Home</a></li>
                    <li><a href="#"><SearchIcon/> Search</a></li>
                    <li><a href="#"><LibraryIcon/> Your Library</a></li>
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

export default Sidebar
