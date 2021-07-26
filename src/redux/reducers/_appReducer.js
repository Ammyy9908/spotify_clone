const intialState = {
    offline_data:null,
    user:null,
    authToken:null,
    activePage:"home",
    categories:null,
    recommendations:null,
    accessToken:null
 }
 
 export default function AppReducer(state=intialState,action){
    switch(action.type){
       case "SET_OFFLINE_DATA":{
          return{
             ...state,
             offline_data:action.offline_data
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