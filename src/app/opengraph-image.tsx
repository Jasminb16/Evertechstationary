import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { site } from "@/lib/site";

export const alt = `${site.legalName} | ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social preview card, generated at build time.
 *
 * The logo is inlined as a data URI because Satori (which renders this) cannot
 * fetch relative URLs — it has no origin to resolve them against.
 */
export default async function OpengraphImage() {
  const logo = await readFile(
    join(process.cwd(), "public/brand/logo-light.png"),
  );
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#04264f",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        {/* Ruled-paper hairlines, echoing the site background. */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(to bottom, rgba(255,255,255,0.06) 0 1px, transparent 1px 100%)",
            backgroundSize: "100% 48px",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <img src={logoSrc} alt="" width={96} height={82} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ color: "#ffffff", fontSize: 40, fontWeight: 700 }}>
              Evertech
            </div>
            <div
              style={{
                color: "#8fb3e4",
                fontSize: 19,
                letterSpacing: 4,
                textTransform: "uppercase",
                marginTop: 4,
              }}
            >
              Stationery
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#ffffff",
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: -1.5,
            }}
          >
            Every office essential,
          </div>
          <div
            style={{
              color: "#8fb3e4",
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: -1.5,
            }}
          >
            from one supplier.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            borderTop: "1px solid rgba(255,255,255,0.16)",
            paddingTop: 28,
          }}
        >
          <div style={{ color: "#dce7f6", fontSize: 26 }}>
            Free delivery on business orders
          </div>
          <div style={{ color: "#5b8ed5", fontSize: 26 }}>·</div>
          <div style={{ color: "#dce7f6", fontSize: 26 }}>
            Same-day dispatch on stocked lines
          </div>
        </div>
      </div>
    ),
    size,
  );
}
