import React, { useRef, useState } from "react";
import Label from "./Label";
import Input from "./Input";
import Button from "./Button";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID ?? "",
        import.meta.env.VITE_TEMPLATE_ID ?? "",
        form.current!,
        {
          publicKey: import.meta.env.VITE_USER_ID ?? "",
        }
      )
      .then(
        () => {
          setSuccess(true);
          setLoading(false);
        },
        (error) => {
          console.log(error.text);
          setLoading(false);
        }
      );
  };
  return (
    <>
      <motion.h2
        className="text-3xl md:text-4xl mb-8 font-bold text-center text-cyan-400 tracking-tight md:tracking-wider"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        Contact Me
      </motion.h2>
      <motion.div
        className="max-w-lg mx-auto w-full flex flex-col items-center justify-center p-0 md:p-0"
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <form ref={form} onSubmit={sendEmail} className="space-y-7 w-full">
          <div>
            <Label
              htmlFor="name"
              className="mb-1 text-xs font-bold uppercase tracking-widest text-cyan-700 dark:text-cyan-200"
            >
              Name
            </Label>
            <Input
              required
              name="from_name"
              className="mt-2 w-full px-4 py-3 rounded-xl bg-cyan-50 dark:bg-cyan-900 focus:ring-2 focus:ring-cyan-400 focus:outline-none text-base font-medium transition border-0 shadow-none text-cyan-900 dark:text-cyan-100 placeholder:text-cyan-400 dark:placeholder:text-cyan-600"
            />
          </div>
          <div>
            <Label
              htmlFor="email"
              className="mb-1 text-xs font-bold uppercase tracking-widest text-cyan-700 dark:text-cyan-200"
            >
              Email
            </Label>
            <Input
              required
              name="from_email"
              type="email"
              className="mt-2 w-full px-4 py-3 rounded-xl bg-cyan-50 dark:bg-cyan-900 focus:ring-2 focus:ring-cyan-400 focus:outline-none text-base font-medium transition border-0 shadow-none text-cyan-900 dark:text-cyan-100 placeholder:text-cyan-400 dark:placeholder:text-cyan-600"
            />
          </div>
          <div>
            <Label
              htmlFor="message"
              className="mb-1 text-xs font-bold uppercase tracking-widest text-cyan-700 dark:text-cyan-200"
            >
              Message
            </Label>
            <Input
              required
              name="message"
              type="textarea"
              className="mt-2 w-full px-4 py-3 min-h-[120px] rounded-xl bg-cyan-50 dark:bg-cyan-900 focus:ring-2 focus:ring-cyan-400 focus:outline-none text-base font-medium transition border-0 shadow-none resize-none text-cyan-900 dark:text-cyan-100 placeholder:text-cyan-400 dark:placeholder:text-cyan-600"
            />
          </div>
          <Button className="w-full py-3 rounded-xl font-bold text-base bg-gradient-to-r from-cyan-400 via-blue-500 to-teal-400 hover:from-cyan-500 hover:to-blue-600 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed tracking-widest uppercase">
            {loading ? "Sending..." : success ? "Sent!" : "Send"}
          </Button>
          {success && (
            <div className="text-green-600 text-center font-semibold mt-2 animate-pulse">
              Thank you! Your message has been sent.
            </div>
          )}
        </form>
      </motion.div>
    </>
  );
};

export default Contact;
