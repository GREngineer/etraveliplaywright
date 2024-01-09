## System Requirements

- Node.js v20.10.0

- Typescript v5.3.3

## Playwright Setup

Navigate to desired project folder through Terminal / Or paste command directly to your IDE Terminal

````
npm init playwright@latest 
````

## VS Code Project Extensions

- Playwright Test for VS Code
- Markdown Checkboxes
- Markdown Footnotes
- Github Markdown Preview
- Markdown Preview Github styling

## How to run tests

````
npx playwright test tests/

(For visible browser)

npx playwright test tests/ --headed
````
## How to see test report
````
npx playwright show-report  
````

## Select test browsers

- Open playwright.config.ts 
- Navigate to projects:
- Comment in/out preferred browsers






