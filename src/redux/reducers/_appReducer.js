const intialState = {
    offline_data:null,
    user:null,
    authToken:null,
    activePage:"home",
    categories:null,
    recommendations:null,
    accessToken:null,
    currentSong:null,
    dropdown:false,
    userPlaylist:null,
    recentPlayed:null,
    error:null,
    device:null,
    isPlaying:false,
    devices:null,
    isDevices:false,
    activeDevice:null,
    randomRecommendation:null,
    isToast:null,
    isModal:null

 }
 
 export default function AppReducer(state=intialState,action){
    switch(action.type){
        case "SET_ERROR":{
            return{
               ...state,
               error:action.error
            }
         }

         case "SET_MODAL":{
            return{
               ...state,
               isModal:action.isModal
            }
         }

         case "SET_TOAST":{
            return{
               ...state,
               isToast:action.isToast
            }
         }

         case "SET_RANDOM_RECOMMENDATIONS":{
            return{
               ...state,
               randomRecommendation:action.randomRecommendation
            }
         }


         case "SET_ACTIVE_DEVICE":{
            return{
               ...state,
               activeDevice:action.activeDevice
            }
         }

         case "SET_DEIVICE_TOGGLE":{
            return{
               ...state,
               isDevices:action.isDevices
            }
         }


         case "SET_DEVICES":{
            return{
               ...state,
               devices:action.devices
            }
         }

         case "SET_PLAYING":{
             return{
                 ...state,
                 isPlaying:action.playing
             }
         }

         case "SET_DEVICE":{
             return{
                 ...state,
                 device:action.device
             }
         }

       case "SET_OFFLINE_DATA":{
          return{
             ...state,
             offline_data:action.offline_data
          }
       }

       case "SET_RECENTS":{
        return{
           ...state,
           recentPlayed:action.recentPlayed
        }
     }
       case "SET_PLAYLISTS":{
           return{
               ...state,
               userPlaylist:action.userPlaylist
           }
       }

       case "ADD_PLAYLIST":{
        return{
            ...state,
            userPlaylist:[action.playlist,...state.userPlaylist]
        }
    }

       case "SET_DROPDOWN":{
        return{
           ...state,
           dropdown:action.dropdown
        }
     }
       case "SET_CURRENT_TRACK":{
        return{
            ...state,
            currentSong:action.currentSong
        }
       }

       case "SET_RECOMENDATION":{
           return{
               ...state,
               recommendations:action.recommendations
           }
       }

       case "SET_CATEGORIES":{
           return{
               ...state,
               categories:action.categories
           }
       }

       case "SET_USER":{
           return{
               ...state,
               user:action.user
           }
       }
       case "SET_ACTIVE_PAGE":{
        return{
            ...state,
            activePage:action.activePage
        }
    }
       case "SET_TOKEN":{
           return {
               ...state,
               token:action.token
           }
       }

       case "SET_ACCESS_TOKEN":{
        return {
            ...state,
            accessToken:action.accessToken
        }
    }
 
       
 
       default:
          return state
    }
 }