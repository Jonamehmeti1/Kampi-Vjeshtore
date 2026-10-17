import { GoogleAuth } from "google-auth-library";
import { ages, schedules, formText } from "../../../content/camp";
import { schoolsByLocation } from "../../../content/schools";

export const runtime = "nodejs";
const auth = new GoogleAuth({
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  ...(process.env.GOOGLE_SERVICE_ACCOUNT_JSON
    ? { credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON) }
    : {}),
});

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
    return Response.json({ error: "Invalid origin" }, { status: 403 });
  let data: Record<string, unknown>;
  try {
    if (Number(request.headers.get("content-length")) > 8192)
      return Response.json({ error: "Request too large" }, { status: 413 });
    const text = await request.text();
    if (text.length > 8192)
      return Response.json({ error: "Request too large" }, { status: 413 });
    data = JSON.parse(text);
    if (!data || typeof data !== "object" || Array.isArray(data)) throw new Error();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
  const field = (key: string, max: number) => {
    const value = data[key];
    return typeof value === "string" && value.trim().length <= max ? value.trim() : "";
  };
  const parent = field("parent_name", 100);
  const phone = field("phone", 40);
  const child = field("child_name", 100);
  const age = field("child_age", 2);
  const schedule = field("schedule", 40);
  const school = field("school", 150);
  const otherSchool = field("school_other", 150);
  const knownSchools = Object.values(schoolsByLocation).flat();
  if (
    !parent ||
    !child ||
    !/^[+\d\s().-]{6,40}$/.test(phone) ||
    phone.replace(/\D/g, "").length < 6 ||
    !ages.some((value) => String(value) === age) ||
    !schedules.includes(schedule) ||
    !(school === formText.otherSchool ? !!otherSchool : knownSchools.includes(school))
  )
    return Response.json({ error: "Invalid registration" }, { status: 400 });
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!sheetId)
    return Response.json({ error: "Registration unavailable" }, { status: 503 });
  const tab = (process.env.GOOGLE_SHEET_TAB || "Registrations").replace(/'/g, "''");
  const range = encodeURIComponent("'" + tab + "'!A:J");
  try {
    const client = await auth.getClient();
    await client.request({
      url:
        "https://sheets.googleapis.com/v4/spreadsheets/" +
        encodeURIComponent(sheetId) +
        "/values/" +
        range +
        ":append?valueInputOption=RAW&insertDataOption=INSERT_ROWS",
      method: "POST",
      timeout: 15000,
      retry: false,
      data: {
        values: [
          [
            new Date().toISOString(),
            parent,
            phone,
            child,
            age,
            schedule,
            school === formText.otherSchool ? otherSchool : school,
            "",
            "",
            "",
          ],
        ],
      },
    });
    return Response.json({ ok: true });
  } catch {
    console.error("Registration could not be saved to Google Sheets.");
    return Response.json({ error: "Registration unavailable" }, { status: 502 });
  }
}
