import React from "react";
import axios from "axios";
import Cookies from 'js-cookie'
import PrevIcon from "../../assets/PrevIcon";
import SpeakerIcon from "../../assets/SpeakerIcon";
import NextIcon from "../../assets/NextIcon";
import PlayIcon from "../../assets/PlayIcon";
import "./Player.css"
import { connect } from "react-redux";

function Player(props) {
    console.log("Current song meta is",props.currentSong);
  const [volume, setVolume] = React.useState(0);
  const [isPlay, setPlay] = React.useState(false);

  
  const token = Cookies.get("SPOTIFY_TOKEN");

  return (
    <>
      {props.currentSong && props.currentSong.is_playing && 
        <div className={`player ${!props.currentSong.is_playing && "player__disable"}`}>
          <div className="player__wrapper">
            <div className="player__left">
              <div className="song__info">
                <div className="song__thumb">
                  <img
                    src={props.currentSong.item && props.currentSong.item.album.images[0].url}
                    alt="song-thumb"
                  />
                </div>
                <div className="song__text__info">
                  <strong className="song__name">
                    {props.currentSong.item && props.currentSong.item.name}
                  </strong>
                  <span className="song__album">
                    {props.currentSong.item && props.currentSong.item.album.artists[0].name}
                  </span>
                </div>
              </div>
            </div>
            <div className="player__center">
              <div className="player__center__top">
                <button className="prev_btn">
                    <PrevIcon/>
                </button>
                <button
                  className="play__button"
                >
                 <PlayIcon/>
                </button>

               <button className="next_btn">
                   <NextIcon/>
               </button>
              </div>
              <div className="player__center__bottom">
                <span className="time_elapsed">
                {Math.floor((props.currentSong.progress_ms / 1000 / 60) << 0) +
                    ":" +
                    Math.floor((props.currentSong.progress_ms / 1000) % 60)}
                </span>
                <div className="player__progress">
                  <div
                    className="progress__value"
                    style={{
                        width:
                          (props.currentSong.progress_ms /
                            props.currentSong.item.duration_ms) *
                            100 +
                          "%",
                        height: "100%",
                      }}
                  ></div>
                </div>
                <span className="time_elapsed">
                {Math.floor(
                    (props.currentSong.item.duration_ms / 1000 / 60) << 0
                  ) +
                    ":" +
                    Math.floor((props.currentSong.item.duration_ms / 1000) % 60)}
                </span>
              </div>
            </div>
            <div className="player__right">
              <div className="player__volume__control">
                <SpeakerIcon/>
                <div className="player__song__volume__range">
                  <div
                    className="volume__range"
                    style={{ width: "20" + "%" }}
                    id="volume__range"
                  >
                    <span className="thumb" id="thumb"></span>
                  </div>
                  <input
                    type="range"
                    name="volume"
                    id="volume"
                    value={volume}
                    min="0"
                    max="100"
                  />
                </div>
                {/* <HeightOutlinedIcon
                  style={{ fill: "#fff", transform: "rotate(45deg)" }}
                /> */}
              </div>
            </div>
          </div>
        </div>
}
    </>
  );
}


const mapStateToProps = (state)=>({
    currentSong:state.appReducer.currentSong
})
export default connect(mapStateToProps,null)(Player);