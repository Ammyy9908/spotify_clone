import axios from "axios"
import Cookies from "js-cookie";
const handleAlbumPlay = async (uri)=>{
    try{
        const r = await axios.put('https://api.spotify.com/v1/me/player/play',{
            "context_uri": uri,
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

export default handleAlbumPlay;