import React, { Component } from 'react';
import './Home.css';
import ReactFullpage from '@fullpage/react-fullpage';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel, Col, Row } from 'react-bootstrap';
// import '@fortawesome/fontawesome-free/css/regular.min.css';
import Splash from './Splash';
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
// import ProgBar from './ProgBar';
export default class Home extends Component {
	state = {
		moveto: null,
		scrollPerc: 0,
		prevScrollPerc: 0,
		moveLogo: false,
		mouse: false,
		scrollChanged: false,
		internal: false,
		currSlide: 0
	};
	homeImages = [
		{
			char: 'https://i.imgur.com/9yC93U6.png',
			bg: 'https://imgur.com/bwPJhL4.jpg'
		},
		{
			char: 'https://imgur.com/JI5zb8u.png',
			bg: 'https://imgur.com/iVUKgex.jpg'
		}
	];
	carImages = ['src/shared/img/car1.jpg', 'src/shared/img/car2.jpg', 'src/shared/img/car3.jpg'];
	images = [
		// "src/shared/img/bg2.png",
		// "src/shared/img/bg1.png",
		'http://makingnotesinthedark.files.wordpress.com/2014/02/babloo-happy-hai-2014-hd-movie-wallpapers.jpg',
		'https://storage.googleapis.com/ehimages/2018/3/26/img_35da01d961375fb6b4cc12b956776db0_1522053167583_processed_original.jpg',
		'https://ecisveep.nic.in/uploads/monthly_2018_11/large.1385334822_nukkad5.jpg.10a022ad8eac5284ac2e10484f9020a8.jpg',
		'https://images.unsplash.com/photo-1549046675-dd779977de88?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
		'http://www.safetynational.com/wp-content/uploads/2018/10/IMG_1963-scaled.jpg',
		'https://imgur.com/iVUKgex.jpg',
		'https://imgur.com/JI5zb8u.png',
		'https://imgur.com/bwPJhL4.jpg',
		'https://i.imgur.com/9yC93U6.png',
		'https://i.imgur.com/ue7LVkv.jpg',
		'https://i.imgur.com/aYNNCye.jpg',
		'https://i.imgur.com/LFkC1gH.jpg',
		'https://i.imgur.com/2dQuCUu.png'
	];
	imgSelect = Math.trunc(Math.random() * 2);
	componentDidMount() {
		if(this.props.moveto)
			this.setState({ moveto: this.props.moveto, scrollChanged: false, moveLogo: true });
		else
			this.setState({ moveto: this.props.moveto, scrollChanged: false });
		this.handleScroll(1);
	}
	handleScroll = (num) => {
		// console.log('scrolled');
		const newScrollPerc = Math.ceil((num / 4) * 100);
		const { scrollPerc } = this.state;
		if (scrollPerc !== newScrollPerc)
			this.setState({
				prevScrollPerc: scrollPerc,
				scrollPerc: newScrollPerc,
				moveLogo: num !== 1,
				scrollChanged: true,
				internal: true
			});
	};
	componentWillReceiveProps(nextProps) {
		// console.log('componentWillReceiveProps',this.state.scrollChanged, this.state.internal);
		if (nextProps.moveto != this.props.moveto) {
			// console.log('got props');
			this.setState({
				moveto: nextProps.moveto,
				scrollChanged: true,
				internal: false,
				moveLogo: true
			});
		}
	}
	componentDidUpdate() {
		// console.log('componentDidUpdate',this.state.scrollChanged, this.state.internal);
		if (this.state.internal) {
			setTimeout(() => {
				this.setState({ internal: false });
			}, 2000);
		}
	}
	nextSlide = () => {
		const { currSlide } = this.state;
		this.setState({ currSlide: (currSlide + 1) % this.carImages.length });
	};
	renderAboutUs() {
		if (window.innerWidth > 760) {
			return (
				<div className="container about-us">
					<div className="row">
						<div className="col-md-6 about-gra">
							{/* <div className="row">
								<div className="about-vid-cont">
									<iframe
										className="about-video"
										src="https://www.youtube.com/embed/EzKkl64rRbM"
										frameBorder="0"
									></iframe>
								</div>
							
							</div> */}
						</div>
						<div className="col-md-6 about-content">
							<div>
								<h2 style={{ textAlign: 'center', fontSize: '3em' }}>About us</h2>
								Malaviya National Institute of Technology is a Gibraltar of technological learning,
								imparting thousands of students, world class education, nurturing their skills to
								produce future leaders. Blitzschlag, MNIT's annual cultural mega-event, with a decade
								long glorious history, is synonymous with a wholesome cultural carnival throughout
								Rajasthan, due to its unparalleled grandeur. Every year, Blitzschlag invites innumerable
								students from all over India, presenting an unmissable opportunity to savour all the
								cultural enjoyment these 3 days can accommodate. With a plethora of events and cultural
								competitions, Blitzschlag escalates the euphoria of the participants to its pinnacle.
								Topping the benchmark set by the precedent year, Blitzschlag keeps revamping itself each
								year, perpetually raising the standards of the event. With a footfall of over 54000,
								Blitzschlag gathers everyone, right from nationwide prominent speakers, to amazing
								artists who elevate the cultural enthusiasm. Hence Blitzschlag is known as a cultural
								bonanza, spreading its wings across life, work, passion .Moreover, Blitzschlag infuses
								social awareness among the young citizens of the country, thus fulfilling its
								responsibility to foster society's well-being.
							</div>
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div className="container about-us">
					<div className="row">
						<div className="col-12 about-content">
							<div>
								<br></br>
								<h2 style={{ textAlign: 'center' }}>About us</h2>
								<p>
									Malaviya National Institute of Technology is a Gibraltar of technological learning,
									imparting thousands of students, world class education, nurturing their skills to
									produce future leaders. Blitzschlag, MNIT's annual cultural mega-event, with a
									decade long glorious history, is synonymous with a wholesome cultural carnival
									throughout Rajasthan, due to its unparalleled grandeur.
								</p>
							</div>
						</div>
					</div>
				</div>
			);
		}
	}

	render() {
		const { prevScrollPerc, scrollPerc, moveLogo, scrollChanged, internal, currSlide } = this.state;
		const animScroll = (a, b) => keyframes`
		from{
			width: ${a}%;
		}
		to {
			width: ${b}%;
		}
`;
		let ProgBar;
		if (scrollChanged && internal) {
			ProgBar = styled.div`
				background-color: #fff;
				position: relative;
				height: 100%;
				z-index: 11;
				width: ${scrollPerc}%;
				transition: all 2s ease-in-out;
				animation: ${() => animScroll(prevScrollPerc, scrollPerc)} 2s ease-in-out;
				animation-fill-mode: forwards;
			`;
		} else {
			ProgBar = styled.div`
				background-color: #fff;
				position: relative;
				height: 100%;
				z-index: 11;
				transition: all 2s ease-in-out;
				width: ${scrollPerc}%;
			`;
		}
		// console.log(ProgBar);
		return (
			<div>
				<Splash images={this.images} />
				<div className="prog">
					<ProgBar a={prevScrollPerc} b={scrollPerc} />
				</div>
				<div
					style={{
						transition: 'all 2s',
						enableBackground: 'new 0 0 666.7 248.32',
						display: 'block',
						margin: 'auto',
						position: 'fixed',
						zIndex: '20',
						transform: `${
							moveLogo
								? `scale(${window.innerWidth <= 760 ? 0.4 : 0.2}) translate(${
										window.innerWidth <= 760 ? -80 : -210
								  }%,${window.innerWidth <= 760 ? -110 : -230}%)`
								: `scale(${window.innerWidth <= 760 ? 1.2 : 0.8}) translateX(${
										window.innerWidth <= 760 ? -41.66 : -62.5
								  }%) translateY(${window.innerWidth <= 760 ? -41.66 : -62.5}%)`
						}`,
						left: `${moveLogo ? '0%' : window.innerWidth <= 760 ? '50%' : '30%'}`,
						top: `${moveLogo ? '2%' : '35%'}`
					}}
				>
					<img
						src={'src/shared/img/logo.png'}
						style={{ width: '80vw', enableBackground: 'new 0 0 666.7 248.32' }}
					/>
				</div>
				<ReactFullpage
					scrollingSpeed={2000}
					controlArrows={true}
					verticalCentered={true}
					anchors={['home', 'aboutus', 'theme', 'contactus']}
					onLeave={(origin, destination, direction) => {
						this.handleScroll(destination.index + 1);
					}}
					render={({ state, fullpageApi }) => {
						if (this.state.moveto) {
							fullpage_api.moveTo(this.state.moveto);
							this.setState({ moveto: null, scrollChanged: false });
						}
						return (
							<ReactFullpage.Wrapper>
								<div
									className="section content sundarchakra"
									style={{
										transition: 'all 2s',
										backgroundImage: `url('https://imgur.com/bwPJhL4.jpg')`,
										backgroundSize: 'cover'
									}}
								>
									<img className="zoom" id="lady" src={`https://i.imgur.com/9yC93U6.png`} />
								</div>
								<div
									className="section content"
									style={{
										backgroundImage: 'url("https://i.imgur.com/2dQuCUu.png")',
										backgroundSize: 'cover'
									}}
								>
									<div className="l-holder">
										<img className="l1" src={'src/shared/img/l1.png'} />
									</div>
									<div className="l-holder">
										<img className="l2" src={'src/shared/img/l2.png'} />
									</div>
									<div className="l-holder">
										<img className="l3" src={'src/shared/img/l3.png'} />
									</div>
									<div className="l-holder">
										<img className="l4" src={'src/shared/img/l4.png'} />
									</div>
									<div className="l-holder">
										<img className="l5" src={'src/shared/img/l5.png'} />
									</div>
									<div className="l6-holder">
										<img className="l6" src={'src/shared/img/l6.png'} />
									</div>
									<div className="l7-holder">
										<img className="l7" src={'src/shared/img/l6.png'} />
									</div>
									{this.renderAboutUs()}
								</div>
								<div
									className="section content"
									style={{
										backgroundImage: `url("https://imgur.com/iVUKgex.jpg")`,
										backgroundSize: 'cover'
									}}
								>
									{window.innerWidth > 770 ? (
										<div>
											<div className="ladytheme-holder">
												<img
													className={'ladytheme zoom'}
													src={`https://imgur.com/JI5zb8u.png`}
												/>
											</div>
											<div className="theme-holder">
												<h2 className="theme-heading">BOLLYWOOD</h2>
												<p className="theme-content">
													Although the term 'Bollywood' was popularized only in the 1970s,
													Bollywood has been a major part of Indian culture for years before
													that. Blitzschlag 2020 pays homage to an aspect of our culture that
													has borne many icons, set pioneering trends, and become a much-loved
													household name. From the iconic 'angry young man' characters and
													dastardly villains, to thought-provoking movies with a social
													message, and blockbuster 'masala' movies, Bollywood has something
													for everyone, and that's the case for Blitzschlag 2020! Music,
													dance, drama, and more await you in a feast for the senses, so join
													us as we treat you to a panoply of performances and competitions set
													in the heart of Rajasthan. Padhaaro mhaare Bollywood!
												</p>
												<div className="theme-icon-holder">
													<div className="theme-icon theme-icon-1">
														<i class="fas fa-calendar-check"></i>
														<p> 72+ Events</p>
													</div>
													<div className="theme-icon">
														<i class="fas fa-walking"></i>
														<p> 54K+ Footfall</p>
													</div>
													<div className="theme-icon">
														<i class="fas fa-university"></i>
														<p> 25+ Colleges</p>
													</div>
												</div>
											</div>
										</div>
									) : (
										<div>
											<div className="ladytheme-holder">
												<img
													className={'ladytheme zoom'}
													src={`https://imgur.com/JI5zb8u.png`}
												/>
											</div>
											<div className="theme-holder">
												<h2 className="theme-heading">BOLLYWOOD</h2>
												<p className="theme-content">
													Although the term 'Bollywood' was popularized only in the 1970s,
													Bollywood has been a major part of Indian culture for years before
													that. Blitzschlag 2020 pays homage to an aspect of our culture that
													has borne many icons, set pioneering trends, and become a much-loved
													household name. Bollywood has something for everyone, and that's the
													case for Blitzschlag 2020! Music, dance, drama, and more await you
													in a feast for the senses, so join us as we treat you to a panoply
													of performances and competitions set in the heart of Rajasthan.
													Padhaaro mhaare Bollywood!
												</p>
												<div className="theme-icon-holder">
													<div className="theme-icon theme-icon-1">
														<i class="fas fa-calendar-check"></i>
														<p> 72+ Events</p>
													</div>
													<div className="theme-icon">
														<i class="fas fa-walking"></i>
														<p> 54K+ Footfall</p>
													</div>
													<div className="theme-icon">
														<i class="fas fa-university"></i>
														<p> 25+ Colleges</p>
													</div>
												</div>
											</div>
										</div>
									)}
								</div>
								<div
									className="section content"
									style={{
										overflow: 'hidden'
									}}
								>
									<div className="contactus-text-holder">
										<div className="contactus-heading">
											<h2>Contact Us</h2>
										</div>
										<div className="contactus-holder">
											<div className="contactus-text">
												<h3>Events</h3>
												<p>Ansh Khandelwal :<br/> 8518066443</p>
											</div>
											<div className="contactus-text">
												<h3>Marketing</h3>
												<p>Ayush Singh :<br/> 9149225262</p>
											</div>
											<div className="contactus-text">
												<h3>Cultural</h3>
												<p>Devanshu Khandal :<br/> 9314655304</p>
												{/* <p>Srividya : 8639261222</p> */}
											</div>
											<div className="contactus-text">
												<h3>General Queries</h3>
												<p>Anuj Srivastava :<br/> 9588072917</p>
											</div>
										</div>
										<div className="findus-holder">
											<div className="findus-text">
												<h3>Malaviya National Institute of Technology</h3>
												<p>Jawahar Lal Nehru Marg, Jhalana Gram, Malviya Nagar</p>
												<p>Jaipur, Rajasthan - 302017</p>
												{/* <p>302017</p> */}
												<div className="mnitmap">
														<div class="mapouter">
															<div class="gmap_canvas">
																<iframe
																	width="200"
																	height="180"
																	id="gmap_canvas"
																	src="https://maps.google.com/maps?q=mnit%20jaipur&t=&z=13&ie=UTF8&iwloc=&output=embed"
																	frameborder="0"
																	scrolling="no"
																	marginheight="0"
																	marginwidth="0"
																></iframe>
															</div>
														</div>
												</div>
												{/* <p className="mnitlogo">
													<a href="http://mnit.ac.in/" target="_blank">
														<img src="https://files.indcareer.com/files/mnit_logo.gif" />
														</a>
												</p> */}
											</div>
										</div>
									</div>
									<div className="contactus">
										<img src="src/shared/img/contactus.jpg" />
									</div>
									<div className="c1-holder">
										<img src="src/shared/img/c1.png" />
									</div>
									<div className="c2-holder">
										<img src="src/shared/img/c2.png" />
									</div>
									<div className="c3-holder">
										<img src="src/shared/img/c3.png" />
									</div>
									<div className="c4-holder">
										<img src="src/shared/img/c4.png" />
									</div>
									<div className="c5-holder">
										<img src="src/shared/img/c5.png" />
									</div>
									<div className="handles">
										<div className="handle-holder-left" />
										<div className="handle-holder">
											<a
												target="_blank"
												href={'https://www.instagram.com/blitzmnit/'}
												className="handle-link"
											>
												<i className="fab fa-instagram"></i>
											</a>
										</div>
										<div className="handle-holder">
											<a
												target="_blank"
												href={'https://www.facebook.com/blitzschlagMNIT/'}
												className="handle-link"
											>
												<i class="fab fa-facebook-f"></i>
											</a>
										</div>
										<div className="handle-holder">
											<a href={'#home'} className="handle-link">
												<i class="fab fa-twitter"></i>
											</a>
										</div>
										<div className="handle-holder">
											<a
												target="_blank"
												href={
													'https://in.linkedin.com/school/mnitjaipur/?trk=public_profile_topcard_school'
												}
												className="handle-link"
											>
												<i class="fab fa-linkedin-in"></i>
											</a>
										</div>
										<div className="handle-holder">
											<a
												target="_blank"
												href={
													'https://www.youtube.com/channel/UCChl8NPUwrLUQF2cdiYaCLw?view_as=subscriber'
												}
												className="handle-link"
											>
												<i class="fab fa-youtube"></i>
											</a>
										</div>
										<div className="handle-holder">
											<a
												target="_blank"
												href={
													'http://mnit.ac.in/'
												}
												className="handle-link"
											>
												<img src="src/shared/img/mnitlogo.png" className="mnitlogo" />
											</a>
										</div>
										<div className="handle-holder-right" />
									</div>
									{/* <div className="footer">
										<p>
											<Link to="/team#webd" className="handle-link">
												Team FB&CL
											</Link>
										</p>
									</div> */}
								</div>
							</ReactFullpage.Wrapper>
						);
					}}
				/>
			</div>
		);
	}
}
