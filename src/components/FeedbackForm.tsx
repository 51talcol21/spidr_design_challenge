import React, { useState, useRef, useEffect } from 'react';

interface FormData {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    airFryerGuess: string;
    spidrPin: string;
}

const FeedbackForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        airFryerGuess: '',
        spidrPin: '',
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [submitted, setSubmitted] = useState(false);
    const [formHeight, setFormHeight] = useState<number | null>(null);
    const [showForm, setShowForm] = useState(false);

    const pinInputRef = useRef<HTMLInputElement>(null);
    const formContentRef = useRef<HTMLDivElement>(null);

    // Animate it slightly just to showcase :)
    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowForm(true);
        }, 50); // Delay a tiny bit to ensure transition kicks in

        return () => clearTimeout(timeout);
        }, 
    []);

    const labelBase: string = "block text-sm font-medium text-spidr-white mb-1";
    const inputBase: string = "w-full border border-gray-300 px-4 py-3 focus:ring-indigo-500 focus:border-indigo-500 text-spidr-white";

    // Yea I used AI for this regex, but that seems fair.
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex: RegExp = /^\d{3}-\d{3}-\d{4}$/;
    const pinRegex: RegExp = /^\d{4}-\d{4}-\d{4}-\d{4}$/;

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Invalid email format.';
        }

        if (!phoneRegex.test(formData.phone)) {
            newErrors.phone = 'Phone number must be in the format 123-456-7890.';
        }

        if (!pinRegex.test(formatPin(formData.spidrPin))) {
            newErrors.spidrPin = 'PIN must be in the format ####-####-####-####.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const formatPhone = (value: string) => {
        // Take each phone number as typed
        // Slice from each phone number grouping by index (0-3, 3-6, 6-9)
        // And add the 'dash-' to showcase it.
        const numbers = value.replace(/\D/g, '').slice(0, 10);
        const parts: string[] = [];
        if (numbers.length > 3) {
            parts.push(numbers.slice(0, 3));
        if (numbers.length > 6) {
            parts.push(numbers.slice(3, 6));
            parts.push(numbers.slice(6));
        } else {
            parts.push(numbers.slice(3));
        }
        } else {
            parts.push(numbers);
        }
        return parts.join('-');
    };

    const formatPin = (value: string) => {
        const digitsOnly: string = value.replace(/\D/g, '').slice(0, 16);
        const parts: string[] = [];
        for (let i = 0; i < digitsOnly.length; i += 4) {
            parts.push(digitsOnly.slice(i, i + 4));
        }
        return parts.join('-');
    };

    const maskPin = (formattedPin: string) => {
        // Mask the pin (hide all but last digit)
        const digits: string = formattedPin.replace(/-/g, '');
        if (digits.length === 0) return '####-####-####-####';

        let maskedDigits: string = digits.split('')
            .map((d, i) => (i === digits.length - 1 ? d : '#'))
            .join('');

        let masked: string = '';
        let digitIndex: number = 0;
        for (let i: number = 0; i < formattedPin.length; i++) {
            if (formattedPin[i] === '-') {
                masked += '-';
            } else {
                masked += maskedDigits[digitIndex] || '';
                digitIndex++;
            }
        }
        return masked;
    };

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === 'phone') {
            const formattedPhone: string = formatPhone(value);
            setFormData(prev => ({ ...prev, phone: formattedPhone }));
        } else if (name === 'spidrPin') {
            const rawDigits: string = value.replace(/\D/g, '').slice(0, 16);
            setFormData(prev => ({ ...prev, spidrPin: rawDigits }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    
        if (!validate()) return;
    
        // This is to keep the height the same after submitting the form (make it not look as janky on submit);
        if (formContentRef.current) {
            setFormHeight(formContentRef.current.offsetHeight);
        }
    
        // Submit to the console as requested
        console.log('Submitted data:', formData);
        setSubmitted(true);
    };

    return (
        <div
            className={`max-w-xl mx-auto shadow-lg space-y-6 text-start transform transition-all duration-700 ease-out ${
            showForm ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ fontFamily: 'Raleway, sans-serif' }}
        >
        <form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto bg-spidr-blue/75 shadow-lg p-10 text-start"
        >
        <h2 className="text-4xl font-thin text-spidr-white mb-6 underline-after text-center"> Be The First To Know </h2>

        <div
            ref={formContentRef}
            style={formHeight ? { height: `${formHeight}px` } : {}}
            className="transition-all duration-300 overflow-hidden space-y-6"
        >
        { submitted ? (
            <div className="text-center text-white py-10">
                <h2 className="text-2xl font-semibold underline-after">Thanks for your interest!</h2>
                <p className="mt-4 text-lg text-white/80">
                We'll let you know when the sizzle starts!
                </p>
            </div>
        ) : (
        <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className={labelBase}>First Name</label>
                <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className={inputBase} />
            </div>
            <div>
                <label className={labelBase}>Last Name</label>
                <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className={inputBase} />
            </div>
        </div>
        <div>
            <label className={labelBase}>Phone Number</label>
            <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="123-456-7890"
                className={inputBase} />
            {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
            </div>
            <div>
                <label className={labelBase}>Email Address</label>
                <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className={inputBase} />
                {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
            </div>
            <div>
                <label className={labelBase}>
                    Guess the air fryer’s cost ($)
                </label>
                <input
                    type="number"
                    name="airFryerGuess"
                    required
                    value={formData.airFryerGuess}
                    onChange={handleChange}
                    placeholder="Cost in USD"
                    min={0}
                    step="0.01"
                    className={inputBase} />
            </div>
            <div>
                <label className={labelBase}>
                    Spidr PIN (####-####-####-####)
                </label>

                <div
                    className="relative w-full border border-gray-300 px-4 py-3 focus:ring-indigo-500 focus:border-indigo-500"
                    onClick={() => pinInputRef.current?.focus()}
                >
                    <input
                        ref={pinInputRef}
                        type="text"
                        inputMode="numeric"
                        autoComplete="off"
                        maxLength={19}
                        name="spidrPin"
                        required
                        value={formatPin(formData.spidrPin)}
                        onChange={handleChange}
                        spellCheck={false}
                        className="w-full bg-transparent text-transparent caret-spidr-white font-mono tracking-widest outline-none" />

                    <div
                        aria-hidden="true"
                        className="pointer-events-none select-none absolute inset-0 flex items-center font-mono tracking-widest text-spidr-white/50 p-4"
                    >
                        {maskPin(formatPin(formData.spidrPin))}
                    </div>
                </div>

                {errors.spidrPin && (
                    <p className="text-sm text-red-500 mt-1">{errors.spidrPin}</p>
                )}
            </div>
            <button
                type="submit"
                className="mt-4 w-fit border-white border-1 text-white py-3 font-medium hover:bg-spidr-gray/75 transition hover:border-spidr-blue hover:text-spidr-blue"
            >
                Submit
            </button>
            </>
        )}
    </div>
    </form>
    </div>
  );
};

export default FeedbackForm;