import React, { Suspense, lazy, Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import * as THREE from 'three';

import Nav from './Nav';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js';
import { DotScreenShader } from 'three/examples/jsm/shaders/DotScreenShader.js';

import LightBox from './LightBox';

import { gsap } from 'gsap';

import './App.scss';
import { TransitionGroup, Transition } from 'react-transition-group';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const WorkPage = lazy(() => import('./pages/WorkPage'));
const Contact = lazy(() => import('./pages/Contact'));

class App extends Component {

  stage = {navOpen:false}

  lightbox = null;
  three = null;

  componentDidMount()
  {
    console.log('MAIN APP MOUNTED');

    this.mouse = new THREE.Vector2();
    this.windowHalf = new THREE.Vector2( window.innerWidth / 2, window.innerHeight / 2 );

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog( 0x000000, 1, 1000);
    
    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.position.z = 400;

    this.object = new THREE.Object3D();
    this.scene.add(this.object);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio( window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.three.appendChild(this.renderer.domElement);

    const geometry = new THREE.SphereBufferGeometry( 1, 4, 4 );
		const material = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } );

				for ( let i = 0; i < 100; i ++ ) {

					const mesh = new THREE.Mesh( geometry, material );
					mesh.position.set( Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5 ).normalize();
					mesh.position.multiplyScalar( Math.random() * 400 );
					mesh.rotation.set( Math.random() * 2, Math.random() * 2, Math.random() * 2 );
					mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 50;
					this.object.add(mesh);
				}

        this.scene.add( new THREE.AmbientLight( 0x222222 ) );

				const light = new THREE.DirectionalLight( 0xffffff );
				light.position.set( 1, 1, 1 );
				this.scene.add( light );

				this.composer = new EffectComposer(this.renderer );
				this.composer.addPass( new RenderPass(this.scene, this.camera));

				const effect1 = new ShaderPass( DotScreenShader );
				effect1.uniforms[ 'scale' ].value = 4;
				this.composer.addPass( effect1 );

				const effect2 = new ShaderPass( RGBShiftShader );
				effect2.uniforms[ 'amount' ].value = 0.0015;
				this.composer.addPass( effect2 );

        window.addEventListener( 'resize', this.onWindowResize, false );
        document.addEventListener( 'mousemove', this.onMouseMove, false );
        
        this.animate();
  }

  onWindowResize = () =>
  {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.composer.setSize( window.innerWidth, window.innerHeight );
  }
  animate = () =>
  {
       requestAnimationFrame(this.animate);

				this.object.rotation.x += 0.005;
			  this.object.rotation.y += 0.01;

				this.composer.render();
  }
  
  openBox = (e, element) => {
    e.preventDefault();
    this.lightbox.openLightBox(element);
  }
  
  
  render()
  {
   
    return (
      <div className="App">
         
          
          <div className='three' ref={el => this.three = el}>
          </div>
          
          <Router>

          <Nav />

          <LightBox ref={el => this.lightbox = el}/>

          <Suspense fallback={<div className='loader'></div>}>
        

                <Switch>
                    <Route exact path="/" render={ props => <Home openBox={this.openBox}/> }/>
      
                    <Route path="/about" component={About}/>
                    
                    <Route path="/work/:id" component={WorkPage} />
                      
                    <Route path="/contact" component={Contact}/>
                </Switch>
          </Suspense>
          </Router> 
      </div>
    )
  }
}

export default App;
