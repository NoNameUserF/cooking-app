module.exports = {
    extends: ["stylelint-config-standard"],
    rules: {
        "rule-empty-line-before": [
            "always",
            {
                except: ["first-nested"],
                ignore: ["after-comment"],
            },
        ],
        "selector-class-pattern": [
            "^[a-z]+([A-Z][a-z0-9]+)*$",
            {
                message: (selectorValue) =>
                    `Expected class selector "${selectorValue}" to be in camelCase`,
                resolveNestedSelectors: true,
            },
        ],
    },
}