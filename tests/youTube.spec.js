const {test, expect } = require("@playwright/test")
const{youtubeFlow}= require("../pageobject/youTube.page")
require("dotenv").config
let youtubeFlowPage;

test.beforeEach("launch URL", async({page})=>{
 youtubeFlowPage = new youtubeFlow(page)
 await youtubeFlowPage.navigation()
})

test("varifying Page Title", async({page})=>{
    youtubeFlowPage = new youtubeFlow(page)
    await youtubeFlowPage.checkingPageTitle()
})

test("Search for a Video with Dynamic Query Handling", async({page})=>{
    youtubeFlowPage = new youtubeFlow(page)
    await youtubeFlowPage.searchingForVideo()
})

test("Click on a Video from Results",async({page})=>{
    youtubeFlowPage = new youtubeFlow(page)
    await youtubeFlowPage.clickOnVideo()
})
