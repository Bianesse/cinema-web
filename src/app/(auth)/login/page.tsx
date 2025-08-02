'use client'
import { Play, Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { getSession, signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const errorMessages: Record<string, string> = {
        CredentialsSignin: "Something went wrong on our end. Please try again later.",
        Configuration: "Invalid email or password. Please try again.",
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const response = await signIn('credentials', {
            email: formData.email,
            password: formData.password,
            redirect: false,
        });

        if (response?.error) {
            const errorMessage = errorMessages[response.error] || "An unexpected error occurred.";

            toast.error(errorMessage);
            /* console.error(response.error); */ // Log the raw error for debugging
            setLoading(false);
            return;
        }
        const session = await getSession();

        if (session?.user?.role === "ADMIN") {
            router.push("/admin/dashboard");
        } else {
            router.push("/");
        }
    };

    const handleSocialLogin = async (provider: string) => {
        setLoading(true);
        const response = await signIn(provider, {
            redirectTo: '/',
        })
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-4">
            <div className="w-full max-w-lg relative z-10">

                {/* Login Card */}
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg p-8 md:p-10 border border-amber-200/50">
                    {/* Logo and Header */}
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center space-x-3 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                                <Play className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold text-amber-900">Cinemax</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-2">Welcome Back</h1>
                        <p className="text-amber-700">Sign in to continue your movie journey</p>
                    </div>

                    {/* Login Form */}
                    <div className="space-y-6">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-semibold text-amber-900 block">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-amber-500" />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full p-4 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white/80 backdrop-blur-sm text-amber-900 placeholder-amber-400 transition-all duration-200"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-semibold text-amber-900 block">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-amber-500" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full p-4 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white/80 backdrop-blur-sm text-amber-900 placeholder-amber-400 transition-all duration-200"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-amber-500 hover:text-amber-600 transition-colors" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-amber-500 hover:text-amber-600 transition-colors" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me and Forgot Password */}
                        <div className="flex items-center justify-end">
                            <div className="text-sm">
                                <button className="font-medium text-amber-600 hover:text-amber-500 transition-colors">
                                    Forgot password?
                                </button>
                            </div>
                        </div>

                        {/* Login Button */}
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-sm font-semibold text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all duration-200"
                        >
                            {loading ? (
                                <div className="flex items-center space-x-2">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Signing in...</span>
                                </div>
                            ) : (
                                'Sign In'
                            )}
                        </button>

                        {/* Social Login Divider */}
                       <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-amber-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-amber-600 font-medium">Or continue with</span>
                            </div>
                        </div>

                        {/* Social Login Buttons */}
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                className="col-span-2 w-full inline-flex justify-center py-3 px-4 border border-amber-200 rounded-xl shadow-sm bg-white/80 backdrop-blur-sm text-sm font-medium text-amber-700 hover:bg-amber-50 transition-all duration-200 hover:scale-[1.02]"
                                onClick={() => handleSocialLogin('google')}
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                <span className="ml-2">Google</span>
                            </button>
                            {/* <button
                                type="button"
                                className="w-full inline-flex justify-center py-3 px-4 border border-amber-200 rounded-xl shadow-sm bg-white/80 backdrop-blur-sm text-sm font-medium text-amber-700 hover:bg-amber-50 transition-all duration-200 hover:scale-[1.02]"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                </svg>
                                <span className="ml-2">Twitter</span>

                            </button> */}
                        </div>

                    </div>

                    {/* Sign Up Link */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-amber-700">
                            Don&apos;t have an account?{' '}
                            <Link href="/signup">
                                <button className="font-semibold text-amber-600 hover:text-amber-500 transition-colors">
                                    Sign up for free
                                </button>
                            </Link>

                        </p>
                    </div>
                </div>

                {/* Additional Info */}
                {/* <div className="mt-8 text-center">
                    <p className="text-xs text-amber-600">
                        By signing in, you agree to our{' '}
                        <button className="underline hover:text-amber-700 transition-colors">Terms of Service</button>
                        {' '}and{' '}
                        <button className="underline hover:text-amber-700 transition-colors">Privacy Policy</button>
                    </p>
                </div> */}
            </div>
        </div>
    )
}