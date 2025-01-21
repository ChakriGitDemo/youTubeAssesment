const{test, expect} = require("allure-playwright")
require("dotenv").config()
const data=require("../data/data.json")
const helperFile  = require('../utilies/helper');

exports.targetFlow= class targetFlow{
    constructor(page){
      this.page=page
      this.header=page.locator("//div[@id='headerPrimary']")
      this.searchField=page.locator("//input[@id='search']")
      this.btnSearch=page.locator("//button[text()='search']")
      this.searchBar=page.locator('(//input[contains(@id,"search")])[1]')
      this.displayedSearchResult=page.locator("//div[@data-test='@web/SlotRenderer']")
      this.menWatches=page.locator("//span[text()='Men']")
      this.proudctDescription=page.locator("//h1[@id='pdp-product-title-id']")
      this.productDetails=page.locator("//div[@id='PdpHighlightsSection']")
      this.productPrice=page.locator("//span[@data-test='product-price']")
      this.iconIMage=page.locator("(//picture[@data-test='@web/ProductCard/ProductCardImage/primary'])[1]")
    }

    async navigatedToTheShoppingSite(){
        await this.page.goto("https://www.target.com/")
    }

    async validation(){
      await this.page.waitForTimeout(5000)
      await helperFile.assertWithAllureStep(
        "page header should be visible",async()=>{
          await expect(this.header).toBeVisible()
        }
      )
      
    }
    async searchForWatches(){
      
      await this.page.waitForTimeout(3000)
      await this.searchBar.click({force:true})
      await this.searchBar.fill(data.targetApplication.SearchTerm)
      await this.page.keyboard.press('Enter')
      await helperFile.assertWithAllureStep(
        "Search result should be displayed",async()=>{
          await expect(this.displayedSearchResult).toBeVisible()
        }
      )      
      await this.menWatches.click()
      const firstResultText = await this.displayedSearchResult.innerText();
      console.log('First Result Text:', firstResultText)
      await this.page.waitForTimeout(5000)
      await helperFile.assertWithAllureStep(
        "First result text should be contain 'Watches'",async()=>{
          await expect(firstResultText).toContain('watches');
        }
      )
      
    }
    async selectWatch(){
      await this.iconIMage.click()
      await helperFile.assertWithAllureStep(
        "Checking ProductDescription, ProductDetails and ProductPrice",async()=>{
      await expect(this.proudctDescription).toBeVisible()
      await expect(this.productDetails).toBeVisible()
      await expect(this.productPrice).toBeVisible()

        }
      )
      
    }
    async validateDiscountCalculation(){
      const actualPrice= await this.productPrice.innerText()
      console.log("Actual Price", actualPrice)
    }
}