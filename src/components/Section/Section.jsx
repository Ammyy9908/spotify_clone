import React from 'react';
import PlayIcon from '../../assets/PlayIcon';
import "./Section.css"
// eslint-disable-next-line
import handleAlbumPlay from "../../utils/AlbumPlay"
import Toast from '../Toast/Toast';

function SectionCard({name,extra,image,uri,setError}){

    const play = ()=>{
        
        console.log(uri)
        handleAlbumPlay(uri).then((response)=>{
            console.log('Track played!');
        }).catch((e)=>{
            console.log(`Eror while starting player => ${e}`);
            setError(e.message);

        })
       
    }
    return <div className="section__card">
        <div className="section__card__body">
            <div className="card__thumb">
                <div className="card__image">
                <div>
                    <img src={image} alt="" />
                </div>
                </div>
                <div className="card_play_btn">
                    <button onClick={play}>
                        <PlayIcon/>
                    </button>
                </div>
            </div>
            <div className="card__meta">
                <a href="/" className="card__title">
                    <div className="title">
                    {name}
                    </div>
                </a>
                <div className="card__exta__info">
                    {extra}
                </div>
            </div>
        </div>
    </div>
}

function Section({text,items,handlePlay}) {

    const [error,setError] = React.useState(null);


    return (
       <section className="section">
           <Toast error={error} setError={setError}/>
           <div className="section__header">
               <div className="section__header__content">
                   <div className="section__heading">
                       <h2>{text}</h2>
                   </div>
                   <a href="/">
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
                        
                        return <SectionCard key={item.id} name={item.name} extra={item.type==="playlist" && item.description.slice(0,49)+"..." && item.album_type==="album" && item.artists.map((artist)=><a href="/">{artist.name}</a>) && item.album_type==="single" && item.artists.map((artist)=>artist.name+"") } image={item.images[0].url} uri={item.uri} setError={setError}/>
                    })
                }
           </div>
       </section>
    )
}

export default Section
