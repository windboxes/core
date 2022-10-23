import esbuild from 'esbuild';



esbuild
  .build({
    logLevel: "info",
    entryPoints: [
      "src/index.ts",
      "src/elementTags.ts",
      "src/Provider.tsx",
      "src/styled.ts",
    ],
    bundle: false,
    outdir: "dist",
    minify: true,
    target: "es2020",
    platform: "browser",
    // sourcemap: true,
    // splitting: true,
    // format: 'esm'
  })
  .catch(() => process.exit(1));
