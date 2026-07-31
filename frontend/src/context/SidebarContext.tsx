import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";


type SidebarContextType = {

    open: boolean;

    mobileOpen: boolean;

    toggleSidebar: () => void;

    openMobile: () => void;

    closeMobile: () => void;

};


const SidebarContext = createContext<SidebarContextType | null>(null);



export function SidebarProvider({
    children
}: {
    children: React.ReactNode
}) {


    const [open, setOpen] = useState<boolean>(() => {

        if(typeof window === "undefined"){

            return true;

        }


        const saved = localStorage.getItem(
            "gossip_sidebar"
        );


        return saved !== null
            ? JSON.parse(saved)
            : true;

    });



    const [mobileOpen, setMobileOpen] = useState(false);



    useEffect(() => {


        localStorage.setItem(
            "gossip_sidebar",
            JSON.stringify(open)
        );


    }, [open]);




    const toggleSidebar = () => {

        setOpen(prev => !prev);

    };


    const openMobile = () => {

        setMobileOpen(true);

    };


    const closeMobile = () => {

        setMobileOpen(false);

    };



    return (

        <SidebarContext.Provider

            value={{
                open,
                mobileOpen,
                toggleSidebar,
                openMobile,
                closeMobile
            }}

        >
            {children}

        </SidebarContext.Provider>

    );

}


export function useSidebar(){

    const context = useContext(
        SidebarContext
    );


    if(!context){

        throw new Error(
            "useSidebar must be used inside SidebarProvider"
        );

    }


    return context;

}