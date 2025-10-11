# HTML/CSS/JS Playground (GitHub Pages + Auto Index)

This repository is a lightweight playground for practicing frontend (HTML/CSS/JS) projects.

[Live Demo](https://ngmikeng.github.io/js-study-playground/)

## Features
- Root `index.html` is automatically generated to list all subfolders that contain their own `index.html`.
- A GitHub Action runs on every push to `main` to regenerate and commit `index.html`.
- Designed to be deployed with GitHub Pages (root of `main` branch).

## How to use
1. Clone this repo.
2. Add a new folder (e.g. `my-widget/`) containing an `index.html`.
3. Push to GitHub. The GitHub Action will run and update the root `index.html`.
4. Enable GitHub Pages in the repository settings:
   - **Source**: Deploy from branch
   - **Branch**: `main`
   - **Folder**: `/ (root)`

## Local test
- You can run the generator locally:
  ```bash
  node generateIndex.js
  ```
- That will create/update `index.html` at the repo root.

## Notes
- The workflow triggers on pushes to `main`. If you use a different default branch, update `.github/workflows/update-index.yml`.
- The action commits `index.html` back to the repo using the default `GITHUB_TOKEN`.
