import React from 'react';

type ErrorBoundaryProps = {
    fallbackRender: (props: { error: Error }) => React.ReactElement;
    children: React.ReactNode;
  };
  
  type ErrorBoundaryState = {
    hasError: boolean;
    error?: Error | null;
  };

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null};
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError && this.state.error) {
      // You can render any custom fallback UI
      return this.props.fallbackRender({ error: this.state.error });
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
