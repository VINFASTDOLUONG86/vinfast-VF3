import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const SPREADSHEET_ID = "1jwSnBmHXJEWvqAI8AKEHnjUkV8ZDmCKiRjsrZW4N7-M";
const SHEET_NAME = "Trang tính1";

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

          const lovableKey = process.env.LOVABLE_API_KEY;
          const connKey = process.env.GOOGLE_SHEETS_API_KEY;
          if (!lovableKey || !connKey) {
            return new Response(JSON.stringify({ error: "Missing credentials" }), {
              status: 500,
              headers: { "Content-Type": "application/json", ...cors },
            });
          }

          // Build range with sheet name in single quotes. Encode the encoded
          // form, then restore the colon (Sheets API rejects %3A).
          const range = `'${SHEET_NAME}'!A:E`;
          const encodedRange = encodeURIComponent(range).replace(/%3A/g, ":");
          const url = `https://connector-gateway.lovable.dev/google_sheets/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodedRange}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

          const timestamp = new Date().toLocaleString("vi-VN", {
            timeZone: "Asia/Ho_Chi_Minh",
          });

          const res = await fetch(url, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${lovableKey}`,
              "X-Connection-Api-Key": connKey,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              values: [[timestamp, name, phone, need, source]],
            }),
          });

          if (!res.ok) {
            const text = await res.text();
            console.error("Sheets append failed:", res.status, text);
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
