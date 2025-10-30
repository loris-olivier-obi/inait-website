import React from "react";

export default function Form({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  message,
  setMessage,
  error,
  submitted,
  handleSubmit,
}: {
  firstName: string;
  setFirstName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  message: string;
  setMessage: (value: string) => void;
  error: string;
  submitted: boolean;
  handleSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
      {/* First/Last name row */}
      <div className="flex gap-4">
        <div className="flex-1 flex flex-col">
          <label
            className="text-xl text-primary-8 font-medium font-gabarito mb-1"
            htmlFor="firstName"
          >
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            placeholder="First name"
            className="border-b border-neutral-4 py-2"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="flex-1 flex flex-col">
          <label
            className="text-xl text-primary-8 font-medium font-gabarito mb-1"
            htmlFor="lastName"
          >
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            placeholder="Last name"
            className="border-b border-neutral-4 py-2"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>
      {/* Email row */}
      <div className="flex flex-col">
        <label
          className="text-xl text-primary-8 font-medium font-gabarito mb-1"
          htmlFor="email"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email *"
          className="border-b border-neutral-4 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {/* Message row */}
      <div className="flex flex-col">
        <label
          className="text-xl text-primary-8 font-medium font-gabarito mb-1"
          htmlFor="message"
        >
          Message
        </label>
        <textarea
          id="message"
          placeholder="Your message *"
          className="border border-neutral-2 p-6 min-h-[120px] max-h-72"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      {/* Error / Success messages */}
      {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
      {submitted && (
        <div className="text-green-700 text-sm mb-2">
          Thank you! Your message has been sent.
        </div>
      )}
      {/* Send button row */}
      <div>
        <button
          type="submit"
          className="bg-primary-8 text-white rounded px-6 py-2 font-semibold shadow hover:bg-primary-7 transition"
        >
          Send
        </button>
      </div>
    </form>
  );
}
