# Simplified Explanation of semantic-release/commit-analyzer Options

The `commit-analyzer` plugin for semantic-release analyzes your commit messages to automatically determine what type of version bump to make (major, minor, patch).

## Key Options

### `preset` 
Defines which commit message convention to follow (default: "angular")

```js
{
  "preset": "angular"
}
```

### `releaseRules`
Custom rules that override the default behavior.

Example:
```js
{
  "releaseRules": [
    {"type": "docs", "scope": "README", "release": "patch"},
    {"type": "refactor", "release": "patch"},
    {"type": "performance", "release": "patch"}
  ]
}
```

### `parserOpts`
Options to pass to the commit parser.

Example:
```js
{
  "parserOpts": {
    "noteKeywords": ["BREAKING CHANGE", "BREAKING CHANGES"]
  }
}
```

## Practical Examples

1. **Default Behavior (Angular preset)**:
   - `fix: correct bug` → patch release (1.0.0 → 1.0.1)
   - `feat: add new feature` → minor release (1.0.0 → 1.1.0)
   - `feat: add new feature\n\nBREAKING CHANGE: API changed` → major release (1.0.0 → 2.0.0)

2. **Custom Release Rules**:
   ```js
   {
     "releaseRules": [
       {"type": "chore", "scope": "deps", "release": "patch"},
       {"type": "docs", "release": false},
       {"scope": "ui", "release": "minor"}
     ]
   }
   ```
   - `chore(deps): update dependencies` → patch release
   - `docs: update README` → no release
   - `fix(ui): fix button alignment` → minor release (overrides default)

3. **With Custom Parser Options**:
   ```js
   {
     "parserOpts": {
       "noteKeywords": ["BREAKING", "MAJOR CHANGE"]
     }
   }
   ```
   - Now `feat: new feature\n\nMAJOR CHANGE: API changed` will trigger a major release

The plugin is configurable to match your team's specific commit practices while automating version management.