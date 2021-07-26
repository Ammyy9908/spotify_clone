import React from 'react';
import { connect } from 'react-redux';
import Main from '../../components/Main/Main';
import Sidebar from '../../components/Sidebar/Sidebar';
import { setActivePage, setCategories } from '../../redux/actions/_appAction';
import "./Search.css"

function Search(props) {
    React.useEffect(()=>{
        props.setActivePage("search");     
    },[]);
    return (
        <div className="home__container">
            <Sidebar/>
            <Main/>
        </div>
    )
}

const mapStateToProps = (state)=>({
    authToken:state.appReducer.authToken,

})
const mapDispatchToProps = (dispatch)=>({
    setActivePage:(activePage)=>dispatch(setActivePage(activePage)),
    setCategories:(categories)=>dispatch(setCategories(categories))
    
})
export default connect(mapStateToProps,mapDispatchToProps)(Search)
