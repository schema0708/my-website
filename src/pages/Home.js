import React, { Component } from 'react';
import {  Link } from "react-router-dom";

import { LazyLoadImage } from 'react-lazy-load-image-component';

import 'react-lazy-load-image-component/src/effects/opacity.css';

import mouseicon from '../img/mouse_icon.svg';

import { filterWork } from './data';


import { gsap, ScrollToPlugin } from "gsap/all";

gsap.registerPlugin(ScrollToPlugin);



class Home extends Component
{
    state = {activeIndex:0, title:'AD', images:[]};

    lightbox = null;

    componentDidMount()
    {

        gsap.registerPlugin(ScrollToPlugin); 

        let tl = gsap.timeline();

        tl.from('.heading-1', {opacity:0, y:'+=80%', duration:1, ease:'power2.inOut'})
          .from('.divider-1', {scaleX:'0', transformOrigin:'left', duration:1, ease:'power2.inOut'}, '-=0.5')
          .from('.copy-1', {opacity:0, y:'+=30%', duration:1, ease:'power2.inOut'}, '-=0.75')
          .from('.btn-1', {opacity:0, y:'+=30%', duration:1, ease:'power2.inOut'}, '-=0.75')
          .from('.divider-2', {scaleX:'0', duration:1, ease:'power2.inOut'}, '-=0.75')
          .from('.mouse-icon', {opacity:0, y:'+=30%', duration:1, ease:'power2.inOut'}, '-=0.75');

       const works = filterWork('ad');
 
       this.setState({images:works});
       
       if(window.scrollY > 0 ) gsap.to(window, {duration: 2, scrollTo:{y:"#welcome", ease:'power2.inOut', offsetY:100}});
    }
    
    onFilterWork = (e, filter, index) =>
    {
        e.preventDefault();

        const works = filterWork(filter);

        this.setState({images:works, title:filter, activeIndex:index});
    }
    onScrollToWorks = (e) => {
        e.preventDefault();

        gsap.to(window, {duration: 2, scrollTo:{y:"#workSection", ease:'power2.inOut', offsetY:70}});
    }
    render() {


       return (
        <React.Fragment>           
                         
               <header id='welcome' className='page-1 home'>
                   <div className='home__welcome'>
                        <h1 className='heading-1 home__welcome-title heading--large'>Greetings!</h1>
                        <div className='divider-1 divider'></div>
                        <h1 className='copy-1 heading--large'>
                    Thank you for visiting my portfolio, where you can view some of my works below, enjoy!</h1>
                        <a href='#' onClick={(e) => this.onScrollToWorks(e)} className='btn-1 page__btn pill-btn margin-top--medium'>view work</a>
                    </div>
                    <div className='mouse'>
                        <div className='divider-2 divider'></div>
                        <img className='mouse__icon mouse-icon' src={mouseicon} alt='mouse-scroll'/>
                    </div>
                </header>
                <div className='gradient-divider'></div>
               <section id='workSection' className='section margin-top--medium'>
                        <div className='section__content works'>
                            <h1 className='heading--large margin-bottom--small'>My Works</h1>
                            <div className='divider'></div>
                            <h1 className='heading--large works__copy margin-top--small'>Here are some of my <span className='work-title'>{this.state.title}</span> works below.</h1>

                        <div className='works__filters margin-top--medium  margin-bottom--small'>
                            <span className='works__filters-filter-name'>filter by</span>
                            <a href='#' onClick={(e) => this.onFilterWork(e, 'ad', 0)} className={`works__filters-btn pill-btn ${this.state.activeIndex === 0 ? 'active' : ''}`}>ads</a>
                            <a href='#' onClick={(e) => this.onFilterWork(e, 'ui/ux', 1)} className={`works__filters-btn pill-btn ${this.state.activeIndex === 1 ? 'active' : ''}`}>ui/ux</a>
                            <a href='#' onClick={(e) => this.onFilterWork(e, 'games', 2)} className={`works__filters-btn pill-btn ${this.state.activeIndex === 2 ? 'active' : ''}`}>games</a>
                        </div>
                        <div className='divider'></div>
                        </div>
                </section>

                <section className='section margin-top--medium margin-bottom--medium'>
                <div className='section__content'>

                     <div className='row'>
                         {this.state.images.map((element, index) => {
                            return (
                                    <div key={index} className='work-item'>

                                         <Link className='work-link' to={{pathname:element.type !== 'ad' ? element.url : '#' }}  
                                               target={element.target === '_blank' ? element.target : null }> 
                                               <LazyLoadImage onClick={element.type === 'ad' ? (e) => this.props.openBox(e, element) : null } src={element.src} effect='opacity' width="100%" alt={element.title} />
                                        </Link>
                                     </div>
                                     )
                        })}
                        </div>
                     </div>
                </section>
                <footer className='footer'>
                <section className='section'>
                    <section className='section__content'>
                        <div className='social'>
                            <a className='social__social-link' href='https://www.linkedin.com/in/fgudino/' target='_blank'>
                                <ion-icon name="logo-linkedin"></ion-icon>
                            </a>
                            
                            <a className='social__social-link' href='https://www.instagram.com/abel121677/' target='_blank'>
                                <ion-icon name="logo-instagram"></ion-icon>
                            </a>
                        </div>
                    </section>
                </section>
            </footer>
                </React.Fragment>
       )   

    }
}
export default Home;