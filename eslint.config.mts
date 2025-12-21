import antfu from "@antfu/eslint-config";

export default antfu(
  {
    react: true,
    typescript: true,
    stylistic: false,
  },
  {
    rules: {
      "node/prefer-global/process": "off",
      "node/prefer-global/buffer": "off",
    },
  }
);
