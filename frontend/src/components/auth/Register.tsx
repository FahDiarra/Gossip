


import {
    Eye,
    EyeOff,
    Mail,
    Lock,
    ArrowRight,
    CircleCheck,
    CircleX,
} from "lucide-react";

import {useState,useMemo} from "react";
import apiPublic from "@/api/api.public.ts";
import i18n from "@/i18n/langConfig";
import { useTranslation } from "react-i18next";

import * as React from "react";

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
    loading: boolean;
    unknowError:boolean;
    setForm: React.Dispatch<React.SetStateAction<RegisterForm>>;
    stayConnected:boolean;
    setStayConnected: React.Dispatch<React.SetStateAction<boolean>>;
}
interface UsernameSuggestionsResponse {
    exists: boolean;
    suggestions: string[];
}

interface oldValuesProps{
    oldUserName: string;
    oldEmail: string;
}


export function Register({
                             name,
                             userName,
                             newEmail,
                             newPassword,
                             loading,
                             unknowError,
                             setForm,
                             stayConnected,
                             setStayConnected,
                         }: RegisterProps): React.JSX.Element {

    const {t} = useTranslation();

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [passwordConfirm, setPasswordConfirm] = useState<string>("");
    const [passwordFocused, setPasswordFocused] = useState<boolean>(false);

    const [userNameFocused, setUserNameFocused] = useState<boolean>(false);
    const [userNameValid, setUserNameValid] = useState<boolean | null>(null);
    const [userNameSuggestion, setUserNameSuggestion] = useState<string[]>([]);
    const [userNameLengthError, setUserNameLengthError] = useState<boolean>(false);
    const [suggestionsLoading, setSuggestionsLoading] = useState<boolean>(false);


    const [nameFocused, setNameFocused] = useState<boolean>(false);
    const [checkEmailLoading, setCheckEmailLoading] = useState<boolean>(false);
    const [emailValid, setEmailValid] = useState<boolean | null>(null);
    const [emailErrorFormat, setEmailErrorFormat] = useState<boolean>(false);


    const [birthdayDay, setBirthdayDay] = useState<string>("");
    const [birthdayMonth, setBirthdayMonth] = useState<string>("");
    const [birthdayYear, setBirthdayYear] = useState<string>("");

    const [birthdayDayTouched, setBirthdayDayTouched] = useState<boolean>(false);
    const [birthdayMonthTouched, setBirthdayMonthTouched] = useState<boolean>(false);
    const [birthdayYearTouched, setBirthdayYearTouched] = useState<boolean>(false);

    const today: Date = new Date();
    const maxBirthdayYear: number = today.getFullYear() - 10;
    const minBirthdayYear: number = today.getFullYear() - 100;


    const birthdayYears: number[] = Array.from(
        {length: maxBirthdayYear - minBirthdayYear + 1},
        (_, index: number) => maxBirthdayYear - index
    );

    const birthdayDays: number[] = Array.from(
        {length: 31},
        (_, index: number) => index + 1
    );

    interface BirthdayMonth {
        value: string;
        label: string;
    }

    const birthdayMonths: BirthdayMonth[] = Array.from(
        {length: 12},
        (_, index: number) => {
            const date: Date = new Date(2000, index, 1);

            return {
                value: String(index + 1).padStart(2, "0"),
                label: new Intl.DateTimeFormat(
                    i18n.resolvedLanguage || "en",
                    {month: "long"}
                ).format(date)
            };
        }
    );


    const isValidBirthday = (day: string, month: string, year: string): boolean => {
        if (!day || !month || !year) {
            return false;
        }

        const date: Date = new Date(
            Number(year),
            Number(month) - 1,
            Number(day)
        );

        return (
            date.getFullYear() === Number(year) &&
            date.getMonth() === Number(month) - 1 &&
            date.getDate() === Number(day)
        );
    };


    const getBirthdayClass = (
        value: string,
        touched: boolean
    ): string => {
        if (!touched) {
            return "";
        }

        return value ? "birthday-valid" : "birthday-invalid";
    };


    const [oldValues, setOldValues] = useState<oldValuesProps>({
        oldUserName: "",
        oldEmail: "",
    });

    const emailRegex = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;

    const passwordValid: boolean =
        newPassword.length >= 8 &&
        /[A-Z]/.test(newPassword) &&
        /[0-9]/.test(newPassword) &&
        /[^A-Za-z0-9]/.test(newPassword);

    const passwordProgress = useMemo(() => {
        const requirements: boolean[] = [
            newPassword.length >= 8,
            /[A-Z]/.test(newPassword),
            /[0-9]/.test(newPassword),
            /[^A-Za-z0-9]/.test(newPassword),
        ];

        const completed: number = requirements.filter(Boolean).length;
        return {
            completed,
            percentage: (completed / requirements.length) * 100,
        };
    }, [newPassword]);


    const passwordsMatch: boolean =
        passwordConfirm.length > 0 &&
        newPassword === passwordConfirm;

    const onBlurPassword = (): void => {
        if (passwordValid || newPassword.length === 0) {
            setPasswordFocused(false);
        }
    };


    const onBlurUsername = (): void => {
        setUserNameFocused(false);
        if (userName === "") {
            return;
        }


        if (userName.length < 4) {
            setUserNameLengthError(true)
            return;
        }
        setUserNameLengthError(false);

        if (
            userNameSuggestion.length > 0 &&
            userNameSuggestion.includes(userName)
        ) {
            return;
        }

        handleUsernameBlur();
    };


    const handleUsernameBlur = async (): Promise<void> => {
        setSuggestionsLoading(true);

        setOldValues((prev) => ({
            ...prev,
            oldUserName: userName,
        }))

        try {

            const response =
                await apiPublic.get<UsernameSuggestionsResponse>(
                    "/auth/username-suggestions",
                    {
                        params: {userName}
                    }
                );

            const data = response.data;

            if (data.exists) {
                setUserNameValid(false);
                setUserNameSuggestion(data.suggestions);
            } else {
                setUserNameValid(true);
                setUserNameSuggestion([]);
            }

        } catch (error) {
            console.error("Username verification failed:", error);
        } finally {
            setSuggestionsLoading(false);
        }
    };


    const addSuggestion = (suggestion: string): void => {
        const fieldName = "userName"
        let newValue = suggestion;
        if (newValue.length > 0 && !newValue.startsWith("@")) {
            newValue = `@${newValue}`;
        }

        setForm((prev) => ({
            ...prev,
            [fieldName]: newValue,
        }))
        setUserNameValid(true);
    }


    const emailOnBlur = (): void => {
        if (newEmail === "" || oldValues.oldEmail == newEmail) {
            return;
        }

        if (!emailRegex.test(newEmail)) {
            setEmailErrorFormat(true);
            return;
        }
        handleEmailBlur();
    }


    const handleEmailBlur = async (): Promise<void> => {
        setCheckEmailLoading(true);

        setOldValues((prev) => ({
            ...prev,
            oldEmail: newEmail,
        }))

        try {

            const response = await apiPublic.get<boolean>(
                "/auth/check-email",
                {
                    params: {
                        email: newEmail,
                    }
                }
            );

            if (response.data) {

                setEmailValid(false);
            } else {
                setEmailValid(true);
            }

        } catch (error) {
            console.error("Email verification failed:", error);
        } finally {
            setCheckEmailLoading(false);
        }
    };


    const handleChangeInputRegister = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        let newValue = value;
        if (name === "userName") {
            newValue = value
                .replace(/[^a-zA-Z0-9_@]/g, "")
                .replace(/(?!^)@/g, "");

            if (newValue.length > 0 && !newValue.startsWith("@")) {
                newValue = `@${newValue}`;
            }
            if (newValue.length >= 4) {
                setUserNameLengthError(false);
            }


        }
        if (name === "newEmail") {

            if (newValue !== oldValues.oldEmail) {
                setEmailValid(null);
            }
            if (emailRegex.test(newValue)) {
                setEmailErrorFormat(false);

            }

        }

        setForm((prev) => ({
            ...prev,
            [name]: newValue,
        }));


    };


    const handleBirthdayChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ): void => {
        const { name, value } = e.target;
         const fieldName = "birthday";
        let newDay: string = birthdayDay;
        let newMonth: string = birthdayMonth;
        let newYear: string = birthdayYear;

        if (name === "birthdayDay") {
            newDay = value;
            setBirthdayDay(value);
        } else if (name === "birthdayMonth") {
            newMonth = value;
            setBirthdayMonth(value);
        } else if (name === "birthdayYear") {
            newYear = value;
            setBirthdayYear(value);
        }

        if (isValidBirthday(newDay, newMonth, newYear)) {
            const birthdayComplete: string =
                `${newYear}-${newMonth.padStart(2, "0")}-${newDay.padStart(2, "0")}`;

            setForm((prev) => ({
                ...prev,
                [fieldName]: birthdayComplete,
            }));
            console.log("birthday", birthdayComplete);
        } else {
            setForm((prev) => ({
                ...prev,
                [fieldName]: "",
            }));
        }
    };


    const disabled: boolean = loading || !userNameValid || !passwordsMatch || name === "" || newEmail === "";


    return (<>

        <div className="gossip-field">
            <label htmlFor="name">Name:</label>
            <div className="gossip-input">
                <input id="name" name="name" type="text" placeholder="Your name"
                       value={name}
                       onChange={handleChangeInputRegister}
                       maxLength={50}
                       autoComplete="off" required
                       onFocus={(): void => setNameFocused(true)}
                       onBlur={(): void => setNameFocused(false)}

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
                       onChange={handleChangeInputRegister}
                       maxLength={31}
                       required
                       onFocus={(): void => setUserNameFocused(true)}
                       onBlur={onBlurUsername}/>


                {suggestionsLoading ? (
                    <span className="gossip-input-spinner"></span>
                ) : userNameValid === true ? (
                    <CircleCheck size="18" className="gp-input-valid" strokeWidth={2}/>
                ) : userNameValid === false ? (
                    <CircleX size="18" className="gp-input-invalid" strokeWidth={2}/>
                ) : null}

            </div>


            {userNameLengthError && (
                <div className="errorInput">
                    <small>Username must be between 3–30 characters.</small>
                </div>
            )}

            {userNameFocused && (<>
                <div className="instructionInput">
                    <small>Username must be between 3–30 characters.</small>
                    <small> Letters and numbers only, no spaces.</small>
                </div>
            </>)}

            {userNameValid === false && (<>

                <div className="errorInput">
                    <small>This username is already in use</small>
                </div>

                <div className="instructionInput">
                    <small>Suggestions:</small>
                    <ul>
                        {userNameSuggestion.map((suggestion, index) => {
                            const suggestionActive: boolean = userName === suggestion;
                            return (
                                <li key={index}>
                                    <button type="button" className={`${suggestionActive ? "suggestionBtnActive" : ""}`}
                                            onClick={() => addSuggestion(suggestion)}>
                                        {suggestion}
                                    </button>
                                </li>
                            )
                        })}

                    </ul>
                </div>
            </>)}

            <div className="gossip-field">
                <label>Birthday:</label>
                <div className="gossip-birthday">
                    <select name="birthdayDay"
                            className={getBirthdayClass(birthdayDay, birthdayDayTouched)}
                            value={birthdayDay}
                            onChange={handleBirthdayChange}
                            onBlur={() => setBirthdayDayTouched(true)}
                            required>
                        <option value="">Day</option>
                        {birthdayDays.map((day: number) => (
                            <option key={day} value={day}>
                                {day}
                            </option>
                        ))}
                    </select>
                    <select name="birthdayMonth"
                            className={getBirthdayClass(birthdayMonth, birthdayMonthTouched)}
                            value={birthdayMonth}
                            onChange={handleBirthdayChange}
                            onBlur={() => setBirthdayMonthTouched(true)}
                            required>
                        <option value="">Month</option>
                        {birthdayMonths.map((month: BirthdayMonth) => (
                            <option key={month.value} value={month.value}>
                                {month.label}
                            </option>
                        ))}
                    </select>
                    <select name="birthdayYear"
                            className={getBirthdayClass(birthdayYear, birthdayYearTouched)}
                            value={birthdayYear}
                            onChange={handleBirthdayChange}
                            onBlur={() => setBirthdayYearTouched(true)}
                            required>
                        <option value="">Year</option>
                        {birthdayYears.map((year: number) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>

                </div>
            </div>


        </div>

        <div className="gossip-field">
            <label htmlFor="newEmail">Email:</label>
            <div className="gossip-input">
                <Mail size={19}/>
                <input id="newEmail" type="email" name="newEmail" placeholder="you@example.com"
                       value={newEmail}
                       maxLength={254}
                       onChange={handleChangeInputRegister}
                       autoComplete="email"
                       onBlur={emailOnBlur}
                       required/>

                {checkEmailLoading ? (
                    <span className="gossip-input-spinner"></span>
                ) : emailValid === true ? (
                    <CircleCheck size="18" className="gp-input-valid" strokeWidth={2}/>
                ) : emailValid === false ? (
                    <CircleX size="18" className="gp-input-invalid" strokeWidth={2}/>
                ) : null}
            </div>

            {emailErrorFormat && (
                <div className="errorInput">
                    <small>Please enter a valid email address.</small>
                </div>
            )}

            {emailValid === false && (
                <div className="errorInput">
                    <small>This Email is already in use</small>
                </div>

            )}


        </div>


        <div className="gossip-field">
            <div className="gossip-password-label">
                <label htmlFor="newPassword">Password:</label>
            </div>

            <div className="gossip-input">
                <Lock size={19}/>
                <input id="newPassword" name="newPassword"
                       type={
                           showPassword
                               ? "text"
                               : "password"
                       }
                       placeholder="Enter your password"
                       value={newPassword}
                       maxLength={64}
                       onChange={handleChangeInputRegister}
                       autoComplete="new-password" required
                       onFocus={() => setPasswordFocused(true)}
                       onBlur={onBlurPassword}
                />

                <button
                    type="button"
                    className="gossip-password-toggle"
                    onClick={(): void =>
                        setShowPassword((prev: boolean): boolean => !prev)
                    }
                    aria-label={
                        showPassword
                            ? "Hide password"
                            : "Show password"
                    }>
                    {showPassword ? <EyeOff size={19}/> : <Eye size={19}/>}

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

        {passwordValid && (


            <div className="gossip-field">
                <div className="gossip-password-label">
                    <label htmlFor="newPasswordConfirm">Confirm Password:</label>
                </div>

                <div className="gossip-input">
                    <Lock size={19}/>
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

                           required/>

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
                        }>

                        {showPassword ? <EyeOff size={19}/> : <Eye size={19}/>}

                    </button>
                    {passwordsMatch ? (
                        <CircleCheck size="18" className="gp-input-valid" strokeWidth={2}/>
                    ) : (
                        <CircleX size="18" className="gp-input-invalid" strokeWidth={2}/>
                    )}

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


        <label className="stay-connected">
            <span>Stay connected on this device</span>

            <input name="stay-connected"
                   type="checkbox"
                   checked={stayConnected}
                   onChange={(e):void => setStayConnected(e.target.checked)}
            />

            <span className="ios-switch"></span>
        </label>


        {unknowError && (
            <div className="errorInput">
                <small>Something went wrong. Check your network and try again.</small>
            </div>
        )}


        <button type="submit"
                disabled={disabled}
                className={`gossip-submit-btn ${disabled ? "disabled" : ""}`}>

            {loading ? (<>
                <span> Creating account...</span>
                <span className="gossip-submit-spinner"> </span>

            </>) : (<>
                <span>Create account</span>
                <ArrowRight size={19}/>
            </>)}

        </button>


    </>);
}