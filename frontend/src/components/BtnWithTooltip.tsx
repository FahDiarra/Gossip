import { useState, forwardRef} from "react";
import { useModalOpened } from "@/context/ModalOpenedContext";
import "@/styles/components/BtnWithTooltip.css";


interface ButtonWithTooltipProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  tooltip?: string;
  children?: React.ReactNode;
}

const ButtonWithTooltip = forwardRef<HTMLButtonElement, ButtonWithTooltipProps>(
  (
    {
      onClick,
      className,
      tooltip,
      children,
      ...props
    },
    ref
  ) => {

    const [hover, setHover] = useState(false);
    const { isModalOpen } = useModalOpened();

    const showTooltip = hover && !isModalOpen && tooltip;

    return (
      <button
        {...props}
        ref={ref}
        onClick={onClick}
        className={className}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ position: "relative" }}
      >
        {children}

        {showTooltip && (
          <span className="gp-btn-tooltip">
            {tooltip}
          </span>
        )}
      </button>
    );
  }
);

ButtonWithTooltip.displayName = "ButtonWithTooltip";

export default ButtonWithTooltip;