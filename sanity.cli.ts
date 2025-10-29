import { loadEnvConfig } from "@next/env";
import { defineCliConfig } from "sanity/cli";

const dev = process.env.NODE_ENV !== "production";
loadEnvConfig(__dirname, dev, { info: () => null, error: console.error });

// Hardcoded to match main config - CLI only used locally
const projectId = "v04zsz7d";
const dataset = "production";

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
});
