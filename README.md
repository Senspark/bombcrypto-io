# bombcrypto-io

Official landing page / marketing website for **[BombCrypto](https://bombcrypto.io)** — built with React, TypeScript, and Web3.

---

## Tech Stack

- [Create React App](https://create-react-app.dev/) (via [`react-app-rewired`](https://github.com/timarney/react-app-rewired)) + TypeScript
- [React Bootstrap](https://react-bootstrap.github.io/) + [Styled Components](https://styled-components.com/) for UI
- [Web3.js](https://web3js.org/) for on-chain interactions (BSC / Polygon)
- [Firebase](https://firebase.google.com/) Analytics

---

## Quick Start

```bash
yarn install       # install dependencies
yarn start         # run dev server (http://localhost:3000)
yarn build          # production build → build/
```

Other scripts:

```bash
yarn lint           # eslint --fix on src/**/*.{ts,tsx}
yarn test           # react-scripts test
```

---

## Project Structure

```
src/
├── pages/          # route-level pages (Home, Bcoin, Faq, GettingStart, WorldCup, ...)
├── components/      # shared UI components
├── contracts/        # smart contract ABIs / bindings
├── configs/          # chain list, token & contract configs
├── data/             # static content (FAQ, socials, notifications, ...)
├── libs/              # firebase, analytics, other integrations
├── services/          # API / web3 service layer
└── theme/             # global styles & theme
```

---

## Contributing

Contributions are welcome! Please read the [Contributor License Agreement](CLA.md) before submitting a pull request — by submitting a contribution you agree to its terms.

1. Fork the repo and create your branch from `main`
2. Run `yarn lint` before committing
3. Open a pull request describing your change

---

## Deployment

This site is deployed as a static build. Changes must not require a server at
runtime — no SSR, no API routes, no server process of any kind.

Every pull request runs a CI check (`build`): typecheck + production build.
Merging to `main` publishes the site automatically — there is no manual deploy step.

Files under `public/` are served with their filename unchanged and a long cache
lifetime. When you change the *contents* of one, rename it as well
(`newHero.webm` -> `newHero-v2.webm`) and update the reference — otherwise
visitors keep the old file for up to 30 days. Bundles under `static/` are
content-hashed by the build, so they need no such care.

---

## License

Licensed under the [GNU Affero General Public License v3.0](LICENSE).
