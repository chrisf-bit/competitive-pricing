const fs=require("fs");
const t=fs.readFileSync("src/data/scenarios/silver-horizon-narrow-r2.ts","utf8");
const re=/id:\s*'([^']+)'[\s\S]*?playerDialogue:\s*\n\s*"((?:[^"\]|\.)*)"/g;
let m;
while((m=re.exec(t))){console.log(m[2].length, m[1]);}
