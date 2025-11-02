import React from 'react';

/**
 * Modal Component
 * 
 * A reusable modal dialog component that displays messages to users with different types
 * (success, error, info). The modal includes an overlay, close button, and click-outside
 * functionality for better user experience.
 * 
 * @component
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false);
 * 
 * <Modal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Success"
 *   message="Employee added successfully!"
 *   type="success"
 * />
 * ```
 */

interface ModalProps {
    /** Controls the visibility of the modal */
    isOpen: boolean;
    /** Callback function called when the modal should be closed */
    onClose: () => void;
    /** The title displayed in the modal header */
    title: string;
    /** The main message content displayed in the modal body */
    message: string;
    /** The type of modal which determines the icon color (success: green, error: red, info: blue) */
    type: 'success' | 'error' | 'info';
}

/**
 * Styled Components (with inline CSS)
 */

interface OverlayProps {
    isOpen: boolean;
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    children: React.ReactNode;
}

const Overlay: React.FC<OverlayProps> = ({ isOpen, onClick, children }) => {
    const style: React.CSSProperties = {
        position: 'fixed',
        inset: 0,
        display: isOpen ? 'flex' : 'none',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        zIndex: 999
    };

    return (
        <div style={style} onClick={onClick}>
            {children}
        </div>
    );
};

const ModalContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const style: React.CSSProperties = {
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '0.375rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1000
    };

    return <div style={style}>{children}</div>;
};

interface CloseButtonProps {
    onClick: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => {
    const style: React.CSSProperties = {
        position: 'absolute',
        top: 0,
        right: 0,
        cursor: 'pointer',
        color: 'black',
        padding: '0.5rem 1rem',
        borderRadius: '0.375rem',
        margin: '0 auto',
        background: 'none',
        border: 'none',
        fontSize: '1.25rem',
        fontWeight: 'bold'
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.style.opacity = '0.7';
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.style.opacity = '1';
    };

    return (
        <button
            style={style}
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            X
        </button>
    );
};

const TitleContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const style: React.CSSProperties = {
        fontSize: '1rem',
        textAlign: 'center',
        color: 'black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem'
    };

    return <span style={style}>{children}</span>;
};

const MessageContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const style: React.CSSProperties = {
        fontSize: '1rem',
        textAlign: 'center',
        color: 'black'
    };

    return <span style={style}>{children}</span>;
};

interface IconWrapperProps {
    type: 'success' | 'error' | 'info';
}

const IconWrapper: React.FC<IconWrapperProps> = ({ type }) => {
    const getIconColor = (): string => {
        switch (type) {
            case 'success':
                return '#22c55e'; // green-500
            case 'error':
                return '#ef4444'; // red-500
            case 'info':
                return '#3b82f6'; // blue-500
            default:
                return '#3b82f6';
        }
    };

    const style: React.CSSProperties = {
        width: '2.5rem',
        height: '2.5rem',
        color: getIconColor()
    };

    return (
        <svg viewBox="0 0 24 24" fill="currentColor" style={style}>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
        </svg>
    );
};

/**
 * Modal Component Implementation
 * 
 * Features:
 * - Fixed overlay with semi-transparent background
 * - Centered modal dialog with white background
 * - Close button in the top-right corner
 * - Click-outside-to-close functionality
 * - Type-based icon display (success, error, info)
 * - Responsive design with inline CSS
 * 
 * @param props - The Modal component props
 * @returns JSX.Element - The rendered modal component
 */
export default function Modal({ isOpen, onClose, title, message, type }: ModalProps) {
    /**
     * Handles clicks on the modal overlay (outside the modal content).
     * Closes the modal when clicking on the backdrop, but not when clicking
     * inside the modal content itself.
     * 
     * @param e - The mouse event from clicking on the overlay
     */
    const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    return (
        <Overlay isOpen={isOpen} onClick={handleClickOutside}>
            <ModalContent>
                <CloseButton onClick={onClose} />
                <TitleContainer>
                    <IconWrapper type={type} />
                    {title}
                </TitleContainer>
                <MessageContainer>{message}</MessageContainer>
            </ModalContent>
        </Overlay>
    );
}

