import React from "react";
import axios from "axios";
import Cookies from 'js-cookie'
import PrevIcon from "../../assets/PrevIcon";
import SpeakerIcon from "../../assets/SpeakerIcon";
import NextIcon from "../../assets/NextIcon";
import PlayIcon from "../../assets/PlayIcon";
import "./Player.css"
import { connect } from "react-redux";
import PauseIcon from "../../assets/PauseIcon";
import { setError } from "../../redux/actions/_appAction";

function Player(props) {
    console.log("Current song meta is",props.currentSong);
     // eslint-disable-next-line
  const [volume, setVolume] = React.useState(0);

  
  const token = Cookies.get("SPOTIFY_TOKEN");



  //handle pause

  const setPause = async ()=>{
      try{
          const r = await axios.put(`https://api.spotify.com/v1/me/player/pause`,{},{
              headers:{
                  "Authorization":`Bearer ${token}`
              }
          });
          return r.data;
      }
      catch(e){
          if(e.response && e.response.data){
              return e.response.data;
          }
      }
  }

  const setPlay = async ()=>{
    try{
        const r = await axios.put(`https://api.spotify.com/v1/me/player/play`,{},{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        }
        );
        return r.data;
    }
    catch(e){
        if(e.response && e.response.data){
            return e.response.data;
        }
    }
}


  const handlePause = ()=>{
    setPause().then((pauseResponse)=>{
            const {error} = pauseResponse;
            if(error){
                console.log(error.message);
                props.setError(error.message);
            }
            
    }).catch((e)=>{
        console.log("Error",e);
    });
  }

  const handlePlay = ()=>{
    setPlay().then((playResponse)=>{
        const {error} = playResponse;
        if(error){
            console.log(error.message);
            props.setError(error.message);
        }
}).catch((e)=>{
    console.log("Error",e);
});
  }
  return (
    <>
      {props.currentSong && props.currentSong.item   &&
        <div className={`player ${!props.currentSong && "player__disable"}`}>
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
                  onClick={props.currentSong.is_playing?handlePause:handlePlay}
                >
                { props.currentSong.is_playing?<PauseIcon/>:<PlayIcon/>}
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
                    style={{ width: props.device && props.device.volume_percent+"%" }}
                    id="volume__range"
                  >
                    <span className="thumb" id="thumb"></span>
                  </div>
                  <input
                    type="range"
                    name="volume"
                    id="volume"
                    value={props.device && props.device.volume_percent}
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
    currentSong:state.appReducer.currentSong,
    device:state.appReducer.device
})

const mapDispatchToProps = (dispatch)=>({
    setError:(error)=>dispatch(setError(error))
})
export default connect(mapStateToProps,mapDispatchToProps)(Player);