# Parameters and design rationales

Broke Street Bets | Mentor: Prof. TV Ramanathan

Tables reproduce the presentation and existing study outputs. Fixed design rationales describe intended roles; they do not imply that these values were optimized.

## Sample construction and screening

| Choice | Setting | Design rationale |
|---|---|---|
| Training sample | Longest joint contiguous block; earliest tie | Avoid interpolation and inconsistent lags |
| Minimum levels: D / W / M | 252 / 52 / 36 observations | Retain a basic estimation history |
| Difference lags: D / W / M | 5 / 2 / 2; HAC bandwidth matches lag | Represent short-run dependence consistently |
| Pair selection | Engle--Granger raw $p<0.05$ | Broad exploratory relationship screen |
| Integration and multiplicity | ADF/KPSS; BH/BY, BH $q\leq0.10$ | Report diagnostic context separately |
| Correction reference family | 80,000 directions per horizon/test | Preserve the full universe denominator |

Sources: `config/relaxed_v4.json`, `code/frequentist_v4.py`.

## Bayesian model and priors

| Parameter / convention | Specification | Design rationale |
|---|---|---|
| $z_t=(s_t,x_t)^\top$ | Log stock; log hub when positive in training | Represent proportional changes |
| Native-level hub scaling | Training mean and population SD only | Normalize native-level variation |
| Long-run slope $b$ | $N(1,0.5^2)$ | Baseline slope regularization |
| Equilibrium intercept $m$ | $N(0,1^2)$ | Allow an equilibrium offset |
| Adjustment vector $a$ | $N(0,0.1^2)$ componentwise | Shrink toward slow adjustment |
| Short-run effects $\Gamma_j$ | $N(0,0.2^2)$ componentwise | Limit lag-effect dispersion |
| Noise scales $\sigma_s,\sigma_x$ | Half-Normal$(0.1)$; diagonal covariance | Positive error scales |
| Rank and lag order | Rank one; $L=5/2/2$ (D/W/M) | Match the bivariate baseline |

Sources: `code/bayes_v4.py`, `config/relaxed_v4.json`.

## Posterior estimation and diagnostics

| Choice | Value | Design rationale |
|---|---|---|
| Sampler | NUTS; 2 chains | Assess between-chain agreement |
| Retained draws | 2,000 per chain | Estimate posterior summaries and intervals |
| Warm-up; acceptance target | 1,000; 0.90 | Adapt proposals conservatively |
| One diagnostic retry | 2,000 warm-up; target 0.95 | Address difficult posterior geometry |
| Convergence | $\widehat R\leq1.01$ | Require close between-chain agreement |
| Bulk and tail ESS | $\geq400$ for both | Require usable effective sample sizes |
| Energy diagnostic | BFMI $\geq0.30$ in each chain | Check exploration of energy levels |
| Divergences | Zero | Reject unresolved numerical trajectories |
| Intervals; predictive draws | 95\% HDI; 500 predictive draws | Summarize uncertainty and training fit |
| Likelihood verification | 100 prior points; QR relative SSE error $\leq10^{-10}$ | Check exact likelihood computation |

Sources: `code/bayes_v4.py`.

## Regime definitions 1-5

| Dimension | States and classification | Design rationale |
|---|---|---|
| 1. Latent volatility | Low / high: filtered $P(\mathrm{high})\geq0.50$ | Two interpretable states |
| 2. Equity market | Bear / stable / bull: Nifty 60-session return; cuts $\pm5\%$ | Separate trend and range |
| 3. Monetary policy | Easing / hold / tightening: latest published RBI MPC cut, unchanged decision or hike | Include unchanged decisions |
| 4. Inflation momentum | Falling / stable / rising: CPI YoY release change; cuts $\pm0.25$ pp | Ignore small release changes |
| 5. Economic growth | Contraction / stable / expansion: IIP YoY first release; cuts $\pm1$ pp | Allow neutral growth |

Sources: `config/regime_definitions.yaml`, `results/regimes/external_v2/manifest.json`.

## Macroeconomic signal timing

| Timing rule | Value | Design rationale |
|---|---|---|
| CPI/IIP maximum age | 75 calendar days | Expire stale releases |
| Label to position | Next native observation | Use prior information |

Sources: `results/regimes/external_v2/manifest.json`, `config/phase7_delivery.json`.

## Regime definitions 6-10

| Dimension | States and classification | Design rationale |
|---|---|---|
| 6. INR pressure | Appreciation / range / depreciation: prior-date USD/INR, 20-session return, cuts $\pm1\%$ | Measure medium-term currency pressure |
| 7. Commodity cycle | Falling / range / rising: 60-session agriculture/metals/energy factor; training $q_{.33},q_{.67}$; minimum 252 training observations | Balance categories; exclude inadequate history |
| 8. Rates/liquidity | Loose / neutral / tight: overnight call minus repo; training cuts $-0.82,-0.74$ pp ($n=376$); max age 7 days | Compare funding conditions with the policy rate |
| 9. Risk sentiment | Risk on / neutral / risk off: VIX versus prior 252-session $q_{.25},q_{.75}$; require 252 observations | Adapt thresholds to the prior annual distribution |
| 10. Network leadership | Stock led / diffuse / hub led: 252 consecutive levels; update every 20 sessions; lag/HAC 5; raw $p<.05$; at least 3 links; balance cuts $\pm0.20$ | Require persistent, sufficiently populated direction counts |

Sources: `config/regime_definitions.yaml`, `results/regimes/external_v2/manifest.json`.

## MS-GARCH interpretation

| Element | Specification and interpretation |
|---|---|
| Input | Training-standardized stock-equation innovations; model variance after the mean dynamics |
| Observation density | Zero-mean Gaussian mixture; two parsimonious variance states |
| State ordering | $\omega_s/(1-\alpha_s-\beta_s)$ proxy; resolve state labels by relative variance |
| Forecast timing | Prior probabilities predict returns; the current innovation updates the filtered state |

Sources: `code/phase7_msgarch.py`.

## MS-GARCH estimation and diagnostics

| Choice | Setting | Design rationale |
|---|---|---|
| Optimizer | L-BFGS-B; 300 iterations/start | Stable bounded estimation |
| Initial MS coordinates | \makecell[l]{$(-3,-.5,-2,-1,1,2,2,2)$\\$(-2,-1,-1,-2,2,1,3,3)$} | Check two initializations |
| Variance intercept | $e^{-15}\leq\omega_s\leq e^6$ (numerical transform) | Positive finite variances |
| ARCH / persistence | $\alpha_s<0.35$; $\alpha_s+\beta_s<0.995$ | Constrain shock persistence |
| State transitions | $0.60<p_{LL},p_{HH}<0.999$ | Persistent but finite states |
| Min. innovations: D/W/M | 100 / 60 / 24 | Minimum fitting history |
| Diagnostic gates | Convergence; ADF $p<.05$; occupancy 3--97\%; ratio $\geq1.05$ | Reject degenerate solutions |
| One-state starts | $(-2,-2,2)$ and $(-1,-1,1)$ | Match benchmark estimation |
| Gaps / holdout | Reset on gaps; restart holdout in 2022 | Avoid unobserved lag links |
| Score uncertainty | 1,000 date blocks; seed 251026; lengths 20/4/2 (D/W/M) | Account for dated dependence |

Sources: `config/phase7.json`, `config/phase7_single_state_baseline.json`, `code/phase7_msgarch.py`, `code/compare_phase7_garch.py`.

## Synthetic hedge parameters

| Choice | Value | Design rationale |
|---|---|---|
| Beta estimation | 60 / 26 / 12 (D/W/M); clip $[-3,3]$ | Bound recent exposure |
| Annualization / RF | 252 / 52 / 12; zero risk-free rate | Native-horizon comparability |
| Proxy costs | 5 bp per unit hedge change, including entry/exit | Common cost proxy |
| Minimum observations | 30 / 12 / 6 (D/W/M) | Minimum metric history |
| Signal timing | Prior beta / probability / regime; next return | Prevent current-return signals |
| Gaps / insolvency | Flat restart; costs; zero wealth after return $\leq-100\%$ | Respect missing observations |

Sources: `config/phase7_delivery.json`.

## Illustrative regime exposure map

| Regime condition | Favorable | Neutral | Adverse |
|---|---|---|---|
| Hedge multiplier | 0.25 | 0.50 | 1.00 |

Sources: `config/phase7_delivery.json`.

## Full configured regime multiplier map

| Dimension | State | Hedge multiplier |
|---|---|---|
| market | bull | 0.25 |
| market | stable | 0.50 |
| market | bear | 1.00 |
| policy | easing | 0.25 |
| policy | hold | 0.50 |
| policy | tightening | 1.00 |
| inflation | falling | 0.25 |
| inflation | stable | 0.50 |
| inflation | rising | 1.00 |
| growth | expansion | 0.25 |
| growth | stable | 0.50 |
| growth | contraction | 1.00 |
| fx | appreciation | 0.25 |
| fx | range | 0.50 |
| fx | depreciation | 1.00 |
| commodity | falling | 0.25 |
| commodity | range | 0.50 |
| commodity | rising | 1.00 |
| liquidity | loose | 0.25 |
| liquidity | neutral | 0.50 |
| liquidity | tight | 1.00 |
| risk | risk_on | 0.25 |
| risk | neutral | 0.50 |
| risk | risk_off | 1.00 |
| leadership | hub_led | 0.25 |
| leadership | diffuse | 0.50 |
| leadership | stock_led | 1.00 |

Commodity and leadership mappings have no test application because valid test labels are unavailable. Their definitions remain documented.

## Numerical and uncertainty conventions

| Setting | Value | Role |
|---|---|---|
| Prior predictive verification | 100 seeded draws | Finite-value and exact QR likelihood checks |
| Companion impulse horizon | Up to 1,200 native periods | Check monotonicity and half-life crossing |
| Companion unit/stability tolerance | 1e-6 | Separate one unit root from transitory roots |
| Monotonicity tolerance | 1e-9 | Allow numerical round-off in impulse checks |
| MS-GARCH variance floor | 1e-10 | Keep filter densities finite |
| Logistic coordinate clipping | [-30, 30] | Avoid numerical overflow |
| Date-block resampling | 1,000 draws, seed 251026 | Conditional observation-weighted score intervals |
| Unrun CPI candidates | 0.10, 0.25, 0.50 pp | Recorded design alternatives; no search executed |
| Unrun IIP candidates | 0, 1, 2 pp | Recorded design alternatives; no search executed |
