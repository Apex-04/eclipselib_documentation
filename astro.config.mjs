// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import catppuccin from "@catppuccin/starlight";
import starlightMarkdownBlocks, { Aside } from "starlight-markdown-blocks";

export default defineConfig({
  server: {
    port: 4322,
  },
  markdown: {},
  integrations: [
    starlight({
      title: "Eclipselib",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/Apex-04/vexide-eclipselib",
        },
      ],
      sidebar: [
        // { slug: "other/aboutus" },
        {
          label: "Features",
          autogenerate: { directory: "features" },
        },
        {
          label: "Simple Objects",
          autogenerate: { directory: "simple" },
        },
        {
          label: "Advanced Objects",
          autogenerate: { directory: "advanced" },
        },
        {
          label: "Swerve Development",
          autogenerate: { directory: "swerve_dev" },
        },
        {
          label: "Swerve Programming",
          autogenerate: { directory: "swerve_prog" },
        },
      ],
      plugins: [
        catppuccin(),
        starlightMarkdownBlocks({
          blocks: {
            opcblock: Aside({
              label: "Op Control Functions",
              color: "orange",
              // icon: "",
            }),
            autoblock: Aside({
              label: "Autonomous Functions",
              color: "blue",
              // icon: "",
            }),
            codeblock: Aside({
              label: "Example",
              color: "purple",
            }),
          },
        }),
      ],
    }),
  ],
});
