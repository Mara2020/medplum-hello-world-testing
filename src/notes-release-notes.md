# Simplified Explanation of semantic-release/release-notes-generator Options

The `release-notes-generator` plugin automatically creates release notes based on your commits. It converts commit messages into readable changelog entries.

## Key Options

### `preset` 
Defines which commit message convention to follow (default: "angular")

```js
{
  "preset": "angular"
}
```

### `presetConfig`
Additional configuration for the preset.

Example:
```js
{
  "presetConfig": {
    "types": [
      {"type": "feat", "section": "Features"},
      {"type": "fix", "section": "Bug Fixes"}
    ]
  }
}
```

### `writerOpts`
Options passed to the release notes writer.

Example:
```js
{
  "writerOpts": {
    "groupBy": "type",
    "commitGroupsSort": "title",
    "commitsSort": ["scope", "subject"]
  }
}
```

### `parserOpts`
Options passed to the commit parser.

Example:
```js
{
  "parserOpts": {
    "noteKeywords": ["BREAKING CHANGE", "BREAKING CHANGES"]
  }
}
```

### `linkCompare`, `linkReferences`, `host`, `owner`, `repository`, `commit`, `issue`, `packageContext`
Options for generating links to commits, issues, and repository.

## Practical Examples

1. **Default Behavior (Angular preset)**:

   Given these commits:
   ```
   feat: add user profile page
   fix: correct login error
   docs: update README
   ```

   Generated release notes:
   ```markdown
   # 1.0.0 (2025-05-15)

   ### Features
   
   * add user profile page (abc1234)
   
   ### Bug Fixes
   
   * correct login error (def5678)
   ```

2. **Custom Section Names**:
   ```js
   {
     "presetConfig": {
       "types": [
         {"type": "feat", "section": "✨ New Features"},
         {"type": "fix", "section": "🐛 Bug Fixes"},
         {"type": "docs", "section": "📚 Documentation"}
       ]
     }
   }
   ```

   Generated release notes:
   ```markdown
   # 1.0.0 (2025-05-15)

   ### ✨ New Features
   
   * add user profile page (abc1234)
   
   ### 🐛 Bug Fixes
   
   * correct login error (def5678)
   
   ### 📚 Documentation
   
   * update README (ghi9012)
   ```

3. **Custom Sorting and Grouping**:
   ```js
   {
     "writerOpts": {
       "groupBy": "scope",
       "commitGroupsSort": "title",
       "commitsSort": ["subject"]
     }
   }
   ```

   Given these commits:
   ```
   feat(ui): add button component
   fix(ui): fix button styling
   feat(api): add user endpoint
   ```

   Generated release notes:
   ```markdown
   # 1.0.0 (2025-05-15)

   ### api
   
   * add user endpoint (abc1234)
   
   ### ui
   
   * add button component (def5678)
   * fix button styling (ghi9012)
   ```

4. **Custom Repository Links**:
   ```js
   {
     "host": "github.com",
     "owner": "your-username",
     "repository": "your-project",
     "linkCompare": true,
     "linkReferences": true
   }
   ```

   Generated release notes with clickable links to commits and issues:
   ```markdown
   # [1.0.0](https://github.com/your-username/your-project/compare/v0.9.0...v1.0.0) (2025-05-15)

   ### Features
   
   * add user profile page ([abc1234](https://github.com/your-username/your-project/commit/abc1234))
   * close [#123](https://github.com/your-username/your-project/issues/123)
   ```

The plugin is highly customizable, allowing you to tailor your release notes to match your project's specific needs and style.