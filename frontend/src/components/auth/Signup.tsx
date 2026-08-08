



import {
    Eye,
    EyeOff,
    Mail,
    Lock,
    ArrowRight,
} from "lucide-react";

import {useState} from "react";

interface SignupProps {
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    userName:string ;
    setUserName: React.Dispatch<React.SetStateAction<string>>;
    newEmail: string;
    setNewEmail: React.Dispatch<React.SetStateAction<string>>;
    newPassword: string;
    setNewPassword: React.Dispatch<React.SetStateAction<string>>;
}

export default function  Signup({
     name,
     setName,
     userName,
     setUserName,
     newEmail,
     setNewEmail,
     newPassword,
     setNewPassword,
          }:SignupProps ):React.JSX.Element {


const [ showPassword, setShowPassword ] = useState(false);

const [passwordConfirm, setPasswordConfirm] = useState("");

const handleOnChange =()=>{

}



    return (<>

        <div className="gossip-field">
            <label htmlFor="name">Name</label>
            <div className="gossip-input">

                <input id="name" name="name" type="text" placeholder="Your name"
                    value={name}
                    onChange={handleOnChange}
                    autoComplete="name"    />
            </div>

        </div>


        <div className="gossip-field">
            <label htmlFor="userName">Username</label>
            <div className="gossip-input">
                <input id="userName" name="userName" type="text" placeholder="Eg: @username"
                    value={userName}
                    onChange={handleOnChange}
                    autoComplete="name"    />
            </div>
            <div className="errorInput">
                <small>Error</small>
            </div>

            <div className="instructionInput">
                <small>Letters and numbers only. No spaces.</small>
            </div>

        </div>

        <div className="gossip-field">
            <label htmlFor="newEmail">Email</label>
            <div className="gossip-input">
                <Mail size={19}/>
                <input id="newEmail" type="email" name="newEmail" placeholder="you@example.com"
                    value={newEmail}
                    onChange={handleOnChange}
                    autoComplete="email"/>
            </div>

            <div className="errorInput">
               <small>Error</small>
             </div>

        </div>



        <div className="gossip-field">
            <div className="gossip-password-label">
                <label htmlFor="newPassword">Password</label>
            </div>

            <div className="gossip-input">
                <Lock size={19} />
                <input id="newPassword" name="newPassword"
                    type={
                        showPassword
                            ? "text"
                            : "password"
                    }
                    placeholder="Enter your password"
                    value={newPassword}
                    onChange={handleOnChange}
                    autoComplete="new-password"
                />

                <button
                    type="button"
                    className="gossip-password-toggle"
                    onClick={() =>
                        setShowPassword((prev) => !prev)
                    }
                    aria-label={
                        showPassword
                            ? "Hide password"
                            : "Show password"
                    }  >
                    {showPassword  ? <EyeOff size={19} />  : <Eye size={19} />   }

                </button>
            </div>
            <div className="errorInput">
                <small>Error</small>
            </div>

            <div className="instructionInput">
                <small>Use at least 8 characters, including one uppercase letter, one number, and one special character.</small>
            </div>


        </div>

        <div className="gossip-field">
            <div className="gossip-password-label">
                <label htmlFor="newPasswordConfirm">Confirm Password </label>
            </div>

            <div className="gossip-input">
                <Lock size={19} />
                <input id="newPasswordConfirm" name="newPasswordConfirm"
                    type={
                        showPassword
                            ? "text"
                            : "password"
                    }
                    placeholder="Confirm your password"
                    value={passwordConfirm}
                    onChange={handleOnChange}
                    autoComplete="new-password"  />

                <button
                    type="button"
                    className="gossip-password-toggle"
                    onClick={() =>
                        setShowPassword((prev) => !prev)
                    }
                    aria-label={
                        showPassword
                            ? "Hide password"
                            : "Show password"
                    }  >

                    {showPassword  ? <EyeOff size={19} />  : <Eye size={19} />   }

                </button>
            </div>
            <div className="errorInput">
                <small>Error</small>
            </div>
        </div>

         <button type="submit"   className="gossip-submit-btn" >
            <span>Create account</span>
            <ArrowRight size={19} />
         </button>


        </> );
}