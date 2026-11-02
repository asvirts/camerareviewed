# Content plan

Source: Google Keyword Planner export `run1.csv` (October 2025–September 2026). Volumes are Planner buckets, not exact counts. Competition index is 0–100.

Skip local-service queries (`near me`, installers, “who installs”, repair companies). The live site does not sell installation leads.

Five guides are already published. They are the pillars. The backlog favors buyer intent and lower competition. High-competition head terms are included only when they are the natural next page in a cluster, and the note says so.

## Published

| Guide                                             | Primary keyword                                 | Role                                                                            |
| ------------------------------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------- |
| `/security-cameras-without-subscription/`         | security cameras without a subscription         | Pillar. Planner volume 5,000, competition High (100).                           |
| `/outdoor-security-cameras-without-subscription/` | outdoor security cameras without a subscription | Outdoor cluster. Same head-term pattern, High.                                  |
| `/security-cameras-without-wifi/`                 | security cameras that work without Wi-Fi        | Cable vs cellular. Head term “security cameras without wifi” is 5,000, High.    |
| `/ring-subscription/`                             | do you need a Ring subscription                 | Plan explainer. Nearby low-competition cousins are listed below.                |
| `/install-ring-video-doorbell/`                   | how to install a wired Ring video doorbell      | Wired power, not Wi-Fi. “installing ring wired doorbell” is 500, Low, index 16. |

## Backlog

Write these as the same kind of draft: cite the manufacturer page, no hands-on scores, TODO on any product card.

1. **Best video doorbell without a monthly fee.** Keyword `best video doorbell without monthly fee`, 50, Low, index 0. Also `video doorbell no subscription fee` and `subscriptionless video doorbell` (both 50, Low, 0). Slug idea: `/video-doorbell-without-monthly-fee/`. Cluster: doorbells + no subscription.
2. **Wireless security camera system without a monthly fee.** `best wireless security camera system without monthly fee`, 50, Low, 0. Slug: `/wireless-security-camera-system-without-monthly-fee/`.
3. **Arlo without a subscription.** Several Low, index-0 queries at volume 50 (`arlo local recording without subscription`, `arlo pro 4 without subscription`, `arlo video storage without subscription`) plus `arlo without subscription` at 500, Medium, index 43. One page can cover the family. Slug: `/arlo-without-subscription/`.
4. **Blink recording without a subscription.** `blink video recording without subscription` and `blink mini record without subscription` (50, Low, 0). `blink local storage without subscription` is 500, Low, index 28. `blink camera without subscription` is 500 but High. Slug: `/blink-without-subscription/`.
5. **Nest camera recording without a subscription.** 50, Low, index 0. Slug: `/nest-camera-without-subscription/`.
6. **Record a Ring camera without a subscription.** `record ring camera without subscription` and `ring doorbell storage without subscription` (50, Low, 0). `ring camera local storage` is 500, Low, index 11. `ring doorbell local storage` is 500, Low, index 15. Slug: `/ring-camera-local-storage/`. Links to the live Ring plan guide.
7. **Wyze without Cam Plus.** `wyze cam v3 without subscription` and `wyze without subscription` (50, Low). Slug: `/wyze-without-subscription/`.
8. **DIY home security with no monthly fee.** `best diy home security system no monthly fee`, 50, Low, index 16. Slug: `/diy-home-security-no-monthly-fee/`. Keep it about equipment the owner installs, not a contractor marketplace.
9. **Smart security camera, no subscription.** `smart security camera no subscription`, 50, Low, index 29. Slug: `/smart-security-camera-no-subscription/`. Define “smart” as detection and alerts, and say which of those are often the paid line.
10. **Doorbell with no monthly fee (non-“best” variant).** `camera doorbell no monthly fee`, 50, Medium, index 38. Use this as a section or a short companion only if the first doorbell article does not already cover the phrasing. Do not publish two near-duplicate URLs.
11. **SimpliSafe cameras without a subscription.** `simplisafe camera recording without subscription`, 50, Medium, index 40. Slug: `/simplisafe-camera-without-subscription/`.
12. **Wireless outdoor camera without a subscription.** `best wireless security camera outdoor without subscription`, 50, Medium, index 50. Slug: `/wireless-outdoor-camera-without-subscription/`. Differ from the live outdoor guide by staying on battery/Wi-Fi, not PoE.
13. **What Ring costs per month.** `ring doorbell monthly cost`, 5,000, Low, index 29. Also `ring doorbell cost per month` (500, Medium). Slug: `/ring-doorbell-monthly-cost/`. Update the dated prices; do not leave the November 2026 figures as if they were permanent.
14. **Ring doorbell transformer voltage.** `ring wired doorbell voltage`, 50, Low, index 3. Slug: `/ring-doorbell-voltage/`. The wired install guide already quotes Ring’s ranges. This page can be the lookup table only if it adds model-by-model rows and does not paste the install article.
15. **Ring doorbell height.** `best height for ring doorbell`, 50, Low, index 4. Slug: `/ring-doorbell-height/`.
16. **Ring floodlight cam install.** `installing ring floodlight cam`, 500, Low, index 23. Slug: `/install-ring-floodlight-cam/`. Same rules as the doorbell install: Ring’s manual, breaker off, no claim that we mounted one.
17. **Wi-Fi camera with no cloud.** `wifi camera no cloud`, 50, Low, index 29. Slug: `/wifi-camera-no-cloud/`. Different intent from “without Wi-Fi”: the radio stays, the archive does not leave the house.
18. **eufy local storage, model by model.** `eufy local storage`, 500, competition index 74. Not a low-competition win. Write it because the pillar already cites eufy’s support table and readers will ask which model stores where. Slug: `/eufy-local-storage/`.
19. **PoE camera system and NVR.** Head terms (`poe security camera system`, `nvr camera system`) are 5,000 and High. Write one deep guide off the no-Wi-Fi article, not a thin “best PoE” list. Slug: `/poe-security-camera-system/`.
20. **Wired doorbell camera (non-Ring).** `wired doorbell camera`, 5,000, Medium, index 48. Slug: `/wired-doorbell-camera/`. Power, chime, and transformer, with Ring as one case that links to the install guide.

## Clusters

- **No monthly fee:** pillars 1 and the doorbell, wireless-system, Arlo, Blink, Nest, Wyze, SimpliSafe, DIY, and eufy pages.
- **Doorbells:** live Ring plan and wired install, plus doorbells without a fee, monthly cost, voltage, height, floodlight, and the general wired-doorbell page.
- **No Wi-Fi / local recorder:** live no-Wi-Fi guide, PoE/NVR, and the “no cloud” page (that last one still uses Wi-Fi).
- **Outdoor:** live outdoor guide plus the wireless-outdoor variant. Indoor stays a hub until there is a real indoor draft.

When a backlog page is published, add it to `content/articles/`, give it a category that already exists (or add a hub), link it from the related guides, and run `node scripts/generate-images.mjs` so the hero and OG files exist. The slug route prerenders itself.
