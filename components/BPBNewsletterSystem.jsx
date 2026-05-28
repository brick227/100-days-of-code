import { useState } from "react";

const TOPICS_INTERNAL = [
  "Governance & Council Updates", "R&D Division Progress", "Family Bank & Finance",
  "BPB Coin & Crypto Updates", "Leadership Academy", "Echo Pink Intelligence Ops",
  "Sacred Shelter Network / Foundation", "Falls Girl Cleaning Co. Operations",
  "Legal & Compliance Milestones", "Member Contributions & Ledger",
];

const TOPICS_EXTERNAL = [
  "Tech & AI Industry News", "Crypto & Blockchain Markets", "Social Media Strategy",
  "Veteran & Housing Policy", "Native American Affairs", "Black Business & Finance",
  "Drone & Aerospace News", "Cybersecurity Threats & Trends",
  "Grant & Nonprofit Funding News", "Real Estate & STR Market",
];

const CANVA_TEMPLATES = [
  { name: "BPB Internal Digest", style: "Navy header, gold accent, council seal", code: "TPL-INT-001" },
  { name: "Echo Pink Intelligence Brief", style: "Black background, hot pink accent, DM Mono font", code: "TPL-EXT-001" },
  { name: "BPB Flash Update", style: "Minimal, white + gold, urgent tone", code: "TPL-FLX-001" },
  { name: "R&D Weekly Signal", style: "Dark tech aesthetic, circuit pattern", code: "TPL-RND-001" },
];

const SCRIPT_TABS = {
  "Google Apps Script": `// ═══════════════════════════════════════════════════════════════
// BPB LEGACY — DAILY NEWSLETTER AUTOMATION
// Google Apps Script — runs daily via Time-based Trigger
// Deploy in: Google Apps Script (script.google.com)
// Trigger: Time-driven → Day timer → 6:00 AM daily
// ═══════════════════════════════════════════════════════════════

const CONFIG = {
  INTERNAL_RECIPIENTS: [
    "charles@bpblegacy.com",
    "lynn@bpblegacy.com",
    "casiyah@bpblegacy.com",
    "liessa@bpblegacy.com"
  ],
  NEWSLETTER_NAME_INTERNAL: "BPB Daily Intelligence Digest",
  NEWSLETTER_NAME_EXTERNAL: "Echo Pink Intelligence Brief",
  SENDER_NAME: "BPB Legacy Intelligence",
  LOG_SHEET_ID: "YOUR_GOOGLE_SHEET_ID_HERE", // replace with your Sheet ID
  CANVA_TEMPLATE_INT: "TPL-INT-001",
  CANVA_TEMPLATE_EXT: "TPL-EXT-001",
};

// ── MAIN ENTRY POINT ────────────────────────────────────────────
function sendDailyNewsletters() {
  const today = new Date();
  const dateStr = Utilities.formatDate(today, "America/Chicago", "EEEE, MMMM d, yyyy");

  try {
    const internalContent = buildInternalDigest(dateStr);
    sendInternalDigest(internalContent, dateStr);
    logSend("INTERNAL", dateStr, "SUCCESS");
  } catch(e) {
    logSend("INTERNAL", dateStr, "ERROR: " + e.message);
  }

  try {
    const externalContent = buildExternalBrief(dateStr);
    sendExternalBrief(externalContent, dateStr);
    logSend("EXTERNAL", dateStr, "SUCCESS");
  } catch(e) {
    logSend("EXTERNAL", dateStr, "ERROR: " + e.message);
  }
}

// ── INTERNAL DIGEST BUILDER ─────────────────────────────────────
function buildInternalDigest(dateStr) {
  // Pull from Google Drive — any new docs modified in the last 24 hours
  const recentFiles = getRecentDriveFiles();

  const html = \`
  <div style="font-family: Georgia, serif; max-width: 680px; margin: 0 auto; background: #ffffff;">
    <!-- HEADER -->
    <div style="background: #0A1628; padding: 32px 40px; text-align: center;">
      <div style="color: #D4AF37; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 8px;">
        CONFIDENTIAL — FAMILY COUNCIL USE ONLY
      </div>
      <div style="color: #ffffff; font-size: 28px; font-weight: bold; letter-spacing: 1px;">
        BPB LEGACY
      </div>
      <div style="color: #D4AF37; font-size: 14px; letter-spacing: 2px; margin-top: 4px;">
        DAILY INTELLIGENCE DIGEST
      </div>
      <div style="color: #888888; font-size: 12px; margin-top: 12px;">
        \${dateStr}
      </div>
    </div>

    <!-- GOLD DIVIDER -->
    <div style="height: 3px; background: #D4AF37;"></div>

    <!-- OPERATIONS SUMMARY -->
    <div style="padding: 28px 40px;">
      <div style="font-size: 11px; color: #D4AF37; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 16px;">
        ⬡ OPERATIONS STATUS
      </div>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 12px; border: 1px solid #e0e0e0; font-size: 13px; font-weight: bold; background: #f9f5e8; width: 40%;">Falls Girl Cleaning Co.</td>
          <td style="padding: 8px 12px; border: 1px solid #e0e0e0; font-size: 13px;">Website Deploy Status: Pending — GitHub repo 'fallsgirl' needed</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; border: 1px solid #e0e0e0; font-size: 13px; font-weight: bold; background: #f9f5e8;">BPB Coin (Div 3)</td>
          <td style="padding: 8px 12px; border: 1px solid #e0e0e0; font-size: 13px;">M2 — Multi-sig wallet setup pending</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; border: 1px solid #e0e0e0; font-size: 13px; font-weight: bold; background: #f9f5e8;">Leonard's House</td>
          <td style="padding: 8px 12px; border: 1px solid #e0e0e0; font-size: 13px;">First Director not yet designated</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; border: 1px solid #e0e0e0; font-size: 13px; font-weight: bold; background: #f9f5e8;">Phase 2 Gate</td>
          <td style="padding: 8px 12px; border: 1px solid #e0e0e0; font-size: 13px;">$50K asset trigger — monitor monthly</td>
        </tr>
      </table>
    </div>

    <!-- RECENT DRIVE ACTIVITY -->
    <div style="padding: 0 40px 28px;">
      <div style="font-size: 11px; color: #D4AF37; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 16px;">
        ⬡ RECENT DOCUMENT ACTIVITY (LAST 24 HOURS)
      </div>
      <div style="background: #f4f4f4; padding: 16px; border-left: 4px solid #0A1628; font-size: 13px; color: #444;">
        \${recentFiles.length > 0 ? recentFiles.map(f => '• ' + f).join('<br>') : 'No new documents in the last 24 hours.'}
      </div>
    </div>

    <!-- R&D SIGNAL -->
    <div style="padding: 0 40px 28px;">
      <div style="font-size: 11px; color: #D4AF37; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 16px;">
        ⬡ S-12 R&D SIGNAL — DIVISION WATCH
      </div>
      <div style="background: #0A1628; padding: 16px 20px; color: #D4AF37; font-size: 13px; line-height: 1.8;">
        DIV-03 Crypto: M2 pending — schedule multi-sig key ceremony<br>
        DIV-02 AI: Enterprise Oracle prototype — design phase<br>
        DIV-09 Cyber: OPSEC standards document in progress<br>
        DIV-08 Robotics: Falls Girl IoT integration plan pending
      </div>
    </div>

    <!-- FOOTER -->
    <div style="background: #0A1628; padding: 20px 40px; text-align: center;">
      <div style="color: #D4AF37; font-size: 11px; letter-spacing: 2px;">
        BPB LEGACY  ·  COUNCIL USE ONLY  ·  bpblegacy.com
      </div>
      <div style="color: #555; font-size: 10px; margin-top: 8px;">
        This message is confidential. Do not forward outside the Family Council.
      </div>
    </div>
  </div>\`;

  return html;
}

// ── EXTERNAL BRIEF BUILDER ──────────────────────────────────────
function buildExternalBrief(dateStr) {
  const html = \`
  <div style="font-family: 'DM Mono', monospace, sans-serif; max-width: 680px; margin: 0 auto; background: #050505;">
    <!-- HEADER -->
    <div style="background: #050505; padding: 32px 40px; text-align: center; border-bottom: 2px solid #FF107A;">
      <div style="color: #FF107A; font-size: 10px; letter-spacing: 4px; text-transform: uppercase; margin-bottom: 8px;">
        INTELLIGENCE BRIEF — DAILY EDITION
      </div>
      <div style="color: #ffffff; font-size: 26px; font-weight: bold; letter-spacing: 3px;">
        ECHO PINK
      </div>
      <div style="color: #D4AF37; font-size: 11px; letter-spacing: 3px; margin-top: 4px;">
        INTELLIGENCE
      </div>
      <div style="color: #555555; font-size: 11px; margin-top: 12px; font-family: monospace;">
        \${dateStr}  ·  COMPILED BY: ECHO PINK OPS
      </div>
    </div>

    <!-- SIGNAL SCAN -->
    <div style="padding: 28px 40px;">
      <div style="font-size: 10px; color: #FF107A; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 20px; border-bottom: 1px solid #1a1a1a; padding-bottom: 12px;">
        ◈ TODAY'S SIGNAL SCAN
      </div>

      <div style="margin-bottom: 20px; padding: 16px; border: 1px solid #1a1a1a;">
        <div style="color: #D4AF37; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px;">TECH & AI</div>
        <div style="color: #cccccc; font-size: 13px; line-height: 1.7;">
          [AUTO-POPULATED FROM WEB SEARCH — See automation script section below]
        </div>
      </div>

      <div style="margin-bottom: 20px; padding: 16px; border: 1px solid #1a1a1a;">
        <div style="color: #D4AF37; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px;">CRYPTO & MARKETS</div>
        <div style="color: #cccccc; font-size: 13px; line-height: 1.7;">
          [AUTO-POPULATED FROM CRYPTO.COM MCP OR WEB SEARCH]
        </div>
      </div>

      <div style="margin-bottom: 20px; padding: 16px; border: 1px solid #1a1a1a;">
        <div style="color: #D4AF37; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px;">SOCIAL INTELLIGENCE</div>
        <div style="color: #cccccc; font-size: 13px; line-height: 1.7;">
          [TRENDING TOPICS + PLATFORM SIGNALS — ECHO PINK OPS]
        </div>
      </div>
    </div>

    <!-- FOOTER -->
    <div style="background: #050505; border-top: 1px solid #FF107A; padding: 20px 40px; text-align: center;">
      <div style="color: #FF107A; font-size: 10px; letter-spacing: 3px; font-family: monospace;">
        ECHO PINK INTELLIGENCE  ·  echopinkintelligence.com
      </div>
      <div style="color: #333; font-size: 10px; margin-top: 8px;">
        To unsubscribe reply STOP. Powered by BPB Legacy S-2 Intelligence.
      </div>
    </div>
  </div>\`;

  return html;
}

// ── SEND FUNCTIONS ──────────────────────────────────────────────
function sendInternalDigest(htmlContent, dateStr) {
  CONFIG.INTERNAL_RECIPIENTS.forEach(email => {
    GmailApp.sendEmail(email, \`BPB Daily Digest — \${dateStr}\`, "", {
      htmlBody: htmlContent,
      name: CONFIG.SENDER_NAME,
      noReply: true
    });
  });
}

function sendExternalBrief(htmlContent, dateStr) {
  // For external: integrate with Buffer API or Mailchimp
  // OR simply log the content to a Google Doc for manual Buffer/Canva posting
  const doc = DocumentApp.create(\`Echo Pink Brief — \${dateStr}\`);
  doc.getBody().setText("Content ready for Buffer/Canva. HTML version logged in Drive.");
  logSend("EXTERNAL_DOC_CREATED", dateStr, doc.getUrl());
}

// ── UTILITY FUNCTIONS ───────────────────────────────────────────
function getRecentDriveFiles() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const query = \`modifiedTime > '\${yesterday.toISOString()}' and trashed = false\`;

  try {
    const files = DriveApp.searchFiles(query);
    const results = [];
    while (files.hasNext() && results.length < 8) {
      const file = files.next();
      results.push(\`\${file.getName()} (modified \${Utilities.formatDate(file.getLastUpdated(), "America/Chicago", "h:mm a")})\`);
    }
    return results;
  } catch(e) {
    return ["[Drive search unavailable — check permissions]"];
  }
}

function logSend(type, date, status) {
  try {
    const ss = SpreadsheetApp.openById(CONFIG.LOG_SHEET_ID);
    const sheet = ss.getSheetByName("Send Log") || ss.insertSheet("Send Log");
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Date", "Type", "Status", "Timestamp"]);
    }
    sheet.appendRow([date, type, status, new Date().toISOString()]);
  } catch(e) {
    Logger.log("Log error: " + e.message);
  }
}

// ── SETUP TRIGGER (run once to install) ─────────────────────────
function createDailyTrigger() {
  // Delete existing triggers first
  ScriptApp.getProjectTriggers().forEach(t => ScriptApp.deleteTrigger(t));

  // Create new daily trigger at 6 AM Central
  ScriptApp.newTrigger("sendDailyNewsletters")
    .timeBased()
    .everyDays(1)
    .atHour(6)
    .create();

  Logger.log("Daily trigger created. Newsletter will send at 6 AM daily.");
}`,

  "Buffer API Setup": `// ═══════════════════════════════════════════════════════════════
// BPB LEGACY — BUFFER INTEGRATION FOR ECHO PINK EXTERNAL POSTS
// Use Buffer API to auto-schedule social posts from the daily brief
// Buffer docs: https://buffer.com/developers/api
// ═══════════════════════════════════════════════════════════════

// STEP 1: Get your Buffer API token
// Go to: buffer.com/developers/apps → Create app → Get token
// Add token to Google Apps Script Properties:
// Project Settings → Script Properties → Add: BUFFER_TOKEN = your_token

// STEP 2: Add this function to your Apps Script project

function postToBufferFromBrief(headline, body, imageUrl) {
  const BUFFER_TOKEN = PropertiesService.getScriptProperties().getProperty("BUFFER_TOKEN");
  const BUFFER_PROFILE_ID = PropertiesService.getScriptProperties().getProperty("BUFFER_PROFILE_ID");

  const postText = \`\${headline}\\n\\n\${body}\\n\\n— Echo Pink Intelligence\\n#BPBLegacy #EchoPink #Intelligence\`;

  const payload = {
    profile_ids: [BUFFER_PROFILE_ID],
    text: postText,
    scheduled_at: getNextPostTime(), // schedule for optimal time
    media: imageUrl ? { photo: imageUrl } : undefined
  };

  const response = UrlFetchApp.fetch("https://api.bufferapp.com/1/updates/create.json", {
    method: "post",
    headers: { "Authorization": "Bearer " + BUFFER_TOKEN },
    payload: JSON.stringify(payload),
    contentType: "application/json"
  });

  Logger.log("Buffer response: " + response.getContentText());
}

function getNextPostTime() {
  // Schedule posts at optimal engagement times
  const times = ["08:00", "12:00", "17:00", "20:00"]; // 8am, noon, 5pm, 8pm
  const now = new Date();
  const hour = now.getHours();

  let nextHour = times.find(t => parseInt(t) > hour) || times[0]; // wrap to next day
  const tomorrow = hour >= 20;

  const d = new Date();
  if (tomorrow) d.setDate(d.getDate() + 1);
  const [h, m] = nextHour.split(":");
  d.setHours(parseInt(h), parseInt(m), 0, 0);

  return d.toISOString();
}

// ── CANVA INTEGRATION GUIDE ─────────────────────────────────────
/*
CANVA WORKFLOW FOR ECHO PINK DAILY BRIEF:

1. CREATE TEMPLATE IN CANVA:
   - Go to Canva → Create Design → Email Header (600 x 200px)
   - Use Echo Pink brand: black #050505 background, hot pink #FF107A, gold #D4AF37, DM Mono font
   - Add placeholder text: {{HEADLINE}}, {{DATE}}, {{TAGLINE}}
   - Save as Brand Template: "Echo Pink Intelligence Brief Header"

2. DUPLICATE DAILY:
   - In Canva, open the template
   - Update {{HEADLINE}} with today's top signal
   - Update {{DATE}} with today's date
   - Export as PNG (1200px wide)
   - Upload to Google Drive: BPB Legacy > Echo Pink > Newsletter Headers

3. AUTO-INSERT VIA APPS SCRIPT:
   The script above references imageUrl — point it to the
   exported PNG in Google Drive using the file's sharing URL.

4. CANVA CONNECT (MCP):
   If you have the Canva MCP connector active, you can ask Claude:
   "Create a new Echo Pink Intelligence Brief header in Canva
   for [today's date] with headline: [headline text]"
   and Claude will generate it directly.
*/`,

  "Mailchimp / Email List": `// ═══════════════════════════════════════════════════════════════
// BPB LEGACY — MAILCHIMP INTEGRATION FOR EXTERNAL NEWSLETTER
// For scaling Echo Pink Intelligence Brief to a subscriber list
// ═══════════════════════════════════════════════════════════════

// STEP 1: Create Mailchimp account at mailchimp.com
// STEP 2: Create two audiences:
//   - "BPB Internal Council" (small, private)
//   - "Echo Pink Intelligence Subscribers" (external, public)
// STEP 3: Get API key: Account Settings → Extras → API Keys

// STEP 4: Add to Google Apps Script Properties:
//   MAILCHIMP_API_KEY = your_api_key
//   MAILCHIMP_SERVER = us1 (check your account URL, e.g., us1.api.mailchimp.com)
//   MAILCHIMP_LIST_ID_INTERNAL = your_internal_list_id
//   MAILCHIMP_LIST_ID_EXTERNAL = your_external_list_id

function sendViaMailchimp(subject, htmlContent, listId) {
  const API_KEY = PropertiesService.getScriptProperties().getProperty("MAILCHIMP_API_KEY");
  const SERVER = PropertiesService.getScriptProperties().getProperty("MAILCHIMP_SERVER");

  const baseUrl = \`https://\${SERVER}.api.mailchimp.com/3.0\`;
  const headers = {
    "Authorization": "Bearer " + API_KEY,
    "Content-Type": "application/json"
  };

  // Step 1: Create campaign
  const campaignPayload = {
    type: "regular",
    recipients: { list_id: listId },
    settings: {
      subject_line: subject,
      from_name: "Echo Pink Intelligence",
      reply_to: "hello@echopinkintelligence.com",
      title: subject
    }
  };

  const campaignRes = UrlFetchApp.fetch(\`\${baseUrl}/campaigns\`, {
    method: "post", headers, payload: JSON.stringify(campaignPayload)
  });
  const campaign = JSON.parse(campaignRes.getContentText());

  // Step 2: Set content
  UrlFetchApp.fetch(\`\${baseUrl}/campaigns/\${campaign.id}/content\`, {
    method: "put", headers,
    payload: JSON.stringify({ html: htmlContent })
  });

  // Step 3: Send
  UrlFetchApp.fetch(\`\${baseUrl}/campaigns/\${campaign.id}/actions/send\`, {
    method: "post", headers, payload: "{}"
  });

  Logger.log(\`Mailchimp campaign sent: \${campaign.id}\`);
  return campaign.id;
}

// ── SUBSCRIBER GROWTH STRATEGY ──────────────────────────────────
/*
ECHO PINK INTELLIGENCE BRIEF — SUBSCRIBER GROWTH PLAN

PHASE 1 (0-100 subscribers): Manual
  - Share subscribe link via Echo Pink social channels
  - Embed signup form on EchoPinkIntelligence.com
  - Offer 1-week free trial to target contacts

PHASE 2 (100-1,000 subscribers):
  - Buffer scheduled posts promoting the brief 3x/week
  - Canva-designed "preview" graphics showing headline snippets
  - LinkedIn outreach to target businesses in service area

PHASE 3 (1,000+ subscribers):
  - Tiered access: Free (weekly digest) vs Paid (daily brief)
  - Revenue model: $9.99/month for daily access
  - Integrate payment via Stripe + Mailchimp tags

CONTENT PILLARS FOR EXTERNAL AUDIENCE:
  1. Tech & AI intelligence (30%)
  2. Crypto & finance signals (25%)
  3. Social media strategy tips (20%)
  4. Veteran & community impact news (15%)
  5. BPB Legacy featured insights (10%)
*/`
};

export default function BPBNewsletterSystem() {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeScript, setActiveScript] = useState("Google Apps Script");
  const [copiedScript, setCopiedScript] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState({ internal: [], external: [] });
  const [newsletterType, setNewsletterType] = useState("internal");

  const handleCopyScript = () => {
    navigator.clipboard.writeText(SCRIPT_TABS[activeScript]);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  const toggleTopic = (type, topic) => {
    setSelectedTopics(prev => ({
      ...prev,
      [type]: prev[type].includes(topic)
        ? prev[type].filter(t => t !== topic)
        : [...prev[type], topic]
    }));
  };

  const tabs = ["overview", "automation", "content", "canva", "launch"];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #050505 0%, #0A1628 40%, #050505 100%)",
      fontFamily: "'Georgia', serif",
      color: "#e8e0cc",
    }}>
      {/* Header */}
      <div style={{
        borderBottom: "2px solid #D4AF37",
        padding: "28px 40px 20px",
        background: "rgba(10,22,40,0.95)",
        position: "sticky", top: 0, zIndex: 100
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #D4AF37, #FF107A)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>📡</div>
                <div>
                  <div style={{ fontSize: 9, letterSpacing: "0.3em", color: "#D4AF37", textTransform: "uppercase" }}>BPB Legacy  ·  S-2 Intelligence</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: "#fff", letterSpacing: "0.03em" }}>Newsletter Automation System</div>
                </div>
              </div>
              <div style={{ fontSize: 11, color: "#555", marginTop: 4, letterSpacing: "0.1em" }}>
                Internal BPB Daily Digest  ·  Echo Pink Intelligence Brief  ·  Google Apps Script + Buffer + Canva
              </div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {tabs.map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} style={{
                  padding: "8px 16px",
                  background: activeTab === tab ? "linear-gradient(135deg, #D4AF37, #b8912a)" : "rgba(255,255,255,0.05)",
                  color: activeTab === tab ? "#0A1628" : "#888",
                  border: activeTab === tab ? "none" : "1px solid rgba(212,175,55,0.15)",
                  borderRadius: 6, cursor: "pointer", fontWeight: 700,
                  fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase",
                }}>
                  {{ overview: "📋 Overview", automation: "⚙️ Scripts", content: "📝 Content", canva: "🎨 Canva", launch: "🚀 Launch" }[tab]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 28 }}>
              {/* Internal */}
              <div style={{ background: "rgba(10,22,40,0.8)", border: "1px solid rgba(212,175,55,0.3)", borderRadius: 12, padding: 28 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 40, height: 40, background: "linear-gradient(135deg, #0A1628, #1a3060)", border: "2px solid #D4AF37", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🏛️</div>
                  <div>
                    <div style={{ fontWeight: 700, color: "#D4AF37", fontSize: 14, letterSpacing: "0.08em" }}>BPB DAILY DIGEST</div>
                    <div style={{ fontSize: 11, color: "#666" }}>Internal — Council + Members Only</div>
                  </div>
                </div>
                <div style={{ fontSize: 13, color: "#aaa", lineHeight: 1.8 }}>
                  <div style={{ marginBottom: 8 }}>📧 <strong style={{ color: "#D4AF37" }}>Audience:</strong> Charles, Lynn, Casiyah, Liessa</div>
                  <div style={{ marginBottom: 8 }}>⏰ <strong style={{ color: "#D4AF37" }}>Send time:</strong> 6:00 AM Central, daily</div>
                  <div style={{ marginBottom: 8 }}>🔧 <strong style={{ color: "#D4AF37" }}>Tool:</strong> Google Apps Script + Gmail</div>
                  <div style={{ marginBottom: 8 }}>📋 <strong style={{ color: "#D4AF37" }}>Content:</strong> Operations status, Drive activity, R&D signals, open items</div>
                  <div>🔒 <strong style={{ color: "#D4AF37" }}>Marked:</strong> CONFIDENTIAL — Council Use Only</div>
                </div>
              </div>
              {/* External */}
              <div style={{ background: "rgba(5,5,5,0.95)", border: "1px solid rgba(255,16,122,0.3)", borderRadius: 12, padding: 28 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 40, height: 40, background: "linear-gradient(135deg, #050505, #1a0010)", border: "2px solid #FF107A", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>⚡</div>
                  <div>
                    <div style={{ fontWeight: 700, color: "#FF107A", fontSize: 14, letterSpacing: "0.08em", fontFamily: "monospace" }}>ECHO PINK INTEL BRIEF</div>
                    <div style={{ fontSize: 11, color: "#555", fontFamily: "monospace" }}>External — Subscribers + Clients</div>
                  </div>
                </div>
                <div style={{ fontSize: 13, color: "#888", lineHeight: 1.8, fontFamily: "monospace" }}>
                  <div style={{ marginBottom: 8 }}>📧 <strong style={{ color: "#FF107A" }}>Audience:</strong> Subscribers, clients, prospects</div>
                  <div style={{ marginBottom: 8 }}>⏰ <strong style={{ color: "#FF107A" }}>Send time:</strong> 7:30 AM Central, daily</div>
                  <div style={{ marginBottom: 8 }}>🔧 <strong style={{ color: "#FF107A" }}>Tool:</strong> Mailchimp + Buffer + Canva</div>
                  <div style={{ marginBottom: 8 }}>📋 <strong style={{ color: "#FF107A" }}>Content:</strong> Tech/AI/Crypto signals, social strategy, market intelligence</div>
                  <div>💰 <strong style={{ color: "#FF107A" }}>Revenue:</strong> Free weekly / Paid daily ($9.99/mo Phase 2)</div>
                </div>
              </div>
            </div>

            {/* Automation Flow */}
            <div style={{ background: "rgba(10,22,40,0.6)", border: "1px solid rgba(212,175,55,0.15)", borderRadius: 12, padding: 28 }}>
              <div style={{ fontSize: 12, letterSpacing: "0.2em", color: "#D4AF37", textTransform: "uppercase", marginBottom: 20 }}>DAILY AUTOMATION FLOW</div>
              <div style={{ display: "flex", alignItems: "center", gap: 0, flexWrap: "wrap" }}>
                {[
                  { icon: "⏰", label: "6:00 AM", sub: "Trigger fires" },
                  { arrow: true },
                  { icon: "📂", label: "Drive Scan", sub: "Last 24hr files" },
                  { arrow: true },
                  { icon: "📊", label: "Build Digest", sub: "HTML assembled" },
                  { arrow: true },
                  { icon: "📧", label: "Gmail Send", sub: "Internal 4 recipients" },
                  { arrow: true },
                  { icon: "🎨", label: "Canva Header", sub: "Auto-generated" },
                  { arrow: true },
                  { icon: "📱", label: "Buffer Queue", sub: "Social scheduled" },
                  { arrow: true },
                  { icon: "📬", label: "Mailchimp", sub: "External send" },
                  { arrow: true },
                  { icon: "📋", label: "Log Sheet", sub: "Send recorded" },
                ].map((step, i) => step.arrow ? (
                  <div key={i} style={{ color: "#D4AF37", fontSize: 20, padding: "0 8px" }}>→</div>
                ) : (
                  <div key={i} style={{ textAlign: "center", padding: "12px 16px", background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.15)", borderRadius: 8, minWidth: 80 }}>
                    <div style={{ fontSize: 22, marginBottom: 4 }}>{step.icon}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#D4AF37" }}>{step.label}</div>
                    <div style={{ fontSize: 10, color: "#555" }}>{step.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* AUTOMATION TAB */}
        {activeTab === "automation" && (
          <div>
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              {Object.keys(SCRIPT_TABS).map(tab => (
                <button key={tab} onClick={() => setActiveScript(tab)} style={{
                  padding: "10px 20px",
                  background: activeScript === tab ? "linear-gradient(135deg, #D4AF37, #b8912a)" : "rgba(255,255,255,0.05)",
                  color: activeScript === tab ? "#0A1628" : "#888",
                  border: activeScript === tab ? "none" : "1px solid rgba(212,175,55,0.15)",
                  borderRadius: 6, cursor: "pointer", fontWeight: 700, fontSize: 12,
                }}>
                  {tab}
                </button>
              ))}
            </div>
            <div style={{ background: "rgba(5,10,20,0.95)", border: "1px solid rgba(212,175,55,0.15)", borderRadius: 12, overflow: "hidden" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 24px", background: "rgba(212,175,55,0.06)", borderBottom: "1px solid rgba(212,175,55,0.1)" }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ef4444" }} />
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#f59e0b" }} />
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#22c55e" }} />
                  <span style={{ marginLeft: 12, fontSize: 12, color: "#555", fontFamily: "monospace" }}>{activeScript}.gs</span>
                </div>
                <button onClick={handleCopyScript} style={{
                  padding: "8px 20px",
                  background: copiedScript ? "linear-gradient(135deg, #22c55e, #16a34a)" : "linear-gradient(135deg, #D4AF37, #b8912a)",
                  color: "#0A1628", border: "none", borderRadius: 6, cursor: "pointer", fontWeight: 700, fontSize: 12,
                }}>
                  {copiedScript ? "✓ COPIED" : "COPY SCRIPT"}
                </button>
              </div>
              <pre style={{
                margin: 0, padding: 28, overflowX: "auto", overflowY: "auto",
                maxHeight: "60vh", fontSize: 12, lineHeight: 1.7,
                fontFamily: "'Courier New', monospace", color: "#a5f3fc",
                whiteSpace: "pre-wrap", wordBreak: "break-word"
              }}>
                {SCRIPT_TABS[activeScript]}
              </pre>
            </div>
            <div style={{ marginTop: 20, padding: 20, background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.2)", borderRadius: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#D4AF37", marginBottom: 12 }}>📋 DEPLOY STEPS — Google Apps Script</div>
              {["Go to script.google.com → New Project → Rename to 'BPB Newsletter Automation'",
                "Paste the Google Apps Script code into the editor",
                "Add Script Properties: BUFFER_TOKEN, MAILCHIMP_API_KEY, LOG_SHEET_ID",
                "Run createDailyTrigger() once to install the 6 AM daily trigger",
                "Test by running sendDailyNewsletters() manually first",
                "Check the Send Log Google Sheet to confirm delivery"].map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 12, marginBottom: 8, fontSize: 13, color: "#aaa" }}>
                  <span style={{ color: "#D4AF37", fontWeight: 700, minWidth: 20 }}>{i + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONTENT TAB */}
        {activeTab === "content" && (
          <div>
            <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
              {["internal", "external"].map(type => (
                <button key={type} onClick={() => setNewsletterType(type)} style={{
                  padding: "10px 24px",
                  background: newsletterType === type
                    ? (type === "internal" ? "linear-gradient(135deg, #D4AF37, #b8912a)" : "linear-gradient(135deg, #FF107A, #cc0d5f)")
                    : "rgba(255,255,255,0.05)",
                  color: newsletterType === type ? (type === "internal" ? "#0A1628" : "#fff") : "#888",
                  border: "none", borderRadius: 6, cursor: "pointer", fontWeight: 700, fontSize: 12,
                }}>
                  {type === "internal" ? "🏛️ BPB Internal Digest" : "⚡ Echo Pink Brief"}
                </button>
              ))}
            </div>
            <div style={{ marginBottom: 20, fontSize: 12, color: "#666" }}>
              Select content topics to include in each newsletter edition. Toggle to customize.
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
              {(newsletterType === "internal" ? TOPICS_INTERNAL : TOPICS_EXTERNAL).map(topic => {
                const selected = selectedTopics[newsletterType].includes(topic);
                return (
                  <div key={topic} onClick={() => toggleTopic(newsletterType, topic)} style={{
                    padding: "14px 18px", cursor: "pointer",
                    background: selected ? (newsletterType === "internal" ? "rgba(212,175,55,0.15)" : "rgba(255,16,122,0.15)") : "rgba(255,255,255,0.03)",
                    border: `1px solid ${selected ? (newsletterType === "internal" ? "#D4AF37" : "#FF107A") : "rgba(255,255,255,0.08)"}`,
                    borderRadius: 8,
                    display: "flex", alignItems: "center", gap: 12
                  }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: 4,
                      background: selected ? (newsletterType === "internal" ? "#D4AF37" : "#FF107A") : "rgba(255,255,255,0.1)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#0A1628", fontSize: 12, fontWeight: 700, flexShrink: 0
                    }}>
                      {selected ? "✓" : ""}
                    </div>
                    <span style={{ fontSize: 13, color: selected ? "#fff" : "#888" }}>{topic}</span>
                  </div>
                );
              })}
            </div>
            {selectedTopics[newsletterType].length > 0 && (
              <div style={{ marginTop: 24, padding: 20, background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.2)", borderRadius: 10 }}>
                <div style={{ fontSize: 11, color: "#D4AF37", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>
                  Selected Topics → Add to your Apps Script CONFIG
                </div>
                <code style={{ fontSize: 12, color: "#a5f3fc", fontFamily: "monospace", display: "block", whiteSpace: "pre-wrap" }}>
                  {`const CONTENT_TOPICS_${newsletterType.toUpperCase()} = [\n${selectedTopics[newsletterType].map(t => `  "${t}"`).join(",\n")}\n];`}
                </code>
              </div>
            )}
          </div>
        )}

        {/* CANVA TAB */}
        {activeTab === "canva" && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 12, color: "#666", marginBottom: 20 }}>Newsletter header templates — create these in Canva and link to your automation.</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {CANVA_TEMPLATES.map(tpl => (
                  <div key={tpl.code} style={{ background: tpl.code.includes("EXT") ? "rgba(5,5,5,0.95)" : "rgba(10,22,40,0.8)", border: `1px solid ${tpl.code.includes("EXT") ? "rgba(255,16,122,0.3)" : "rgba(212,175,55,0.3)"}`, borderRadius: 12, padding: 24 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                      <div style={{ fontWeight: 700, color: tpl.code.includes("EXT") ? "#FF107A" : "#D4AF37", fontSize: 14 }}>{tpl.name}</div>
                      <code style={{ fontSize: 10, color: "#555", background: "rgba(255,255,255,0.05)", padding: "3px 8px", borderRadius: 4 }}>{tpl.code}</code>
                    </div>
                    <div style={{ fontSize: 12, color: "#666", marginBottom: 16 }}>{tpl.style}</div>
                    <div style={{ background: tpl.code.includes("EXT") ? "#050505" : "#0A1628", border: `1px solid ${tpl.code.includes("EXT") ? "#FF107A" : "#D4AF37"}`, borderRadius: 6, padding: "16px 20px", textAlign: "center" }}>
                      <div style={{ fontSize: 10, color: tpl.code.includes("EXT") ? "#FF107A" : "#D4AF37", letterSpacing: "2px", marginBottom: 6 }}>DAILY EDITION</div>
                      <div style={{ fontWeight: 700, color: "#fff", fontSize: 16 }}>{tpl.name.replace(" Template", "")}</div>
                      <div style={{ fontSize: 10, color: "#555", marginTop: 6 }}>{{"{DATE}"}}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ padding: 24, background: "rgba(10,22,40,0.6)", border: "1px solid rgba(212,175,55,0.15)", borderRadius: 12 }}>
              <div style={{ fontSize: 12, color: "#D4AF37", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>CANVA SETUP STEPS</div>
              {[
                "In Canva → Create Design → Email Header (600 × 200px)",
                "For BPB Internal: navy #0A1628 background, gold #D4AF37 text, Georgia font — add BPB seal logo",
                "For Echo Pink: black #050505 background, hot pink #FF107A accent, DM Mono font",
                "Add text placeholders: {{HEADLINE}}, {{DATE}}, {{TAGLINE}}",
                "Save as Brand Template with the template code (e.g. TPL-INT-001)",
                "Daily workflow: duplicate template → update text → export PNG → upload to Drive → reference in Apps Script"
              ].map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 12, marginBottom: 10, fontSize: 13, color: "#aaa" }}>
                  <span style={{ color: "#D4AF37", fontWeight: 700, minWidth: 20 }}>{i + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
              <div style={{ marginTop: 16, padding: 14, background: "rgba(212,175,55,0.08)", borderRadius: 8, fontSize: 12, color: "#888" }}>
                💡 <strong style={{ color: "#D4AF37" }}>MCP Shortcut:</strong> With the Canva MCP connector active, tell Claude: "Create an Echo Pink Intelligence Brief header in Canva for today with headline: [your headline]" and Claude will generate it directly — no manual template work needed.
              </div>
            </div>
          </div>
        )}

        {/* LAUNCH TAB */}
        {activeTab === "launch" && (
          <div>
            <div style={{ marginBottom: 24, padding: 24, background: "rgba(10,22,40,0.8)", border: "1px solid rgba(212,175,55,0.3)", borderRadius: 12 }}>
              <div style={{ fontSize: 13, letterSpacing: "0.15em", color: "#D4AF37", textTransform: "uppercase", marginBottom: 20, fontWeight: 700 }}>LAUNCH CHECKLIST</div>
              {[
                { phase: "PHASE 1 — Internal (Week 1)", items: [
                  "Create Google Apps Script project at script.google.com",
                  "Paste the Apps Script code from the Automation tab",
                  "Create a Google Sheet named 'BPB Newsletter Send Log' — copy its ID",
                  "Add Script Properties: LOG_SHEET_ID",
                  "Run sendDailyNewsletters() once manually — check all 4 council inboxes",
                  "Run createDailyTrigger() to install the 6 AM daily schedule",
                  "Add internal council member emails to INTERNAL_RECIPIENTS array",
                ]},
                { phase: "PHASE 2 — External Canva + Buffer (Week 2)", items: [
                  "Create Buffer account at buffer.com — connect Instagram, LinkedIn, Twitter/X",
                  "Add BUFFER_TOKEN and BUFFER_PROFILE_ID to Script Properties",
                  "Create 2 Canva templates: BPB Internal header + Echo Pink Brief header",
                  "Export first test headers as PNG — upload to Google Drive",
                  "Test postToBufferFromBrief() function manually",
                  "Schedule first 5 days of Echo Pink Brief posts via Buffer",
                ]},
                { phase: "PHASE 3 — Mailchimp Subscriber List (Week 3)", items: [
                  "Create Mailchimp account — set up 2 audiences (Internal + External)",
                  "Build signup form — embed on EchoPinkIntelligence.com",
                  "Add MAILCHIMP_API_KEY to Script Properties",
                  "Test sendViaMailchimp() with 1 test email first",
                  "Launch Echo Pink Brief to first 10 subscribers",
                  "Set Phase 2 revenue goal: 100 paid subscribers at $9.99/mo",
                ]},
              ].map(section => (
                <div key={section.phase} style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 12, color: "#D4AF37", fontWeight: 700, letterSpacing: "0.1em", marginBottom: 12, padding: "8px 14px", background: "rgba(212,175,55,0.08)", borderRadius: 6 }}>{section.phase}</div>
                  {section.items.map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: 12, marginBottom: 8, alignItems: "flex-start" }}>
                      <div style={{ width: 18, height: 18, border: "1px solid rgba(212,175,55,0.4)", borderRadius: 3, flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontSize: 13, color: "#aaa", lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div style={{ padding: 20, background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.15)", borderRadius: 10 }}>
              <div style={{ fontSize: 12, color: "#D4AF37", fontWeight: 700, marginBottom: 12 }}>📊 REVENUE PROJECTION — Echo Pink Intelligence Brief</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                {[
                  { stage: "Phase 1", subs: "0–100", rev: "Free", note: "Build audience" },
                  { stage: "Phase 2", subs: "100–500", rev: "$9.99/mo", note: "~$999–$4,995/mo" },
                  { stage: "Phase 3", subs: "500–1,000+", rev: "$9.99/mo", note: "~$4,995–$9,990/mo" },
                ].map(p => (
                  <div key={p.stage} style={{ padding: 16, background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.15)", borderRadius: 8, textAlign: "center" }}>
                    <div style={{ fontWeight: 700, color: "#D4AF37", fontSize: 14 }}>{p.stage}</div>
                    <div style={{ fontSize: 18, color: "#fff", fontWeight: 700, margin: "8px 0" }}>{p.subs}</div>
                    <div style={{ fontSize: 11, color: "#888" }}>subscribers</div>
                    <div style={{ fontSize: 13, color: "#D4AF37", marginTop: 8 }}>{p.rev}</div>
                    <div style={{ fontSize: 11, color: "#555", marginTop: 4 }}>{p.note}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
