const{expect} = require("allure-playwright")
const exp = require("constants")
require("dotenv").config()

exports.TestimFlow = class TestimFlow{
    constructor(page){
        this.page =page
        this.txtLogo=page.locator("//a[@class='h-logo']")
        this.navOpener=page.locator("//span[@class='nav-opener']")
        this.listOfItems=page.locator("//ul[@class='h-nav']")
        this.txtProducts=page.locator("//a[text()='Products']")
        this.dropDownProducts=page.locator("(//ul[@class='drop-nav'])[1]")
        this.txtSolutions=page.locator("//a[text()='Solutions']")
        this.dropDownSolutions=page.locator("(//div[@class='side-menu-items'])[1]")
        this.txtDevelopers=page.locator("//a[text()='Developers']")
        this.dropDownDevelopers=page.locator("(//div[@class='drop multi-dropdown '])[2]")
        this.txtCompany=page.locator("//a[text()='Company']")
        this.dropDownCompany=page.locator("(//div[@class='drop multi-dropdown '])[3]")
        this.customerSection=page.locator("//span[text()='Customers']")
        this.reviewSection=page.locator("(//div[@class='item-wrapper'])[1]")
        this.customerName=page.locator("//div[text()='Maor F']")
        this.reviewTitle=page.locator("//div[text()='Senior Software Engineer']")
        this.reviewContent=page.locator("//div[p='“Testim.io is a game changer for anyone who relies on automated tests”']")
        this.iconYoutube=page.locator("//a[@class='icon-youtube']")
        this.iconTwitter=page.locator("//a[@class='icon-twitter']")
        this.iconLinkDin=page.locator("//a[@class='icon-linkedin']")
        this.iconFacebook=page.locator("//a[@class='icon-facebook']")
    }

    async navigateToTestimApplication(){
        await this.page.goto(process.env.testimURL)
    }

    async validateComponents(){
        await expect(this.txtLogo).toBeVisible()
        // await expect(this.navOpener).toBeVisible()
        // await this.navOpener.click()
        await expect(this.listOfItems).toBeVisible()
        await this.txtProducts.click()
        await expect(this.dropDownProducts).toBeVisible()
        await this.txtSolutions.click()
        await expect(this.dropDownSolutions).toBeVisible()
        await this.txtDevelopers.click()
        await this.page.waitForTimeout(3000)
        await expect(this.dropDownDevelopers).toBeVisible()

    }
    async navigateToCompanySection(){
        await this.txtCompany.click()
        await expect(this.dropDownCompany).toBeVisible()
        await this.page.waitForTimeout(5000)
        
    }

    async navigateToTheCustomersSection(){
        await this.txtCompany.click()
        await expect(this.dropDownCompany).toBeVisible()
        await this.page.waitForTimeout(5000)
        await expect(this.customerSection).toBeVisible()
        await this.customerSection.click()
        //await this.page.goto(this.reviewSection)
        await expect(this.customerName).toBeVisible()
        await expect(this.reviewTitle).toBeVisible()
        await expect(this.reviewContent).toBeVisible()
    const customerName = await this.customerName.innerText()
    const reviewTitle = await this.reviewTitle.innerText()
    const reviewContent = await this.reviewContent.innerText()

    const reviewData = {
        customerName: customerName,
        reviewTitle: reviewTitle,
        reviewContent: reviewContent
    }
    console.log(JSON.stringify(reviewData, null, 2))
    return reviewData
    }

    async crossValidateReviewData() {
        
    const reviewData = await this.navigateToTheCustomersSection();
        const displayedCustomerName = await this.customerName.innerText();  
        const displayedReviewTitle = await this.reviewTitle.innerText();    
        const displayedReviewContent = await this.reviewContent.innerText();   
       await expect(displayedCustomerName).toBe(reviewData.customerName, `Customer name does not match. Expected: ${reviewData.customerName}, Found: ${displayedCustomerName}`);
       await expect(displayedReviewTitle).toBe(reviewData.reviewTitle, `Review title does not match. Expected: ${reviewData.reviewTitle}, Found: ${displayedReviewTitle}`);
       await expect(displayedReviewContent).toBe(reviewData.reviewContent, `Review content does not match. Expected: ${reviewData.reviewContent}, Found: ${displayedReviewContent}`);
       }

       async validateFooterComponents(){

        await this.page.waitForTimeout(3000)
        await expect(this.iconYoutube).toBeVisible()
        await expect(this.iconTwitter).toBeVisible()
        await expect(this.iconLinkDin).toBeVisible()
        await expect(this.iconFacebook).toBeVisible()


       }
    
    

}