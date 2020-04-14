# Yukkuricraft's Info Page
Can be found at [info.yukkuricraft.net](https://info.yukkuricraft.net)

This is a github hosted page parked on our subdomain.

## Notes
- Do not remove the `dist/CNAME` file. This is necessary to set the Github pages CNAME so we can serve it over info.yc. The rest of the files are built into `dist/` via Github Action workflows using `src/`
- Workflow is defined in `.github/workflows/main.yml`
- Workflow deploys to branch `gh-pages` if commit is pushed to `master`.
- Workflow deploys to branch `gh-pages-dev` if commit is pushed to `dev`.
