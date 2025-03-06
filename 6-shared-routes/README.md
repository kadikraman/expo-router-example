# Expo starter

A plain project with the usual suspects set up:

- Expo Router
- Nativewind
- ESLint & Prettier
- TypeScript

It also contains two components:
- `src/components/AppText.tsx` for text
- `src/components/Button.tsx` for 3 button variants

And one utility:
- `src/utils/cn.ts` for merging Tailwind classes

## Start a new project with this template

```sh
git clone git@github.com:kadikraman/expo-starter.git my-app
cd my-app
cd my-app && rm -rf .git && git init && git add . && git commit -m "Initial commit"
bun install # or remove the bun.lock file and use a different package manager
```
