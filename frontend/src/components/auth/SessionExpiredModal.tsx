import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Clock3, ArrowRight, X } from "lucide-react";
import {useAuth} from "@/context/AuthContext.tsx";

const SessionExpiredModal = () => {
    const navigate = useNavigate();
    const { closeSessionExpiredModal } = useAuth();

    const modalRef = useRef<HTMLDivElement | null>(null);

    const handleLogin = (): void => {
        closeSessionExpiredModal();
        navigate("/signin");
    };

    useEffect(() => {
        const handlePointerDown = (e: PointerEvent): void => {
            const target = e.target as Node;

            if (modalRef.current?.contains(target)) {
                return;
            }

            closeSessionExpiredModal();
        };

        const handleKeyDown = (e: KeyboardEvent): void => {
            if (e.key === "Escape") {
                closeSessionExpiredModal();
            }
        };

        document.addEventListener("pointerdown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener(
                "pointerdown",
                handlePointerDown
            );

            document.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };
    }, [closeSessionExpiredModal]);

    return (
        <div className="session-modal-overlay">
            <div  ref={modalRef} className="session-modal"   >

                    <button
                        type="button"
                        className="session-modal-close-btn"
                        onClick={closeSessionExpiredModal}
                        aria-label="Close"    >
                        <X size={18} strokeWidth={2.2} />
                    </button>


                <div className="session-modal-icon">
                    <Clock3 size={30}  strokeWidth={2}  />
                </div>
                <h2>Session expired</h2>
                <p>
                    Your session has expired.
                    <br />
                    Please log in again to continue.
                </p>

                <button
                    type="button"
                    className="session-modal-button"
                    onClick={handleLogin}   >
                    <span>Log in</span>
                    <ArrowRight size={18}  strokeWidth={2.2}   />
                </button>

            </div>
        </div>
    );
};

export default SessionExpiredModal;