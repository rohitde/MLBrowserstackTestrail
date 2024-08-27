# This is a small setup code to reproduce cypress- testrail issue
# folder structure 
cypress
  ├── integration
  │   ├── Specs
  │   │   ├── Sanity
  │   │   │   └── test.ts
  │   │   └── TestRail
  │   │       └── Test_Rail_Report.ts
  └── Pages
      └── TestRail_Page.ts

# Setup Instructions
  Clone the Project: After cloning the project repository, navigate to the project directory.
  Install Dependencies: Run the following command to install all necessary packages:
  # npm install

# Run Cypress Locally
  To run the Cypress tests locally in a headed mode with Chrome browser, use:
 # npx cypress run --headed --spec 'cypress/integration/Specs/Sanity/test.ts' --browser chrome
 
# Run Cypress on BrowserStack
To execute the Cypress tests on BrowserStack with a specific environment, use:
  # npm run cy:MLPlatform:Sanity --base=ENV=stage
 
 
