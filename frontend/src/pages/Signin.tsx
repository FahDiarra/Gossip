
import { useState } from "react";
import  appConfig  from "@/config/appConfig";


import {
    Eye,
    EyeOff,
    Mail,
    Lock,
    ArrowRight,
} from "lucide-react";

import "@/styles/menu/Signin.css";
import { Link } from "react-router-dom";


type AuthMode = "signin" | "signup";



export default function Signin() {

    const [mode, setMode] = useState<AuthMode>("signin");
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");


    const isSignup = mode === "signup";


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        if (isSignup) {

            console.log("Create account", {
                name,
                email,
                password
            });

            return;
        }

        console.log("Sign in", {
            email,
            password
        });

    };


    const handleGoogleLogin = () => {
        console.log("Continue with Google");

    };
   


    return (

        <main className="gossip-auth">
            {/* BACKGROUND / VISUAL SIDE */}
            <section className="gossip-auth-visual">
                <div className="gossip-auth-visual-overlay" >
                    <img src={appConfig.authBg} alt="Gossip" />
                </div>

            
                <div className="gossip-auth-visual-content">
                    <span className="gossip-auth-eyebrow">
                        CONNECT • SHARE • HAVE FUN
                    </span>
                    <h1>
                        Your people.
                        <br />
                        Your stories.
                        <br />
                        Your Gossip.
                    </h1>
                    <p>
                        Share moments, discover new people
                        and stay connected with the conversations
                        that matter to you.
                    </p>


                    <div className="gossip-auth-visual-users">
                        <div className="gossip-auth-avatars">
                            <img src="/images/auth/user-1.jpg"   alt=""  />
                            <img src="/images/auth/user-2.jpg"   alt=""/>
                            <img src="/images/auth/user-3.jpg"  alt=""  />
                            <img src="/images/auth/user-4.jpg"    alt=""  />
                        </div>

                        <span>
                            Join people already on Gossip
                        </span>
                    </div>
                </div>
                <div className="gossip-auth-visual-footer">
                    © {new Date().getFullYear()} Gossip
                </div>
            </section>

            {/* FORM SIDE */}

            
            <section className="gossip-auth-form-section">  
                
                <div className="gossip-auth-form-wrapper">  
                  
                    <div className="gossip-auth-header">    
                         <div className="gp-auth-header-hero">
                            <img src={appConfig.logo} alt={appConfig.title} className="gossip-auth-logo" />
                          <h2>
                            {isSignup ? "Create your account" : "Welcome back"  }
                          </h2>
                        </div>        
                       
                        <p>
                            {isSignup
                                ? `Join ${appConfig.title} and start sharing.`
                                : `Sign in to continue to ${appConfig.title}.`
                            }
                        </p>
                    </div>

                    {/* GOOGLE */}

                    <button
                        type="button"
                        className="gossip-google-btn"
                        onClick={handleGoogleLogin}
                    >

                        <span className="gossip-google-icon">
                            <svg  viewBox="0 0 24 24" aria-hidden="true"       >
                                <path  fill="#4285F4"   d="M21.35 12.23c0-.72-.06-1.41-.18-2.08H12v3.94h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.7 2.91-4.2 2.91-7.25Z"  />
                                <path
                                    fill="#34A853"
                                    d="M12 21.5c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.74 9.74 0 0 0 12 21.5Z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M6.54 13.58A5.86 5.86 0 0 1 6.23 12c0-.55.1-1.08.31-1.58V7.89H3.3A9.74 9.74 0 0 0 2.25 12c0 1.57.38 3.06 1.05 4.11l3.24-2.53Z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12 6.39c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.83 3.47 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.7 5.39l3.24 2.53C7.31 8.11 9.46 6.39 12 6.39Z"
                                />
                            </svg>
                        </span>
                        Continue with Google
                    </button>


                    {/* DIVIDER */}
                    <div className="gossip-auth-divider">
                        <span />
                        <p> or </p>
                        <span />
                    </div>

                    {/* FORM */}
                    <form
                        className="gossip-auth-form"
                        onSubmit={handleSubmit}  >

                        {isSignup && (

                            <div className="gossip-field">
                                <label htmlFor="name">
                                    Name
                                </label>
                                <div className="gossip-input">

                                    <input
                                        id="name"
                                        type="text"
                                        placeholder="Your name"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        autoComplete="name"    />
                                </div>
                            </div>
                        )}



                        <div className="gossip-field">
                            <label htmlFor="email">
                                Email
                            </label>

                            <div className="gossip-input">
                                <Mail size={19} />
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    autoComplete="email"    />
                            </div>

                        </div>

                        <div className="gossip-field">
                            <div className="gossip-password-label">
                                <label htmlFor="password">
                                    Password
                                </label>
                                {!isSignup && (

                                    <button
                                        type="button"
                                        className="gossip-forgot"  >
                                        Forgot password?
                                    </button>
                                )}
                            </div>


                            <div className="gossip-input">

                                <Lock size={19} />


                                <input
                                    id="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    autoComplete={
                                        isSignup
                                            ? "new-password"
                                            : "current-password"
                                    }
                                />


                                <button
                                    type="button"
                                    className="gossip-password-toggle"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }  >

                                    {showPassword   ? <EyeOff size={19} />  : <Eye size={19} />   }

                                </button>
                            </div>
                        </div>

                        <button type="submit"   className="gossip-submit-btn" >
                            <span>
                                {isSignup  ? "Create account"   : "Sign in"  }
                            </span>

                            <ArrowRight size={19} />
                        </button>
                    </form>

                    {/* SWITCH MODE */}
                    <div className="gossip-auth-switch">
                        <span>
                            {isSignup
                                ? "Already have an account?"
                                : "Don't have an account?"
                            }
                        </span>
                        <button
                            type="button"
                            onClick={() => {
                                setMode( isSignup ? "signin" : "signup" ); 
                                 }}    >

                            {isSignup
                                ? "Sign in"
                                : "Create account"
                            }
                        </button>
                    </div>
                    <div className="gossip-auth-terms">
                        By continuing, you agree to our {""}
                        <Link to="/terms" className="gossip-auth-terms-link">
                            Terms
                        </Link>
                        {" "} and {" "}
                        <Link to="/privacy" className="gossip-auth-terms-link">
                            Privacy Policy
                        </Link>
                         .
                    </div>

                         
                </div>
                

                   
            </section>
         
        </main>

    );

}