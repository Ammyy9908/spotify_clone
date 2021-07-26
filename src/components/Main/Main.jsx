import React from 'react'
import { connect } from 'react-redux'
import Section from '../Section/Section'
import "./Main.css"
import genres from "../../data/genres"
import PlayIcon from '../../assets/PlayIcon'

function AppBar({isGradient}){
   return  <div className="app_bar" style={{backgroundColor:isGradient && "rgb(76, 79, 248)"}}>
        <div className="app__bar__container">
        <div className="nav__buttons">
            <a href="#">
            <svg role="img" focusable="false" height="24" width="24" viewBox="0 0 24 24" className="Svg-ytk21e-0 fJEWJR _6fe5d5efc9b4a07d5c424071ac7cdacb-scss"><polyline points="16 4 7 12 16 20" fill="none" stroke="#ccc"></polyline></svg>
            </a>
            <a href="#">
            <svg role="img" focusable="false" height="24" width="24" viewBox="0 0 24 24" className="Svg-ytk21e-0 fJEWJR _6fe5d5efc9b4a07d5c424071ac7cdacb-scss"><polyline points="8 4 17 12 8 20" fill="none" stroke="#ccc"></polyline></svg>
            </a>
        </div>

        <a href="http://localhost:5000/login" className="login__button__nav">LOG IN</a>
        </div>
    </div>
}


function RecommendationCard({image,name}){
    return (
        <div className="recommendation__card">
       <div className="rcard__wrapper">
           <div className="rcard__thumb">
               <div className="rcard__thumb__cover">
                   <img src={image} alt="" />
               </div>
           </div>
           <div className="rcard__content">
            <a href="#"><p>
            {name}</p></a>
            <div className="rcard__button">
                <button className="play_btn">  <PlayIcon/></button>
            </div>
           </div>
           <div></div>
       </div>
    </div>
    )
}


function BrowseCard({color,image,title}){
    return(
        <a href="#" className="browse__card" style={{backgroundColor:color}}>
            <div className="browse__card__wrapper">
                <img src={image} alt="" className="browse__card__image" />
                <h3 className="browse__card__text">{title}</h3>
            </div>
        </a>
    )
}


function Recommendation({recommendations}){
    return <div className="recommendations">
        <div className="contentSpacing">

            <div className="recommendation__section">
                <div className="recommendation__header">
                    <h2>Good afternoon</h2>
                </div>
                <div className="recommendation__grid">
                   {/* <RecommendationCard/>
                   <RecommendationCard/> */}
                   

                   {
                        recommendations && recommendations.content.items.slice(0,6).map((recommendation,i)=>{
                            return <RecommendationCard image={recommendation.images[0].url} name={recommendation.name} key={i}/>;
                        })
                   }
                    
                </div>
            </div>
        </div>
    </div>
}
function Main(props) {

    const [isGradient,setGradient] = React.useState(false);
    const handleScroll = (e)=>{
        
        if(e.target.scrollTop>50){
            return setGradient(true);
        }
        setGradient(false);
    }
    return (
        <div className="main" onScroll={handleScroll}>
            <AppBar isGradient={isGradient}/>
            <div className="content__body">
                <main className="view__container">



                    
                        {props.activePage === "home" &&

                        <><Recommendation recommendations={props.recommendations}/>
                        <div className="home__body">
                            <div className="section__body">
                            <div className="sections contentSpacing">
                               
                                
                                {
                                    props.offline_data && props.offline_data.items.slice(2).map((section,i)=>{
                                        return <Section text={section.name} items={section.content.items}/>
                                    })
                                }
                            </div>
                        </div>  </div></>}

                        {
                            props.activePage==="search" && 
                            <div className="search__page">
                                <div className="contentSpacing">
                               <div className="grid__container">
                                   <div className="grid__wrapper">
                                       <div className="browse__all">
                                           <section>
                                               <div className="browse__header">
                                                   <div>
                                                       <div>
                                                           <h2>Browse all</h2>
                                                       </div>
                                                   </div>
                                               </div>

                                               <div className="browse__cards">
                                                    
                                                    
                                                    {
                                                        genres.map((category,i)=>{
                                                                return category.image && <BrowseCard key={category.id} color={category.background} image={category.image && category.image} title={category.title}/>
                                                        })
                                                    }
                                               </div>
                                           </section>
                                       </div>
                                   </div>
                               </div>
                           </div>
                            </div>
                        }
                  
                </main>
            </div>
        </div>
    )
}
const mapStateToProps = (state)=>({
    offline_data:state.appReducer.offline_data,
    activePage:state.appReducer.activePage,
    categories:state.appReducer.categories,
    recommendations:state.appReducer.recommendations,
    user:state.appReducer.user
})
export default connect(mapStateToProps,null)(Main)
