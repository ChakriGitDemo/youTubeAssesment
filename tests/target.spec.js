const {test, expect} = require("@playwright/test")
const{targetFlow}= require("../pageobject/target.page")

require("dotenv").config

test.describe("Target Application Test Flows", () => {

    let targetFlowPage;

    test("Target Application flow",async ({ page }) => {
        targetFlowPage = new targetFlow(page); 
        await targetFlowPage.navigatedToTheShoppingSite();
        await targetFlowPage.validation(); 
        await targetFlowPage.searchForWatches()
        await targetFlowPage.selectWatch()
        await targetFlowPage.validateDiscountCalculation()
    });

//     test("targetIcon", async ({page}) => {
//         targetFlowPage = new targetFlow(page);
//         await targetFlowPage.validation(); 
       
//     });

//     test("search For Watches", async({page})=>{
//         targetFlowPage = new targetFlow(page)
//         await targetFlowPage.searchForWatches()
//     })

//     test("Select a watch", async({page})=>{
//         targetFlowPage= new targetFlow(page)
//         await targetFlowPage.selectWatch()
//     })

//     test("Validate Discount Calulations", async({page})=>{
//         targetFlowPage = new targetFlow(page)
//         await targetFlowPage.validateDiscountCalculation()
//     })



});
