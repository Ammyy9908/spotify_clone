import React from 'react'
import { connect } from 'react-redux'
import { setModal } from '../../redux/actions/_appAction'
import "./Modal.css"
import analyze from "rgbaster";

function Modal(props) {

    const [color,setColor] = React.useState(null);

    let img = props.isModal;
    if (img) {
        const result = analyze(img); // also supports base64 encoded image strings
        result.then((result) => {
          setColor(result[0].color);
          
          console.log(
            `The dominant color is ${result[0].color} with ${result[0].count} occurrence(s)`
          );

          console.log(result[0])
        });
      }
    return (
        <div className="login__modal">
            <div className="login__modal__popup" style={{"backgroundColor":color}}>
                <div className="popup__body">
                    <div className="popup__body__left">
                        <div className="current__track__selected">
                            <img src={props.isModal} alt="selected__track" />
                        </div>
                    </div>
                    <div className="popup__body__right">
                        <h2>Start listening with a Premium Spotify account</h2>
                        <button className="sign__up">Sign Up</button>
                        <button className="login_btn">Login</button>
                    </div>
                </div>
                <div className="modal_close">
                    <button onClick={()=>props.setModal(null)}>Close</button>
                </div>
               

            </div>
        </div>
    )
}


const mapStateToProps = (state)=>({
    isModal:state.appReducer.isModal
})
const mapDispatchToProps = (dispatch)=>({
    setModal:(isModal)=>dispatch(setModal(isModal))
})
export default connect(mapStateToProps,mapDispatchToProps)(Modal)
