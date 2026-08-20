import {
    createContext,
    useContext,
    useState,
    type ReactNode,
    useEffect,
    useRef,
} from "react";
import { jwtDecode } from "jwt-decode";
import apiPublic from "@/api/api.public.ts";
import apiPrivate from "@/api/api.private.ts";
export interface UserProps {
    publicId: string;
    name: string;
    userName: string;
    email: string;
    createdAt: string;

    profilePhoto: string | null;
    coverPhoto: string | null;
    bio: string | null;
}

interface JwtPayload {
    exp: number;
}


export interface RegisterResponseProps {
    success: boolean;
    message: string;
    token: string;
    user: UserProps;
}

interface AuthContextProps {
    token: string | null;
    user: UserProps | null;
    isAuthenticated: boolean;

    sessionExpired: boolean;
    login: (token: string, user: UserProps) => void;
    logout: () => void;
    refreshAccessToken: () => Promise<boolean>;
    closeSessionExpiredModal: () => void;
    updateUser: (updatedUser: UserProps) => void;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({
                                 children,
                             }: AuthProviderProps) => {

    const [sessionExpired, setSessionExpired] = useState(false);

    const [token, setToken] = useState<string | null>(
        localStorage.getItem("token")
    );


    const [user, setUser] = useState<UserProps | null>(() => {
        const storedUser = localStorage.getItem("user");
        try {
            return storedUser ? JSON.parse(storedUser) : null;
        } catch {
            return null;
        }
    });

    const expirationTimer = useRef<number | null>(null);


    const updateUser = (updatedUser: UserProps): void => {
        localStorage.setItem(
            "user",
            JSON.stringify(updatedUser)
        );
        setUser(updatedUser);
    };



    const refreshUser = async (): Promise<void> => {
        try {
            const response = await apiPrivate.get<UserProps>(
                "/profile/me"
            );
            updateUser(response.data);
        } catch (error) {
            console.error(
                "Failed to refresh user:",
                error
            );
        }
    };


    const login = (
        newToken: string,
        newUser: UserProps
    ): void => {
        localStorage.setItem("token", newToken);
        updateUser(newUser);
        setToken(newToken);
        setSessionExpired(false);
    };


    const logout = async (): Promise<void> => {
        try {
            const response = await apiPublic.post("/auth/logout", {});

            if (response.status === 204) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");

                setToken(null);
                setUser(null);
            }

            console.log(response);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const isTokenExpired = (token: string): boolean => {

        try {
            const decoded = jwtDecode<JwtPayload>(token);

            if (!decoded.exp) {
                return true;
             }

            return decoded.exp * 1000 <= Date.now();

        } catch {
            return true;
        }
    };


    const refreshAccessToken = async (): Promise<boolean> => {
        try {
            const response =await apiPublic.post("/auth/refresh", {});

            const data: RegisterResponseProps = response.data;

            login(data.token, data.user);
            console.log(data)

            return true;
        } catch (error) {
            console.error("REFRESH FAILED:", error);
            return false;
        }
    };


    const handleTokenExpiration = async () => {

        const stayConnected:boolean =
            localStorage.getItem("stayConnected") === "true";
        console.log("TOKEN EXPIRED");
        console.log("stayConnected:", stayConnected);
        if (stayConnected) {
            const refreshed:boolean = await refreshAccessToken();
            if (refreshed) {
                return;
            }
        }
        await logout();
        setSessionExpired(true);
    };

    const closeSessionExpiredModal = (): void => {
        setSessionExpired(false);
    };

    const setupExpirationTimer = (currentToken: string):void => {
        if (expirationTimer.current) {
            window.clearTimeout(expirationTimer.current);
        }
        try {
            const decoded = jwtDecode<JwtPayload>(currentToken);

            if (!decoded.exp) {
                handleTokenExpiration();
                return;
            }
            const expirationTime =
                decoded.exp * 1000;

            const delay =
                expirationTime - Date.now();

            if (delay <= 0) {
                handleTokenExpiration();
                return;
            }

            expirationTimer.current =
                window.setTimeout(() => {
                    handleTokenExpiration();
                }, delay);

        } catch {
            handleTokenExpiration();
        }
    };



    useEffect(() => {
        if (!token) {
            return;
        }
        if (isTokenExpired(token)) {
            handleTokenExpiration();
            return;
        }
        setupExpirationTimer(token);
        return () => {
            if (expirationTimer.current) {
                window.clearTimeout(
                    expirationTimer.current
                );
            }
        };
    }, [handleTokenExpiration, setupExpirationTimer, token]);


    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                isAuthenticated: !!token,
                sessionExpired,
                login,
                logout,
                refreshAccessToken,
                closeSessionExpiredModal,
                updateUser,
                refreshUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = (): AuthContextProps => {

    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside an AuthProvider"
        );
    }

    return context;
};

export class updateUser {
}