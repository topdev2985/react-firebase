import React from 'react';

import TestimonialImage from '../images/testimonial.jpg';
import {Link} from 'react-router-dom';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
const ColorButton = styled(Button)(({ theme }) => ({
  color: 'white',
  backgroundColor: ' #f47064',
  borderRadius: '0px',
  fontSize: '16px',
  '&:hover': {
      backgroundColor: ' #f47064',
  },
}));
function Testimonials() {
  return (
    <section className="ative">

      {/* Illustration behind content */}
      {/* <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none -mb-32" aria-hidden="true">
        <svg width="1760" height="518" viewBox="0 0 1760 518" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="illustration-02">
              <stop stopColor="#FFF" offset="0%" />
              <stop stopColor="#EAEAEA" offset="77.402%" />
              <stop stopColor="#DFDFDF" offset="100%" />
            </linearGradient>
          </defs>
          <g transform="translate(0 -3)" fill="url(#illustration-02)" fillRule="evenodd">
            <circle cx="1630" cy="128" r="128" />
            <circle cx="178" cy="481" r="40" />
          </g>
        </svg>
      </div> */}

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h2 className="h2 mb-4" style={{color:'#f47064'}}>Purchasing Success</h2>
          </div>


          {/* Testimonials */}
          <div className="max-w-3xl mx-auto mt-10" data-aos="zoom-y-out">
            <div className="relative flex items-start border-2 border-gray-200 rounded bg-white">

              {/* Testimonial */}
              <div className="text-center px-12 py-8  mx-4 md:mx-0">
                <blockquote className="text-xl font-medium mb-4">
                  check your email in the next 24
                  hours so you can approve your
                  picture – emails will be coming
                  from support@showcaseballers
                </blockquote>
                <cite className="block font-bold text-lg not-italic mb-1">Make sure to check your spam
                  folder</cite>
                <div className="text-gray-600 mt-6">
                    <ColorButton
                      component={Link}
                      to='/'
                      variant='contained'
                      
                    >
                      GO TO BACK
                    </ColorButton>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Testimonials;