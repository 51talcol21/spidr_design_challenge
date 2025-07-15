# Spidr Air Fryer Interest Form

This is a simple Typescript in React app using Tailwind for styling that implements a custom interest form to be embedded at the bottom of Spidr Design’s fictional air fryer landing page.

---

## Features

- Collects the following user data:
  - First name
  - Last name
  - Phone number (with live formatting)
  - Email address (validated)
  - Guess the air fryer’s cost (allows decimal/pennies)
  - A very, very secret 16-digit Spidr PIN, formatted as `####-####-####-####`
- The PIN input masks all digits except the last entered digit while visually showing the dashes.
- Submit button prints the entered data to the browser console.
- Styled to match the Spidr Design brand identity and aesthetic as closely as possible using Tailwind CSS.
- Responsive and accessible design.

---

## Installation & Usage

1. Clone the repo  
2. Install dependencies with `npm install` or `yarn`  
3. Run the app locally with `npm start` or `yarn start`  
4. Embed this form component at the bottom of the existing landing page as needed.

---

## Technical Notes

- Built with React and TypeScript for type safety.
- Uses controlled components for all inputs.
- Custom input formatting and masking logic for phone number and Spidr PIN.
- Basic validation for email format, phone number, and PIN format.
- Tailwind CSS for styling consistent with https://spidr.design/
