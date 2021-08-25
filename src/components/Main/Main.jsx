import React from 'react'
import { connect } from 'react-redux'
import Section from '../Section/Section'
import "./Main.css"
import genres from "../../data/genres"
import PlayIcon from '../../assets/PlayIcon'
import MoreIcon from "../../assets/MoreIcon"
import ArrowIcon from '../../assets/ArrowIcon'
import { setCurrentSong, setDrop, setPlaylists, setRecommendation, setUser } from '../../redux/actions/_appAction'
import { Link, useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'
import analyze from "rgbaster";
import HeartIcon from '../../assets/HeartIcon'
import Track from '../Track/Track'
import PencilIcon from '../../assets/PencilIcon'
import Toast from '../Toast/Toast'
import SearchIcon from '../../assets/SearchIcon'



function AppBar({name,trackNav,activePage,isGradient,user,setDrop,dropdown,setUser,setRecommendation,setCurrentSong,setPlaylists,color}){


    const history = useHistory();
    const handleLogout = ()=>{
        Cookies.remove("SPOTIFY_TOKEN");
        setUser(null);
        setRecommendation(null);
        setCurrentSong(null);
        setPlaylists(null);
        history.push("/");

    }


    const handleGoBack  = ()=>{
        history.goBack();
    }

    const handleGoNext = ()=>{
        history.goForward();
    }


    const moveProfile = ()=>{
        history.push(`/user/${user.id}`);
    }
 // eslint-disable-next-line
    console.log("Gradient=>",isGradient);
   return  <div className="app_bar" style={{backgroundColor:isGradient?"rgba(20, 20, 20, 0.914)":color}}>
        <div className="app__bar__container">
        <div className="nav__buttons">
            <a href="/" onClick={handleGoBack}>
            <svg role="img" focusable="false" height="24" width="24" viewBox="0 0 24 24" className="Svg-ytk21e-0 fJEWJR _6fe5d5efc9b4a07d5c424071ac7cdacb-scss"><polyline points="16 4 7 12 16 20" fill="none" stroke="#ccc"></polyline></svg>
            </a>
            {!activePage==="playlist" && <a href="/" onClick={handleGoNext}>
            <svg role="img" focusable="false" height="24" width="24" viewBox="0 0 24 24" className="Svg-ytk21e-0 fJEWJR _6fe5d5efc9b4a07d5c424071ac7cdacb-scss"><polyline points="8 4 17 12 8 20" fill="none" stroke="#ccc"></polyline></svg>
            </a>}
            </div>



            {activePage==="playlist" && <div className="track__navbar">
                <div className="track__header__content">
                <button style={{opacity:trackNav && "1"}}><PlayIcon/></button>
                <span style={{opacity:trackNav && "1"}}>{name}</span>
                </div>
            </div>}

            {activePage==="search"
            && <div className="searchbar__nav">
                <div>
                    <div>
                        <form action="">
                            <input type="text" name="skey" id="skey" placeholder="Artists, songs, or podcasts"/>
                        </form>
                        <div className="search__icon">
                            <span>
                                <SearchIcon/>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            }

            {activePage.includes("library") && 
            <div className="library__navbar__wrapper">
                <div className="navbar__content">
                    <nav>
                        <ul>
                            <li>
                                <Link to="/collections/playlists" className={activePage.includes("playlist") && "active"}><span>Playlists</span></Link>
                            </li>
                            <li>
                                <Link to="/collections/podcasts" className={activePage.includes("podcasts") && "active"}><span>Podcasts</span></Link>
                            </li>
                            <li>
                                <Link to="/collections/artists" className={activePage.includes("artists") && "active"}><span>Artists</span></Link>
                            </li>
                            <li>
                                <Link to="/collections/albums" className={activePage.includes("albums") && "active"}><span>Albums</span></Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            }


        {!user && <a href="https://spotifyserversumit.herokuapp.com/login" className="login__button__nav">LOG IN</a>}
        {
            user &&
            <div className="nav__buttons">
               {user.product==="open" &&<button className="upgrade__btn">
                    Upgrade
                </button>}
            <div className="auth_drop" onClick={()=>setDrop(!dropdown)}>
                <div className="auth__avatar">
                    <img src={user.images[0].url} alt="" className="avatar__image__nav"/>
                </div>
                <span className="auth_name">{user.display_name}</span>
                
                <ArrowIcon className="arrow__icon"/>
               {dropdown && <div className="app__dropdown">
                   <div className="context-menu">
                       <div className="dropdown__wrapper">
                       <ul>
                       <li><button className="account__btn"><span>Account</span></button></li>
                       <li><button className="profile__btn" onClick={moveProfile}><span>Profile</span></button></li>
                       <li><button className="logout__btn" onClick={handleLogout}><span>Logout</span></button></li>
                     </ul>
                       </div>
                   </div>
               </div>}
            </div>
            </div>
        }
        </div>
    </div>
}


function RecommendationCard({image,name}){
    return (
        <div className="recommendation__card">
       <div className="rcard__wrapper">
           <div className="rcard__thumb">
               <div className="rcard__thumb__cover">
                   <img src={image} alt="" />
               </div>
           </div>
           <div className="rcard__content">
            <a href="/"><p>
            {name}</p></a>
            <div className="rcard__button">
                <button className="play_btn">  <PlayIcon/></button>
            </div>
           </div>
           <div></div>
       </div>
    </div>
    )
}


function BrowseCard({color,image,title}){
    return(
        <a href="/" className="browse__card" style={{backgroundColor:color}}>
            <div className="browse__card__wrapper">
                <img src={image} alt="" className="browse__card__image" />
                <h3 className="browse__card__text">{title}</h3>
            </div>
        </a>
    )
}


function Recommendation({recommendations}){
    return <div className="recommendations">
        <div className="contentSpacing">

            <div className="recommendation__section">
                <div className="recommendation__header">
                    <h2>Good {new Date().getHours()<12 && "morning"} {new Date().getHours()>=12 && new Date().getHours()<16 && "afternoon"} {new Date().getHours()>16 && new Date().getHours()<18 && "evening"} {new Date().getHours()>18 && new Date().getHours()<0 && "night"}</h2>
                </div>
                <div className="recommendation__grid">
                   {/* <RecommendationCard/>
                   <RecommendationCard/> */}
                   

                   {
                        recommendations && recommendations.slice(0,6).map((recommendation,i)=>{
                            return <RecommendationCard key={i} name={recommendation.track.name} image={recommendation.track.album.images[2].url}/>
                        })
                       
                   }
                    
                </div>
            </div>
        </div>
    </div>
}


function MelodyIcon(){
    return <svg width="80" height="81" viewBox="0 0 80 81" xmlns="http://www.w3.org/2000/svg"><title>Playlist Icon</title><path d="M25.6 11.565v45.38c-2.643-3.27-6.68-5.37-11.2-5.37-7.94 0-14.4 6.46-14.4 14.4s6.46 14.4 14.4 14.4 14.4-6.46 14.4-14.4v-51.82l48-10.205V47.2c-2.642-3.27-6.678-5.37-11.2-5.37-7.94 0-14.4 6.46-14.4 14.4s6.46 14.4 14.4 14.4S80 64.17 80 56.23V0L25.6 11.565zm-11.2 65.61c-6.176 0-11.2-5.025-11.2-11.2 0-6.177 5.024-11.2 11.2-11.2 6.176 0 11.2 5.023 11.2 11.2 0 6.174-5.026 11.2-11.2 11.2zm51.2-9.745c-6.176 0-11.2-5.024-11.2-11.2 0-6.174 5.024-11.2 11.2-11.2 6.176 0 11.2 5.026 11.2 11.2 0 6.178-5.026 11.2-11.2 11.2z" fill="currentColor" fill-rule="evenodd"></path></svg>
}
function Main(props) {

    const [isGradient,setGradient] = React.useState(false);
    const [playlist,setPlaylist] = React.useState(null);
    const [color, setColor] = React.useState(null);
    const [color2,setColor2] = React.useState(null);
    const [blackHeader,setHeader] = React.useState(false);
    const [trackNav,setTrackNav] = React.useState(false);
    const [user,setUser] = React.useState(null);


    const handleScroll = (e)=>{
            console.log(e.target.scrollTop);
        if(e.target.scrollTop>25){
            
            setGradient(true);
        }
        if(e.target.scrollTop>233){
            setTrackNav(true)
        }
        
        if(e.target.scrollTop>455){
            
            setHeader(true);
        }
        else{
            setTrackNav(false);
            setGradient(false);
            setHeader(false);
        }
        
    }

    console.log("Header value",blackHeader);

    // fetch the playlist by its id

    
    var img = playlist && playlist.images.length>0 && playlist.images[0].url;
    if (img) {
        const result = analyze(img); // also supports base64 encoded image strings
        result.then((result) => {
          setColor(result[1].color);
          setColor2(result[0].color)
          console.log(
            `The dominant color is ${result[0].color} with ${result[0].count} occurrence(s)`
          );

          console.log(result[0])
        });
      }

    React.useEffect(()=>{
        console.log("Running");
        const getPlayList = async ()=>{
            try{
                const r = await axios.get(`https://api.spotify.com/v1/playlists/${props.id}`,{
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

        props.id && getPlayList().then((playlist)=>{
            console.log("Playlist=>",playlist);
            setPlaylist(playlist);
            props.setPlaylist(playlist);
        }).catch((e)=>{
            console.log(e);
        })
    },
    
    // eslint-disable-next-line
    [props.id])



    

    React.useEffect(()=>{
//Fecth a User profile

console.log("User id",props.uid);

const fetchUser = async ()=>{
    try{
        const r = await axios.get(`https://api.spotify.com/v1/users/${props.uid}`,{
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
props.uid && fetchUser().then((user)=>{
    console.log(`user=>`,user);
    setUser(user);
}).catch((e)=>console.error(e));

    },[props.uid]);


    


     // calculate duration for playlists

  let dur = 0;

  playlist &&
    playlist.tracks.items.forEach((song) => {
      dur += song.track.duration_ms;
    });

  console.log("Total duration", dur);

  let min = Math.floor((dur / 1000 / 60) % 60);
  let hours = Math.floor((dur / 1000 / 60 / 60) << 0);



  const handleAlbumPlay = async ()=>{
        try{
            const r = await axios.put('https://api.spotify.com/v1/me/player/play?device_id=ec896299ed25778bb88c6091cd2562e0eedb2b20',{
                "context_uri": `${playlist.uri}`,
                "offset": {
                  "position": 5
                },
                "position_ms": 0
              },{
                  headers:{
                     
                      "Authorization":`Bearer ${Cookies.get('SPOTIFY_TOKEN')}`
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

  const playAlbum = ()=>{
    handleAlbumPlay().then((response)=>{
        console.log('Track played!');
    }).catch((e)=>{
        console.log(`Eror while starting player => ${e}`);
    })
  }


    return (
        <div className="main" onScroll={props.activePage==="home" || props.activePage==="playlist" || props.activePage==="search" ?handleScroll:null}>
            <AppBar isGradient={isGradient} user={props.user} setDrop={props.setDrop} dropdown={props.dropdown} setUser={props.setUser} setRecommendation={props.setRecommendation} setCurrentSong={props.setCurrentSong} setPlaylists={props.setPlaylists} color={color && color} activePage={props.activePage} trackNav={trackNav} name={playlist && playlist.name}/>
            <div className="content__body">
                <main className="view__container">
                <Toast/>



                    
                        {props.activePage === "home" &&

                        <>{props.user &&  <Recommendation recommendations={props.recommendations}/>}
                        <div className="home__body">
                            <div className="section__body">
                            <div className="sections contentSpacing">
                               
                                
                                {
                                    props.offline_data && props.offline_data.items.slice(2).map((section,i)=>{
                                        return <Section text={section.name} items={section.content.items}/>
                                    })
                                }
                            </div>
                        </div>  </div></>}

                        {
                            props.activePage==="search" && 
                            <div className="search__page">
                                <div className="contentSpacing">
                               <div className="grid__container">
                                   <div className="grid__wrapper">
                                       <div className="browse__all">
                                           <section>
                                               <div className="browse__header">
                                                   <div>
                                                       <div>
                                                           <h2>Browse all</h2>
                                                       </div>
                                                   </div>
                                               </div>

                                               <div className="browse__cards">
                                                    
                                                    
                                                    {
                                                        genres.map((category,i)=>{
                                                                return category.image && <BrowseCard key={category.id} color={category.background} image={category.image && category.image} title={category.title}/>
                                                        })
                                                    }
                                               </div>
                                           </section>
                                       </div>
                                   </div>
                               </div>
                           </div>
                            </div>
                        }


                        {
                            props.activePage==="playlist"
                            &&
                            <div className="playlist__Section">
                                    <div className="contentSpacing hero__wrapper">
                                        <div className="hero__background" style={{backgroundColor:color && color}}>
                                            </div>
                                            <div className="hero__content__back"></div>
                                                <div className="playlist__thumb">
                                                    <div className="playlist__thumb__main">
                                                        <div>
                                                            <div>
                                                                {playlist && playlist.images.length<1 ? <div className="icon">
                                                                <MelodyIcon/>
                                                                </div>:
                                                                <img src={playlist && playlist.images[0].url} alt="playlist__cover"/>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="playlist__info">
                                                    <h2>Playlist</h2>
                                                    <span>
                                                        <button>
                                                            <span>
                                                                <h1>{playlist && playlist.name}</h1>
                                                            </span>
                                                        </button>
                                                    </span>
                                                    <h2 className="desc__header">
                                                        <button><p>{playlist && playlist.description}</p></button>
                                                    </h2>
                                                    <div className="playlist__meta__info">
                                                        <div><a href="/">{playlist && playlist.owner.display_name}</a></div>
                                                        <div className="playlist__likes">{playlist && playlist.followers.total} likes</div>
                                                        <div className="playlist__tracks__count">{playlist && playlist.tracks.items.length} songs,{hours} hr {min} min</div>
                                                        
                                                    </div>
                                                </div>
                                            
                                        
                                    </div>

                                    <div className="playlist__tracks">
                                        <div className="track__background" style={{backgroundColor:color2 && color2}}></div>
                                       
                                        <div className="track__header contentSpacing">
                                            <div className="track__header__wrapper">
                                                <button onClick={playAlbum}><PlayIcon/></button>
                                                <button><HeartIcon/></button>
                                                <button><MoreIcon/></button>
                                            </div>
                                        </div>

                                        <div className="tracks__container contentSpacing">
                                                <div className="tracklist">
                                                    <div className={`tracklist__header ${blackHeader && "black__header"}`}>
                                                        <div className="tracklist__header__content">
                                                            <div className="hash">#</div>
                                                            <div className="track__title__header">
                                                                <div>
                                                                    <span>Title</span>
                                                                </div>
                                                            </div>
                                                            <div className="track_album__header">
                                                                <div>
                                                                    <span>Album</span>
                                                                </div>
                                                            </div>
                                                            <div className="track_date__header">
                                                                <div>
                                                                    <span>Date Added</span>
                                                                </div>
                                                            </div>
                                                            <div className="track_duration__header">
                                                                <div>
                                                                    <span>
                                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M7.999 3H6.999V7V8H7.999H9.999V7H7.999V3ZM7.5 0C3.358 0 0 3.358 0 7.5C0 11.642 3.358 15 7.5 15C11.642 15 15 11.642 15 7.5C15 3.358 11.642 0 7.5 0ZM7.5 14C3.916 14 1 11.084 1 7.5C1 3.916 3.916 1 7.5 1C11.084 1 14 3.916 14 7.5C14 11.084 11.084 14 7.5 14Z" fill="currentColor"></path></svg>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="tracklist__body">
                                                        <div className="tracklist__body__container">
                                                            
                                                            
                                                            {
                                                                playlist && playlist.tracks.items.map((item,i)=>{
                                                                    return <Track name={item.track.name} artists={item.track.artists} cover={item.track.album.images[2].url} date={item.added_at} index={i}/>
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                        </div>
                                    </div>
                            </div>
                        }



                        {
                            props.activePage==="profile" &&
                            <div className="profile__section">
                                    <div className="profile__main contentSpacing">
                                        <div className="profile__banner">
                                            
                                        </div>
                                        <div className="banner__background"></div>
                                        <div className="profile__cover">
                                            <div className="user__image__wrapper">
                                                <div className="user__cover__image">
                                                    <img src={user && user.images[0].url} alt="" />
                                                </div>
                                                <div className="profile__update__wrapper">
                                                    <div className="profile__update__form">
                                                        <button>
                                                            <div className="button__icon_2">
                                                                <PencilIcon/>
                                                                <span>Choose photo</span>
                                                            </div>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="user__info__profile">
                                            <h2>Profile</h2>
                                            <span className="username">
                                                <button>
                                                    <span>
                                                        <h1>{user && user.display_name}</h1>
                                                    </span>
                                                </button>
                                            </span>
                                            <div className="user__meta__info">
                                                <span>2 Public Playlist</span>
                                                <span><a href="/">{user && user.followers.total} Followers</a></span>
                                                {/* <span>
                                                    <a href="#">42 Followings</a>
                                                </span> */}
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        }

                        {
                            props.activePage.includes("library") &&
                            <div className="profile__container contentSpacing">
                                <div className="library__header">
                                    <h1>{props.activePage.replace("library:","").charAt(0).toUpperCase()+props.activePage.replace("library:","").slice(1)}</h1>
                                </div>
                                {props.activePage.includes("library:playlist") && <div className="libarary__content">

                                </div>}
                            </div>
                        }









                  
                </main>
            </div>
           
        </div>
    )
}
const mapStateToProps = (state)=>({
    offline_data:state.appReducer.offline_data,
    activePage:state.appReducer.activePage,
    categories:state.appReducer.categories,
    recommendations:state.appReducer.recommendations,
    user:state.appReducer.user,
    dropdown:state.appReducer.dropdown,
    
})
const mapDispatchToProps = (dispatch)=>({
    setDrop:(dropdown)=>dispatch(setDrop(dropdown)),
    setUser:(user)=>dispatch(setUser(user)),
    setRecommendation:(recommendations)=>dispatch(setRecommendation(recommendations)),
    setCurrentSong:(currentSong)=>dispatch(setCurrentSong(currentSong)),
    setPlaylists:(userPlaylist)=>dispatch(setPlaylists(userPlaylist))
})
export default connect(mapStateToProps,mapDispatchToProps)(Main)
