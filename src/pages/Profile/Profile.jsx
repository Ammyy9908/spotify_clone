import React from 'react';
import { connect } from 'react-redux';
import Main from '../../components/Main/Main';
import Player from '../../components/Player/Player';
import Sidebar from '../../components/Sidebar/Sidebar';
import { setActivePage } from '../../redux/actions/_appAction';
import "./Profile.css"

function Profile(props) {
    React.useEffect(()=>{
        props.setActivePage("profile");
    },
    // eslint-disable-next-line
    [])
    return (
        <div className="home__container">
            <Sidebar/>
            <Main uid={props.uid}/>
            <Player/>
        </div>
    )
}


const mapDispatchToProps = (dispatch)=>({
    setActivePage:(activePage)=>dispatch(setActivePage(activePage)),
})

const mapStateToProps = (state)=>({
    user:state.appReducer.user
});

export default connect(mapStateToProps,mapDispatchToProps)(Profile);
