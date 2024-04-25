# Censys Take Home

Hi, thanks for viewing my submission!

In this submission I used the following:

- React-Vite for speed and simplicity
- Axios
- Cypress
- node
- TS

## Dev note

The app features, a plain-text input field that, when submitted with a query, will display a list of results. The `ip address` results are _supposed_ to be checked with `ipaddr` to verify IPV4 formatting, but may not be the greatest solution. Upon returning a list of results, limited to 25 for better viewing. Previous and next buttons are disabled until `cursor` values are set. Going off of the documentation, I stored a url that appended `cursor next` and/or `cursor prev` values through clickhandlers for each button (if the token exists, update the state--inversely if it does not update to undefined).

## Testing notes

I opted for E2E Cypress testing. Pretty capable and not the worst to set up, if needed I could have built component tests. I think they cover most if not all important behaviors. I used `data-test-id` to find the elements being tested. Overall I think it tests the requirements accurately withouth too much bloat. I included spec that asserted response status codes, it could be converted to a fixture to assert actual returned values against displayed values.

## Install dependencies and run dev

```bash
npm i &&
npm run dev

```

## Testing

Before testing, please make sure your dev instance is running For cli testing:

```bash
npm cypress:run

```

For testing with Cypress gui:

```bash
npx cypress open

```

## Some improvements I would make, given more time:

- Adding test/code coverage tool
- refactor cursor pagination logic
- Stricter typing
- linting
- spending more time with the censys documentation to better understand the data and its typing

Out of scope improvements I would make:

- Authentication
- Charts and cool visuals
- pre-commit tests
- CI/CD tests
- validation
