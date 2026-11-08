## ADDED Requirements

### Requirement: Sharing images

Canonical pages SHALL expose matching absolute Open Graph and Twitter image URLs, text alternatives, a 1200 × 630 PNG, and the `summary_large_image` Twitter card type.

#### Scenario: A page has no custom card

- **WHEN** a canonical page is built without an explicit social image
- **THEN** both sharing protocols reference the default Monumei site image

#### Scenario: A post selects an article card

- **WHEN** a post defines `socialImage`
- **THEN** its Open Graph and Twitter metadata reference that image instead of the default

### Requirement: Brand-matched artwork

Sharing images SHALL use the established Saira typography, graphite panels, chamfered geometry, blue light, and yellow signage without introducing company attribution or invented metrics.

#### Scenario: Cards are exported

- **WHEN** the site and article cards are rendered
- **THEN** their titles remain legible inside a 1200 × 630 frame and the public images are PNG files
