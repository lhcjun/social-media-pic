import React, { Component } from 'react';
import './error-boundary.styles.scss';

class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = {
      hasError: false,
    };
  }

  // catch any error in children
  static getDerivedStateFromError(error) {
    // process the error
    return { hasError: true };
  }

  // catch errors thrown by a components children
  componentDidCatch(error, errorInfo) {
    console.log(error);
  }

  render() {
    if (this.state.hasError) {  // render fallback UI
      return (
        <article className="error-img-overlay">
          <img src="https://i.imgur.com/FOeYt4E.png" alt='error loading' />
          <h2>Sorry, the page is broken.</h2>
          <h5>This page is buried in the sand.</h5>
        </article>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
