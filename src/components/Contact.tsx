import React, { useRef, useState } from "react";
import Label from "./Label";
import Input from "./Input";
import Button from "./Button";
import emailjs from "@emailjs/browser";

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
      <h2 className="text-3xl mb-8 font-bold text-center text-yellow-500">
        Contact Me
      </h2>
      <div className="text-start max-w-xl mx-auto">
        <form ref={form} onSubmit={sendEmail}>
          <div className="mb-4">
            <Label htmlFor="name" className="mb-2">
              Name
            </Label>
            <Input required name="from_name" />
          </div>
          <div className="mb-4">
            <Label htmlFor="email" className="mb-2">
              Email
            </Label>
            <Input required name="from_email" type="email" />
          </div>
          <div className="mb-8">
            <Label htmlFor="message" className="mb-2">
              Message
            </Label>
            <Input required name="message" type="textarea" />
          </div>
          <Button>{loading ? "Sending..." : success ? "Sent!" : "Send"}</Button>
        </form>
      </div>
    </>
  );
};

export default Contact;
