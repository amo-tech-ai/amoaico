
import React, { Component, ErrorInfo, ReactNode } from "react";
import { XIcon } from "../assets/icons";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full border border-gray-200 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <XIcon className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong</h2>
            <p className="text-gray-600 mb-6">
              We encountered an unexpected error. Please refresh the page or try again later.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg text-left overflow-auto max-h-40 mb-6">
                <code className="text-xs text-red-700 font-mono">
                    {this.state.error?.message}
                </code>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 rounded-lg font-semibold bg-gray-900 text-white hover:bg-gray-800 transition-colors w-full"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
