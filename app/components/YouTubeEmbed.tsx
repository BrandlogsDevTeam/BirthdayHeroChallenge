"use client";

import { useEffect } from "react";
import "@justinribeiro/lite-youtube";
import type { LiteYTEmbed } from "@justinribeiro/lite-youtube";

interface YouTubeEmbedProps {
  id: string;
  title: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "lite-youtube": React.DetailedHTMLProps<
        React.HTMLAttributes<LiteYTEmbed> & {
          videoid: string;
          videotitle: string;
        },
        LiteYTEmbed
      >;
    }
  }
}

export function YouTubeEmbed({ id, title }: YouTubeEmbedProps) {
  useEffect(() => {
    import("@justinribeiro/lite-youtube");
  }, []);

  return (
    <lite-youtube
      videoid={id}
      videotitle={title}
      style={{
        backgroundColor: "#000",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "block",
        containIntrinsicSize: "640px 360px",
        width: "100%",
        maxWidth: "720px",
        aspectRatio: "16 / 9",
        margin: "0 auto",
      }}
    />
  );
}
