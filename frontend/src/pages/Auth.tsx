
import { useState } from "react";
import  appConfig  from "@/config/appConfig";




import "@/styles/menu/Signin.css";
import { Link } from "react-router-dom";

//Components

  import Signin from "@/components/auth/Signin";
   import Signup from "@/components/auth/Signup";
  import AuthVisual from "@/components/auth/AuthVisual";


type AuthMode = "signin" | "signup";


export default function Auth() {

    const [mode, setMode] = useState<AuthMode>("signin");
    //Signin
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //Signup
    const [name, setName] = useState("");
    const [userName, setUserName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");


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

            <div className="gp-auth-wrapper">
            {/* BACKGROUND / VISUAL SIDE */}
            <section className="gossip-auth-visual">
                <AuthVisual/>
            </section>

            {/* FORM SIDE */}

            <section className="gossip-auth-form-section">
                <div className="gossip-auth-form-wrapper">

                    {/* HERO */}
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
                    <button type="button" className="gossip-google-btn"  onClick={handleGoogleLogin}  >
                        <span className="gossip-google-icon">
                            <svg  viewBox="0 0 24 24" aria-hidden="true"       >
                                <path  fill="#4285F4"   d="M21.35 12.23c0-.72-.06-1.41-.18-2.08H12v3.94h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.7 2.91-4.2 2.91-7.25Z"  />
                                <path fill="#34A853" d="M12 21.5c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.74 9.74 0 0 0 12 21.5Z" />
                                <path fill="#FBBC05" d="M6.54 13.58A5.86 5.86 0 0 1 6.23 12c0-.55.1-1.08.31-1.58V7.89H3.3A9.74 9.74 0 0 0 2.25 12c0 1.57.38 3.06 1.05 4.11l3.24-2.53Z" />
                                <path fill="#EA4335" d="M12 6.39c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.83 3.47 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.7 5.39l3.24 2.53C7.31 8.11 9.46 6.39 12 6.39Z" />
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
                    <form className="gossip-auth-form" onSubmit={handleSubmit}  >

                        {!isSignup ?(
                            <Signin
                                email={email}
                                setEmail={setEmail}
                                password={password}
                                setPassword={setPassword}
                            />
                         ):(
                            <Signup
                            name={name}
                            setName={setName}
                            userName={userName}
                            setUserName={setUserName}
                            newEmail={newEmail}
                            setNewEmail={setNewEmail}
                            newPassword={newPassword}
                            setNewPassword={setNewPassword}
                            />
                        )}




                    </form>


                    {/* SWITCH MODE */}
                    <div className="gossip-auth-switch">
                        <span>
                            {isSignup
                                ? "Already have an account?"
                                : "Don't have an account?"
                            }
                        </span>
                        <button type="button"
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
            </div>
        </main>

    );

}