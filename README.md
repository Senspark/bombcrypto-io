# bombcrypto-io

Official landing page / marketing website for **[BombCrypto](https://bombcrypto.io)** — built with Next.js, TypeScript, and Web3.

---

## Tech Stack

- [Next.js](https://nextjs.org/) (Pages Router) + TypeScript — frontend and backend (`pages/api`)
- [React Bootstrap](https://react-bootstrap.github.io/) + [Styled Components](https://styled-components.com/) for UI
- [Web3.js](https://web3js.org/) for on-chain interactions (BSC / Polygon)
- [Firebase](https://firebase.google.com/) Analytics

---

## Quick Start

```bash
yarn install       # install dependencies
yarn dev           # dev server (http://localhost:3000)
yarn build         # production build → .next/
yarn start         # production server (after yarn build)
```

Other scripts:

```bash
yarn lint           # eslint --fix on **/*.{ts,tsx}
yarn test           # react-scripts test
```

All content is static (`src/data/`), so the site can be deployed to any Node
host ([Vercel](https://vercel.com/) and friends) or exported as static files.

---

## Project Structure

```
pages/            # Next.js routes (thin wrappers around src/pages)
src/
├── pages/          # route-level page components (Home, Bcoin, Faq, ...)
├── components/      # shared UI components (components/ui = arcade design system)
├── contracts/         # smart contract ABIs / bindings
├── configs/            # chain list, token & contract configs
├── data/                # static content (FAQ, socials, notifications, ...)
├── libs/                 # firebase, analytics, other integrations
├── services/              # API / web3 service layer
└── theme/                  # global styles & arcade design tokens
```

---

## Contributing

Contributions are welcome! Please read the [Contributor License Agreement](CLA.md) before submitting a pull request — by submitting a contribution you agree to its terms.

1. Fork the repo and create your branch from `main`
2. Run `yarn lint` before committing
3. Open a pull request describing your change

---

## License

Licensed under the [GNU Affero General Public License v3.0](LICENSE).
