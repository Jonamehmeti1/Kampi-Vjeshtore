import { GoogleAuth } from "google-auth-library";
import nextEnv from "@next/env";
nextEnv.loadEnvConfig(process.cwd());
try {
  const auth = new GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    ...(process.env.GOOGLE_SERVICE_ACCOUNT_JSON
      ? { credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON) }
      : {}),
  });
  const client = await auth.getClient();
  const result = await client.request({
    url:
      "https://sheets.googleapis.com/v4/spreadsheets/" +
      process.env.GOOGLE_SHEET_ID +
      "?fields=sheets.properties",
    timeout: 15000,
  });
  const tab = result.data.sheets.find(
    (sheet) =>
      sheet.properties.title === (process.env.GOOGLE_SHEET_TAB || "Registrations"),
  );
  if (!tab)
    throw new Error(
      "Expected tab missing. Available tabs: " +
        result.data.sheets.map((sheet) => sheet.properties.title).join(", "),
    );
  console.log(
    "Google Sheets connection OK. Registrations tab found. No rows were read or written.",
  );
} catch (error) {
  console.error(
    "Google Sheets check failed:",
    error.response?.status || "",
    error.response?.data?.error?.message || error.message,
  );
  process.exitCode = 1;
}
