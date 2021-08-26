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
import { setCurrentSong, setError, setPlaying } from "../../redux/actions/_appAction";

function Player(props) {
    console.log("Current song meta is",props.currentSong);
     // eslint-disable-next-line
  const [volume, setVolume] = React.useState(0);


  const handleVolume = (e) => {
    setVolume(e.target.value);
    fetch(
      `https://api.spotify.com/v1/me/player/volume?volume_percent=${volume}`,
      {
        method: "PUT", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.getItem("SPOTIFY_TOKEN"),
        },
      }
    )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };



  
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
                return props.setError(error.message);
            }
            console.log('song paused!');
            props.setPlaying(false);


            
    }).catch((e)=>{
        console.log("Error",e);
    });
  }

  const handlePlay = ()=>{
    setPlay().then((playResponse)=>{
        const {error} = playResponse;
        if(error){
            console.log(error.message);
            return props.setError(error.message);
        }

        console.log('song played!');
        props.setPlaying(true);
}).catch((e)=>{
    console.log("Error",e);
});
  }


  const playPrev = async ()=>{
    try{
      const r = await axios.post('https://api.spotify.com/v1/me/player/previous',{},{
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


  const playNext = async ()=>{
    try{
      const r = await axios.post('https://api.spotify.com/v1/me/player/next',{},{
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


  const getCurrentTrack = async ()=>{
    try{
      const r = await axios.get(`https://api.spotify.com/v1/me/player/currently-playing`,{
        headers:{
          "Authorization":`Bearer ${Cookies.get("SPOTIFY_TOKEN")}`
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



  //handlePrev

  const handlePrev = ()=>{
    playPrev().then((response)=>{
      console.log(response)
      getCurrentTrack().then((currentTrack)=>{
      
        props.setCurrentSong(currentTrack);
        if(currentTrack.is_playing){
          props.setPlaying(true);
        }
      }).catch(e=>console.error(e.messagge));
    })
    .catch((e)=>{
      console.log(`Error in Previous=> ${e}`);
    })
  }


  const handleNext = ()=>{
    playNext().then((response)=>{
      console.log(response)
      getCurrentTrack().then((currentTrack)=>{
      
        props.setCurrentSong(currentTrack);
        if(currentTrack.is_playing){
          props.setPlaying(true);
        }
      }).catch(e=>console.error(e.messagge));
    })
    .catch((e)=>{
      console.log(`Error in Playing Next Song=> ${e}`);
    })
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
                    className="current-song-thumb"
                  />
                </div>
                <div className="song__text__info">
                  <strong className="song__name">
                    {props.currentSong.item && props.currentSong.item.name}
                  </strong>
                  <span className="song__album">
                    {props.currentSong.item && props.currentSong.item.artists.map((artist)=>artist.name)}
                  </span>
                </div>
              </div>
            </div>
            <div className="player__center">
              <div className="player__center__top">
                <button className="prev_btn" onClick={handlePrev}>
                    <PrevIcon/>
                </button>
                <button
                  className="play__button"
                  onClick={props.isPlaying?handlePause:handlePlay}
                >
                { props.isPlaying?<PauseIcon/>:<PlayIcon/>}
                </button>

               <button className="next_btn" onClick={handleNext}>
                   <NextIcon/>
               </button>
              </div>
              {/* <div className="player__center__bottom">
                <span className="time_elapsed">
                {Math.floor((props.currentSong.progress_ms / 1000 / 60) << 0) +
                    ":" +
                    Math.floor((props.currentSong.progress_ms / 1000) % 60)}
                </span>
                <div className="player__progress">
                  <div
                    className="progress__value"
                    style={{
                        
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
              </div> */}
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
                    value={volume}
                    min="0"
                    max="100"
                    onChange={handleVolume}
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
    device:state.appReducer.device,
    isPlaying:state.appReducer.isPlaying
})

const mapDispatchToProps = (dispatch)=>({
    setError:(error)=>dispatch(setError(error)),
    setPlaying:(playing)=>dispatch(setPlaying(playing)),
    setCurrentSong:(currentSong)=>dispatch(setCurrentSong(currentSong)),
})
export default connect(mapStateToProps,mapDispatchToProps)(Player);