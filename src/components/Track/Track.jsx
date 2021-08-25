import React from 'react';
import HeartIcon from '../../assets/HeartIcon';
import MoreIcon from '../../assets/MoreIcon';
import PlayIcon from '../../assets/PlayIcon';
import "./Track.css"

function Track({index,name,artists,cover,date,handlePlay,uri}) {



    return (
        <div className="track" onClick={()=>handlePlay(uri)}>
            <div className="track__wrapper">
                <div className="track__number">
                    <div>
                        <span>{index+1}</span>
                        <button className="track_play_btn"><PlayIcon/></button>
                    </div>
                </div>
                <div className="track__info">
                        <img src={cover} alt="track__cover" />
                   
                    <div className="track__metadata">
                        <div className="track__name">{name}</div>
                        <span className="track__artists">
                            
                            {
                                artists && artists.map((item,i)=>{
                                    return <a href="/">{item.name} </a>
                                })
                            }
                        </span>
                    </div>
                </div>
                <div className="track_album">
                    <a href="/">KTMBK</a>
                </div>
                <div className="track__timestamp">
                    <span>{["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Nov","Dec"][new Date(date).getMonth()]} {new Date(date).getDate()}</span>
                </div>
                <div className="track__duration">
                    <button className="track__like__btn">
                        <HeartIcon/>
                        </button>
                    <span>3:00</span>
                    <button className="track__more">
                        <MoreIcon/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Track
