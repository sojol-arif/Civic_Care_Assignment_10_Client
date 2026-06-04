import { AuthContext } from '../../contexts/AuthContext';
import { use } from 'react';
import { useDocumentTitle } from '../../hooks/dynamic_title/DynamicTitle';
import { Link } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { MdLogin } from "react-icons/md";
import { useState } from 'react';

const Register = () => {
    // Dynamically set the document title
    useDocumentTitle("Register");

    const { signInWithGoogle, createUser } = use(AuthContext);
    const [showPassword, setShowPassword] = useState(false);

    const hangleCreateUser = () => {
        createUser()
            .then((result) => {
                // Signed up 
                // ...
                console.log(result, 'From Create User');
                const newUser = {
                    name: result.user.displayName,
                    email: result.user.email,
                    photoURL: result.user.photoURL,
                    uid: result.user.uid
                };
                fetch('https://civic-care-server-five.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data, 'user data from google sign in');
                    });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                console.log(errorCode);
                console.log(errorMessage);
            });
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then((result) => {
                const newUser = {
                    name: result.user.displayName,
                    email: result.user.email,
                    photoURL: result.user.photoURL,
                    uid: result.user.uid
                };
                fetch('https://civic-care-server-five.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data, 'user data from google sign in');
                    });
            }).catch((error) => {
                console.log(error, 'error from google sign in');
            });
    }

    return (
        <div>
            <section className="min-h-screen flex flex-col items-center
                          justify-center px-4 pb-0 section-space">

                {/* Card */}
                <div className="sign_in w-full max-w-lg bg-secondary border border-base-300
                        rounded-3xl p-8 md:p-10 shadow-sm">

                    {/* Title */}
                    <h2 className="text-3xl font-bold mb-8 heading-font">
                        Welcome Back
                    </h2>

                    <form onSubmit={hangleCreateUser} className="flex flex-col gap-5">

                        {/* Email */}
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-semibold">
                                Email Address
                            </label>
                            <input
                                type="email"
                                placeholder="name@example.com"
                                required
                                className="input w-full rounded-xl px-4 py-3
                           border border-base-300
                           bg-base-100
                           focus:outline-none focus:border-primary
                           placeholder:text-base-content/40"
                            />
                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-semibold">
                                    Password
                                </label>
                                <Link
                                    to="/forgot-password"
                                    className="text-sm font-semibold text-nuetral
                             hover:opacity-80 transition-colors"
                                >
                                    Forgot Password?
                                </Link>
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    required
                                    className="input w-full rounded-xl px-4 py-3
                             border border-base-300
                             bg-base-100
                             focus:outline-none focus:border-primary
                             placeholder:text-base-content/40"
                                    
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2
                             text-xs font-semibold"
                                    
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>

                        {/* Remember me */}
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                className="checkbox checkbox-sm border-base-300
                           checked:bg-secondary checked:border-primary"
                            />
                            <span className="text-sm">
                                Remember this device
                            </span>
                        </label>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="btn w-full rounded-xl py-3 text-base
                         font-semibold border-none text-white
                         flex items-center justify-center gap-2 bg-accent">
                            Login <MdLogin className="text-xl" />
                        </button>

                        {/* Divider */}
                        <div className="flex items-center gap-3 my-1">
                            <div className="flex-1 border-t border-base-300" />
                            <span className="text-xs font-semibold tracking-widest uppercase"
                                >
                                Or continue with
                            </span>
                            <div className="flex-1 border-t border-base-300" />
                        </div>

                        {/* Google Button */}
                        <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            className="btn w-full rounded-xl py-3 text-base
                         font-semibold bg-base-100
                         border border-base-300
                         flex items-center justify-center gap-3
                         hover:bg-base-200 transition-all duration-200 text-secondary-content"
                        >
                            <FcGoogle className="text-2xl" />
                            Sign in with Google
                        </button>

                    </form>

                </div>

                {/* Register link */}
                <p className="text-center text-sm mt-10">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-bold"
                        
                    >
                        Sign In
                    </Link>
                </p>

            </section>
        </div>
    );
};

export default Register;