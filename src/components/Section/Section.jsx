import React from 'react';
import PlayIcon from '../../assets/PlayIcon';
import "./Section.css"


function SectionCard({name,extra,image}){
    return <div className="section__card">
        <div className="section__card__body">
            <div className="card__thumb">
                <div className="card__image">
                <div>
                    <img src={image} alt="" />
                </div>
                </div>
                <div className="card_play_btn">
                    <button>
                        <PlayIcon/>
                    </button>
                </div>
            </div>
            <div className="card__meta">
                <a href="#" className="card__title">
                    <div className="title">
                    {name}
                    </div>
                </a>
                <div className="card__exta__info">
                    {extra}
                </div>
            </div>
            <div className="card__click__handler"></div>
        </div>
    </div>
}

function Section({text,items}) {
    return (
       <section className="section">
           <div className="section__header">
               <div className="section__header__content">
                   <div className="section__heading">
                       <h2>{text}</h2>
                   </div>
                   <a href="#">
                       <span>see all</span>
                   </a>
               </div>
           </div>
           <div className="section__grid__container">
                {/* <SectionCard/>
                <SectionCard/>
                <SectionCard/>
                <SectionCard/> */}
                
                {
                    items.slice(0,6).map((item,i)=>{
                        return <SectionCard key={i} name={item.name} extra={item.type==="playlist" && item.description.slice(0,49)+"..." || item.album_type==="album" && item.artists.map((artist)=><a href="#">{artist.name}</a>) || item.album_type==="single" && item.artists.map((artist)=>artist.name+"") } image={item.images[0].url}/>
                    })
                }
           </div>
       </section>
    )
}

export default Section
