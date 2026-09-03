"use client";

import React, { useState } from "react";
import {
  Calendar,
  Mail,
  ArrowUpRight,
  Loader2,
  CheckCircle2,
  XCircle,
  ArrowRight,
} from "lucide-react";
import { FiLinkedin } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Contact() {
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const form = e.target;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
      honeypot: formData.get("honeypot"),
    };

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong");
      }

      setStatus("success");
      form.reset();

      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("error");

      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    }
  };

  return (
    <section className="mt-20" id="contact">
      <h2 className="mb-4 text-xs uppercase tracking-widest text-muted-foreground">
        Let's Connect
      </h2>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Left Side */}
        <div className="font-geist flex flex-col rounded-xl border border-border/50 bg-card/70 px-6 py-5 transition-all duration-200 hover:border-border hover:bg-accent/50">
          <div className="mb-4 sm:mb-5">
            <h3 className="mb-1.5 text-lg font-medium text-foreground">
              Get in Touch
            </h3>

            <p className="text-sm leading-[1.6] text-muted-foreground">
              Have an idea, project, or just want to connect? Choose your
              preferred way to reach me.
            </p>
          </div>

          <div className="space-y-3">
            {/* Email */}
            <a
              href="mailto:rejaaziz686@gmail.com"
              className="group flex items-center gap-3 rounded-lg border border-border/50 bg-background/50 px-4 py-2.5 transition-all duration-200 ease-out hover:border-border hover:bg-accent/50 sm:py-3"
            >
              <div className="text-muted-foreground transition-colors group-hover:text-foreground">
                <Mail className="size-4.5" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="mb-0.5 truncate text-xs text-foreground/80 sm:text-sm">
                  rejaaziz686@gmail.com
                </p>

                <p className="text-[10px] text-muted-foreground/60 sm:text-xs">
                  Email me directly
                </p>
              </div>

              <ArrowUpRight className="size-3.5 text-muted-foreground/50 transition-colors group-hover:text-muted-foreground" />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/aziz-reja-8b916a33a/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-lg border border-border/50 bg-background/50 px-4 py-2.5 transition-all duration-200 ease-out hover:border-border hover:bg-accent/50 sm:py-3"
            >
              <div className="text-muted-foreground transition-colors group-hover:text-foreground">
                <FiLinkedin className="size-4.5" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="mb-0.5 text-xs text-foreground/80 sm:text-sm">
                  Connect on LinkedIn
                </p>

                <p className="text-[10px] text-muted-foreground/60 sm:text-xs">
                  Let's connect professionally
                </p>
              </div>

              <ArrowUpRight className="size-3.5 text-muted-foreground/50 transition-colors group-hover:text-muted-foreground" />
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/AzizReja10"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-lg border border-border/50 bg-background/50 px-4 py-2.5 transition-all duration-200 ease-out hover:border-border hover:bg-accent/50 sm:py-3"
            >
              <div className="text-muted-foreground transition-colors group-hover:text-foreground">
                <svg
                  className="size-4.5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.087.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844a9.58 9.58 0 0 1 2.504.337c1.909-1.294 2.748-1.025 2.748-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .267.18.578.688.48A10.002 10.002 0 0 0 22 12c0-5.523-4.477-10-10-10Z" />
                </svg>
              </div>

              <div className="min-w-0 flex-1">
                <p className="mb-0.5 text-xs text-foreground/80 sm:text-sm">
                  GitHub
                </p>

                <p className="text-[10px] text-muted-foreground/60 sm:text-xs">
                  Check out my projects
                </p>
              </div>

              <ArrowUpRight className="size-3.5 text-muted-foreground/50 transition-colors group-hover:text-muted-foreground" />
            </a>
          </div>

          <div className="mt-auto border-t border-border/50 pt-4">
            <p className="text-[10px] text-muted-foreground/60">
              Jadavpur University • B.E. • 2024-2028
            </p>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="font-geist flex flex-col rounded-xl border border-border/50 bg-card/70 px-6 py-5 transition-all duration-200 hover:border-border hover:bg-accent/50">
          <div className="mb-4">
            <h3 className="mb-1.5 text-base font-medium text-foreground sm:text-lg">
              Send a Message
            </h3>

            <p className="text-sm leading-[1.6] text-muted-foreground">
              Have something in mind? Send me a message and I'll get back to
              you.
            </p>
          </div>

          <form
            className="flex flex-1 flex-col space-y-3"
            onSubmit={handleSubmit}
          >
            {/* Honeypot */}
            <input
              type="text"
              name="honeypot"
              style={{ display: "none" }}
              tabIndex="-1"
              autoComplete="off"
            />

            <Input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              disabled={status === "loading" || status === "success"}
            />

            <Input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              disabled={status === "loading" || status === "success"}
            />

            <Textarea
              name="message"
              placeholder="Your Message"
              rows={4}
              required
              disabled={status === "loading" || status === "success"}
              className="flex-1 resize-none"
            />

            <Button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="group w-full gap-2 py-5"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Sending...</span>
                </>
              ) : status === "success" ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span className="text-green-500">Message Sent!</span>
                </>
              ) : status === "error" ? (
                <>
                  <XCircle className="h-4 w-4 text-red-500" />
                  <span className="text-red-500">Failed to Send</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <ArrowRight
                    size={14}
                    className="transition-transform ease-out group-hover:translate-x-0.5"
                  />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}