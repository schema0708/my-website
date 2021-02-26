import React, { useState, useEffect } from 'react';
import Footer from './Footer';

import { filterWork } from './data';
import {  Link, useHistory, withRouter } from "react-router-dom";
import { gsap, ScrollToPlugin } from 'gsap/all';

import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

const properties = {
    duration: 3000,
    autoplay: true,
    transitionDuration: 500,
    infinite: true,
    easing: "ease", 
    prevArrow: <div className='arrow-btn' style={{fontSize: "4rem",  position:'absolute', left: "1.5rem"}}><ion-icon name="arrow-back-circle-outline"></ion-icon></div>,
    nextArrow: <div className='arrow-btn' style={{fontSize: "4rem",  position:'absolute',  right: "1.5rem"}}><ion-icon name="arrow-forward-circle-outline"></ion-icon></div>
};

const works = filterWork('ui/ux');

gsap.registerPlugin(ScrollToPlugin);

let slideRef = React.createRef();
 
const WorkPage = (props) => {
{
    const [ activeIndex, setActiveIndex ] = useState(0);
    const [ images, setImages ] = useState([]);
    const [ data, setMyData ] = useState({});

    useEffect(() => {

        if(window.scrollY > 0 ) gsap.to(window, {duration: 2, scrollTo:{y:'#workSection', ease:'power2.inOut', offsetY:100}});

                let { id } = props.match.params;

                if(works === null) 
                {

                    let passingData = works[id].data;
                    setImages(passingData.images);
                    setMyData(passingData);
                }
                // WILL LOAD PREVIOUS WORK IF USER CLICKS ON THE BACK BUTTON, SO IF THE PREVIOUS ID IN THE QUERY STRING IS NOT EQUAL TO THE ACTIVE INDEX IN THE CURRENT STATE THEN IT 
                // WILL POPULATE THE PREVIOUS PROJECT THAT THE USER HAS VISITED
                if(id !== activeIndex) {

                    let passingData = works[id].data;
                    setActiveIndex(id);
                    setImages(passingData.images);
                    setMyData(passingData);
            }
        }
    )

    const onPrev = (e) => {
        e.preventDefault();
        //console.log('onPrev();');

        let id = activeIndex;
        
        if(id > 0)
        {
            id -= 1;
        }else{   
            id = works.length-1;
        }
        
        props.history.push({
            pathname: `/work/${id}`
        })

        let passingData = works[id].data;
        setActiveIndex(id);
        setImages(passingData.images);
        setMyData(passingData);
    }
    const onNext = (e) => {
        e.preventDefault();
        //console.log('onNext();');


        let id = activeIndex;
        
        id++;

        if(id > works.length-1) id = 0;

        props.history.push({
            pathname: `/work/${id}`
        })

        let passingData = works[id].data;
        setActiveIndex(id);
        setImages(passingData.images);
        setMyData(passingData);

    }
        const { title, name, link, role, strategy, medium, description  } = data;
        return (
            <>
            
            <div className='gradient-divider margin-bottom--large'></div>

            <section id='workSection' className='section margin-top--medium'>
               <div className='section__content'>
                   <h1 className='section__content-title heading--large'>{title}</h1>
                   <div className='divider'></div>
                   <div className='slideshow-container'>
                   <Slide ref={slideRef} {...properties}>
                   {images.map((each, index) => (
                       <div key={index} className="each-slide">
                           <img key={index} className='lazy' src={each} alt='work-item' />
                       </div>
                   ))}
                   </Slide>
                   </div>
               </div>
       </section>
       
       <section className='section'>
           <div className='section__content'>
               <div className='divider'></div>
               <div className='section__content-row work-row'>
                       <div className='section__content-row-item work-item'>
                           <span className='section__content-row-item-heading'>project name</span>
                           <p className='section__content-row-item-copy'>{name}</p>
                           <span className='section__content-row-item-heading'>role</span>
                           <p className='section__content-row-item-copy'>{role}</p>
                           <span className='section__content-row-item-heading'>description</span>
                           <p className='section__content-row-item-copy'>{description}</p>

                           </div>
                       <div className='section__content-row-item work-item'>
                           <span className='section__content-row-item-heading'>strategy</span>
                           <p className='section__content-row-item-copy'>{strategy}</p>
                           <span className='section__content-row-item-heading'>medium</span>
                           <p className='section__content-row-item-copy'>{medium}</p>
                           {link ? <a href={link} target='_blank' className='pill-btn margin-top--small'>launch</a> : null }

                       </div>
               </div>

               
               <div className='divider'></div>

           </div>
       </section>
       <section className='section margin-top--medium margin-bottom--large'>
               <div className='section__content'>
                   <div className='row'>
                       <div className='row__item margin-right--large'>
                               <Link to='/' className='pill-btn'>home</Link>

                       </div>
                       <div className='row__item'>
                               <a href='#' onClick={(e) => onPrev(e)} className='pill-btn margin-right--small'>prev</a> <a href='#' onClick={(e) => onNext(e)} className='pill-btn'>next</a>
                               
                       </div>
                   </div>
               </div>
       </section>
       <Footer linkedin='https://www.linkedin.com/in/fgudino/' instagram='https://www.instagram.com/abel121677/'/>

            </>
        )
    }
}
export default WorkPage;