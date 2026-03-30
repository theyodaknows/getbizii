import React from "react";

const TITLE = "Build Your Business Right the First Time";
const SUBTITLE = "GetBizii - Business Identity Platform";
const DOMAIN = "getbizii.com";

export const SOCIAL_IMAGE_SIZE = {
  width: 1200,
  height: 630,
} as const;

export const SOCIAL_IMAGE_ALT = "GetBizii social preview image";

export function SocialImage() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        background:
          "linear-gradient(140deg, #1E3A8A 0%, #0F1D3D 55%, #070E1F 100%)",
        color: "#F8FAFC",
        overflow: "hidden",
        fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -80,
          right: -120,
          width: 420,
          height: 420,
          borderRadius: "999px",
          background: "rgba(96, 165, 250, 0.25)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -120,
          bottom: -180,
          width: 380,
          height: 380,
          borderRadius: "999px",
          background: "rgba(245, 158, 11, 0.2)",
        }}
      />

      <div
        style={{
          margin: "64px",
          width: "100%",
          borderRadius: 28,
          border: "1px solid rgba(147, 197, 253, 0.55)",
          background: "rgba(11, 23, 52, 0.62)",
          padding: "46px 52px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          zIndex: 2,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* next/og image rendering expects plain img elements, not next/image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo_light.svg"
            alt="GetBizii logo"
            width={182}
            height={44}
            style={{ objectFit: "contain" }}
          />
          <div
            style={{
              fontSize: 24,
              color: "#BFDBFE",
              letterSpacing: 0.3,
            }}
          >
            {SUBTITLE}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            maxWidth: 920,
          }}
        >
          <div
            style={{
              fontSize: 76,
              lineHeight: 1.05,
              fontWeight: 800,
              letterSpacing: -1.2,
            }}
          >
            {TITLE}
          </div>
          <div
            style={{
              fontSize: 30,
              color: "#BFDBFE",
              lineHeight: 1.25,
            }}
          >
            Build a brand, website, and growth engine that gets customers and
            earns trust.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: 24,
              padding: "14px 24px",
              borderRadius: 999,
              background: "#2563EB",
              fontWeight: 700,
            }}
          >
            Get Started
          </div>
          <div style={{ fontSize: 26, color: "#93C5FD" }}>{DOMAIN}</div>
        </div>
      </div>
    </div>
  );
}
