import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:4000/graphql",
  documents: ["graphql/**/*.graphql"],
  generates: {
    "./generated/": {
      preset: "client",
    },
  },
};

export default config;