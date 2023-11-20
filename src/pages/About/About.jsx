import React from 'react'
import { Helmet } from 'react-helmet';

const About = () => {
  const pageTitle = 'About Us - Learn More About Our Company';
  const pageDescription = 'Discover the story and mission of our company.';
  return (
    <div>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>
      About
    </div>
  )
}

export default About