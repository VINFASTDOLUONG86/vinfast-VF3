import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

// Google Apps Script Web App URL
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxMT94f8l2hMXWTWFeUoHxGaVL5-9jjpWxVKqW80r9dwl9fRBnBR0tvkzmw9FK-Du2nvA/exec";

const LeadSchema = z.object({
  name: z.string().min(1).max(120),
  phone: z.string().min(6).max(30),
  need: z.string().max(120).optional().default(""),
  source: z.string().max(60).optional().default("landing"),
});

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const Route = createFileRoute("/api/public/lead")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: cors }),
      POST: async ({ request }) => {
        try {
          const json = await request.json();
          const parsed = LeadSchema.safeParse(json);
          if (!parsed.success) {
            return new Response(JSON.stringify({ error: "Invalid input" }), {
              status: 400,
              headers: { "Content-Type": "application/json", ...cors },
            });
          }
          const { name, phone, need, source } = parsed.data;

          // Forward to Google Apps Script
          const res = await fetch(APPS_SCRIPT_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, phone, need, source }),
          });

          if (!res.ok) {
            const text = await res.text();
            console.error("Apps Script failed:", res.status, text);
            return new Response(JSON.stringify({ error: "Sheet write failed" }), {
              status: 502,
              headers: { "Content-Type": "application/json", ...cors },
            });
          }

          return new Response(JSON.stringify({ ok: true }), {
            status: 200,
            headers: { "Content-Type": "application/json", ...cors },
          });
        } catch (err) {
          console.error("Lead handler error:", err);
          return new Response(JSON.stringify({ error: "Server error" }), {
            status: 500,
            headers: { "Content-Type": "application/json", ...cors },
          });
        }
      },
    },
  },
});
