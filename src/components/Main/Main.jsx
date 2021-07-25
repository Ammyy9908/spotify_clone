import React from 'react'
import "./Main.css"

function AppBar(){
   return  <div className="app_bar">
        <div className="app__bar__container">
        <div className="nav__buttons">
            <a href="#">
            <svg role="img" focusable="false" height="24" width="24" viewBox="0 0 24 24" class="Svg-ytk21e-0 fJEWJR _6fe5d5efc9b4a07d5c424071ac7cdacb-scss"><polyline points="16 4 7 12 16 20" fill="none" stroke="#ccc"></polyline></svg>
            </a>
            <a href="#">
            <svg role="img" focusable="false" height="24" width="24" viewBox="0 0 24 24" class="Svg-ytk21e-0 fJEWJR _6fe5d5efc9b4a07d5c424071ac7cdacb-scss"><polyline points="8 4 17 12 8 20" fill="none" stroke="#ccc"></polyline></svg>
            </a>
        </div>

        <a href="#" className="login__button__nav">LOG IN</a>
        </div>
    </div>
}
function Main() {
    return (
        <div className="main">
            <AppBar/>
        </div>
    )
}

export default Main
