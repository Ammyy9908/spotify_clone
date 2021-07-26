import './App.css';
import Home from './pages/Home/Home';
import React from "react";
import axios from 'axios';
import { connect } from 'react-redux';
import { setOfflineData, setRecommendation, setToken } from './redux/actions/_appAction';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Search from './pages/Search/Search';


function App(props) {
 

  console.log(props);

  React.useEffect(()=>{


    const getRecommendation = async ()=>{
      try{
        const r = await axios.get(`https://api.spotify.com/v1/views/personalized-recommendations?timestamp=2021-07-26T14%3A55%3A40.765Z&platform=web&content_limit=10&limit=20&types=album%2Cplaylist%2Cartist%2Cshow%2Cstation%2Cepisode&image_style=gradient_overlay&country=IN&locale=en`,{headers:{
          "Authorization":"Bearer BQBpYnLphHkdrJvmt0lt-11sKk2iytgf7hJKhQyvH-rLhfem9nr61OU0Wcvph7nHUMWlE0sLSQQH8QGYOdm51o9IDGxq_DRsV7_Kckoc47BZTXfpmFG9F6ru0RIkljytEmvTM0VJicHl3juYjhW3-uPvwYfNOEh7YyfoOVdlF05WmLXMDo9Vt1SwFDGDWts2ExOr5Bmj_OdFgutuZqduEGtcWy2plMxX13lmd5_yEnhRVy2ufEq0cv00alPbHhqzYPit7fu61bUPMNugtGvhSiVrWR_yhIXH-bFOAbN1SfhkS5GVuperN9nvxO0G"
        }});

        return r.data;
      }
      catch(e){
        if(e.response && e.response.data){
          return e.response.data;
        }
      }
    }

    getRecommendation().then((data)=>{
      console.log("Recommended data",data);
      props.setRecommendation(data.content.items[0])
    }).catch((e)=>console.error(e));


    const getAccessToken = async ()=>{
      const r = await axios.get('http://localhost:5000/getToken',{headers: { 
        'x-apikey': '59a7ad19f5a9fa0808f11931',
        'Access-Control-Allow-Origin' : 'http://localhost:3000/',
        'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      }});
      return r.data;
    } 


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


    getAccessToken().then((tokenData)=>{
      console.log("token data",tokenData);
      props.setToken(tokenData.token);
      

      getSpotifyData(tokenData.token).then((data)=>{
        console.log("data ",data);
        props.setOfflineData(data.content);
      });
    })
    
  },[])
  return (
    <Router>
  <div>
  
  
  <Switch>
  <Route exact path="/">
    <Home/>
    </Route>
    <Route path="/search" render={(props) => {
  
    return <Search />
}}  />

   
   
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
})
export default connect(null,mapDispatchToProps)(App);
