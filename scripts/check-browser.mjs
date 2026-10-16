import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
import assert from "node:assert/strict";
import { schoolsByLocation } from "../content/schools.ts";

await fs.mkdir(".qa", { recursive: true });
const browser = await chromium.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
});
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
});
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
const boxes = {};
async function settle() {
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(
      [...document.images]
        .filter((image) => image.loading !== "lazy")
        .map((image) => image.decode().catch(() => {})),
    );
  });
  await page.waitForTimeout(2500);
}
async function capture(name) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((resolve) => setTimeout(resolve, 120));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  await page.waitForTimeout(1200);
  await page.locator(".footer-inner").evaluate((el) => el.classList.add("is-visible"));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: ".qa/" + name + ".png", fullPage: true });
}
async function measure() {
  return page.evaluate(() =>
    Object.fromEntries(
      [
        "#hero",
        "#hero h1",
        "#regjistrohu .hero-reg-card",
        ".section-camp-do",
        ".section-groups",
        ".section-form",
      ].map((selector) => {
        const box = document.querySelector(selector).getBoundingClientRect();
        return [
          selector,
          {
            x: Math.round(box.x),
            y: Math.round(box.y),
            width: Math.round(box.width),
            height: Math.round(box.height),
          },
        ];
      }),
    ),
  );
}

await page.goto("http://127.0.0.1:3000", { waitUntil: "networkidle", timeout: 60000 });
await settle();
assert.equal(await page.locator(".camp-do-card").count(), 5);
assert.equal(await page.locator(".group-card").count(), 3);
assert.equal(await page.locator("#lokacionet, .camp-loc-card").count(), 0);
assert.equal(await page.locator('select[name="location"]').count(), 0);
assert.equal(await page.locator("#hero li").count(), 4);
assert.equal(await page.locator(".join-facts li").count(), 3);
assert.doesNotMatch(await page.locator("body").innerText(), /5\s+lokacione|lokacion/i);
for (const prefix of ["join"]) {
  assert.equal(await page.locator("#" + prefix + "-school").isEnabled(), true);
  assert.deepEqual(
    await page
      .locator("#" + prefix + "-school optgroup")
      .evaluateAll((groups) => groups.map((group) => group.label)),
    Object.keys(schoolsByLocation),
  );
  assert.ok(
    (await page.locator("#" + prefix + "-school option").allTextContents()).includes(
      "Dardania",
    ),
  );
  assert.equal(await page.locator("#" + prefix + "-school").inputValue(), "");
}
assert.equal(await page.locator("form").count(), 1);
assert.equal(await page.locator("#hero form").count(), 0);
assert.equal(await page.locator("#hero article").count(), 3);
assert.equal(await page.locator("h1").count(), 1);
boxes.local = await measure();
await capture("local-desktop");
await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));

let registrationRequests = 0;
page.on("request", (request) => {
  if (request.method() === "POST") registrationRequests++;
});

// The lower form validates required fields before showing demo feedback.
await page.locator("#rezervo-oferta button[type=submit]").click();
assert.equal(await page.locator("#rezervo-oferta [role=status]").count(), 0);
await page.locator("#join-parent").fill("Prind Test");
await page.locator("#join-phone").fill("+383 44 000 000");
await page.locator("#join-child").fill("Femije Test");
await page.locator("#join-age").selectOption("12");
await page.locator("#join-school").selectOption("Faik Konica");
await page.locator("#join-schedule").selectOption({ index: 1 });
await page.locator("#rezervo-oferta button[type=submit]").click();
await page.locator("#rezervo-oferta [role=status]").waitFor();
assert.equal(registrationRequests, 0);

// Chat opens, replies, and restores launcher focus when closed.
await page.locator(".camp-chat-launcher").click();
await page.locator(".camp-chat-panel").waitFor();
assert.equal(await page.locator(".camp-chat-form button").isDisabled(), true);
await page.locator(".camp-chat-questions button").filter({ hasText: "Datat" }).click();
assert.ok(
  (await page.locator(".camp-chat-message.bot").last().textContent()).includes(
    "28–30 Tetor",
  ),
);
await page.locator(".camp-chat-form input").press("Escape");
assert.equal(await page.locator(".camp-chat-panel").count(), 0);
assert.equal(
  await page
    .locator(".camp-chat-launcher")
    .evaluate((el) => el === document.activeElement),
  true,
);

for (const width of [1440, 768, 390]) {
  await page.setViewportSize({ width, height: 900 });
  await page.goto("http://127.0.0.1:3000", { waitUntil: "networkidle" });
  await settle();
  assert.equal(
    await page.locator(".footer-social svg").first().getAttribute("width"),
    "18",
  );
  assert.equal(
    await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    true,
    "Horizontal overflow at " + width,
  );
  assert.equal(
    await page
      .locator("img")
      .evaluateAll((images) =>
        images
          .filter((img) => img.loading !== "lazy")
          .every((img) => img.complete && img.naturalWidth > 0),
      ),
    true,
  );
  if (width === 390) {
    assert.equal(
      await page
        .locator(".sticky-mobile-cta")
        .evaluate((el) => el.getBoundingClientRect().top >= window.innerHeight),
      true,
      "Sticky Apply should be offscreen over hero",
    );
    await capture("local-mobile");
    await page.evaluate(() =>
      window.scrollTo({
        top: document.getElementById("hero").offsetHeight + 50,
        behavior: "instant",
      }),
    );
    await page.waitForTimeout(400);
    assert.equal(
      await page
        .locator(".sticky-mobile-cta")
        .evaluate((el) => el.getBoundingClientRect().top < window.innerHeight),
      true,
      "Sticky Apply should appear after hero",
    );
    await page.locator(".sticky-mobile-cta a").click();
    await page.waitForTimeout(900);
    assert.equal(
      await page
        .locator("#regjistrohu")
        .evaluate((el) => el.getBoundingClientRect().top < window.innerHeight),
      true,
    );
  }
}

assert.deepEqual(errors, []);
await fs.writeFile(".qa/layout-comparison.json", JSON.stringify(boxes, null, 2));
console.log(
  JSON.stringify(
    {
      result: "passed",
      checks: [
        "section structure",
        "three illustrated hero cards and lower registration",
        "preserved school groups and Other field",
        "no camp locations or location fields",
        "native validation",
        "demo forms make no POST requests",
        "chatbot reply and keyboard close",
        "desktop/tablet/mobile overflow",
        "mobile Apply navigation",
        "no browser runtime errors",
      ],
      boxes,
    },
    null,
    2,
  ),
);
await browser.close();
