const CONTACT_EMAIL = "alexander.klimes@outlook.cz";

const styles = {
    main: { maxWidth: "42rem", margin: "0 auto", padding: "3.5rem 1.25rem 4rem", lineHeight: 1.6 },
    h1: { fontSize: "2rem", lineHeight: 1.2, margin: "0 0 0.4rem" },
    updated: { opacity: 0.7, margin: "0 0 2.5rem" },
    h2: {
        fontSize: "1.15rem",
        margin: "2.25rem 0 0.5rem",
        paddingTop: "1.25rem",
        borderTop: "1px solid currentColor",
        borderTopColor: "rgba(127, 127, 127, 0.3)",
    },
    p: { margin: "0 0 0.9rem" },
    ul: { margin: "0 0 0.9rem", paddingLeft: "1.25rem" },
    li: { marginBottom: "0.35rem" },
};

// @ts-ignore
function Section({ id, title, children }) {
    return (
        <section id={id}>
            <h2 style={styles.h2}>{title}</h2>
            {children}
        </section>
    );
}

function Mail() {
    return <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;
}

export default function Test() {
    return (
        <main style={styles.main}>
            <h1 style={styles.h1}>Privacy Policy – Claude Ads Skills</h1>
            <p style={styles.updated}>Last updated: November 6, 2026</p>

            <Section id="who" title="Who we are">
                <p style={styles.p}>
                    Claude Ads Skills is operated by Alexander Klimeš.
                    <br />
                    Contact: <Mail />
                </p>
            </Section>

            <Section id="what" title="What the app does">
                <p style={styles.p}>
                    The app creates, manages and evaluates advertising campaigns through the Meta Marketing API and the
                    Google Ads API, and reads aggregated reports from Google Analytics. It works only with accounts whose
                    owner has granted access.
                </p>
            </Section>

            <Section id="data" title="Data we access">
                <ul style={styles.ul}>
                    <li style={styles.li}>
                        Meta: ad account data (campaigns, ad sets, ads, creatives and performance statistics) and basic Page
                        information.
                    </li>
                    <li style={styles.li}>Google Ads: campaigns, keywords, ads and performance data.</li>
                    <li style={styles.li}>Google Analytics: aggregated traffic reports.</li>
                </ul>
                <p style={styles.p}>
                    We do not access personal data of individual people. Demographic data is received only in aggregated
                    form.
                </p>
            </Section>

            <Section id="use" title="How we use data">
                <p style={styles.p}>
                    Data is used only to create, manage and evaluate ads for the account owner. We do not sell data and do
                    not use it for any other purpose.
                </p>
            </Section>

            <Section id="sharing" title="Sharing">
                <p style={styles.p}>
                    The app runs inside Claude, an AI assistant made by Anthropic, which processes the data to perform the
                    tasks the account owner requests. Data is not shared with anyone else.
                </p>
            </Section>

            <Section id="google" title="Google user data">
                <p style={styles.p}>
                    Claude Ads Skills’ use and transfer to any other app of information received from Google APIs will
                    adhere to the{" "}
                    <a href="https://developers.google.com/terms/api-services-user-data-policy">
                        Google API Services User Data Policy
                    </a>
                    , including the Limited Use requirements.
                </p>
            </Section>

            <Section id="storage" title="Storage and retention">
                <p style={styles.p}>
                    Access tokens are stored only locally and are never shared. Campaign data is not stored permanently,
                    except for a log of changes made to campaigns, which is kept for 12 months and then deleted.
                </p>
            </Section>

            <Section id="deletion" title="Data deletion and revoking access">
                <ul style={styles.ul}>
                    <li style={styles.li}>
                        Facebook: open Settings → Business Integrations and remove Claude Ads Skills Test.
                    </li>
                    <li style={styles.li}>
                        Google: open <a href="https://myaccount.google.com/connections">myaccount.google.com</a> → Security →
                        Third-party apps and services, and remove Claude Ads Skills.
                    </li>
                    <li style={styles.li}>
                        To have stored logs deleted, email <Mail />. We delete them within 30 days.
                    </li>
                </ul>
            </Section>

            <Section id="changes" title="Changes">
                <p style={styles.p}>If this policy changes, we will update this page and the date at the top.</p>
            </Section>
        </main>
    );
}
