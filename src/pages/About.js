import React, { Component } from 'react';
import profile from '../img/about.jpg';
import { Link } from 'react-router-dom';
import { Transition } from "react-transition-group";
import Footer from './Footer';

import { gsap, ScrollToPlugin } from 'gsap/all';


gsap.registerPlugin(ScrollToPlugin);


class About extends Component 
{
    componentDidMount()
    {
        if(window.scrollY > 0 ) gsap.to(window, {duration: 2, scrollTo:{y:"#aboutSection", ease:'power2.inOut', offsetY:100}});

    }
   
    render()
    {
        return (

            <>

            <div className='gradient-divider margin-bottom--large'></div>

            <section id='aboutSection' className='section margin-bottom--xl'>
                <div className='section__content'>
                    <h1 className='section__content-title heading--large'>About</h1>
                    <div className='divider'></div>
                    <div className='section__content-row center-items'>

                    <div className='section__content-row-item'>
                            <div className='section__content-row-item-about-image'>
                                <img src={profile} width='100%' alt='profile-pic'/>
                            </div>

                    </div>
                        <div className='section__content-row-item'>
                            <h1 className='section__content-row-item-title heading--medium'>Abel Gudino / Developer</h1>
                            <div className='divider'></div>
                            <p className='section__content-row-item-copy margin-bottom--small'>I’m a passionate Creative Developer with a wide range of skill-sets, from not just design, but also code, and a little motion design as well. With over 10yrs experience in the Marketing & Advertising space, I’m well suited for such a position.</p>
                            <Link to='/contact' className='pill-btn' >contact</Link>
                        </div>
                </div>
                
                     </div>
         </section>
         <Footer linkedin='https://www.linkedin.com/in/fgudino/' instagram='https://www.instagram.com/abel121677/'/>

         </>
        )
    }
}
export default About;