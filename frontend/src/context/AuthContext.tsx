import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";

export interface UserProps {
    publicId: string;
    name: string;
    userName: string;
    email: string;
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
    login: (token: string, user: UserProps) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({
                                 children,
                             }: AuthProviderProps) => {

    const [token, setToken] = useState<string | null>(
        localStorage.getItem("token")
    );

    const [user, setUser] = useState<UserProps | null>(() => {
        const storedUser = localStorage.getItem("user");

        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = (newToken: string, newUser: UserProps): void => {
        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(newUser));

        setToken(newToken);
        setUser(newUser);
    };

    const logout = (): void => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                isAuthenticated: !!token,
                login,
                logout,
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