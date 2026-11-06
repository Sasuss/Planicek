import { useEffect } from "react";
import type { CSSProperties } from "react";

const PRIVACY_URL = "https://planicek.alexanderklimes.cz/privacy";
const CONTACT_EMAIL = "alexander.klimes@outlook.cz";

const styles: Record<string, CSSProperties> = {
  page: {
    minHeight: "100vh",
    margin: 0,
    background: "#ffffff",
    color: "#1d2433",
    font: "16px/1.6 system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  },
  main: { maxWidth: 760, margin: "0 auto", padding: "48px 16px 64px" },
  h1: { fontSize: "2.2rem", margin: "0 0 8px" },
  h2: { fontSize: "1.2rem", margin: "32px 0 8px" },
  lead: { color: "#5b6475", fontSize: "1.1rem", margin: "0 0 24px" },
  list: { paddingLeft: 20 },
  link: { color: "#2f5bd3" },
  footer: {
    marginTop: 48,
    paddingTop: 16,
    borderTop: "1px solid #e3e6ec",
    color: "#5b6475",
    fontSize: "0.9rem",
  },
};

export default function ClaudeAdsSkills() {
  useEffect(() => {
    document.title = "Claude Ads Skills";
  }, []);

  return (
    <div style={styles.page}>
      <main style={styles.main}>
        <h1 style={styles.h1}>Claude Ads Skills</h1>
        <p style={styles.lead}>
          A tool for managing advertising campaigns in Google Ads and Meta Ads,
          operated by Alexander Klimeš.
        </p>

        <h2 style={styles.h2}>What Claude Ads Skills does</h2>
        <ul style={styles.list}>
          <li>Keyword research using the Google Ads API (Keyword Planner).</li>
          <li>
            Creating new campaigns in a <strong>paused</strong> state, so nothing
            is spent until the account owner reviews and enables them.
          </li>
          <li>Checking the status and performance of existing campaigns.</li>
          <li>
            Suggesting and applying optimisations to the operator's own campaigns
            and to campaigns of clients who have granted access.
          </li>
        </ul>

        <h2 style={styles.h2}>Who can use it</h2>
        <p>
          Claude Ads Skills works only with Google Ads and Meta ad accounts whose
          owner has explicitly granted access by signing in with Google or
          Facebook and approving the requested permissions. Access can be revoked
          at any time in the Google Account or Facebook settings.
        </p>

        <h2 style={styles.h2}>How we use Google user data</h2>
        <p>
          The app requests the Google Ads scope solely to read and manage the
          advertising accounts the user has authorised. Data is used only to
          provide the features listed above, is not sold, and is not used for
          advertising or shared with third parties. Use of information received
          from Google APIs adheres to the{" "}
          <a
            style={styles.link}
            href="https://developers.google.com/terms/api-services-user-data-policy"
          >
            Google API Services User Data Policy
          </a>
          , including the Limited Use requirements.
        </p>

        <h2 style={styles.h2}>Privacy and data deletion</h2>
        <p>
          Read the full{" "}
          <a style={styles.link} href={PRIVACY_URL}>
            Privacy Policy
          </a>
          . Instructions for deleting your data are in the{" "}
          <a style={styles.link} href={`${PRIVACY_URL}#deletion`}>
            data deletion section
          </a>
          .
        </p>

        <h2 style={styles.h2}>Contact</h2>
        <p>
          Alexander Klimeš –{" "}
          <a style={styles.link} href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
        </p>

        <footer style={styles.footer}>
          © 2026 Alexander Klimeš ·{" "}
          <a style={styles.link} href={PRIVACY_URL}>
            Privacy Policy
          </a>
        </footer>
      </main>
    </div>
  );
}
