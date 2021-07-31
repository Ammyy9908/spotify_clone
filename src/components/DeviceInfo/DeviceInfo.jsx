import React from 'react'
import { connect } from 'react-redux'
import Speaker from '../../assets/Speaker'
import "./Device.css"

function DeviceInfo(props) {
    return (
        <>{props.device && <div className="device__info">
            <div className="device__info__wrapper">
                <div className="device__right">
                    <Speaker/> <span>Listening on <strong>{props.device && props.device.name}</strong></span>
                </div>
            </div>
        </div>}</>
    )
}


const mapStateToProps = (state)=>({
    device:state.appReducer.device
})
export default connect(mapStateToProps,null)(DeviceInfo)
