"use client";

import { useEffect } from "react";

interface ModelViewerProps {
  src: string;
  alt?: string;
  className?: string;
  autoRotate?: boolean;
  cameraControls?: boolean;
}

export default function ModelViewer({
  src,
  alt = "3D model",
  className,
  autoRotate = true,
  cameraControls = true,
}: ModelViewerProps) {
  useEffect(() => {
    import("@google/model-viewer");
  }, []);

  return (
    // @ts-expect-error model-viewer is a web component
    <model-viewer
      src={src}
      alt={alt}
      auto-rotate={autoRotate || undefined}
      camera-controls={cameraControls || undefined}
      shadow-intensity="0.5"
      environment-image="neutral"
      loading="lazy"
      className={className}
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#070707",
        "--poster-color": "#070707",
      } as React.CSSProperties}
    />
  );
}
