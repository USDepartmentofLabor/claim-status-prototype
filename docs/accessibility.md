# Accessibility

The [U.S. Web Design System](https://designsystem.digital.gov/) (USWDS) is utilzed in this codebase for styling and HTML markup. [The USWDS is Section 508 compliant](https://designsystem.digital.gov/about/key-benefits/) and provides accessible, mobile-friendly components out of the box.

Our team has utilized automated and manual testing to ensure that the application is accessible. **[Testing reports can be found in `docs/reports` directory](./reports/)**. Testing is conducted against the production build of the web app, running in an incognito/private browser window.

## Automated testing

- [`jest-axe`](https://github.com/nickcolley/jest-axe) is used to run an [`axe`](https://www.deque.com/axe/) accessibility scan on pages. These tests run on every pull request, and merging is blocked if any accessibility issue is reported.
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) is used to run accessibility and performance tests on the application.
- [Accessibility Insights](https://accessibilityinsights.io/) is also used to run automated and semi-automated accessibility tests on the application.

## Manual testing

- [Accessibility Insights](https://accessibilityinsights.io/) is used to guide through manual testing steps.
- [VoiceOver](https://dequeuniversity.com/tips/learn-voiceover) is used to manually test the application with a screen reader.
