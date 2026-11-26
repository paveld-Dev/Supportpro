import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    ignores: [".next/**", "node_modules/**", "dist/**", "temp_scratch/**", "src/routes/**"],
  },
  {
    files: ["app/cloudmanagement/page.tsx", "app/dedicated-server-support/page.tsx", "src/components/ui/sp-button.tsx"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: "JSXOpeningElement[name.name='button'] > JSXAttribute[name.name='style']",
          message: "Buttons must use PrimaryButton or SecondaryButton tokens, not inline styles.",
        },
      ],
    },
  },
];

export default eslintConfig;
