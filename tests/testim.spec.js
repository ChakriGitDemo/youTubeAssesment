const {test,expect} = require("@playwright/test")
const{TestimFlow} = require("../pageobject/testim.page")
require("dotenv").config

test.describe("Testim Application Test Flows", () => {
  
  let TestimFlowPage;

 
  test.beforeEach(async ({ page }) => {
    TestimFlowPage = new TestimFlow(page);
    await TestimFlowPage.navigateToTestimApplication();
    await TestimFlowPage.validateComponents();
    await TestimFlowPage.navigateToCompanySection();
    await TestimFlowPage.navigateToTheCustomersSection();
    await TestimFlowPage.crossValidateReviewData()
  });

  
  // test("Validate Header Components", async ({page}) => {
  //   TestimFlowPage = new TestimFlow(page);
  //   await TestimFlowPage.validateComponents();
  // });


  // test('Navigate to the "Company" Section', async ({page}) => {
  //   TestimFlowPage = new TestimFlow(page);
  //   await TestimFlowPage.navigateToCompanySection();
  // });


  // test('Navigate to the "Customers" Section', async ({page}) => {
  //   TestimFlowPage = new TestimFlow(page);
  //   await TestimFlowPage.navigateToTheCustomersSection();
  // });

  // test("Cross-Validate the Stored Review",async({page})=>{
  //   TestimFlowPage= new TestimFlow(page)
  //   await TestimFlowPage.crossValidateReviewData()
  // })


});