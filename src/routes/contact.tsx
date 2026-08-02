import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Github, Instagram, Mail } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Vector & Valency" },
      {
        name: "description",
        content:
          "Contact channels for Vector & Valency are coming soon — email, Instagram and GitHub.",
      },
      { property: "og:title", content: "Contact — Vector & Valency" },
      { property: "og:description", content: "Our contact channels are coming soon." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

const channels = [
  { icon: Mail, label: "Email", value: "Coming Soon" },
  { icon: Instagram, label: "Instagram", value: "Coming Soon" },
  { icon: Github, label: "GitHub", value: "Coming Soon" },
];

function Contact() {
  return (
    <div className="aurora">
      <div className="mx-auto max-w-3xl px-5 pt-16 text-center">
        <h1 className="text-4xl font-bold sm:text-5xl">
          <span className="neon-text">Contact</span>
        </h1>
        <p className="mt-4 text-base text-muted-foreground">
          We're setting up our channels. Everything below goes live in the next update.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {channels.map(({ icon: Icon, label, value }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass flex flex-col items-center rounded-2xl p-7"
            >
              <Icon className="h-6 w-6 text-primary" />
              <p className="mt-4 text-sm font-semibold text-foreground">{label}</p>
              <p className="mt-1 text-xs text-muted-foreground">{value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
