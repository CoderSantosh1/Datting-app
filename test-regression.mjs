import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

const rootDir = process.cwd();

console.log("==========================================");
console.log("   VYBRO MOBILE APP - REGRESSION SUITE   ");
console.log("==========================================\n");

let passed = 0;
let failed = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`[PASS] ${testName}`);
    passed++;
  } else {
    console.error(`[FAIL] ${testName}`);
    failed++;
  }
}

// 1. File & Component Structure Tests
console.log("--- 1. File Structure & Component Check ---");
const routes = [
  "app/page.tsx",
  "app/live/page.tsx",
  "app/create/page.tsx",
  "app/messages/page.tsx",
  "app/profile/page.tsx",
  "app/layout.tsx",
  "app/components/layout/MobileHeader.tsx",
  "app/components/layout/BottomNav.tsx",
  "app/components/home/NearbyPeople.tsx",
  "app/components/home/ProfileCard.tsx",
  "app/components/home/LiveRooms.tsx",
  "public/manifest.json",
];

for (const rel of routes) {
  const fullPath = path.join(rootDir, rel);
  assert(fs.existsSync(fullPath), `File exists: ${rel}`);
}

// 2. Mobile App Layout & PWA Validation
console.log("\n--- 2. Mobile Layout & PWA Config Check ---");
const layoutContent = fs.readFileSync(path.join(rootDir, "app/layout.tsx"), "utf8");
assert(
  layoutContent.includes("max-w-md") && layoutContent.includes("MobileHeader") && layoutContent.includes("BottomNav"),
  "Layout contains centered mobile app frame (max-w-md), MobileHeader, and BottomNav"
);
assert(!layoutContent.includes("<Footer"), "Desktop website footer removed from mobile app");

const manifestContent = JSON.parse(
  fs.readFileSync(path.join(rootDir, "public/manifest.json"), "utf8")
);
assert(manifestContent.display === "standalone", "PWA display is standalone (Native App Mode)");
assert(manifestContent.orientation === "portrait", "PWA orientation is portrait (Mobile App)");

// 3. Next.js Production Build Output
console.log("\n--- 3. Production Build Artifacts Check ---");
const nextDir = path.join(rootDir, ".next");
assert(fs.existsSync(nextDir), ".next build directory exists");

// 4. Live Server HTTP Regression Tests
console.log("\n--- 4. Live Server Route Responses (HTTP 200) ---");
const testPort = 3099;
const serverProcess = spawn(
  "npx",
  ["next", "start", "-p", String(testPort)],
  { cwd: rootDir, stdio: "ignore", shell: true }
);

function fetchUrl(urlPath) {
  return new Promise((resolve, reject) => {
    http
      .get(`http://127.0.0.1:${testPort}${urlPath}`, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve({ statusCode: res.statusCode, body: data }));
      })
      .on("error", reject);
  });
}

async function runHttpTests() {
  // Wait for server to start
  console.log("Starting server on port", testPort, "...");
  let ready = false;
  for (let i = 0; i < 20; i++) {
    await new Promise((r) => setTimeout(r, 600));
    try {
      const res = await fetchUrl("/");
      if (res.statusCode === 200) {
        ready = true;
        break;
      }
    } catch {
      // wait
    }
  }

  assert(ready, "Next.js production server started successfully");

  const testEndpoints = [
    { path: "/", name: "Home (People Nearby Cards)" },
    { path: "/live", name: "Live Voice Rooms Page" },
    { path: "/create", name: "Create & Host Voice Room Page" },
    { path: "/messages", name: "Messages & Chat Page" },
    { path: "/profile", name: "User Mobile Profile & Settings" },
  ];

  for (const ep of testEndpoints) {
    try {
      const res = await fetchUrl(ep.path);
      assert(res.statusCode === 200, `Endpoint ${ep.path} (${ep.name}) returned HTTP 200 OK`);
    } catch (err) {
      assert(false, `Endpoint ${ep.path} request failed: ${err.message}`);
    }
  }

  // Cleanup server
  serverProcess.kill();
  console.log("\n==========================================");
  console.log(`  REGRESSION TEST SUMMARY: ${passed} Passed, ${failed} Failed`);
  console.log("==========================================");

  process.exit(failed > 0 ? 1 : 0);
}

runHttpTests();
