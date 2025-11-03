import React, { useEffect, useRef, useId } from 'react';

/**
 * Modal Component
 *
 * A reusable modal dialog component that displays messages to users with different types
 * (success, error, info). The modal includes an overlay, close button, and click-outside
 * functionality for better user experience. Fully accessible with ARIA attributes,
 * keyboard navigation, and focus management.
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
        <div
            style={style}
            onClick={onClick}
            tabIndex={-1}
        >
            {children}
        </div>
    );
};

interface ModalContentProps {
    children: React.ReactNode;
    role?: string;
    ariaLabelledBy?: string;
    ariaDescribedBy?: string;
    ariaModal?: boolean;
    onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}

const ModalContent = React.forwardRef<HTMLDivElement, ModalContentProps>(
    ({ children, role, ariaLabelledBy, ariaDescribedBy, ariaModal, onKeyDown }, ref) => {
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
            zIndex: 1000,
            outline: 'none'
        };

        return (
            <div
                ref={ref}
                style={style}
                role={role}
                aria-labelledby={ariaLabelledBy}
                aria-describedby={ariaDescribedBy}
                aria-modal={ariaModal}
                onKeyDown={onKeyDown}
                tabIndex={-1}
            >
                {children}
            </div>
        );
    }
);

ModalContent.displayName = 'ModalContent';

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
            aria-label="Fermer la modale"
        >
            <span aria-hidden="true">X</span>
        </button>
    );
};

interface TitleContainerProps {
    children: React.ReactNode;
    id?: string;
}

const TitleContainer: React.FC<TitleContainerProps> = ({ children, id }) => {
    const style: React.CSSProperties = {
        fontSize: '1rem',
        textAlign: 'center',
        color: 'black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem'
    };

    return <span id={id} style={style}>{children}</span>;
};

interface MessageContainerProps {
    children: React.ReactNode;
    id?: string;
}

const MessageContainer: React.FC<MessageContainerProps> = ({ children, id }) => {
    const style: React.CSSProperties = {
        fontSize: '1rem',
        textAlign: 'center',
        color: 'black'
    };

    return <span id={id} style={style}>{children}</span>;
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
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            style={style}
            aria-hidden="true"
            role="img"
        >
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
 * - Full accessibility support (ARIA attributes, keyboard navigation, focus management)
 * - Focus trap to keep focus within the modal
 * - ESC key support to close the modal
 * - Automatic focus restoration when modal closes
 *
 * Accessibility Features:
 * - ARIA roles (dialog/alertdialog)
 * - aria-labelledby and aria-describedby for screen readers
 * - Keyboard navigation (Tab, Shift+Tab, Escape)
 * - Focus trap to prevent focus from leaving the modal
 * - Focus restoration to the previously focused element
 * - Proper semantic HTML structure
 *
 * @param props - The Modal component props
 * @returns JSX.Element - The rendered modal component or null if not open
 */
export default function Modal({ isOpen, onClose, title, message, type }: ModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const previousActiveElementRef = useRef<HTMLElement | null>(null);
    const titleId = useId();
    const messageId = useId();

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
    };

    /**
     * Handles keyboard events, specifically ESC key to close the modal
     * and manages focus trap within the modal.
     *
     * @param e - The keyboard event
     */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Escape') {
            onClose();
        }
    };

    /**
     * Manages focus when modal opens/closes
     * - Saves the previously focused element when modal opens
     * - Focuses the modal content when it opens
     * - Restores focus to the previous element when modal closes
     */
    useEffect(() => {
        if (isOpen) {
            // Sauvegarder l'élément actuellement focusé
            previousActiveElementRef.current = document.activeElement as HTMLElement;

            // Focuser le contenu de la modale après un court délai pour s'assurer qu'elle est rendue
            const timeoutId = setTimeout(() => {
                if (modalRef.current) {
                    modalRef.current.focus();
                }
            }, 0);

            return () => clearTimeout(timeoutId);
        } else {
            // Restaurer le focus sur l'élément précédent quand la modale se ferme
            if (previousActiveElementRef.current) {
                previousActiveElementRef.current.focus();
            }
        }
    }, [isOpen]);

    /**
     * Implémente le focus trap : empêche le focus de sortir de la modale
     */
    useEffect(() => {
        if (!isOpen) return;

        const handleTabKey = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') return;

            if (!modalRef.current) return;

            const focusableElements = modalRef.current.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );

            const firstElement = focusableElements[0] as HTMLElement;
            const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

            if (e.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement?.focus();
                }
            } else {
                // Tab
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement?.focus();
                }
            }
        };

        document.addEventListener('keydown', handleTabKey);
        return () => document.removeEventListener('keydown', handleTabKey);
    }, [isOpen]);

    /**
     * Détermine le rôle ARIA approprié selon le type de modale
     */
    const getRole = (): 'dialog' | 'alertdialog' => {
        // Pour les erreurs, utiliser alertdialog pour attirer l'attention
        return type === 'error' ? 'alertdialog' : 'dialog';
    };

    if (!isOpen) {
        return null;
    }

    return (
        <Overlay isOpen={isOpen} onClick={handleClickOutside}>
            <ModalContent
                ref={modalRef}
                role={getRole()}
                ariaLabelledBy={titleId}
                ariaDescribedBy={messageId}
                ariaModal={true}
                onKeyDown={handleKeyDown}
            >
                <CloseButton onClick={onClose} />
                <TitleContainer id={titleId}>
                    <IconWrapper type={type} />
                    {title}
                </TitleContainer>
                <MessageContainer id={messageId}>{message}</MessageContainer>
            </ModalContent>
        </Overlay>
    );
}

