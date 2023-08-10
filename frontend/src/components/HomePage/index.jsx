import React from 'react';

export default function HomePage() {
  return (
    <div className="tutoring-site bg-gray-100 min-h-screen p-8">

      <header className="text-center mb-10">
        <h1 className="text-5xl font-bold text-blue-700">TutorPotential</h1>
      </header>

      <section className="hero bg-blue-600 text-white rounded-lg p-10 mb-10 shadow-lg">
        <h2 className="text-4xl mb-4">Personalized Tutoring for Everyone!</h2>
        <p className="mb-4">Get the help you need, from the best tutors around.</p>
        <button className="bg-yellow-400 hover:bg-yellow-500 text-black py-2 px-4 rounded">Get Started</button>
      </section>

      <section id="about" className="mb-10">
        <h2 className="text-3xl font-semibold mb-4">About Us</h2>
        <p>At TutorPotential, we believe in individualized learning. Our tutors are passionate about helping students succeed.</p>
      </section>

      {/* Tutor Profiles/ Carousel  */}
      <section id="tutors" className="mb-10">
        <h2 className="text-3xl font-semibold mb-4">Meet Our Tutors</h2>
        <div className="tutor-profile bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
          <img src="https://i0.wp.com/www.additudemag.com/wp-content/uploads/2016/11/School_Homework-Tutoring_Article-847_Girl-tutor-library-ts_474967154-1.jpg" alt="Tutor Jane" className="w-84 h-84 mb-4"/>
          <h3 className="text-2xl mb-2">Tutor X</h3>
          <p>Specializes in Mathematics and Physics.</p>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials">
        <h2 className="text-3xl font-semibold mb-4">What Our Students Say</h2>
        <blockquote className="bg-white p-6 rounded-lg shadow-lg italic">
          <p className="mb-4">"The tutors here are amazing! I've improved so much thanks to them."</p>
          <cite className="block text-right">- Student A</cite>
        </blockquote>
      </section>

    </div>
  );
}
