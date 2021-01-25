import React from 'react';

import { Transition } from "react-transition-group";
import { gsap, TweenMax } from "gsap/all";

import Home from './Home';

import About from './About';

import WorkPage from './WorkPage';

import Contact from './Contact';

const startState = { autoAlpha: 0, y: -50 };

export const MyHome = props => <Transition
unmountOnExit
in={props.show}
timeout={1000}
onEnter={node => TweenMax.set(node, startState)}
addEndListener={ (node, done) => {

    TweenMax.to(node,  1, {
        autoAlpha: props.show ? 1 : 0,
        y: props.show ? 0 : 50,
        onComplete: done
    });
}}
>
<Home/>

</Transition>

export const MyAbout = props => <Transition
unmountOnExit
in={props.show}
timeout={1000}
onEnter={node => TweenMax.set(node, startState)}
addEndListener={ (node, done) => {
    TweenMax.to(node, 1,  {
        autoAlpha: props.show ? 1 : 0,
        y: props.show ? 0 : 50,
        onComplete: done
    });
}}
>
<About/>

</Transition>

export const MyWork = props => <Transition
unmountOnExit
in={props.show}
timeout={1000}
onEnter={node => TweenMax.set(node, startState)}
addEndListener={ (node, done) => {
    TweenMax.to(node, 0.5, {
        autoAlpha: props.show ? 1 : 0,
        y: props.show ? 0 : 50,
        onComplete: done
    });
}}
>
<WorkPage/>

</Transition>


export const MyContact = props => <Transition
unmountOnExit
in={props.show}
timeout={1000}
onEnter={node => TweenMax.set(node, startState)}
addEndListener={ (node, done) => {
    TweenMax.to(node, 0.5,   {
        autoAlpha: props.show ? 1 : 0,
        y: props.show ? 0 : 50,
        onComplete: done
    });
}}
>
<Contact/>
</Transition>