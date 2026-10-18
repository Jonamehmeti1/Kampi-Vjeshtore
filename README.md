# Kampi Vjeshtor

A Next.js + React + TypeScript website for the Young Engineers Prishtina autumn camp.

Edit camp details in `content/camp.ts`. The header and footer both use your Young Engineers logo at `public/images/logo.png`.

## Start the website

Open a terminal in this folder:

```sh
npm install
npm run dev
```

Visit http://localhost:3000. Save an edited file to update the local preview.

## Where to edit

| I want to change…                                                                     | File                                                         |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Titles, descriptions, dates, ages, activities, programs, contact details, form labels | `content/camp.ts`                                            |
| Schools shown for each location                                                       | `content/schools.ts`                                         |
| Chatbot messages and answers                                                          | `content/chatbot.ts`                                         |
| Order of the page sections                                                            | `app/page.tsx`                                               |
| Layout of one section                                                                 | Its file in `components/`                                    |
| Website colors                                                                        | `styles/palette.css`                                         |
| Fonts                                                                                 | `styles/base.css`                                            |
| Design of a section                                                                   | Its file in `styles/`                                        |
| Images and logos                                                                      | `public/images/`                                             |
| Page title and description                                                            | `camp.pageTitle` and `camp.description` in `content/camp.ts` |

## How the folders work

- **content/** contains the information shown to visitors. Start here for everyday edits.
- **components/** contains one readable React component for each section. A component is a function that returns the HTML-like layout called JSX.
- **styles/** contains the CSS that controls colors, sizes, spacing, and mobile layouts.
- **app/page.tsx** puts the components in order.
- **app/layout.tsx** wraps all pages and loads the styles.
- **public/images/** contains images used by the page.

The homepage reads in this order:

```text
Header
Hero (includes the three illustrated day cards)
Activities
Programs
Registration (includes the same RegistrationForm)
Footer
PageEffects (scroll animations and mobile Apply button)
Chatbot
```

## Example: change the camp dates

Open `content/camp.ts`, find `campFacts`, and edit:

```ts
dates: "28–30 Tetor",
```

Keep the quotes and comma. This updates both places on the page and the chatbot's dates answer.

To change an activity, find `activities` in the same file and edit its `title`, `description`, or `image`.

An image at `public/images/hero.png` is referenced in code as `"/images/hero.png"`.

## Forms and chatbot

Both registration forms submit to /api/registrations. The server validates fields and appends each registration to a private Google Sheet. Success appears only after Google confirms the write. The school dropdown uses content/schools.ts.

The chatbot runs locally with no API key or AI fees. Its answers and matching logic live in `content/chatbot.ts`, using shared camp facts, program details, schedules, and contacts from `content/camp.ts`. It recognizes Albanian accents, common spelling variations and small typos, answers multiple recognized topics, and remembers an age for simple program follow-ups. Unknown questions prompt clarification; it cannot check live availability or register a child.

## Code formatting and checks

```sh
npm run format
npm run format:check
npm run typecheck
npm run build
```

Run the formatter after editing to keep code indented and readable.

## Current status

Registration forms use Google Sheets when the server environment is configured. The chatbot is a local FAQ assistant. No paid AI service is configured.

## Website palette

Edit the shared colors in `styles/palette.css`:

| Color  | Hex       |
| ------ | --------- |
| Orange | `#FF4D00` |
| Gold   | `#F9A826` |
| Lime   | `#C5E83A` |
| Forest | `#206C55` |
| Cream  | `#FFF6E7` |

Orange marks actions, gold and lime highlight cards, forest anchors headings and panels, and cream supplies the backgrounds. Supporting shades keep text readable. Section layout stays in its named stylesheet.

The opening day-card text is in `content/hero-journey.ts`, and its layout is in `styles/hero-intro.module.css`. Illustration source details and the generation prompt are in `content/hero-artwork.md`.

## Google Sheets registrations

Copy .env.example to .env.local and set GOOGLE_SHEET_ID and GOOGLE_SHEET_TAB
to your spreadsheet ID and exact tab name. Set GOOGLE_APPLICATION_CREDENTIALS
to the absolute path of your service account JSON file outside the repository.
Share only the destination spreadsheet with the service account as an Editor.
Restart npm run dev after changing environment variables.

Use these headings in row 1, columns A through J:
Submitted at | Parent name | Phone | Child name | Age | Schedule | School | Contacted | Confirmed | Paid

Rows are appended using RAW values so input is stored as text rather than formulas.
Times are recorded in UTC. The final three columns are left blank for your team.
A submitted registration is a request; staff still confirm availability.

Run node scripts/check-sheets.mjs to verify credentials and the tab name without
reading or writing registration rows.

For deployment, configure GOOGLE_SHEET_ID, GOOGLE_SHEET_TAB, and the server-only
GOOGLE_SERVICE_ACCOUNT_JSON secret (the full credentials JSON) in your hosting
provider. Do not set a local GOOGLE_APPLICATION_CREDENTIALS path on the host.
Never use NEXT_PUBLIC_ for credentials or commit the downloaded JSON key.
The .env.local file is ignored by Git.

If a submission returns an uncertain network error, check the sheet before
retrying to avoid duplicates. This integration has no distributed rate limiter
or automatic seat/payment management.
