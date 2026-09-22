import { ImageResponse } from "next/og";

export const alt =
  "Percapita Advisors — independent financial advisory in Mumbai and Pune, ARN 142346";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The share card, generated at build time.
 *
 * Deliberately typographic rather than a crop of a photograph: the card is
 * rendered at thumbnail sizes in feeds and chat previews, where a four-person
 * meeting photo turns to mush but a short line of text still reads. Satori
 * supports flexbox only, so everything here is flex.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #2E1547 0%, #160823 100%)",
          padding: "72px 80px",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#C3A0E4",
              fontWeight: 700,
            }}
          >
            Independent Financial Advisory
          </div>
          <div
            style={{
              marginTop: 34,
              fontSize: 82,
              lineHeight: 1.05,
              fontWeight: 800,
              letterSpacing: -2.5,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            Don&rsquo;t just invest.&nbsp;
            <span style={{ color: "#C3A0E4" }}>Understand.</span>
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 30,
              lineHeight: 1.45,
              color: "#BCACCE",
              maxWidth: 880,
            }}
          >
            Financial planning and investment guidance across mutual funds,
            SIFs, PMS, AIFs, insurance and loans.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.22)",
            paddingTop: 30,
            fontSize: 25,
          }}
        >
          <div style={{ display: "flex", fontWeight: 700 }}>
            Percapita Advisors
          </div>
          <div style={{ display: "flex", color: "#9C8CB2" }}>
            Mumbai &amp; Pune · ARN 142346
          </div>
        </div>
      </div>
    ),
    size,
  );
}
