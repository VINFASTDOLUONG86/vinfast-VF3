import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

// ─────────────────────────────────────────────────────────────────────────────
// Google Apps Script Web App endpoint (GET-based — doPost is unreliable on GAS)
// ─────────────────────────────────────────────────────────────────────────────
const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwS-r72BUvO6l9ao-PAohBQNpSBnpBRdonV0fXnBw_hjFRvi9EiNvRPLt2uXeoyF9aOlw/exec";

const LeadSchema = z.object({
  name: z.string().min(1).max(120),
  phone: z.string().min(6).max(30),
  need: z.string().max(120).optional().default(""),
  source: z.string().max(60).optional().default("landing"),
});

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// ── helpers ──────────────────────────────────────────────────────────────────

function toStringValue(v: FormDataEntryValue | null | undefined): string {
  return typeof v === "string" ? v : "";
}

/**
 * Parse the request body regardless of Content-Type.
 * Supports: application/json, multipart/form-data, application/x-www-form-urlencoded, text/*
 */
async function readPayload(request: Request): Promise<Record<string, unknown>> {
  const contentType = (request.headers.get("content-type") || "").toLowerCase();

  console.log("[lead] Content-Type:", contentType);

  // JSON body
  if (contentType.includes("application/json")) {
    const body = await request.json();
    console.log("[lead] Parsed JSON body:", body);
    return body as Record<string, unknown>;
  }

  // Form-based bodies
  if (
    contentType.includes("multipart/form-data") ||
    contentType.includes("application/x-www-form-urlencoded")
  ) {
    const form = await request.formData();
    const data = {
      name: toStringValue(form.get("name")),
      phone: toStringValue(form.get("phone")),
      need: toStringValue(form.get("need")),
      source: toStringValue(form.get("source")),
    };
    console.log("[lead] Parsed form body:", data);
    return data;
  }

  // Fallback: try to read as text and parse as JSON
  const text = await request.text();
  console.log("[lead] Raw text body:", text);
  try {
    return JSON.parse(text);
  } catch {
    return {};
  }
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}

// ── route ────────────────────────────────────────────────────────────────────

export const Route = createFileRoute("/api/public/lead")({
  server: {
    handlers: {
      OPTIONS: () =>
        new Response(null, {
          status: 204,
          headers: CORS_HEADERS,
        }),

      POST: async ({ request }) => {
        const reqId = Math.random().toString(36).slice(2, 8);
        console.log(`[lead ${reqId}] ── POST /api/public/lead ──`);
        console.log(`[lead ${reqId}] URL:`, request.url);
        console.log(`[lead ${reqId}] Headers:`, Object.fromEntries(request.headers.entries()));

        // ── STEP 1: Parse body ──────────────────────────────────────────────
        let raw: Record<string, unknown>;
        try {
          raw = await readPayload(request);
          console.log(`[lead ${reqId}] Payload after parse:`, raw);
        } catch (err) {
          const msg = err instanceof Error ? err.stack || err.message : String(err);
          console.error(`[lead ${reqId}] BODY PARSE ERROR:`, msg);
          return json({ ok: false, stage: "api", error: `Body parse failed: ${msg}` }, 400);
        }

        // ── STEP 2: Validate ────────────────────────────────────────────────
        const parsed = LeadSchema.safeParse(raw);
        if (!parsed.success) {
          console.warn(`[lead ${reqId}] Validation failed:`, parsed.error.flatten());
          return json(
            { ok: false, stage: "validation", error: "Invalid input", issues: parsed.error.flatten() },
            400,
          );
        }

        const { name, phone, need, source } = parsed.data;
        console.log(`[lead ${reqId}] Validated:`, { name, phone, need, source });

        // ── STEP 3: Forward to Google Apps Script ──────────────────────────
        const params = new URLSearchParams({ name, phone, need, source });
        const gasUrl = `${APPS_SCRIPT_URL}?${params.toString()}`;
        console.log(`[lead ${reqId}] GAS URL:`, gasUrl);

        try {
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 15_000);

          const res = await fetch(gasUrl, {
            method: "GET",
            redirect: "follow",
            cache: "no-store",
            signal: controller.signal,
          });

          clearTimeout(timeout);

          const body = await res.text();
          console.log(`[lead ${reqId}] GAS status:`, res.status);
          console.log(`[lead ${reqId}] GAS body:`, body);

          if (!res.ok) {
            console.error(`[lead ${reqId}] GAS returned non-OK`);
            return json(
              { ok: false, stage: "gas", error: `GAS returned HTTP ${res.status}`, gasBody: body },
              502,
            );
          }

          console.log(`[lead ${reqId}] ✓ Success`);
          return json({ ok: true, stage: "done", gasBody: body });
        } catch (err) {
          const msg = err instanceof Error ? err.stack || err.message : String(err);
          console.error(`[lead ${reqId}] FETCH ERROR:`, msg);
          return json({ ok: false, stage: "gas", error: `Fetch to GAS failed: ${msg}` }, 502);
        }
      },
    },
  },
});
