


export const setOfflineData = (offline_data)=>({
    type:"SET_OFFLINE_DATA",
    offline_data
 })

 //SET_TOKEN
 export const setToken = (token)=>({
    type:"SET_TOKEN",
    token
 })

 export const setUser = (user)=>({
    type:"SET_USER",
    user
 })

 export const setPlaylists = (userPlaylist)=>({
     type:"SET_PLAYLISTS",
     userPlaylist
 })

 export const addPlaylist = (playlist)=>({
     type:"ADD_PLAYLIST",
     playlist
 })

 export const setRecent = (recentPlayed)=>({
     type:"SET_RECENTS",
     recentPlayed
 })
 export const setDrop = (dropdown)=>({
     type:"SET_DROPDOWN",
     dropdown
 })
 export const setCurrentSong = (currentSong)=>({
     type:"SET_CURRENT_TRACK",
     currentSong
 })
 

 export const setActivePage = (activePage)=>({
     type:"SET_ACTIVE_PAGE",
     activePage
 })

 //SET_CATEGORIES
 export const setCategories = (categories)=>({
    type:"SET_CATEGORIES",
    categories
})

export const setRecommendation = (recommendations)=>({
    type:"SET_RECOMENDATION",
    recommendations
})

//SET_ACCESS_TOKEN
export const setAccessToken = (accessToken)=>({
    type:"SET_ACCESS_TOKEN",
    accessToken
 })