import React from 'react';

export default function About() {
  return (
    <div className='container'>
      <h4 className='my-2 mx-1'>About Us</h4>
      <div className='accordion' id='accordionExample'>
        <div className='accordion-item'>
          <h2 className='accordion-header'>
            <button
              className='accordion-button'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#collapseOne'
              aria-expanded='true'
              aria-controls='collapseOne'>
              Our Mission
            </button>
          </h2>
          <div
            id='collapseOne'
            className='accordion-collapse collapse show'
            data-bs-parent='#accordionExample'>
            <div className='accordion-body'>
              <strong>
                Our mission is to provide a secure and efficient note-taking platform.
              </strong>
              At Notebook, we aim to help users organize their thoughts, manage tasks, and keep
              track of important information. We are committed to offering a reliable environment
              where users can create, edit, and delete their personal notes with ease.
            </div>
          </div>
        </div>
        <div className='accordion-item'>
          <h2 className='accordion-header'>
            <button
              className='accordion-button collapsed'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#collapseTwo'
              aria-expanded='false'
              aria-controls='collapseTwo'>
              Our Vision
            </button>
          </h2>
          <div
            id='collapseTwo'
            className='accordion-collapse collapse'
            data-bs-parent='#accordionExample'>
            <div className='accordion-body'>
              <strong>
                Our vision is to be the preferred choice for personal and professional note-taking.
              </strong>
              We strive to be a platform that not only offers note creation but also enables
              efficient organization, categorization, and retrieval of important information. We
              want Notebook to become an indispensable tool for individuals looking to manage their
              ideas, tasks, and information in a single, intuitive interface.
            </div>
          </div>
        </div>
        <div className='accordion-item'>
          <h2 className='accordion-header'>
            <button
              className='accordion-button collapsed'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#collapseThree'
              aria-expanded='false'
              aria-controls='collapseThree'>
              Our Values
            </button>
          </h2>
          <div
            id='collapseThree'
            className='accordion-collapse collapse'
            data-bs-parent='#accordionExample'>
            <div className='accordion-body'>
              <strong>We value privacy, reliability, and simplicity.</strong>
              At Notebook, we ensure that user data is kept private and secure, focusing on
              providing a seamless experience that is both user-friendly and efficient. We
              prioritize building a platform that is reliable, intuitive, and designed to meet the
              needs of users who require a dependable note-taking solution.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
