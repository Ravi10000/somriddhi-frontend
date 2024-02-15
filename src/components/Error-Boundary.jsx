import React, { useState } from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true, error, errorInfo });
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="p-10 flex flex-col gap-4">
          <h2 className="text-lg">Something went wrong 🤦‍♂️🤦.</h2>
          <p className="bg-red-200 px-4 py-2 border-red-600 border rounded-lg font-bold text-red-700">
            {this.state.error && this.state.error.toString()}
          </p>
          <details style={{ whiteSpace: "pre-wrap" }} open>
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
