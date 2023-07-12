module.exports = {
  '*.{ts, tsx, js, jsx}': ['eslint src  --fix', 'git add --force'],
  '*.{json, md}': ['prettier --write', 'git add --force'],
}
