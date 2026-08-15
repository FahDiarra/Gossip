
import {
    Eye,
    EyeOff,
    Mail,
    Lock,
    ArrowRight,
} from "lucide-react";
import { useState } from "react";
import {useNavigate} from "react-router-dom";


interface LoginProps {
    email: string;
    password: string;
    errorLogin:boolean;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    loading: boolean;
}

export default function Login({
                                   email,
                                   password,
                                   errorLogin,
                                   handleChange,
                                   loading,
                               }: LoginProps): React.JSX.Element {

    const [showPassword, setShowPassword] = useState( false );

    const navigate = useNavigate();
    const handleForgotPassword = (): void => {
        navigate("/forgot-password");
    };


    const disabled:boolean = loading || email==="" || password==="" ;

    return (
      <>
        <div className="gossip-field">
            <label htmlFor="email">Email:</label>
            <div className="gossip-input">
                <Mail size={19}/>
                <input id="email" type="email" name="email"  placeholder="Eg: you@example.com"
                       value={email}
                       onChange={handleChange}
                       autoComplete="email" required />
            </div>

        </div>

    <div className="gossip-field">
        <label htmlFor="password">Password:</label>
        <div className="gossip-input">
            <Lock size={19} />
            <input  id="password" name="password"
                    type={
                        showPassword
                            ? "text"
                            : "password"
                    }
                    placeholder="Enter your password"
                    value={password}
                    onChange={handleChange}
                    autoComplete="current-password" required />

            <button type="button"
                    className="gossip-password-toggle"
                    onClick={(): void  =>
                        setShowPassword((prev:boolean):boolean => !prev)
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

          {errorLogin && (
             <div className="errorInput">
                 <small>
                     Invalid email or password.
                 </small>
             </div>
          )}

          {errorLogin &&(
              <div className="gossip-forgot-password">
              <button type="button"
                      onClick={handleForgotPassword}
                      className="gossip-forgot"  >
                  Forgot password?
              </button>
              </div>
          )}

    <button type="submit"  disabled={disabled}
            className={`gossip-submit-btn ${disabled? "disabled" : ""}`}>

        {loading ? (<>
            <span>Logging in...</span>
            <span className="gossip-submit-spinner"> </span>

        </> ) : (<>
            <span>Log In</span>
            <ArrowRight size={19} />
        </>  )}


    </button>
      </>);
}

