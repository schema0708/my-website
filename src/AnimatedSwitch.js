import React, { lazy, Suspense } from 'react';

import { Switch, Route, withRouter } from 'react-router-dom';
import { TransitionGroup, Transition } from 'react-transition-group';
import { TweenMax} from 'gsap';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const WorkPage = lazy(() => import('./pages/WorkPage'));
const Contact = lazy(() => import('./pages/Contact'));

const startState = { autoAlpha: 0};

export const AnimatedSwitch = withRouter(({ location }) => 
    (

    <TransitionGroup>
     
      <Transition
      key={location.key}
        unmountOnExit
        in={location.key}
        timeout={1000}
        onEnter={node => TweenMax.set(node, startState)}
        addEndListener={ (node, done) => {
            TweenMax.to(node, 2, {
                autoAlpha: location.key ? 1 : 0,
                y: location.key ? 0 : 50,
                onComplete: done
            });
        }}
    >   
    <Suspense fallback={<div>Loading...</div>}>
        <Switch location={location}>
             <Route exact path="/" component={Home}/>
             <Route exact path="/about" component={About}/>
             <Route exact path="/work/:id" component={WorkPage}/>
             <Route exact path="/contact" component={Contact}/>
        </Switch>
        </Suspense>
      </Transition>
    </TransitionGroup>
  ));