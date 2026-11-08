## ADDED Requirements

### Requirement: Balanced OC-derived brand assets

The site SHALL use an original horn mark and custom Monumei wordmark derived from the human OC, with mirrored horn geometry and band placement, restrained navy and gold coloring, and a compact favicon treatment.

#### Scenario: The final mark is rendered

- **WHEN** the master mark is rasterized for inspection
- **THEN** its horizontal alpha centroid is within 0.1 pixel of the canvas center and its silhouette is unclipped

#### Scenario: The mark is reduced

- **WHEN** a favicon is displayed at 16, 32, or 64 pixels
- **THEN** the compact horn-and-monogram silhouette remains recognizable without the master's fine panel details

### Requirement: Consistent website identity

Navigation, homepage hero, footer, favicon metadata, and current sharing cards SHALL use the approved brand assets while preserving accessible names, existing content, and responsive navigation behavior.

#### Scenario: A visitor opens the mobile navigation

- **WHEN** the navigation toggle is activated on a phone-width viewport
- **THEN** the existing route links remain usable and the brand does not introduce horizontal overflow

#### Scenario: A link is shared

- **WHEN** a site page or the vibe-coding article is fetched by a social crawler
- **THEN** the existing large-image metadata references a 1200 × 630 PNG containing the new identity
