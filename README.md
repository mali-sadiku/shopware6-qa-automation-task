# Shopware 6 E2E Automation Test (Playwright)

This project contains an end to end automation test using Playwright.  
It simulates a complete guest checkout flow on a Shopware 6 demo store.

---

## Test Flow

- Open Shopware storefront  
- Accept cookies  
- Navigate to product category  
- Select a product  
- Add product to cart  
- Proceed to checkout as guest  
- Fill in customer details  
- Select payment method  
- Confirm order  
- Verify successful order completion  

---

## Tech Stack

- Playwright
- Node.js
- JavaScript / TypeScript

---

## Setup

```bash
git clone https://github.com/mali-sadiku/shopware6-qa-automation-task.git
cd shopware6-qa-automation-task
npm install
npx playwright install
