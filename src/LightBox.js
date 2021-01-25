
import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import $ from 'jquery';

import { filterWork, getData } from './pages/data';

class LightBox extends Component
{
    state = {open:false,
             index:0,
             works:[],
            lighbox:{
                 src:'',
                 width:'300',
                 height:'250'
             }
            }

    componentDidMount()
    {
        const works = filterWork('ad');
        this.setState({works:works});
     
    }

    closeLightBox = (e = null) => {
        
        e.preventDefault();

        this.setState({open:false});
    }
    openLightBox = (params) => {
        
        console.log('openLightBox();');

        const { title, url, key, width, height} = params;

        this.setState({open:true, index:key, title:title, src:url, width:width, height:height});      
    }
    onPrev = (e) => {
        e.preventDefault();
        const { index, works} = this.state;

        let activeIndex = Number(index);
        
        if(activeIndex > 0)
        {
            activeIndex -= 1;
        }else{
            activeIndex =  works.length-1;
        }

        const { title, url, width, height } = works[activeIndex];
        
        this.setState({index:activeIndex, title:title, src:url, width:width, height:height}); 
    }
    onNext = (e) => {
        e.preventDefault();

        const { index, works} = this.state;

        let activeIndex = Number(index);
        
        if(activeIndex < works.length-1)
        {
            activeIndex += 1;
        }else{
            activeIndex = 0;
        }

        const { title, url, width, height } = works[activeIndex];

        this.setState({index:activeIndex, title:title, src:url, width:width, height:height}); 
    }

    render()
    {
       
        return (
            <React.Fragment>
                 <div className={`light-box ${this.state.open === true ? 'show-light-box' : 'remove-light-box'}`}>
                 
                 <a href='#' onClick={(e) => this.closeLightBox(e)} className='light-box__close-btn'>
                    <ion-icon name="close-circle-outline"></ion-icon>
                 </a>
                    <div className='light-box__container'>
                       <div className='light-box__container-header'>
                            <h1 className='light-box__container-title'>{this.state.title}</h1>
                            <div className='light-box__container-divider'></div>
                        </div>
                        <div className='light-box__container-video' style={{width:this.state.width, height:this.state.height}}>
                             <ReactPlayer  muted={true} playing={true} controls={true} width='100%' height='100%' url={this.state.src}  />
                         </div>
                         <div className='light-box__container-prev-next-btn'>
                             <div onClick={(e) => this.onPrev(e)} className='light-box__container-prev-next-btn-arrow-btn arrow-btn'>
                                 <ion-icon name="arrow-back-circle-outline"></ion-icon>
                             </div>
                             <div onClick={(e) => this.onNext(e)} className='light-box__container-prev-next-btn-arrow-btn arrow-btn'>
                             <ion-icon name="arrow-forward-circle-outline"></ion-icon>
                             </div>
                         </div>
                    </div>
                 </div>
            </React.Fragment>
        )
    }
}   
export default LightBox;