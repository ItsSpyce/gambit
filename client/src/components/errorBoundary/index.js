import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
    this.setState({ hasError: true, error });
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    const { hasError, error } = this.state;
    const { errorComponent, children } = this.props;
    if (hasError) {
      if (errorComponent) {
        return errorComponent(error);
      } else {
        return error.toString();
      }
    } else {
      return children;
    }
  }
}
