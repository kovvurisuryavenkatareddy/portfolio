import React, { useRef, useState } from "react";

const Contact = () => {
  const [errors, setErrors] = useState({});
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  const validate = ({ name, email, message }) => {
    const nextErrors = {};
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName) nextErrors.name = "Please enter your name.";
    if (!trimmedEmail) {
      nextErrors.email = "Please enter your email.";
    } else {
      // Basic, practical email format validation (can't verify mailbox exists without a backend).
      const emailFormatOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);
      if (!emailFormatOk) nextErrors.email = "Please enter a valid email address.";
    }
    if (!trimmedMessage) nextErrors.message = "Please enter your message.";

    return nextErrors;
  };

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    const formData = new FormData(form);
    const values = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      e.preventDefault();
      if (nextErrors.name) nameRef.current?.focus();
      else if (nextErrors.email) emailRef.current?.focus();
      else messageRef.current?.focus();
    }
  };

  return (
    <div
      name="contact"
      className="w-full py-24 p-4 text-white"
    >
      <div className="flex flex-col p-4 max-w-screen-lg mx-auto">
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 border-slate-500/60">
            Contact
          </p>
          <p className="py-6 text-slate-300">Submit the form below to get in touch with me</p>
        </div>
        <div className="flex justify-center items-center">
          <form
            action="https://getform.io/f/b2ec1b0f-780e-4c43-8c47-1f0699c68ee8"
            method="POST"
            className="flex flex-col w-full md:w-1/2"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              ref={nameRef}
              required
              className="p-3 bg-white/5 border border-white/10 rounded-md text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
            />
            {errors.name ? (
              <p className="mt-2 text-sm text-red-300">{errors.name}</p>
            ) : null}
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              ref={emailRef}
              required
              className="mt-4 p-3 bg-white/5 border border-white/10 rounded-md text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
            />
            {errors.email ? (
              <p className="mt-2 text-sm text-red-300">{errors.email}</p>
            ) : null}
            <textarea
              name="message"
              placeholder="Enter your message"
              rows="10"
              ref={messageRef}
              required
              className="mt-4 p-3 bg-white/5 border border-white/10 rounded-md text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
            ></textarea>
            {errors.message ? (
              <p className="mt-2 text-sm text-red-300">{errors.message}</p>
            ) : null}

            <button className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 my-8 mx-auto flex items-center rounded-md hover:scale-110 duration-300">
              Let's Talk
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;