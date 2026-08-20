

import  appConfig  from "@/config/appConfig";

import apiPublic from "@/api/api.public.ts";


import "@/styles/menu/Auth.css";
import { Link,useNavigate } from "react-router-dom";

//Components
  import {Register} from "@/components/auth/Register.tsx";
  import Login from "@/components/auth/Login.tsx";
  import AuthVisual from "@/components/auth/AuthVisual";

//context
import {useAuth, type UserProps} from "@/context/AuthContext";

type AuthMode = "logIn" | "register";

import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import * as React from "react";

interface RegisterForm {
    //register
    name: string;
    userName:string ;
    birthday:string;
    newEmail: string;
    newPassword: string;
    //Login
    email: string;
    password: string;
}
interface RegisterResponseProps {
    success: boolean;
    message: string;
    token: string;
    user: UserProps;
}
interface LoginResponseProps {
    success: boolean;
    message: string;
    token: string;
    user: UserProps;
}



export function Auth(): React.JSX.Element {

    const {login} = useAuth();
    const navigate = useNavigate();
    const [mode, setMode] = useState<AuthMode>("logIn");

    const [loading, setLoading] = useState<boolean>(false);

    //Login
    const [errorLogin, setErrorLogin] = useState<boolean>(false);
    const [unknowError, setUnknowError] = useState<boolean>(false);

    //Register & Login

    const [form, setForm] = useState<RegisterForm>({
        //register
        name: "",
        userName: "",
        birthday: "",
        newEmail: "",
        newPassword: "",
        //Login
        email: "",
        password: "",
    })
    const [stayConnected, setStayConnected] = useState(false);

    const isSignup = mode === "register";


    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        if (loading) return;
        setLoading(true);
        setUnknowError(false)

        try {

            if (isSignup) {
                const registerResponse =
                    await apiPublic.post<RegisterResponseProps>(
                        "/auth/register",
                        {
                            name: form.name,
                            userName: form.userName,
                            newEmail: form.newEmail,
                            birthday: form.birthday,
                            newPassword: form.newPassword,
                            stayConnected:stayConnected,

                        }
                    );
                const data = registerResponse.data;

                if (data.success) {
                    if (stayConnected) {
                        localStorage.setItem("stayConnected", "true");
                    } else {
                        localStorage.removeItem("stayConnected");
                    }

                    login(data.token, data.user);
                    navigate("/profile", {replace: true});
                }

                console.log("message", data.message);

                return;
            }

            //login
            const loginResponse = await apiPublic.post<LoginResponseProps>(
                "/auth/login", {
                    email: form.email,
                    password: form.password,
                    stayConnected:stayConnected,
                });

            const data = loginResponse.data;
            if (data.success) {

                if (stayConnected) {
                    localStorage.setItem("stayConnected", "true");
                } else {
                    localStorage.removeItem("stayConnected");
                }


                login(data.token, data.user);
                navigate("/profile", {replace: true});
            } else if (data.message === "error_credentials") {
                setErrorLogin(true);
            }

            console.log("message", data.message);





        } catch (error) {
            console.error(error);
            setUnknowError(true);
        } finally {
            setLoading(false);
        }

    };


    const handleGoogleLogin = () => {
        console.log("Continue with Google");

    };


    useEffect(() => {
        const handlePopState = (event: PopStateEvent): void => {
            const mode = event.state?.mode;
            if (mode === "register") {
                setMode("register");
            } else {
                setMode("logIn");
            }
        };
        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, []);


    const SwitchMode = (): void => {
        if (isSignup) {
            // Signup → Login
            window.history.back();

        } else {
            // Login → Signup
            window.history.pushState(
                {mode: "register"},
                "",
                window.location.href
            );

            setMode("register");
        }

        setUnknowError(false);
        setForm({
            name: "",
            userName: "",
            birthday: "",
            newEmail: "",
            newPassword: "",
            email: "",
            password: "",
        });

    };



    return (

        <main className="gossip-auth">


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
                            <img src={appConfig.logo} alt={appConfig.title} className="gossip-auth-logo"/>
                            <h2>
                                {isSignup ? "Create your account" : "Welcome back"}
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
                    <button type="button" className="gossip-google-btn" onClick={handleGoogleLogin}>
                        <span className="gossip-google-icon">
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path fill="#4285F4"
                                      d="M21.35 12.23c0-.72-.06-1.41-.18-2.08H12v3.94h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.7 2.91-4.2 2.91-7.25Z"/>
                                <path fill="#34A853"
                                      d="M12 21.5c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.74 9.74 0 0 0 12 21.5Z"/>
                                <path fill="#FBBC05"
                                      d="M6.54 13.58A5.86 5.86 0 0 1 6.23 12c0-.55.1-1.08.31-1.58V7.89H3.3A9.74 9.74 0 0 0 2.25 12c0 1.57.38 3.06 1.05 4.11l3.24-2.53Z"/>
                                <path fill="#EA4335"
                                      d="M12 6.39c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.83 3.47 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.7 5.39l3.24 2.53C7.31 8.11 9.46 6.39 12 6.39Z"/>
                            </svg>
                        </span>
                        Continue with Google
                    </button>


                    {/* DIVIDER */}
                    <div className="gossip-auth-divider">
                        <span/>
                        <p> or </p>
                        <span/>
                    </div>


                    {/* FORM */}
                    <form className="gossip-auth-form" onSubmit={handleSubmit}>

                        {!isSignup ? (
                            <Login
                                email={form.email}
                                password={form.password}
                                errorLogin={errorLogin}
                                loading={loading}
                                unknowError={unknowError}
                                setForm={setForm}
                                stayConnected={stayConnected}
                                setStayConnected={setStayConnected}
                            />
                        ) : (
                             <Register
                             name={form.name}
                             userName={form.userName}
                             newEmail={form.newEmail}
                             newPassword={form.newPassword}
                             loading={loading}
                             unknowError={unknowError}
                             setForm={setForm}
                             stayConnected={stayConnected}
                             setStayConnected={setStayConnected}
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
                        <button type="button" onClick={SwitchMode}>
                            {isSignup
                                ? "Log in"
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

