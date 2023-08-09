import React from 'react';

export default function HomePage() {
  return (
    <div className="tutoring-site">

      <header>
        <h1>TutorPotential</h1>
      </header>

      <section className="hero">
        <h2>Personalized Tutoring for Everyone!</h2>
        <p>Get the help you need, from the best tutors around.</p>
        <button>Get Started</button>
      </section>

      <section id="about">
        <h2>About Us</h2>
        <p>At TutorPotential, we believe in individualized learning. Our tutors are passionate about helping students succeed.</p>
      </section>

      {/* Tutor Profiles/ Carousel  */}
      <section id="tutors">
        <h2>Meet Our Tutors</h2>
        <div className="tutor-profile">
          <img src="tutor1.jpg" alt="Tutor Jane" />
          <h3>Jane Doe</h3>
          <p>Specializes in Mathematics and Physics.</p>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials">
        <h2>What Our Students Say</h2>
        <blockquote>
          <p>"The tutors here are amazing! I've improved so much thanks to them."</p>
          <cite>- Student A</cite>
        </blockquote>
      </section>

    </div>
  );
}

