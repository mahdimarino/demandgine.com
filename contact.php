<?php
include 'topnav.php';
?>
  
        <!-- header close -->
        <!-- content begin -->
        <div class="no-bottom no-top" id="content">
            <div id="top"></div>
            <!-- revolution slider begin -->
            <!-- section begin -->
            <section class="relative no-top no-bottom text-light" data-bgimage="url(images/background/10.jpg)" data-stellar-background-ratio=".2">

                <div class="overlay-gradient t70">
                    <div class="center-y">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-8 offset-md-2 text-center">
                                <div class="col text-center">
									<div class="spacer-single"></div>
									<h1 class="no-bottom">Contact Us</h1>
									<p class="lead">Ask any questions using form below.</p>
                                </div>
                                </div>
								
								 <div class="spacer-10"></div>
								 
						<div class="col-lg-8 mb-sm-30">			
							<form name="contactForm" id='contact_form' class="form-s1" method="post" action='email.php'>

                                    <div class="field-set">
                                        <input type='text' name='name' id='name' class="form-control" placeholder="Your Name">
                                    </div>

                                    <div class="field-set">
                                        <input type='text' name='email' id='email' class="form-control" placeholder="Your Email">
                                    </div>

                                    <div class="field-set">
                                        <input type='text' name='Subject' id='phone' class="form-control" placeholder="Subject">
                                    </div>

                                    <div class="field-set">
                                        <textarea name='message' id='message' class="form-control" placeholder="Your Message"></textarea>
                                    </div>

                                    <div class="spacer-half"></div>

                                    <div id='submit'>
                                        <input type='submit' id='send_message' value='Submit Form' class="btn btn-custom">
                                    </div>
                                    <div id='mail_success' class='success'>Your message has been sent successfully.</div>
                                    <div id='mail_fail' class='error'>Sorry, error occured this time sending your message.</div>

                                </form>
						</div>
						<div class="col-lg-4 mb30">
											 
                                           
											
											<div class="spacer-30"></div>
											
											<div class="padding40 bg-gradient-to-right text-light rounded">
                                                <h3>Contact info</h3>
												<address class="s1">												
												<span><i class="fa fa-map-marker fa-lg"></i>
                                                    Location <br>304 S.Jones Blvd #1437 <br>Las vegas, NV 89107</span>
												<!-- <span><i class="fa fa-phone fa-lg"></i>+61 333 9296</span> -->
												<span><i class="fa fa-envelope-o fa-lg"></i><a href="mailto:Info@demandgine">Send A Mail <br> Info@demandgine</a></span>
												<!-- <span><i class="fa fa-file-pdf-o fa-lg"></i><a href="#">Download Brochure</a></span> -->
											</address>
											</div>
							
						</div>
								
                            </div>
                        </div>
                    </div>
                </div>

            </section>
            <!-- section close -->
            
        </div>
        <!-- content close -->

        <!-- footer begin -->
        <footer>
            <div class="container">
                <div class="row">
                    <div class="col-md-5">
                        <div class="widget">
                            <a href="index.php"><img alt="" style="width: 200px;" class="logo" src="images/logo_demangine.png"></a>
                            <div class="spacer-20"></div>
                            <ul>
                                <li><a href="#">Email : Info@demandgine</a></li>
                                <li> Address : DemandGine Inc <br> 304 S.Jones Blvd #1437 <br> Las vegas, NV 89107</li>
                               
                               
                            </ul>   </div>
                    </div>

                    <div class="col-md-7">
                        <div class="row">
                           

                            <div class="col-md-6 col-xs-4">
                                <div class="widget">
                                    <h5>Links</h5>
                                    <div class="tiny-border"></div>
                                    <ul>
                                        <li><a href="index.php">Home</a></li>
                                        <li><a href="index.php#Expertise">Expertise</a></li>
                                        <li><a href="index.php#about">About</a></li>
                                        <li><a href="contact.php">Contact</a></li>
                                       
                                    </ul>
                                </div>
                            </div>

                            <div class="col-md-6 col-xs-4">
                                <div class="widget">
                                    <h5>Our Expertise</h5>
                                    <div class="tiny-border"></div>
                                    <ul>
                                        <li><a href="index.php#Transform&Generate">Transform & Generate</a></li>
                                        <li><a href="index.php#Engage&Optimize">Engage & Optimize</a></li>
                                        <li><a href="index.php#Identify&Discover">Identify & Discover</a></li>
                                        
                                       
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    

                </div>

                <div class="row">
                    <div class="col-lg-6 sm-text-center mb-sm-30">
                        <div class="mt10">&copy; Copyright 2023 - All Rights Reserved</div>
                    </div>

                    <div class="col-lg-6 text-md-right text-sm-left">
                        <div class="social-icons float-lg-end">
                            <a href="#"><i class="fa fa-facebook fa-lg"></i></a>
                            <a href="#"><i class="fa fa-twitter fa-lg"></i></a>
                            <a href="#"><i class="fa fa-linkedin fa-lg"></i></a>
                            <a href="#"><i class="fa fa-google-plus fa-lg"></i></a>
                            <a href="#"><i class="fa fa-rss fa-lg"></i></a>
                        </div>
                    </div>
                </div>
            </div>

        </footer>
            <!-- footer close -->
		
        
        
		<div id="preloader">
                <div class="spinner">
                    <div class="bounce1"></div>
                    <div class="bounce2"></div>
                    <div class="bounce3"></div>
                </div>
            </div>
        </div>		
		
		
        <!-- Javascript Files
    ================================================== -->
        <script src="js/plugins.js"></script>
        <script src="js/designesia.js"></script>
        <script src="js/validation.js"></script>

        <!--Start of Tawk.to Script-->
       
        <!--End of Tawk.to Script-->
</body>

</html>