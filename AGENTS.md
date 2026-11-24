# Project AI Rules — AIA Website

## Git Operations
- **Do Not Automate Git Commits or Pushes**: Never run `git commit` or `git push` commands automatically. The user will manually review, stage, commit, and push all code changes themselves.

## Development Principles
- **Apply Ponytail Minimalism**: Read existing files first, reuse before creating, use the minimum that works. Never write a new component, file, or utility if an existing one can be reused or extended with a prop or argument.

## Strict Trailing Slash Policy (Permanent Standard)
- **Universal Strict NO Trailing Slash Policy**:
  - All page and route URLs across the site (`/about-aia`, `/blogs`, `/blogs/:slug`, `/cams`, `/cisa`, `/cfe-curriculum`, `/cia-curriculum`, `/cia-challenge-curriculum`, `/contact`, `/alumni-network`, `/corporate-training`, `/policies`, `/terms-and-conditions`, `/enroll-now`, etc.) must **NEVER** have a trailing slash.
  - The root home page (`/`) is the ONLY route with a trailing slash.
  - All internal links, sitemaps, canonical tags, server rewrites, and client routers must strictly adhere to this standard.

