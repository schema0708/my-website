import React, { useState, useEffect } from 'react';
import logo from './img/logo.svg';
import { Link, NavLink, withRouter } from "react-router-dom";

const Nav = ({location}) => 
{
    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
       
       let { pathname } = location;

       if(pathname == '/') setActiveIndex(0);

       if(pathname == '/about') setActiveIndex(1);

       if(pathname == '/contact') setActiveIndex(2);
    })

    const onToggleNav = (e) => {
        
        e.preventDefault();

        open ? setOpen(false) : setOpen(true);
       
    }

    const setLink = (e = null, index) =>
    {
        e.preventDefault();
        setOpen(false);
        setActiveIndex(index);
    }
    const setActiveLink = (index) => {
        console.log('setActiveLink();', index);
        setOpen(false);
        setActiveIndex(index);
    }

        return (
            <>
            <header className='main-nav'>
            <nav className='main-nav__container'>
                <div className='main-nav__container-content'>
                <div onClick={(e) => {e.preventDefault(); setOpen(false);
                    setActiveIndex(0);}}>
                  <Link to='/' className='main-nav__container-content-logo'>
                       <img className='main-nav__container-content-logo-image' src={logo} alt='abelg - portfolio'/> 
                  </Link>
                  </div>
                      <a href='' onClick={(e) => onToggleNav(e)} className='main-nav__container-content-hamburger'>
                          <div className={`${open === false ? 'hamburger-active' : 'hamburger-deactive'}`}>
                          <ion-icon name="menu-outline"></ion-icon>
                          </div>
                          <div  className={`${open === true ? 'hamburger-active' : 'hamburger-deactive'}`}>
                          <ion-icon name="close-circle-outline"></ion-icon>
                          </div>
                      </a>
              </div>
           </nav>
           <nav className={`main-nav__dropdown ${open === true ? 'dropdown-active' : 'dropdown-deactive'}`}>
              <div className='main-nav__dropdown__links'>
                  <ul className='main-nav__dropdown__links-container'>
                      <li onClick={e => setLink(e, 0)}>
                          <div className={`main-nav__dropdown__links-container-link-active ${activeIndex === 0 ? 'main-nav-item-active' : ''}`}></div>
                          <Link to='/' className={`main-nav__dropdown__links-container-link-item ${activeIndex === 0 ? 'link-active' : ''}`}>home</Link>
                      </li>
                      <li onClick={e => setLink(e,1)}>
                          <div className={`main-nav__dropdown__links-container-link-active ${activeIndex === 1 ? 'main-nav-item-active' : ''}`}></div>
                          <Link to='/about'  className={`main-nav__dropdown__links-container-link-item ${activeIndex === 1 ? 'link-active' : ''}`}>about</Link>
                      </li>
                      <li onClick={e => setLink(e, 2)}>
                          <div className={`main-nav__dropdown__links-container-link-active ${activeIndex === 2 ? 'main-nav-item-active' : ''}`}></div>
                          <Link to='/contact' className={`main-nav__dropdown__links-container-link-item ${activeIndex === 2 ? 'link-active' : ''}`}>contact</Link>
                      </li>
                  </ul>
              </div>
           </nav>
          
          </header>
            </>
        )
}
export default withRouter(Nav);


