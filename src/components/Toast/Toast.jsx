import React from 'react';
import { connect } from 'react-redux';
import { setError } from '../../redux/actions/_appAction';
import "./Toast.css"

function Toast(props) {


    const handleToastRemove = (e)=>{
        e.target.classList.remove("toast__enable");
        setTimeout(()=>{
                props.setError(null);
        },5000);
    }
   
    return (
         <div className={`toast ${props.error && "toast__enable"}`} onClick={handleToastRemove}>
            <span>{props.error}</span>
        </div>
    )
}


const mapStateToProps = (state)=>({
    error:state.appReducer.error
})

const mapDispatchToProps = (dispatch)=>({
    setError:(error)=>dispatch(setError(error))
})
export default connect(mapStateToProps,mapDispatchToProps)(Toast)
