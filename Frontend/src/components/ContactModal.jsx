import { useState } from "react";
import { X } from "lucide-react";

const C = {
  navy: "#0B2043",
  gold: "#C99A4A",
  sub: "#5B6472",
};

export default function ContactModal({ open, onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("idle");

  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();

    setStatus("sending");

    // Frontend-only for now.
    // This will later be connected to the real contact backend.
    setTimeout(() => {
      setStatus("sent");
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-5"
      style={{
        background: "rgba(11,32,67,0.65)",
      }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE */}
        <button
          type="button"
          className="absolute right-4 top-4 text-[#5B6472] transition-colors hover:text-[#0B2043]"
          onClick={onClose}
          aria-label="Close contact form"
        >
          <X size={20} />
        </button>

        {/* HEADING */}
        <p
          className="mb-3 text-xs font-bold uppercase tracking-[0.2em]"
          style={{ color: C.gold }}
        >
          Contact Us
        </p>

        <h2
          className="text-2xl font-bold"
          style={{ color: C.navy }}
        >
          Let's Work Together
        </h2>

        <p
          className="mb-6 mt-2 text-sm leading-6"
          style={{ color: C.sub }}
        >
          Send us a message and our team will get back to you shortly.
        </p>

        {status === "sent" ? (
          <div className="py-5">
            <p
              className="font-semibold"
              style={{ color: C.navy }}
            >
              Thank you. Your message has been received.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="mt-6 px-6 py-3 text-xs font-bold uppercase tracking-widest"
              style={{
                background: C.gold,
                color: C.navy,
              }}
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label
                htmlFor="contact-name"
                className="mb-1.5 block text-xs font-semibold"
                style={{ color: C.navy }}
              >
                Name
              </label>

              <input
                id="contact-name"
                required
                type="text"
                placeholder="Your name"
                className="w-full border border-[#E4E8EE] px-4 py-3 text-sm outline-none focus:border-[#C99A4A]"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="mb-1.5 block text-xs font-semibold"
                style={{ color: C.navy }}
              >
                Email
              </label>

              <input
                id="contact-email"
                required
                type="email"
                placeholder="Email address"
                className="w-full border border-[#E4E8EE] px-4 py-3 text-sm outline-none focus:border-[#C99A4A]"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="mb-1.5 block text-xs font-semibold"
                style={{ color: C.navy }}
              >
                Message
              </label>

              <textarea
                id="contact-message"
                required
                rows={5}
                placeholder="How can we help?"
                className="w-full resize-none border border-[#E4E8EE] px-4 py-3 text-sm outline-none focus:border-[#C99A4A]"
                value={form.message}
                onChange={(e) =>
                  setForm({
                    ...form,
                    message: e.target.value,
                  })
                }
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full px-6 py-3 text-xs font-bold uppercase tracking-widest transition-opacity hover:opacity-90 disabled:opacity-60"
              style={{
                background: C.gold,
                color: C.navy,
              }}
            >
              {status === "sending"
                ? "Sending..."
                : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}