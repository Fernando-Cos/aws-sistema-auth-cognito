import React, { Fragment } from 'react';
import Hero from './Hero';
import HomeContent from './HomeContent';

export default function Home() {
  return (
    <Fragment>
      <Hero />
      <div className="box cta">
        <p className="has-text-centered">
          <span className="tag is-primary">New</span> Projeto de estudo do curso de React js...
        </p>
      </div>
      <HomeContent />
    </Fragment>
  )
}
