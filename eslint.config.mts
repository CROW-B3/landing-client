import antfu from "@antfu/eslint-config";

export default antfu({
    react: true,
    typescript: true,
    stylistic: false,
    env: {
        node: true,
        browser: true,
    },
    rules: {
        "node/prefer-global/process": "off",
        "node/prefer-global/buffer": "off",
        "node/prefer-global/url": "off",
        "node/prefer-global/url-search-params": "off",
    },
});