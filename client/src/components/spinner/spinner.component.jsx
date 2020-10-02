import React from 'react';
import './spinner.styles.scss';

const Spinner = ({ size }) => (
  <div className="spinner" 
    style={{ 
        width: size==='small' ? '1.25rem' : '3rem', 
        height: size==='small' ? '1.25rem' : '3rem' 
    }}
  >
    <span className="spinner-blade"></span>
    <span className="spinner-blade"></span>
    <span className="spinner-blade"></span>
    <span className="spinner-blade"></span>
    <span className="spinner-blade"></span>
    <span className="spinner-blade"></span>
    <span className="spinner-blade"></span>
    <span className="spinner-blade"></span>
    <span className="spinner-blade"></span>
    <span className="spinner-blade"></span>
    <span className="spinner-blade"></span>
    <span className="spinner-blade"></span>
  </div>
);

export default Spinner;
