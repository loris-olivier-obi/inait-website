"use client";

import Form from "@/components/segments/block/Form";
import { PortableText, PortableTextBlock } from "next-sanity";
import { useState } from "react";

import styles from "./contactForm.module.css";

export default function ContactForm({
  title,
  emailAddress,
  phoneNumber,
  message,
  address,
}: {
  title: string;
  emailAddress: string;
  phoneNumber: string;
  message: PortableTextBlock;
  address: PortableTextBlock;
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitted(false);
    if (!email.trim() || !userMessage.trim()) {
      setError("Email and message are required.");
      return;
    }
    setSubmitted(true);
    setFirstName("");
    setLastName("");
    setEmail("");
    setUserMessage("");
  }

  return (
    <div className="relative w-full py-32 px-8 grid grid-cols-2 gap-8">
      {/* LEFT COLUMN */}
      <div className="relative w-full">
        <h3 className="font-dm-serif text-5xl! font-bold text-primary-8 mb-3">
          {title}
        </h3>
        {!message && (
          <div className={styles.content}>
            <PortableText value={message} />
          </div>
        )}
        <div className="text-xl! text-primary-8 font-gabarito py-3 border-y border-solid border-neutral-2 my-5">
          {emailAddress}
        </div>
        {!phoneNumber && <div>{phoneNumber}</div>}
        <div className={styles.content}>
          <PortableText value={address} />
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="relative w-full">
        <Form
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          email={email}
          setEmail={setEmail}
          message={userMessage}
          setMessage={setUserMessage}
          error={error}
          setError={setError}
          submitted={submitted}
          setSubmitted={setSubmitted}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
