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

Both forms validate fields in the browser and show a clear demo response. They **do not send or store data or reserve places**. The school dropdown keeps the groups in content/schools.ts and is available immediately. There is no separate camp-location field or locations section. Choosing “Tjetër” shows a school-name field.

The chatbot uses preset answers in `content/chatbot.ts`. It is not connected to an AI API. A real AI integration should call a server endpoint and keep API keys on the server.

## Code formatting and checks

```sh
npm run format
npm run format:check
npm run typecheck
npm run build
```

Run the formatter after editing to keep code indented and readable.

## Current status

The registration forms and chatbot are demos. No registration backend, AI service, or deployment is configured.

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
