# Broke Street Bets Observatory

Interactive research dashboard for Bayesian error-correction models, directional causality networks, and two-state MS-GARCH volatility analysis.

## Live website

https://krrish2709.github.io/broke-street-bets-observatory/

## Research snapshot

80 hubs, 500 equities, 3,751 selected pair-frequency records across daily, weekly and monthly horizons, and 30,008 directional diagnostic records. Data through 23 October 2026. Missing states, diagnostic failures and source flags are retained.

The MS-GARCH explorer includes conditional volatility, state probabilities, synthetic wealth, full model diagnostics, aggregate graphs and parameter/rationale tables. Causality Nets supports whole-network and hub-and-spoke views, test families, evidence thresholds and downloadable records. Both workspaces support light and dark themes.

## Team

**Broke Street Bets**: Krrish Singhania, Mukund Saraf, Adyant Jha, Shourrya Gupta, Sahil Patel. Mentor: **Prof. TV Ramanathan**.

## Publishing

The GitHub Actions workflow publishes only `public/` to Pages when `main` changes or the workflow is manually dispatched. No application backend, external data connector, credentials or dependency installation is required. Keep the full static snapshot together; the website loads pair records on demand. GitHub Pages has a 1 GB published-site limit; the current snapshot is approximately 997 MB.

Directional predictability does not identify structural causality. The one-state comparison is mixed across horizons. Wealth highlights are retrospective synthetic examples. Commodity and leadership regimes have no valid test labels; provisional macro overlays and other limitations are described inside the website.
