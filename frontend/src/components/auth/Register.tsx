


import {
    Eye,
    EyeOff,
    Mail,
    Lock,
    ArrowRight,
} from "lucide-react";

import {useState,useMemo} from "react";

interface RegisterForm {
    // Register
    name: string;
    userName: string;
    birthday: string;
    newEmail: string;
    newPassword: string;

    // Login
    email: string;
    password: string;
}
interface RegisterProps {
    name: string;
    userName: string;
    newEmail: string;
    newPassword: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    loading: boolean;
    setForm: React.Dispatch<React.SetStateAction<RegisterForm>>;
}



export default function  Register({
     name,
     userName,
     birthday,
     newEmail,
     newPassword,
     handleChange,
     loading,
     setForm,
       }:RegisterProps ): React.JSX.Element {

const [showPassword, setShowPassword ] = useState<boolean>(false);
const [passwordConfirm, setPasswordConfirm] = useState<string>("");
const [passwordFocused, setPasswordFocused] = useState<boolean>(false);
const [userNameFocused, setUserNameFocused] = useState<boolean>(false);
const [userNameValid, setUserNameValid] = useState<boolean>(true);
const [userNameSuggestion, setUserNameSuggestion] = useState<string[]>(["@john123", "@john_dev", "@john2026"]);
const [nameFocused, setNameFocused] = useState<boolean>(false);
const [birthdayFocused , setBirthdayFocused] = useState<boolean>(false);

    const passwordValid:boolean =
        newPassword.length >= 8 &&
        /[A-Z]/.test(newPassword) &&
        /[0-9]/.test(newPassword) &&
        /[^A-Za-z0-9]/.test(newPassword);

    const passwordProgress = useMemo(() => {
        const requirements:boolean[] = [
            newPassword.length >= 8,
            /[A-Z]/.test(newPassword),
            /[0-9]/.test(newPassword),
            /[^A-Za-z0-9]/.test(newPassword),
        ];

        const completed:number = requirements.filter(Boolean).length;
        return {
            completed,
            percentage: (completed / requirements.length) * 100,
        };
    }, [newPassword]);


    const passwordsMatch :boolean =
        passwordConfirm.length > 0 &&
        newPassword === passwordConfirm;

    const onBlurPassword = (): void => {
        if (passwordValid || newPassword.length === 0) {
            setPasswordFocused(false);
        }
    };

    const onBlurUsername = (): void => {
        setUserNameFocused(false);
    }




const addSuggestion = (suggestion:string): void => {
    const fieldName ="userName"
    let newValue = suggestion;
    if (newValue.length > 0 && !newValue.startsWith("@")) {
        newValue = `@${newValue}`;
    }

        setForm((prev) => ({
        ...prev,
        [fieldName]: newValue,
    }))

}

const disabled:boolean = loading || !userNameValid || !passwordsMatch || name ==="" || newEmail ==="";


    return (<>

        <div className="gossip-field">
            <label htmlFor="name">Name:</label>
            <div className="gossip-input">
                <input id="name" name="name" type="text" placeholder="Your name"
                    value={name}
                    onChange={handleChange}
                       maxLength={50}
                       autoComplete= "off"  required
                       onFocus={():void => setNameFocused(true)}
                       onBlur={():void => setNameFocused(false)}

                   />
              </div>

            {nameFocused && (
                <div className="instructionInput">
                    <small>Your name must be between 3 and 50 characters</small>
                </div>
            )}
        </div>


        <div className="gossip-field">
            <label htmlFor="userName">Username:</label>
            <div className="gossip-input">
                <input id="userName" name="userName" type="text" placeholder="Eg: @username"
                     value={userName}
                     onChange={handleChange}
                     maxLength={30}
                     required
                     onFocus={():void => setUserNameFocused(true)}
                     onBlur={onBlurUsername}/>
            </div>

            {!userNameValid && (
            <div className="errorInput">
                <small>Error</small>
            </div>
             )}


                {userNameFocused &&(<>
                <div className="instructionInput">
                    <small>Username must be between 3–30 characters.</small>
                    <small> Letters and numbers only, no spaces.</small>
                </div>
                </>)}

                {!userNameValid && (<>
                  <div className="instructionInput">
                    <small>Suggestions:</small>
                    <ul>

                        {userNameSuggestion.map((suggestion, index) =>{
                            const suggestionActive :boolean =userName === suggestion;
                            return(
                                <li key={index} >
                                    <button type="button" className={`${suggestionActive ? "suggestionBtnActive" : ""}`} onClick={()=>addSuggestion(suggestion)}>
                                        {suggestion}
                                    </button>
                                </li>
                            ) })}

                    </ul>
                </div>
                </>)}




            <div className="gossip-field">
                <label htmlFor="birthday">Birthday:</label>
                <div className="gossip-input">
                    <input
                        id="birthday"
                        name="birthday"
                        type="date"
                        value={birthday}
                        onChange={handleChange}
                        onFocus={() => setBirthdayFocused(true)}
                        onBlur={() => setBirthdayFocused(false)}
                        max={new Date(
                            new Date().getFullYear() - 10,
                            new Date().getMonth(),
                            new Date().getDate()
                        ).toISOString().split("T")[0]}
                        required
                    />
                </div>

                {birthdayFocused && (
                    <div className="instructionInput">
                        <small>You must be at least 10 years old to create an account.</small>
                    </div>
                )}
            </div>




        </div>

        <div className="gossip-field">
            <label htmlFor="newEmail">Email:</label>
            <div className="gossip-input">
                <Mail size={19}/>
                <input id="newEmail" type="email" name="newEmail" placeholder="you@example.com"
                    value={newEmail}
                    maxLength={254}
                    onChange={handleChange}
                    autoComplete="email" required/>
            </div>

            <div className="errorInput">
               <small>Error</small>
             </div>

        </div>



        <div className="gossip-field">
            <div className="gossip-password-label">
                <label htmlFor="newPassword">Password:</label>
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
                    maxLength={64}
                    onChange={handleChange}
                    autoComplete="new-password" required
                       onFocus={() => setPasswordFocused(true)}
                       onBlur={onBlurPassword}
                />

                <button
                    type="button"
                    className="gossip-password-toggle"
                    onClick={():void =>
                        setShowPassword((prev:boolean):boolean => !prev)
                    }
                    aria-label={
                        showPassword
                            ? "Hide password"
                            : "Show password"
                    }  >
                    {showPassword  ? <EyeOff size={19} />  : <Eye size={19} />   }

                </button>
            </div>


            {passwordFocused && !passwordValid && (
                <div className="instructionInput">
                    <div className="password-progress">
                        <div className="password-progress-track">
                            <div
                                className="password-progress-bar"
                                style={{
                                     width: `${passwordProgress.percentage}%`,
                                }}
                            />
                        </div>

                        <small>
                            {passwordProgress.completed}/4 requirements completed
                        </small>
                    </div>

                    <small>
                        Use at least 8 characters, including one uppercase letter,
                        one number, and one special character.
                    </small>
                    <small>Max 64 characters.</small>
                </div>
            )}

        </div>

        {passwordValid &&(


        <div className="gossip-field">
            <div className="gossip-password-label">
                <label htmlFor="newPasswordConfirm">Confirm Password:</label>
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
                     maxLength={64}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    autoComplete="new-password"

                       required />

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

            {passwordConfirm.length > 0 && (
                <div className="instructionInput">
                    <small className={passwordsMatch ? "valid" : "error"}>
                        {passwordsMatch
                            ? "Passwords match."
                            : "Passwords do not match."}
                    </small>
                </div>
            )}

        </div>

        )}

         <button type="submit"
                 disabled={disabled}
                 className={`gossip-submit-btn ${disabled? "disabled" : ""}`}>

             {loading ? (<>
                 <span> Creating account...</span>
                 <span className="gossip-submit-spinner"> </span>

             </> ) : (<>
                 <span>Create account</span>
                 <ArrowRight size={19} />
             </>  )}

         </button>


        </> );
}