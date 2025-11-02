# Modal Component

A reusable modal dialog component that displays messages to users with different types (success, error, info). The modal includes an overlay, close button, and click-outside functionality for better user experience.

## Overview

The Modal component is a flexible dialog component built with React and inline CSS. It provides a clean, centered dialog that appears over the main content with a semi-transparent overlay. The component supports different visual types to convey different message categories to users.

## Dependencies

- **React**: React library for building the component (v19.1.1 or higher)

The component uses only React and does not require any external styling libraries. All styles are implemented using inline CSS.

```bash
npm install react react-dom
# or
yarn add react react-dom
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isOpen` | `boolean` | Yes | Controls the visibility of the modal |
| `onClose` | `() => void` | Yes | Callback function called when the modal should be closed |
| `title` | `string` | Yes | The title displayed in the modal header |
| `message` | `string` | Yes | The main message content displayed in the modal body |
| `type` | `'success' \| 'error' \| 'info'` | Yes | The type of modal which determines the icon color |

## Types

The modal supports three types, each with a distinct color scheme:

- **`success`**: Green icon (`#22c55e`) - Use for successful operations or confirmations
- **`error`**: Red icon (`#ef4444`) - Use for error messages or failed operations
- **`info`**: Blue icon (`#3b82f6`) - Use for informational messages or general notifications

## Usage

### Basic Example

```tsx
import { useState } from 'react';
import Modal from './components/modal';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Success"
        message="Employee added successfully!"
        type="success"
      />
    </>
  );
}
```

### Success Modal

```tsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Success"
  message="Your changes have been saved successfully."
  type="success"
/>
```

### Error Modal

```tsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Error"
  message="An error occurred while processing your request."
  type="error"
/>
```

### Info Modal

```tsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Information"
  message="Please review your information before submitting."
  type="info"
/>
```

## Features

### 1. Fixed Overlay
- Semi-transparent black background (`rgba(0, 0, 0, 0.4)`)
- Covers the entire viewport
- High z-index (999) to appear above other content

### 2. Centered Modal Dialog
- White background with rounded corners
- Centered both vertically and horizontally
- Responsive padding and spacing

### 3. Close Button
- Positioned in the top-right corner
- Click to close the modal
- Hover effect for better UX

### 4. Click-Outside-to-Close
- Click on the overlay (outside the modal content) to close
- Clicking inside the modal content does not close it
- Provides intuitive user interaction

### 5. Type-Based Icon Display
- Automatically displays an icon based on the `type` prop
- Icon color matches the modal type (green, red, or blue)
- Icon is displayed alongside the title

## Component Structure

The Modal component is composed of several sub-components, each handling a specific part of the UI:

- **Overlay**: Fixed positioning with semi-transparent background, handles click-outside events
- **ModalContent**: White background container with rounded corners and centered layout
- **CloseButton**: Positioned absolutely in top-right corner with hover effects
- **TitleContainer**: Flex layout container for displaying the icon and title together
- **MessageContainer**: Container for the modal message text
- **IconWrapper**: SVG icon component with dynamic color based on modal type

## Styling

The component uses inline CSS (React inline styles) for all styling. This approach:

- Eliminates external dependencies (no CSS-in-JS libraries required)
- Keeps styles scoped to the component
- Provides better performance without runtime style processing
- Maintains type safety with TypeScript

The modal includes:

- **Overlay**: Fixed positioning with semi-transparent background (`rgba(0, 0, 0, 0.4)`)
- **Modal Content**: White background, rounded corners (`0.375rem`), centered layout with flexbox
- **Close Button**: Absolute positioning in top-right, hover opacity effect
- **Title Container**: Flex layout with icon and text alignment, gap spacing
- **Message Container**: Centered text display
- **Icon**: SVG icon with dynamic color based on type (success: green, error: red, info: blue)

All styling is contained within the component and does not require external CSS files or additional styling dependencies.

## Accessibility Considerations

- The modal uses semantic HTML elements
- The close button is keyboard accessible
- Consider adding ARIA attributes (`aria-labelledby`, `aria-describedby`, `role="dialog"`) for screen readers
- Consider adding keyboard escape key handling for closing the modal

## Examples

### Form Submission Success

```tsx
const handleSubmit = async (data) => {
  try {
    await submitForm(data);
    setModalOpen(true);
    setModalType('success');
    setModalTitle('Success');
    setModalMessage('Form submitted successfully!');
  } catch (error) {
    setModalOpen(true);
    setModalType('error');
    setModalTitle('Error');
    setModalMessage('Failed to submit form. Please try again.');
  }
};

<Modal
  isOpen={modalOpen}
  onClose={() => setModalOpen(false)}
  title={modalTitle}
  message={modalMessage}
  type={modalType}
/>
```

### Conditional Modal Display

```tsx
const [showModal, setShowModal] = useState(false);
const [modalConfig, setModalConfig] = useState({
  title: '',
  message: '',
  type: 'info' as const
});

// Trigger modal with configuration
const showSuccessModal = () => {
  setModalConfig({
    title: 'Operation Complete',
    message: 'The operation completed successfully.',
    type: 'success'
  });
  setShowModal(true);
};

<Modal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  {...modalConfig}
/>
```

## Installation from GitHub Packages

This package is published to GitHub Packages. To install it:

1. Create a `.npmrc` file in your project root:
```
@sebastien-sq:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

2. Install the package:
```bash
npm install @sebastien-sq/react-simple-modal
```

3. Import and use in your code:
```tsx
import Modal from '@sebastien-sq/react-simple-modal';

// Use the component
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Success"
  message="Operation completed!"
  type="success"
/>
```

## File Location

```
modal.tsx
```

## Notes

- The modal uses `display: flex` with `display: none` when closed, ensuring it doesn't take up space when hidden
- The z-index values (999 for overlay, 1000 for content) ensure proper layering
- The click-outside functionality only triggers when clicking directly on the overlay, not on child elements
- The component uses TypeScript for type safety
- All styles are implemented using React inline styles (no external CSS or CSS-in-JS libraries)
- The component is composed of smaller sub-components (Overlay, ModalContent, CloseButton, TitleContainer, MessageContainer, IconWrapper) for better code organization and maintainability

