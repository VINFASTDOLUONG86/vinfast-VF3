import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzzkBXcoHA9fJOhAqF_lDMRsipP08TDI2NdDL2z41bCrGPgBGoYXKfgIugR7wx-LHtDRg/exec";

const LeadSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(1),
  need: z.string().optional().default(""),
  source: z.string().optional().default("website"),
});

export const Route = createFileRoute("/api/public/lead")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();

          const parsed = LeadSchema.safeParse(body);

          if (!parsed.success) {
            return Response.json(
              { ok: false, error: "Invalid input" },
              { status: 400 }
            );
          }

          const params = new URLSearchParams({
            name: parsed.data.name,
            phone: parsed.data.phone,
            need: parsed.data.need,
            source: parsed.data.source,
          });

          const gasUrl = `${APPS_SCRIPT_URL}?${params.toString()}`;

          console.log("Sending to GAS:", gasUrl);

          const response = await fetch(gasUrl);

          const text = await response.text();

          console.log("GAS Response:", text);

          return Response.json({
            ok: true,
            gasResponse: text,
          });
        } catch (error) {
          console.error(error);

          return Response.json(
            {
              ok: false,
              error: String(error),
            },
            {
              status: 500,
            }
          );
        }
      },
    },
  },
});