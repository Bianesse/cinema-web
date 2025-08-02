'use client';
import { 
  Play, 
  ShieldX, 
  ArrowLeft, 
  Home, 
  Lock,
  AlertTriangle 
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const NotAuthorizedPage = () => {
  const router = useRouter();
  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoHome = () => {
    // In a real app, you'd use your router's navigation
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
              <Play className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-amber-900">Cinemax</span>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-amber-200">
          {/* Error Icon */}
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldX className="w-10 h-10 text-red-600" />
            </div>
            
            {/* Status Code */}
            <div className="flex items-center justify-center space-x-2 mb-2">
              <span className="text-4xl font-bold text-amber-900">403</span>
              <Lock className="w-6 h-6 text-amber-600" />
            </div>
          </div>

          {/* Content */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-amber-900 mb-3">
              Access Denied
            </h1>
            <p className="text-amber-700 mb-4">
              You don&apos;t have permission to access this page. This area is restricted to authorized personnel only.
            </p>
            
            {/* Warning Notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-sm text-amber-800 font-medium mb-1">
                    Administrator Access Required
                  </p>
                  <p className="text-xs text-amber-700">
                    If you believe you should have access to this page, please contact your system administrator or sign in with appropriate credentials.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleGoHome}
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 py-3 rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all font-medium"
            >
              <Home className="w-4 h-4" />
              <span>Go to Homepage</span>
            </button>
            
            <button
              onClick={handleGoBack}
              className="w-full flex items-center justify-center space-x-2 border border-amber-200 text-amber-700 px-4 py-3 rounded-lg hover:bg-amber-50 transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go Back</span>
            </button>
          </div>

          {/* Additional Help */}
          {/* <div className="text-center mt-6 pt-6 border-t border-amber-100">
            <p className="text-xs text-amber-600">
              Need help? Contact support at{' '}
              <a href="mailto:support@cinemax.com" className="text-amber-700 hover:text-amber-800 underline">
                support@cinemax.com
              </a>
            </p>
          </div> */}
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-amber-600">
            © 2025 Cinemax. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotAuthorizedPage;