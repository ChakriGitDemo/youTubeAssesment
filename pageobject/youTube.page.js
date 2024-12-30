const { expect } = require("allure-playwright")
const exp = require("constants")

require("dotenv").config()
exports.youtubeFlow = class youtubeFlow{
    constructor(page){
        this.page=page
        this.searchQuery=page.locator("(//input[@name='search_query'])[1]")
        this.iconSearch=page.locator("(//button[contains(@title,'Search')])[1]")
        this.countVideos=page.locator("//div[@id='contents']")
        this.clickVideo=page.locator("(//div[@id='contents'])[4]")
    }

    async navigation(){
        await this.page.goto(process.env.baseURL)
        
    }
    async checkingPageTitle(){
        await this.page.title("YouTube")
       await expect( this.page).toHaveURL("https://www.youtube.com/.")
    }

    async searchingForVideo(){
        await this.searchQuery.click()
        await this.searchQuery.fill("Selenium tutorial")
        await this.iconSearch.click()
        await this.page.waitForTimeout(5000)
        //await this.countVideos.click()
       const count= await this.countVideos.count();
       console.log("count",count);
       
      await expect(count).toBeGreaterThanOrEqual(10)
    }

    async clickOnVideo(){
        await this.page.waitForTimeout(5000)
        await this.clickVideo.click()
    }
}