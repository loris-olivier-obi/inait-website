"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";

export default function StudioPage() {
  // Supports the same config as `Sanity.createClient` for Client Components
  return <NextStudio config={config} />;
}
