import React from 'react';
import "./Track.css"

function Track() {
    return (
        <div className="track">
            <div className="track__wrapper">
                <div className="track__number">1</div>
                <div className="track__info">
                    <div className="track__cover">
                        <img src="https://i.scdn.co/image/ab67616d00004851b7f7e6059136889dd99fb068" alt="track__cover" />
                    </div>
                    <div className="track__metadata">
                        <div className="track__name"></div>
                        <span className="track__artists">
                            <a href="#">Sumit</a>
                        </span>
                    </div>
                </div>
                <div className="track__album__info">
                    <a href="#">KTMBK</a>
                </div>
                <div className="track__timestamp">
                    <span>Mar 23</span>
                </div>
                <div className="track__duration">
                    <button className="track__like__btn"></button>
                    <span></span>
                    <button className="track__more"></button>
                </div>
            </div>
        </div>
    )
}

export default Track
