import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

// Load the same TypeScript used by the client, without starting Next or making requests.
function load(file, dependencies = {}) {
  const exports = {};
  const source = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText;
  vm.runInNewContext(source, {
    exports,
    require: (name) => {
      assert.ok(name in dependencies, `Unexpected dependency: ${name}`);
      return dependencies[name];
    },
  });
  return exports;
}
const camp = load("content/camp.ts");
const { getReply, chatbot } = load("content/chatbot.ts", { "./camp": camp });
const reply = (question, context) => getReply(question, context).text;
assert.ok(reply("Sa kushton dhe kur fillon?").includes(camp.campFacts.price));
assert.ok(reply("Sa kushton dhe kur fillon?").includes(camp.campFacts.dates));
assert.ok(reply("sa eshte cmimi").includes(camp.campFacts.price));
assert.ok(reply("sa eshte \u00e7mimi").includes(camp.campFacts.price));
assert.ok(reply("Orarii").includes(camp.schedules[0]));
assert.ok(reply("regjistrmi").includes("formularin"));
assert.ok(!reply("Regjistrimi").includes("demonstrues"));
assert.ok(reply("Ku mbahet?").includes(camp.footer.phone));
assert.equal(reply("Cfare ushqimi ofroni?"), chatbot.fallback);
assert.equal(reply("skulpture"), chatbot.fallback); // Do not match "kur" inside other words.
const agePrompt = getReply("Moshat");
assert.ok(agePrompt.context.awaitingAge);
const ageReply = getReply("8", agePrompt.context);
assert.ok(ageReply.text.includes("Bricks Challenge"));
assert.ok(reply("Cfare mesojne?", ageReply.context).includes("Bricks Challenge"));
for (const [age, name] of [
  [4, "Big Builders"],
  [6, "Big Builders"],
  [7, "Bricks Challenge"],
  [10, "Bricks Challenge"],
  [11, "Algo Play"],
  [15, "Algo Play"],
]) {
  assert.ok(reply(`${age} vjec`).includes(name));
}
assert.ok(reply("17 vjec").includes(camp.footer.phone));
assert.ok(reply("8 vjec dhe sa kushton?").includes(camp.campFacts.price));
assert.ok(reply("faleminderit").includes("naq"));
assert.ok(!reply("8 vjec").includes("?"));
console.log(
  "Chatbot checks passed: matching, accents, typos, multi-topic questions, age follow-ups, boundaries, and unknown facts.",
);
