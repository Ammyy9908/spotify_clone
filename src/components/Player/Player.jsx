import React from "react";
import axios from "axios";
import Cookies from 'js-cookie'
import PrevIcon from "../../assets/PrevIcon";
import SpeakerIcon from "../../assets/SpeakerIcon";
import NextIcon from "../../assets/NextIcon";
import PlayIcon from "../../assets/PlayIcon";
import "./Player.css"
import {MdFavoriteBorder,MdFavorite} from "react-icons/md"
import { connect } from "react-redux";
import PauseIcon from "../../assets/PauseIcon";
import {FiSmartphone} from "react-icons/fi"
import { setActiveDevice, setCurrentSong, setDevices, setDeviceToggle, setError, setPlaying, setToast } from "../../redux/actions/_appAction";

function Toast({message,setMessage}){
  

  setTimeout(()=>{
      setMessage(null);
  },5000);
  return (
    <div className={`toastify ${message && "toast_enable"}`}>
      <p>{message}</p>
    </div>
  )
}
function ComputerIcon(){
  return (
    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="2" d="M3,18 L21,18 L21,5 L21,5 C21,4.44771525 20.5522847,4 20,4 L4,4 L4,4 C3.44771525,4 3,4.44771525 3,5 L3,18 Z M2,20 L22,20 C23,20 23,19 23,19 L1,19 C1,19 1,20 2,20 Z"></path></svg>
  )
}


function Device({name,isActive,id,type,setDeviceToggle,device,setActiveDevice}){

  const transferPlayback = async ()=>{
    try{
      const r = await axios.put(`https://api.spotify.com/v1/me/player`,{
        device_ids:[id]
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
        return e.response.data;
      }
    }
  }


  const handleTransfer = ()=>{
    transferPlayback().then((response)=>{
      console.log(response);
      
     
        setDeviceToggle(false);
        setActiveDevice(device)
      
    }).catch((e)=>{
      console.log(e);
    })
  }
  return(
    <button className={`device-item ${isActive && "active_device__item"}`} onClick={!isActive && handleTransfer}>
                        
                          {type==="Computer" ?<ComputerIcon/>:<FiSmartphone/>}
                        
                        <div className="device-info">
                          <div className={`connect-device-name`}>
                              <p className={`${isActive && "active_device"}`}>{Cookies.get('DEVICE_ID')===id ?"This Computer":name}</p>
                          </div>
                          
                        </div>
                      </button>
  )
}
function Player(props) {
    console.log("Current song meta is",props.currentSong);
     // eslint-disable-next-line
  const [volume, setVolume] = React.useState(props.activeDevice? props.activeDevice.volume_percent:43);
  const [liked,setLiked] = React.useState(false);

  const handleVolume = (e) => {
    setVolume(e.target.value);
    fetch(
      `https://api.spotify.com/v1/me/player/volume?volume_percent=${volume}`,
      {
        method: "PUT", // or 'PUT'
        headers: {
          
          Authorization: "Bearer " + Cookies.get("SPOTIFY_TOKEN"),
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


  const getDevices = async ()=>{
    try{
      const r = await axios.get('https://api.spotify.com/v1/me/player/devices',{
        headers:{
          "Authorization":"Bearer "+Cookies.get("SPOTIFY_TOKEN")
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



  const handleGetDevices = ()=>{
    props.setDeviceToggle(!props.isDevices);
    getDevices().then((devices)=>{
      console.log(devices);
      props.setDevices(devices.devices);
     
    }).catch((e)=>{
      console.log(`Error while getting devices`,e.message);
    })
  }


  const addToLibrary = (e)=>{
    const id = e.target.parentElement.id;
    axios.put(`https://api.spotify.com/v1/me/tracks?ids=${id}`,{},{
      headers:{
        "Authorization":"Bearer "+Cookies.get('SPOTIFY_TOKEN')
      }
    }).then((response)=>{
      console.log(response);
      if(response.status===200){
        props.setToast("Added to your liked songs!");
        setLiked(true);
      }
    }).catch((e)=>{
      console.log(`Error while saving to Library!`);
    });
  }

  const removeFromLibrary = (e)=>{
    console.log(e.target.parentElement.parentElement);
    const id = e.target.parentElement.parentElement.id;
    axios.delete(`https://api.spotify.com/v1/me/tracks?ids=${id}`,{
      headers:{
        "Authorization":"Bearer "+Cookies.get('SPOTIFY_TOKEN')
      }
    }).then((response)=>{
      console.log(response);
      if(response.status===200){
        props.setToast("Removed from your library!");
        setLiked(false);
      }
    }).catch((e)=>{
      console.log(`Error while removing track from Library!`);
    });
  }
  return (
    <>
      {props.currentSong && props.currentSong.item   &&
      <div className="player_wrapper">
        <Toast message={props.isToast} setMessage={props.setToast}/>
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
                  <div className="track__info">
                  <strong className="song__name">
                    {props.currentSong.item && props.currentSong.item.name}
                  </strong>
                  <span className="song__album">
                    {props.currentSong.item && props.currentSong.item.artists.map((artist)=>artist.name)}
                  </span>
                  </div>
                  <div className="track__like_btn">
                    <button id={props.currentSong.item.id} onClick={liked?removeFromLibrary:addToLibrary} className="like-button">
                      {!liked?<MdFavoriteBorder/>:<MdFavorite/>}
                    </button>
                  </div>
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
              <div className="device__button">
                <button onClick={handleGetDevices}>
                <ComputerIcon/>
                </button>

                <div className={`devices_container ${props.isDevices && "enable_device_list"}`}>
                  <div className="device__list">
                    <div className="device__container__title">
                      <h3>Connect to device</h3>
                    </div>
                    <div className="connect__header">
                      <img src="https://open.scdn.co/cdn/images/connect_header@1x.8f827808.png" alt="connect__header" />
                    </div>

                    <ul className="connect-device-list">
                     

                      {
                        props.devices && props.devices.map((device,i)=>{
                          return <Device name={device.name} id={device.id} isActive={device.is_active} type={device.type} setDeviceToggle={props.setDeviceToggle} device={device} setActiveDevice={props.setActiveDevice}/>
                        })
                      }
                    </ul>
                  </div>
                </div>
              </div>
              <div className="player__volume__control">
                <SpeakerIcon/>
                <div className="player__song__volume__range">
                  <div
                    className="volume__range"
                    style={{ width:volume+"%" }}
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

        {props.activeDevice && props.activeDevice.id!==Cookies.get('DEVICE_ID') &&   <div className="current_playing_device">
                <div className="active_listening">Listening on {props.activeDevice && props.activeDevice.name}</div>
        </div>}
        </div>
}
    </>
  );
}


const mapStateToProps = (state)=>({
    currentSong:state.appReducer.currentSong,
    device:state.appReducer.device,
    isPlaying:state.appReducer.isPlaying,
    devices:state.appReducer.devices,
    isDevices:state.appReducer.isDevices,
    activeDevice:state.appReducer.activeDevice,
    isToast:state.appReducer.isToast
})

const mapDispatchToProps = (dispatch)=>({
    setError:(error)=>dispatch(setError(error)),
    setPlaying:(playing)=>dispatch(setPlaying(playing)),
    setCurrentSong:(currentSong)=>dispatch(setCurrentSong(currentSong)),
    setDevices:(devices)=>dispatch(setDevices(devices)),
    setDeviceToggle:(isDevices)=>dispatch(setDeviceToggle(isDevices)),
    setActiveDevice:(activeDevice)=>dispatch(setActiveDevice(activeDevice)),
    setToast:(isToast)=>dispatch(setToast(isToast))
})
export default connect(mapStateToProps,mapDispatchToProps)(Player);