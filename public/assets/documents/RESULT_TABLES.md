# Research result tables

Broke Street Bets | Mentor: Prof. TV Ramanathan

Tables reproduce the presentation and existing study outputs. Fixed design rationales describe intended roles; they do not imply that these values were optimized.

## Study universe

| Element | Specification | Role |
|---|---|---|
| Equities | 500 Indian companies | Stock-price responses |
| Hubs | 80 commodity and contextual series | Agriculture, metals, energy, FX, rates and macro |
| Potential pairs | 40,000 per horizon | Full cross-product of hubs and equities |
| Observation period | January 2014--23 October 2026 | Daily, weekly and monthly analyses |
| Data availability | 37 hubs (daily/weekly); 73 (monthly) | Available histories vary by horizon |
| Sources | LSEG Workspace; RBI, MoSPI, PIB and price archives | Market and macroeconomic histories |

Sources: `data/universe/hubs_80_metadata.csv`, `data/universe/stocks_500.csv`.

## Bayesian outcomes

| Horizon | Attempted | Sampler pass | Sampler fail | Equilibrium support |
|---|---|---|---|---|
| Daily | 561 | 264 | 297 | 40 |
| Weekly | 1,247 | 716 | 531 | 140 |
| Monthly | 1,943 | 1,014 | 929 | 66 |
| Total | 3,751 | 1,994 | 1,757 | 246 |

Sources: `results/relaxed_v4/vecm/model_summary.parquet`.

## Directional test results

| Horizon | Granger $p<.05$ | Granger BH | ECM short run | ECM adjustment | Market control |
|---|---|---|---|---|---|
| Daily | 281 | 60 | 270 | 678 | 122 |
| Weekly | 232 | 27 | 306 | 1,477 | 227 |
| Monthly | 521 | 91 | 432 | 2,088 | 414 |

Sources: `results/relaxed_v4/frequentist_summary.json`.

## Network structure

| Horizon | Raw-p links | Active nodes | Isolated nodes | Largest component |
|---|---|---|---|---|
| Daily | 281 | 154 | 426 | 154 |
| Weekly | 232 | 149 | 431 | 134 |
| Monthly | 521 | 227 | 353 | 227 |

Sources: `results/network/network_statistics.csv`.

## Leading hub directions

| Horizon | Largest outgoing hub | Links | Largest incoming hub | Links |
|---|---|---|---|---|
| Daily | INREUR=R | 24 | .WLS | 42 |
| Weekly | INREUR=R | 19 | INRCHF=R | 12 |
| Monthly | C-CROP-EBP | 49 | CXNTCL55NTLD | 33 |

Sources: `results/network/node_degrees.csv`.

## Largest category-sector cells

| Horizon | Hub category | Equity sector | Directed links |
|---|---|---|---|
| Daily | Foreign exchange | Banking Services | 29 |
| Weekly | Foreign exchange | Automobiles \& Auto Parts | 23 |
| Monthly | Foreign exchange | Automobiles \& Auto Parts | 26 |

Sources: `results/network/edges.parquet`, `results/network/nodes.parquet`.

## Supplied macro snapshot coverage

| Series | CPI | WPI | IIP | Repo | PMI | Unemployment | Credit spread |
|---|---|---|---|---|---|---|---|
| Available months | 151 | 153 | 152 | 154 | 92 | 18 | 9 |

Sources: `results/regimes/user_csv_v3/coverage.csv`.

## Lagged test-label coverage

| Vol. | Market | Policy | CPI | IIP | FX | Comm. | Liquidity | Risk | Leader. |
|---|---|---|---|---|---|---|---|---|---|
| 99.4\% | 99.4\% | 99.4\% | 96.6\% | 99.4\% | 99.1\% | 0.0\% | 96.9\% | 99.4\% | 0.0\% |

Sources: `results/msgarch/delivery/dimension_coverage.csv`.

## Daily MS-GARCH outcomes

| Selected pairs | Bayesian fail | MS pass | MS fail | History error | Test obs. |
|---|---|---|---|---|---|
| 561 | 297 | 262 | 2 | 0 | 173,953 |

Sources: `results/msgarch/pair_inventory.parquet`, `results/msgarch/single_state_baseline/test_horizon_summary.csv`.

## Weekly MS-GARCH outcomes

| Selected pairs | Bayesian fail | MS pass | MS fail | History error | Test obs. |
|---|---|---|---|---|---|
| 1,247 | 531 | 653 | 62 | 1 | 92,100 |

Sources: `results/msgarch/pair_inventory.parquet`, `results/msgarch/single_state_baseline/test_horizon_summary.csv`.

## Monthly MS-GARCH outcomes

| Selected pairs | Bayesian fail | MS pass | MS fail | History error | Test obs. |
|---|---|---|---|---|---|
| 1,943 | 929 | 757 | 257 | 0 | 24,157 |

Sources: `results/msgarch/pair_inventory.parquet`, `results/msgarch/single_state_baseline/test_horizon_summary.csv`.

## Test log scores and calibration

| Horizon | Pair mean $\Delta$ | Obs. mean $\Delta$ | 95\% block interval | MS coverage | GARCH coverage |
|---|---|---|---|---|---|
| Daily | -0.0259 | -0.0264 | [-0.0329, -0.0188] | 93.93\% | 94.28\% |
| Weekly | +0.0070 | +0.0053 | [-0.0015, +0.0135] | 95.24\% | 95.00\% |
| Monthly | +0.0223 | +0.0247 | [+0.0094, +0.0431] | 93.94\% | 93.94\% |

Sources: `results/msgarch/single_state_baseline/test_horizon_summary.csv`, `results/msgarch/delivery/calibration_summary.csv`.

## Matched volatility-rule strategy results

| Horizon | Price-like pairs | Unhedged Sharpe | Full hedge Sharpe | MS-volatility Sharpe |
|---|---|---|---|---|
| Daily | 226 | 0.123 | 0.080 | 0.062 |
| Weekly | 545 | 0.140 | 0.184 | 0.176 |
| Monthly | 483 | 0.282 | 0.319 | 0.280 |

Sources: `results/msgarch/delivery/hedge_summary.csv`.

## Daily highlighted matched strategies

| Strategy | Obs. | Sharpe | Growth of 1 | Ann. growth | Max. drawdown |
|---|---|---|---|---|---|
| Unhedged stock | 424 | 2.061 | 2.458 | 70.7\% | -12.2\% |
| Full rolling hedge | 424 | 2.269 | 2.735 | 81.8\% | -11.0\% |
| MS-volatility hedge | 424 | 2.200 | 2.629 | 77.6\% | -11.0\% |

Sources: `results/msgarch/pair_level_metrics.csv`, `results/msgarch/delivery/presentation_best_wealth_examples.csv`.

## Weekly highlighted matched strategies

| Strategy | Obs. | Sharpe | Growth of 1 | Ann. growth | Max. drawdown |
|---|---|---|---|---|---|
| Unhedged stock | 82 | 1.830 | 3.154 | 107.2\% | -24.6\% |
| Full rolling hedge | 82 | 1.756 | 3.052 | 102.9\% | -18.0\% |
| MS-volatility hedge | 82 | 1.812 | 3.136 | 106.4\% | -18.7\% |

Sources: `results/msgarch/pair_level_metrics.csv`, `results/msgarch/delivery/presentation_best_wealth_examples.csv`.

## Monthly highlighted matched strategies

| Strategy | Obs. | Sharpe | Growth of 1 | Ann. growth | Max. drawdown |
|---|---|---|---|---|---|
| Unhedged stock | 33 | 1.747 | 8.346 | 116.3\% | -35.5\% |
| Full rolling hedge | 33 | 1.912 | 10.088 | 131.7\% | -28.3\% |
| MS-volatility hedge | 33 | 1.809 | 8.791 | 120.4\% | -35.1\% |

Sources: `results/msgarch/pair_level_metrics.csv`, `results/msgarch/delivery/presentation_best_wealth_examples.csv`.

## Research conclusions

| Finding | Evidence | Interpretation / qualification |
|---|---|---|
| Directional relationships | 1,034 raw-p; 178 BH links | Exploratory predictive links |
| Bayesian mean dynamics | 1,994 sampler passes; 246 support cases | Convergence is not cointegration |
| Volatility modelling | 1,672 MS passes; 290,210 test innovations | Regime identification is often weak |
| Predictive comparison | Daily $-0.026$; weekly $+0.007$; monthly $+0.022$ pair-mean gain | No uniform predictive advantage |
| Regime coverage | 8 testable dimensions; 2 without valid labels | No joint ten-dimension test |
| Wealth illustrations | 3 horizon-specific examples | Historical, selected illustrations |

Sources: `results/relaxed_v4/frequentist_summary.json`, `results/relaxed_v4/vecm/completion.json`, `results/msgarch/final_comparison_audit.json`, `results/msgarch/single_state_baseline/test_horizon_summary.csv`.

## All available regime-strategy comparisons

| Horizon | Dimension | Strategy | Pairs | Finite Sharpe | Insolvent | Median Sharpe | Median ann. growth | Median max. drawdown |
|---|---|---|---:|---:|---:|---:|---:|---:|
| daily | fx | full_hedge | 226 | 223 | 3 | 0.080319 | -0.036902 | -0.406840 |
| daily | fx | overlay | 226 | 226 | 0 | 0.083781 | -0.026835 | -0.394116 |
| daily | fx | unhedged | 226 | 226 | 0 | 0.122754 | -0.010480 | -0.383309 |
| daily | fx | volatility | 226 | 226 | 0 | 0.062050 | -0.028795 | -0.396872 |
| daily | growth | full_hedge | 226 | 223 | 3 | 0.080319 | -0.036902 | -0.406840 |
| daily | growth | overlay | 226 | 226 | 0 | 0.124150 | -0.013275 | -0.391570 |
| daily | growth | unhedged | 226 | 226 | 0 | 0.122754 | -0.010480 | -0.383309 |
| daily | growth | volatility | 226 | 226 | 0 | 0.062050 | -0.028795 | -0.396872 |
| daily | inflation | full_hedge | 226 | 223 | 3 | 0.080319 | -0.036902 | -0.406840 |
| daily | inflation | overlay | 226 | 226 | 0 | 0.074945 | -0.026061 | -0.394868 |
| daily | inflation | unhedged | 226 | 226 | 0 | 0.122754 | -0.010480 | -0.383309 |
| daily | inflation | volatility | 226 | 226 | 0 | 0.062050 | -0.028795 | -0.396872 |
| daily | liquidity | full_hedge | 226 | 223 | 3 | 0.186491 | -0.011345 | -0.387189 |
| daily | liquidity | overlay | 226 | 226 | 0 | 0.196215 | 0.010907 | -0.368825 |
| daily | liquidity | unhedged | 226 | 226 | 0 | 0.236794 | 0.024247 | -0.356092 |
| daily | liquidity | volatility | 226 | 226 | 0 | 0.195645 | 0.010952 | -0.368825 |
| daily | market | full_hedge | 226 | 223 | 3 | 0.080319 | -0.036902 | -0.406840 |
| daily | market | overlay | 226 | 226 | 0 | 0.083809 | -0.022005 | -0.392303 |
| daily | market | unhedged | 226 | 226 | 0 | 0.122754 | -0.010480 | -0.383309 |
| daily | market | volatility | 226 | 226 | 0 | 0.062050 | -0.028795 | -0.396872 |
| daily | policy | full_hedge | 226 | 223 | 3 | 0.080319 | -0.036902 | -0.406840 |
| daily | policy | overlay | 226 | 226 | 0 | 0.089640 | -0.022005 | -0.394169 |
| daily | policy | unhedged | 226 | 226 | 0 | 0.122754 | -0.010480 | -0.383309 |
| daily | policy | volatility | 226 | 226 | 0 | 0.062050 | -0.028795 | -0.396872 |
| daily | risk | full_hedge | 226 | 223 | 3 | 0.080319 | -0.036902 | -0.406840 |
| daily | risk | overlay | 226 | 226 | 0 | 0.083340 | -0.021964 | -0.393997 |
| daily | risk | unhedged | 226 | 226 | 0 | 0.122754 | -0.010480 | -0.383309 |
| daily | risk | volatility | 226 | 226 | 0 | 0.062050 | -0.028795 | -0.396872 |
| daily | volatility | full_hedge | 226 | 223 | 3 | 0.080319 | -0.036902 | -0.406840 |
| daily | volatility | unhedged | 226 | 226 | 0 | 0.122754 | -0.010480 | -0.383309 |
| daily | volatility | volatility | 226 | 226 | 0 | 0.062050 | -0.028795 | -0.396872 |
| monthly | fx | full_hedge | 483 | 482 | 1 | 0.319139 | 0.048970 | -0.403847 |
| monthly | fx | overlay | 483 | 483 | 0 | 0.265621 | 0.033513 | -0.366967 |
| monthly | fx | unhedged | 483 | 483 | 0 | 0.281947 | 0.036009 | -0.360894 |
| monthly | fx | volatility | 483 | 483 | 0 | 0.280369 | 0.037757 | -0.366818 |
| monthly | growth | full_hedge | 483 | 482 | 1 | 0.319139 | 0.048970 | -0.403847 |
| monthly | growth | overlay | 483 | 483 | 0 | 0.283467 | 0.035757 | -0.362549 |
| monthly | growth | unhedged | 483 | 483 | 0 | 0.281947 | 0.036009 | -0.360894 |
| monthly | growth | volatility | 483 | 483 | 0 | 0.280369 | 0.037757 | -0.366818 |
| monthly | inflation | full_hedge | 483 | 482 | 1 | 0.431110 | 0.096087 | -0.380266 |
| monthly | inflation | overlay | 483 | 483 | 0 | 0.445464 | 0.097031 | -0.360995 |
| monthly | inflation | unhedged | 483 | 483 | 0 | 0.457306 | 0.091224 | -0.360894 |
| monthly | inflation | volatility | 483 | 483 | 0 | 0.434249 | 0.096020 | -0.362306 |
| monthly | liquidity | full_hedge | 483 | 482 | 1 | 0.319139 | 0.048970 | -0.403847 |
| monthly | liquidity | overlay | 483 | 483 | 0 | 0.280369 | 0.037757 | -0.366818 |
| monthly | liquidity | unhedged | 483 | 483 | 0 | 0.281947 | 0.036009 | -0.360894 |
| monthly | liquidity | volatility | 483 | 483 | 0 | 0.280369 | 0.037757 | -0.366818 |
| monthly | market | full_hedge | 483 | 482 | 1 | 0.319139 | 0.048970 | -0.403847 |
| monthly | market | overlay | 483 | 483 | 0 | 0.269915 | 0.034198 | -0.367852 |
| monthly | market | unhedged | 483 | 483 | 0 | 0.281947 | 0.036009 | -0.360894 |
| monthly | market | volatility | 483 | 483 | 0 | 0.280369 | 0.037757 | -0.366818 |
| monthly | policy | full_hedge | 483 | 482 | 1 | 0.319139 | 0.048970 | -0.403847 |
| monthly | policy | overlay | 483 | 483 | 0 | 0.282385 | 0.036294 | -0.365418 |
| monthly | policy | unhedged | 483 | 483 | 0 | 0.281947 | 0.036009 | -0.360894 |
| monthly | policy | volatility | 483 | 483 | 0 | 0.280369 | 0.037757 | -0.366818 |
| monthly | risk | full_hedge | 483 | 482 | 1 | 0.319139 | 0.048970 | -0.403847 |
| monthly | risk | overlay | 483 | 483 | 0 | 0.278066 | 0.036719 | -0.366381 |
| monthly | risk | unhedged | 483 | 483 | 0 | 0.281947 | 0.036009 | -0.360894 |
| monthly | risk | volatility | 483 | 483 | 0 | 0.280369 | 0.037757 | -0.366818 |
| monthly | volatility | full_hedge | 483 | 482 | 1 | 0.319139 | 0.048970 | -0.403847 |
| monthly | volatility | unhedged | 483 | 483 | 0 | 0.281947 | 0.036009 | -0.360894 |
| monthly | volatility | volatility | 483 | 483 | 0 | 0.280369 | 0.037757 | -0.366818 |
| weekly | fx | full_hedge | 545 | 545 | 0 | 0.184209 | 0.001632 | -0.402547 |
| weekly | fx | overlay | 545 | 545 | 0 | 0.173765 | -0.006291 | -0.399459 |
| weekly | fx | unhedged | 545 | 545 | 0 | 0.139989 | -0.010679 | -0.391389 |
| weekly | fx | volatility | 545 | 545 | 0 | 0.175656 | -0.003100 | -0.399667 |
| weekly | growth | full_hedge | 545 | 545 | 0 | 0.184209 | 0.001632 | -0.402547 |
| weekly | growth | overlay | 545 | 545 | 0 | 0.172735 | -0.009392 | -0.392769 |
| weekly | growth | unhedged | 545 | 545 | 0 | 0.139989 | -0.010679 | -0.391389 |
| weekly | growth | volatility | 545 | 545 | 0 | 0.175656 | -0.003100 | -0.399667 |
| weekly | inflation | full_hedge | 545 | 545 | 0 | 0.267577 | 0.030802 | -0.388453 |
| weekly | inflation | overlay | 545 | 545 | 0 | 0.266156 | 0.023459 | -0.372035 |
| weekly | inflation | unhedged | 545 | 545 | 0 | 0.232701 | 0.020052 | -0.372261 |
| weekly | inflation | volatility | 545 | 545 | 0 | 0.279274 | 0.030219 | -0.376481 |
| weekly | liquidity | full_hedge | 545 | 545 | 0 | 0.335751 | 0.057247 | -0.390900 |
| weekly | liquidity | overlay | 545 | 545 | 0 | 0.293683 | 0.040002 | -0.381941 |
| weekly | liquidity | unhedged | 545 | 545 | 0 | 0.306697 | 0.042483 | -0.374245 |
| weekly | liquidity | volatility | 545 | 545 | 0 | 0.293683 | 0.040002 | -0.381941 |
| weekly | market | full_hedge | 545 | 545 | 0 | 0.184209 | 0.001632 | -0.402547 |
| weekly | market | overlay | 545 | 545 | 0 | 0.168655 | -0.002255 | -0.397454 |
| weekly | market | unhedged | 545 | 545 | 0 | 0.139989 | -0.010679 | -0.391389 |
| weekly | market | volatility | 545 | 545 | 0 | 0.175656 | -0.003100 | -0.399667 |
| weekly | policy | full_hedge | 545 | 545 | 0 | 0.184209 | 0.001632 | -0.402547 |
| weekly | policy | overlay | 545 | 545 | 0 | 0.172237 | 0.000490 | -0.393962 |
| weekly | policy | unhedged | 545 | 545 | 0 | 0.139989 | -0.010679 | -0.391389 |
| weekly | policy | volatility | 545 | 545 | 0 | 0.175656 | -0.003100 | -0.399667 |
| weekly | risk | full_hedge | 545 | 545 | 0 | 0.184209 | 0.001632 | -0.402547 |
| weekly | risk | overlay | 545 | 545 | 0 | 0.157754 | -0.002823 | -0.399918 |
| weekly | risk | unhedged | 545 | 545 | 0 | 0.139989 | -0.010679 | -0.391389 |
| weekly | risk | volatility | 545 | 545 | 0 | 0.175656 | -0.003100 | -0.399667 |
| weekly | volatility | full_hedge | 545 | 545 | 0 | 0.184209 | 0.001632 | -0.402547 |
| weekly | volatility | unhedged | 545 | 545 | 0 | 0.139989 | -0.010679 | -0.391389 |
| weekly | volatility | volatility | 545 | 545 | 0 | 0.175656 | -0.003100 | -0.399667 |

## Complete pair-level records

- Bayesian estimates: `results/relaxed_v4/vecm/parameter_summary.parquet` and per-horizon parameter CSVs.
- All MS-GARCH parameters and dispositions: `results/msgarch/fit_parameters.parquet`, `fit_diagnostics.csv`.
- Every measured synthetic strategy: `results/msgarch/pair_level_metrics.csv` (38,874 rows).
- Full directional diagnostics: `results/regimes/phase4_directional_all.parquet` (30,008 rows).
- Interactive views: `html/msgarch_explorer.html`, `network_full.html`, `hub_spoke.html`.
