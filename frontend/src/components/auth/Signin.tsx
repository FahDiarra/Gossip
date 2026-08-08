
import {
    Eye,
    EyeOff,
    Mail,
    Lock,
    ArrowRight,
} from "lucide-react";
import {useState} from "react";



interface SigninProps {
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>; }

export default function Signin({
                                   email,
                                   setEmail,
                                   password,
                                   setPassword,
                               }: SigninProps): React.JSX.Element {

    const [showPassword, setShowPassword] = useState(false );


    return (
      <>
        <div className="gossip-field">
            <label htmlFor="email">Email</label>
            <div className="gossip-input">
                <Mail size={19}/>
                <input id="email" type="email" placeholder="you@example.com"
                       value={email}
                       onChange={(e) =>
                           setEmail(e.target.value)
                       }
                       autoComplete="email"/>
            </div>

        </div>

    <div className="gossip-field">
        <div className="gossip-password-label">
            <label htmlFor="password">Password </label>
            <button type="button" className="gossip-forgot"  >
                Forgot password?
            </button>
        </div>


        <div className="gossip-input">
            <Lock size={19} />
            <input  id="password"
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
                    autoComplete="current-password" />

            <button type="button"
                    className="gossip-password-toggle"
                    onClick={() =>
                        setShowPassword((prev) => !prev)
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


    <button type="submit"
            className="gossip-submit-btn" >
        <span>Sign in</span>
        <ArrowRight size={19} />
    </button>
      </>);
}

