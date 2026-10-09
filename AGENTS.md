# KhanaBook Agent Guidelines

## Guidelines for Autonomous Agents & Pair Programmers

- **Branch Stability**: Keep the `main` branch in a healthy, passing state with zero lint or type errors.
- **Git History**: Keep commits atomic, clean, and well-described. Avoid force-pushing to published branches.
- **Verification**: Always run `npm run lint` and `npx tsc --noEmit` before committing code changes.
- **Design Tokens**: Follow the styling tokens in `src/styles.css` and guidelines in `.kiro/steering/design-system.md`.
