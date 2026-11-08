## ADDED Requirements

### Requirement: Single wordmark per surface

Each first-view surface SHALL show the custom wordmark at most once.

#### Scenario: The homepage loads

- **WHEN** a visitor opens `/`
- **THEN** the hero shows the wordmark and the navigation shows only the compact mark

#### Scenario: The site card is shared

- **WHEN** the default sharing image is rendered
- **THEN** it contains exactly one wordmark and one horn mark
