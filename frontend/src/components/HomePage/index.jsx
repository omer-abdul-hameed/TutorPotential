import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="tutoring-site bg-gray-900 min-h-screen p-8 text-gray-300 flex flex-col items-center justify-center space-y-12">
      <section className="hero bg-blue-700 text-white rounded-lg p-10 mb-10 shadow-lg w-full max-w-2xl text-center">
        <h2 className="text-4xl mb-4">Personalized Tutoring for Everyone!</h2>
        <p className="mb-4">Get the help you need, from the best tutors around.</p>
      </section>

      <section id="about" className="mb-10 w-full max-w-2xl text-center">
        <h2 className="text-3xl font-semibold mb-4">About Us</h2>
        <p>At TutorPotential, we believe in individualized learning. Our tutors are passionate about helping students succeed.</p>
      </section>

      <section id="tutors" className="mb-10 w-full max-w-2xl text-center">
        <h2 className="text-3xl font-semibold mb-4">Meet Our Tutors</h2>
        <div className="tutor-profile bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
          <img src="https://i0.wp.com/www.additudemag.com/wp-content/uploads/2016/11/School_Homework-Tutoring_Article-847_Girl-tutor-library-ts_474967154-1.jpg" alt="Tutor Jane" className="w-84 h-84 mb-4"/>
          <h3 className="text-2xl mb-2 text-white">Tutor X</h3>
          <p>Specializes in Mathematics and Physics.</p>
        </div>
      </section>

      <section id="testimonials" className="w-full max-w-2xl text-center">
        <h2 className="text-3xl font-semibold mb-4">What Our Students Say</h2>
        <blockquote className="bg-gray-800 p-6 rounded-lg shadow-lg italic">
          <p className="mb-4">"The tutors here are amazing! I've improved so much thanks to them."</p>
          <cite className="block text-right text-gray-400">- Student A</cite>
        </blockquote>
      </section>
    </div>
);
  }
