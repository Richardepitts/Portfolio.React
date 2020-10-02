import logo from './logo.svg';
import './App.css';
import * as THREE from 'three'
import ReactDOM from 'react-dom'
// import { softShadows } from 'drei';
import React, { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import niceColors from 'nice-color-palettes'
import Effects from './Effects'
import './styles.css'
import { Link } from 'react-router-dom';

// 7 and 5 is pretty cool

// 14 is also blue

// 66 is dope

// softShadows();

const tempObject = new THREE.Object3D()
const tempColor = new THREE.Color()
const colors = new Array(1000).fill().map(() => niceColors[66][Math.floor(Math.random() * 4)])

function Boxes() {


  const [hovered, set] = useState()
  const colorArray = useMemo(() => Float32Array.from(new Array(1000).fill().flatMap((_, i) => tempColor.set(colors[i]).toArray())), [])

  const ref = useRef()
  const previous = useRef()
  useEffect(() => void (previous.current = hovered), [hovered])

  useFrame(state => {
    const time = state.clock.getElapsedTime()
    ref.current.rotation.x = Math.sin(time / 4)
    ref.current.rotation.y = Math.sin(time / 2)
    let i = 0
    for (let x = 0; x < 10; x++)
      for (let y = 0; y < 10; y++)
        for (let z = 0; z < 10; z++) {
          const id = i++ 
          tempObject.position.set(5 - x, 5 - y, 5 - z)
          tempObject.rotation.y = Math.sin(x / 4 + time) + Math.sin(y / 4 + time) + Math.sin(z / 4 + time)
          tempObject.rotation.z = tempObject.rotation.y * 2
          if (hovered !== previous.current) {
            tempColor.set(id === hovered ? 'white' : colors[id]).toArray(colorArray, id * 3)
            ref.current.geometry.attributes.color.needsUpdate = true
          }
          const scale = id === hovered ? 2 : 1
          tempObject.scale.set(scale, scale, scale)
          tempObject.updateMatrix()
          ref.current.setMatrixAt(id, tempObject.matrix)
        } 
    ref.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={ref} args={[null, null, 1000]} onPointerMove={e => set(e.instanceId)} onPointerOut={e => set(undefined)}>
      <boxBufferGeometry attach="geometry" args={[0.7, 0.7, 0.7]}>
        <instancedBufferAttribute attachObject={['attributes', 'color']} args={[colorArray, 3]} />
      </boxBufferGeometry>
      <meshPhongMaterial attach="material" vertexColors={THREE.VertexColors} />
    </instancedMesh>
  )  
}








// <img src="img/slide1.jpg" alt="nothing"></img>
// <img src="img/slide2.jpeg" alt="nothing"></img>
// <img src="img/slide3.jpeg" alt="nothing"></img>


function App() {
  return (
    <>
    <div className="loader">
		<div className="inner"></div>
	</div>

	<div className="cube">

		<div className="cube-overlay"></div>

		<div className="cube-container">
			 <Canvas
    gl={{ antialias: false, alpha: false }}
    camera={{ position: [0, 0, 15], near: 5, far: 20 }}
	onCreated={({ gl }) => gl.setClearColor('black')}>
    <ambientLight />
    <pointLight position={[150, 150, 150]} intensity={0.50} />
    <Boxes />
    <Effects />
  </Canvas>,
		</div>

		<div className="titleMessage">
			<div className="heading">
				<p className="name main">RICHARD PITTS</p>
				<p className="sub typed"></p>
			</div>
		</div>




	</div>


	<nav id="navigation" className="navbar navbar-expand-lg">
	  <a className="navbar-brand" href="index.html">Richard Pitts</a>

	  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
	    <span className="navbar-toggler-icon"></span>
	  </button>

	  <div className="collapse navbar-collapse" id="navbarNav">
	    <ul className="navbar-nav">
	      <li className="nav-item active">
	        <a className="nav-link" href="#about">About <span className="sr-only">(current)</span></a>
	      </li>
	      <li className="nav-item">
	        <a className="nav-link" href="#skills">Skills</a>
	      </li>
	      <li className="nav-item">
	        <a className="nav-link" href="#stats">Stats</a>
	      </li>
	      <li className="nav-item">
	        <a className="nav-link" href="#contact">Contact</a>
	      </li>
	      <li className="nav-item">
	        <a className="nav-link" href="#portfolio">Portfolio</a>
	      </li>
	    </ul>
	  </div>

	</nav>




	<div id="about" className="section">

		<div className="container">

			<div className="row">

				<div className="col-md-5">
					<img className="aboutImage" src="img/about.jpeg"></img>
				</div>

				<div className="col-md-7">


					<h4 className="hello-world" >Hello World, I am Richard</h4>

					<p className="main-paragraph">After graduating UT, I shifted career paths from finance towards software engineering, beginning my journey as a mobile app developer. I launched a 5 star rated app on the app store, uFranklin, and then made a robust personal training app, uTrain, with a file system UI unique to iOS til’ this day (linked below). I felt apps were dying out though, so I pivoted towards web development by attending the Flatiron School and graduated in late 2019. Following, I completed an apprenticeship at Umbrage in Houston.</p>
					<p className="main-paragraph">I trained under the guidance of what I believe were the best software engineers in the south, and truly learned how software is developed in the most professional, commercial sense. We worked with clients mostly for prestigious oil and gas firms who had us engineer operating systems for drilling and production operators. I relocated to Austin where I currently reside and am seeking employment opportunities. </p>

				</div>

			</div>

		</div>

	</div>



	<div id="skills" className="skillsSection section">

		<div className="container">

			<div className="row">

				<div className="col-md-12 text-center">
					<h2>TECHNICAL SKILLS</h2>
					<p>(drag to scroll)</p>
				</div>


				<div className="owl-carousel owl-theme">
				    
				    <div className="skill">
				    	<span className="chart" data-percent="85">
				    		<span className="percent">85</span>
				    		<canvas height="152" width="152"></canvas>
				    	</span>
				    	<h4>JavaScript</h4>
				    	<p>The soul of the web, JavaScript is what I aspire to master</p>
				    </div>

					<div className="skill">
				    	<span className="chart" data-percent="90">
				    		<span className="percent">90</span>
				    		<canvas height="152" width="152"></canvas>
				    	</span>
				    	<h4>CSS3</h4>
				    	<p>Who has style without proper styling?  Not science but an art albeit sassy</p>
					</div>

				    <div className="skill">
				    	<span className="chart" data-percent="100">
				    		<span className="percent">100</span>
				    		<canvas height="152" width="152"></canvas>
				    	</span>
				    	<h4>HTML5</h4>
				    	<p>Ubiquitous to web development and dare I say easy to master</p>
					</div>
					
					<div className="skill">
				    	<span className="chart" data-percent="75">
				    		<span className="percent">75</span>
				    		<canvas height="152" width="152"></canvas>
				    	</span>
				    	<h4>MongoDB</h4>
				    	<p>Used in two of my web based projects, and I simply love it</p>
				    </div>
					
					<div className="skill">
				    	<span className="chart" data-percent="70">
				    		<span className="percent">70</span>
				    		<canvas height="152" width="152"></canvas>
				    	</span>
				    	<h4>Swift</h4>
				    	<p>An elegant language used for my two iOS applications, so fun with Xcode</p>
					</div>
					
					<div className="skill">
				    	<span className="chart" data-percent="65">
				    		<span className="percent">65</span>
				    		<canvas height="152" width="152"></canvas>
				    	</span>
				    	<h4>Ruby (& On Rails) </h4>
				    	<p>Used for my uDoc app with Rails being a great framework to make web apps</p>
				    </div>

					<div className="skill">
				    	<span className="chart" data-percent="50">
				    		<span className="percent">50%</span>
				    		<canvas height="152" width="152"></canvas>
				    	</span>
				    	<h4>PHP</h4>
				    	<p>One Laravel project complete, but still a new skill</p>
				    </div>


				    <div className="skill">
				    	<span className="chart" data-percent="60">
				    		<span className="percent">60</span>
				    		<canvas height="152" width="152"></canvas>
				    	</span>
				    	<h4>MySQL</h4>
				    	<p>Used in one of my web based projects, and tested heavily at Flatiron</p>
					</div>
					



				</div>

				

			</div>

		</div>

	</div>



	<div id="stats" className="statsSection section">

		<div className="container">

			<div className="row">

				
				<div className="col-md-3 col-sm-6">
					<div className="squareItem">
						<div className="squareInnerContainer">
							<div className="squareIcon">
								<i className="fa fa-clock"></i>
							</div>
							<div className="squareContent">
                                <h2 className="counter">4</h2>
                                <h3>Years Experience</h3>
                            </div>
						</div>
					</div>
				</div>

				<div className="col-md-3 col-sm-6">
					<div className="squareItem">
						<div className="squareInnerContainer">
							<div className="squareIcon">
								<i className="fa fa-calendar"></i>
							</div>
							<div className="squareContent">
                                <h2 className="counter">8</h2>
                                <h3>Projects</h3>
                            </div>
						</div>
					</div>
				</div>

				<div className="col-md-3 col-sm-6">
					<div className="squareItem">
						<div className="squareInnerContainer">
							<div className="squareIcon">
								<i className="fa fa-bolt"></i>
							</div>
							<div className="squareContent">
                                <h2 className="counter">2</h2>
                                <h3>iOS Apps</h3>
                            </div>
						</div>
					</div>
				</div>

				<div className="col-md-3 col-sm-6">
					<div className="squareItem">
						<div className="squareInnerContainer">
							<div className="squareIcon">
								<i className="fa fa-cloud"></i>
							</div>
							<div className="squareContent">
                                <h2 className="counter">3</h2>
                                <h3>Hosted Web Apps</h3>
                            </div>
						</div>
					</div>
				</div>


			</div>

		</div>

	</div>

	<div id="contact" className="contactSection section">

		<div className="col-md-12 text-center">

			<p className="subHeading">Like what you see?</p>
			<h2 className="sendMessage">Send me a message!</h2>
			<a href="mailTo:richardepitts@gmail.com" className="contactButton">GET IN TOUCH!</a>

		</div>

	</div>



	<div id="portfolio" className="section">

		<div className="container">

			<div className="row">

				<div className="heading">
					<h2 className="portfolio">PORTFOLIO</h2>
				</div>

				<div className="filter">

					<ul id="filters">

						<li><a href="#" data-filter="*" className="current">ALL</a></li>
						<li><a href="#" data-filter=".me">Projects</a></li>
						<li><a href="#" data-filter=".apps">Apps</a></li>
						<li><a href="#" data-filter=".websites">Websites</a></li>

					</ul>

				</div>


				<div className="itemsContainer">

					<ul className="items" style={{ position: "relative", height: "570px!important" }}>

						<li className="kodagram websites col-xs-6 col-sm-4 col-md-3 col-lg-3" style={{ position: "absolute", left: "0px", top: "0px" }}>


							<div className="item">

								<img src="img/portfolio/thumbnails/Kodagram-Image-1000.jpg" alt="nothing"></img>


								<div className="icons">
									<a href="img/portfolio/thumbnails/Kodagram-Image-1000.jpg" title="View image" className="openButton" data-fancybox data-caption="This is a Kodagram preview">
										<i className="fa fa-search"></i>
									</a>

									<a href="https://kodagram.herokuapp.com/signin" target="_blank" className="projectLink">
										<i className="fa fa-link"></i>
									</a>
								</div>

								<div className="imageOverlay"></div>

							</div>


						</li>

						<li className="umovie websites col-xs-6 col-sm-4 col-md-3 col-lg-3" style={{ position: "absolute", left: "285px", top: "0px" }} >


							<div className="item">

								<img src="img/portfolio/thumbnails/uMovie-Image-1000.jpg" alt="nothing"></img>


								<div className="icons">
									<a href="img/portfolio/thumbnails/uMovie-Image-1000.jpg" title="View image" className="openButton" data-fancybox data-caption="This is the uMovie Shot">
										<i className="fa fa-search"></i>
									</a>

									<a href="https://umovie.ninja" target="_blank" className="projectLink">
										<i className="fa fa-link"></i>
									</a>
								</div>

								<div className="imageOverlay"></div>

							</div>


						</li>

						<li className="pmstore me col-xs-6 col-sm-4 col-md-3 col-lg-3">


							<div className="item">

								<img src="img/portfolio/thumbnails/ProjectMusaStore-Image-1000.jpg" alt="nothing"></img>


								<div className="icons">
									<a href="img/portfolio/thumbnails/ProjectMusaStore-Image-1000.jpg" title="View image" className="openButton" data-fancybox data-caption="This is a cute dog">
										<i className="fa fa-search"></i>
									</a>

									<a href="https://www.youtube.com/watch?v=Q4XlGt0qOJ0&feature=youtu.be" target="_blank" className="projectLink">
										<i className="fa fa-link"></i>
									</a>
								</div>

								<div className="imageOverlay"></div>

							</div>


						</li>

						<li className="kodabook me col-xs-6 col-sm-4 col-md-3 col-lg-3">


							<div className="item">

								<img src="img/portfolio/thumbnails/Kodabook-Image-1000.jpg" alt="nothing"></img>


								<div className="icons">
									<a href="img/portfolio/thumbnails/Kodabook-Image-1000.jpg" title="View image" className="openButton" data-fancybox data-caption="This is a cute dog">
										<i className="fa fa-search"></i>
									</a>

									<a href="https://kodabook.herokuapp.com" target="_blank" className="projectLink">
										<i className="fa fa-link"></i>
									</a>
								</div>

								<div className="imageOverlay"></div>

							</div>


							</li>

					

						<li className="restaurant me col-xs-6 col-sm-4 col-md-3 col-lg-3" style={{ position: "absolute", left: "285px!important", top: "0px" }} >


							<div className="item">

								<img src="img/portfolio/thumbnails/RestaurantApp-Image-1000.jpg" alt="nothing"></img>


								<div className="icons">
									<a href="img/portfolio/thumbnails/RestaurantApp-Image-1000.jpg" title="View image" className="openButton" data-fancybox data-caption="This is a cute dog">
										<i className="fa fa-search"></i>
									</a>

									<a href="https://www.youtube.com/watch?v=9aVVHvCscNI" target="_blank" className="projectLink">
										<i className="fa fa-link"></i>
									</a>
								</div>

								<div className="imageOverlay"></div>

							</div>


						</li>


						<li className="utrain apps col-xs-6 col-sm-4 col-md-3 col-lg-3">


							<div className="item">

								<img src="img/portfolio/thumbnails/uTrain-Image-1000.jpg" alt="nothing"></img>


								<div className="icons">
									<a href="img/portfolio/thumbnails/uTrain-Image-1000.jpg" title="View image" className="openButton" data-fancybox data-caption="This is a cute dog">
										<i className="fa fa-search"></i>
									</a>

									<a href="https://www.youtube.com/watch?v=tXqL4h48wEI" target="_blank" className="projectLink">
										<i className="fa fa-link"></i>
									</a>
								</div>

								<div className="imageOverlay"></div>

							</div>


						</li>

						<li className="ufranklin apps col-xs-6 col-sm-4 col-md-3 col-lg-3">


							<div className="item">

								<img src="img/portfolio/thumbnails/uFranklin-Image-1000.jpg" alt="nothing"></img>


								<div className="icons">
									<a href="img/portfolio/thumbnails/uFranklin-Image-1000.jpg" title="View image" className="openButton" data-fancybox data-caption="This is a cute dog">
										<i className="fa fa-search"></i>
									</a>

									<a href="https://www.youtube.com/watch?v=wsYEGfECtWA" target="_blank" className="projectLink">
										<i className="fa fa-link"></i>
									</a>
								</div>

								<div className="imageOverlay"></div>

							</div>


						</li>
						<li className="repterminal me col-xs-6 col-sm-4 col-md-3 col-lg-3">


							<div className="item">

								<img src="img/portfolio/thumbnails/REPTerminal-Image-1000.jpg" alt="nothing"></img>


								<div className="icons">
									<a href="img/portfolio/thumbnails/REPTerminal-Image-1000.jpg" title="View image" className="openButton" data-fancybox data-caption="This is a cute dog">
										<i className="fa fa-search"></i>
									</a>

									<a href="https://www.youtube.com/watch?v=hmM4S5ufonk&feature=youtu.be" target="_blank" className="projectLink">
										<i className="fa fa-link"></i>
									</a>
								</div>

								<div className="imageOverlay"></div>

							</div>


							</li>

					</ul>

				</div>






			</div>

		</div>

	</div>


	<div className="copyrightSection">

		<div className="ParentContainer col-md-12 text-center">

		<Link className="linkedinLogoParent" to="https://www.linkedin.com/in/richardepitts">
		<img  className="linkedinLogo" src="img/linkedin-logo.png"></img>
		</Link>

			<p className="RichardParent">
			<h3 className="Richard">Richard Pitts</h3> 
			</p>

		<Link className="githubMonkeyParent" to="https://github.com/Richardepitts">
		<img className="githubMonkey" src="img/github-monkey.png"></img>
		</Link>
			
		</div>

	</div>
  </>
  );
}

export default App;
