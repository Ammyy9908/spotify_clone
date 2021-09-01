import React from 'react';
import PlayIcon from '../../assets/PlayIcon';
import "./Section.css"
// eslint-disable-next-line
import handleAlbumPlay from "../../utils/AlbumPlay"
import handlePlayAlbumInCurrentDevice from "../../utils/AlbumPlayInThis"
import Toast from '../Toast/Toast';
import { connect } from 'react-redux';
import { setCurrentSong, setModal, setPlaying } from '../../redux/actions/_appAction';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function SectionCard({id,name,extra,image,uri,setError,setCurrentSong,setPlaying,currentSong,user,setModal}){
    console.log("current user =>",user);
    const history = useHistory();

    const moveToPlayList = (e)=>{
        
        if(e.target.classList.contains('section__card')){
            console.log('Parent Cliced!');
            console.log(uri);
            console.log(id)
            history.push(`/playlist/${id}`)
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



    const play = ()=>{
        
        console.log(uri)
        if(currentSong){handleAlbumPlay(uri).then((response)=>{
            console.log('Track played!');
            getCurrentTrack().then((currentTrack)=>{
                currentTrack && setCurrentSong(currentTrack);
                if(currentTrack.is_playing){
                  setPlaying(true);
                }
            })
        }).catch((e)=>{
            console.log(`Eror while starting player => ${e}`);
            setError(e.message);

        })
    }
    else{
        handlePlayAlbumInCurrentDevice(uri).then((response)=>{
            getCurrentTrack().then((currentTrack)=>{
                currentTrack && setCurrentSong(currentTrack);
                if(currentTrack.is_playing){
                  setPlaying(true);
                }
            })
        })
    }


       
    }
    return <div className="section__card" onClick={moveToPlayList}>
        <div className="section__card__body">
            <div className="card__thumb">
                <div className="card__image">
                <div>
                    <img src={image} alt="" />
                </div>
                </div>
                <div className="card_play_btn">
                    <button onClick={user?play:()=>setModal(image)}>
                        <PlayIcon/>
                    </button>
                </div>
            </div>
            <div className="card__meta">
                <a href="/" className="card__title">
                    <div className="title">
                    {name}
                    </div>
                </a>
                <div className="card__exta__info">
                    {extra}
                </div>
            </div>
        </div>
    </div>
}

function Section({text,items,currentSong,setCurrentSong,setPlaying,user,setModal}) {

    const [error,setError] = React.useState(null);


    return (
       <section className="section">
           <Toast error={error} setError={setError}/>
           <div className="section__header">
               <div className="section__header__content">
                   <div className="section__heading">
                       <h2>{text}</h2>
                   </div>
                   <a href="/">
                       <span>see all</span>
                   </a>
               </div>
           </div>
           <div className="section__grid__container">
                {/* <SectionCard/>
                <SectionCard/>
                <SectionCard/>
                <SectionCard/> */}
                
                {
                    items.slice(0,6).map((item,i)=>{
                        
                        return <SectionCard id={item.id} key={item.id} name={item.name} extra={item.type==="playlist" && item.description.slice(0,49)+"..." && item.album_type==="album" && item.artists.map((artist)=><a href="/">{artist.name}</a>) && item.album_type==="single" && item.artists.map((artist)=>artist.name+"") } image={item.images[0].url} uri={item.uri} setError={setError} currentSong={currentSong} setCurrentSong={setCurrentSong} setPlaying={setPlaying} user={user} setModal={setModal}/>
                    })
                }
           </div>
       </section>
    )
}


const mapStateToProps = (state)=>({
    currentSong:state.appReducer.currentSong,
    user:state.appReducer.user
})
const mapDispatchToProps = (dispatch)=>({
    setCurrentSong:(currentSong)=>dispatch(setCurrentSong(currentSong)),
    setPlaying:(playing)=>dispatch(setPlaying(playing)),
    setModal:(isModal)=>dispatch(setModal(isModal))
})

export default connect(mapStateToProps,mapDispatchToProps)(Section)
