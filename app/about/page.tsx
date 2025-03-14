import React from 'react';

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto prose dark:prose-invert">
      <h1>About Clone Wars</h1>
      <p>
        Clone Wars is a curated collection of open-source clones and alternatives to popular websites and applications. Our mission is to provide developers with learning resources and inspiration through real-world examples.
      </p>

      <h2>What We Offer</h2>
      <ul>
        <li>Open-source clones of popular platforms</li>
        <li>Detailed tutorials and guides</li>
        <li>Alternative implementations</li>
        <li>Various tech stacks and approaches</li>
      </ul>

      <h2>Why Clone Wars?</h2>
      <p>
        Learning by example is one of the most effective ways to improve your development skills. Clone Wars provides you with real-world examples that you can study, modify, and learn from.
      </p>

      <h2>Contributing</h2>
      <p>
        Clone Wars is an open community project. You can contribute by:
      </p>
      <ul>
        <li>Adding new clones or alternatives</li>
        <li>Improving existing documentation</li>
        <li>Sharing tutorials</li>
        <li>Reporting issues</li>
      </ul>

      <h2>Contact</h2>
      <p>
        Visit our{" "}
        <a
          href="https://github.com/GorvGoyl/Clone-Wars"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub repository
        </a>{" "}
        to learn more or get involved.
      </p>
    </div>
  );
}