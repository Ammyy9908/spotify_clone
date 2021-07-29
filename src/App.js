import './App.css';
import Home from './pages/Home/Home';
import React from "react";
import axios from 'axios';
import { connect } from 'react-redux';
import { setCurrentSong, setOfflineData, setPlaylists, setRecommendation, setToken, setUser } from './redux/actions/_appAction';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Search from './pages/Search/Search';
import {getTokenFromResponse} from "./spotify";
import Cookies from "js-cookie";
import Playlist from './pages/Playlist/Playlist';
import Profile from './pages/Profile/Profile';
import Library from './pages/Library/Library';
function App(props) {
   // eslint-disable-next-line
const [accessToken,setToken] = React.useState(null);



  const token= !Cookies.get("SPOTIFY_TOKEN") && getTokenFromResponse();
 
  console.log("The Auth Token is ",token.access_token);
  token.access_token && Cookies.set("SPOTIFY_TOKEN",token.access_token);

 

  React.useEffect(()=>{


    //User Recent Played Tracks
    const getRecommendation = async ()=>{
      try{
        const r = await axios.get(`https://api.spotify.com/v1/me/player/recently-played`,{headers:{
          "Authorization":`Bearer ${Cookies.get("SPOTIFY_TOKEN")}`
        }});

        return r.data;
      }
      catch(e){
        console.log(e)
      }
    }

    Cookies.get("SPOTIFY_TOKEN") && getRecommendation().then((data)=>{
      
      props.setRecommendation(data.items)
    }).catch((e)=>console.error(e));




//Current User Profile
    async function getMe(){
      try{
        const r = await axios.get(`https://api.spotify.com/v1/me`,{headers:{
          "Authorization":"Bearer "+Cookies.get("SPOTIFY_TOKEN")
        }})
        props.setUser(r.data);


      }
      catch(e){
        console.log(e.response.data);
      }
    }

    getMe();


  
//Use to get open api access token from the backend
    const getAccessToken = async ()=>{
      const r = await axios.get('https://spotifyserversumit.herokuapp.com/getToken');
      return r.data;
    } 



    //this request the spotify open data using above requested token from the above request
    const getSpotifyData = async (token)=>{
      
      try{
        const r = await axios.get(`https://api.spotify.com/v1/views/desktop-home?timestamp=2021-07-26T08%3A34%3A52.054Z&platform=web&content_limit=10&limit=20&types=album%2Cplaylist%2Cartist%2Cshow%2Cstation%2Cepisode&image_style=gradient_overlay&country=IN&locale=en&market=IN`,{
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


    //function to get current playing track of the user

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


    // method for retrieving user playlists


    const getPlaylists = async ()=>{
        try{
          const r = await axios.get(`https://api.spotify.com/v1/me/playlists`,{
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




   

  


//Calling getAccess Token to request a token then get spotify data

    getAccessToken().then((tokenData)=>{
      props.setToken(tokenData.token);
      

      getSpotifyData(tokenData.token).then((data)=>{
        props.setOfflineData(data.content);
      });
    })

    Cookies.get("SPOTIFY_TOKEN") && getCurrentTrack().then((currentTrack)=>{
      
      props.setCurrentSong(currentTrack);
    }).catch(e=>console.error(e.messagge));


    Cookies.get("SPOTIFY_TOKEN") && getPlaylists().then((playlists)=>{
      
      props.setPlaylists(playlists.items);
    }).catch((e)=>console.error(e.messagge));

  






    
  },
   // eslint-disable-next-line
  [])
  return (
    <Router>
  <div>
  
  
  <Switch>
  <Route exact path="/">
    <Home/>
    </Route>
    <Route exact path="/search" render={(props) => {
  
    return <Search />
}}  />

        <Route
        exact
            path="/playlist/:id"
            render={(props) => {
              const id = props.match.params.id;
              return <Playlist id={id && id} />;
            }}
            
          />
          <Route
           exact
            path="/user/:uid"
            render={(props) => {
              const uid = props.match.params.uid;
              return <Profile uid={uid && uid} />;
            }}
           
          />
          <Route
          exact
            path="/collections/:type"
            render={(props) => {
              const type = props.match.params.type;
              return <Library type={type && type} />;
            }}
           
          />

   
   
  </Switch>
</div>
</Router>
  );
}



// const mapStateToProps = (state)=>({
//   accessToken:state.appReducer.accessToken,
// });


const mapDispatchToProps = (dispatch)=>({
  setOfflineData :(offline_data)=>dispatch(setOfflineData(offline_data)),
  setToken:(token)=>dispatch(setToken(token)),
  setRecommendation:(recommendations)=>dispatch(setRecommendation(recommendations)),
  setUser:(user)=>dispatch(setUser(user)),
  setCurrentSong:(currentSong)=>dispatch(setCurrentSong(currentSong)),
  setPlaylists:(userPlaylist)=>dispatch(setPlaylists(userPlaylist))
})
export default connect(null,mapDispatchToProps)(App);
