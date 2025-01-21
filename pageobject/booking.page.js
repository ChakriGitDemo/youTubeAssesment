const{expect}=require('@playwright/test')
require('dotenv').config();
const{getCurrentDate}=require('../utilies/helper')
const data=require('../data/data.json')
const helperFile  = require('../utilies/helper');
 
exports.BookingPage=class BookingPage{
    constructor(page){
        this.page=page;
        this.search=page.locator('//span[text()="Search"]')
        this.destination=page.locator('//input[@placeholder="Where are you going?"]')
        this.date=page.locator('//span[text()="Check-in Date"]')
        this.currentDate=page.locator(`(//span/span[text()='1'])[2]`);
        this.checkOutDate = page.locator('(//span/span[text()="15"])[1]');
        this.exactDates=page.locator('//span[text()="7 days"]')
        this.selectTheGuest=page.locator('//span[@data-testid="occupancy-config-icon"]')
        this.selectTheAdultCount=page.locator("(//button[@aria-hidden='true'])[2]")
        this.doneContext=page.locator('//span[text()="Done"]')
        this.grid=page.locator('//label[text()="Grid"]')
        this.hotelClick=page.locator('(//div[text()="Hotels"])[1]')
        this.popupDismissButton=page.locator(`//button[@aria-label="Dismiss sign-in info."]`)
        this.hotelLink = page.locator('a[data-testid="title-link"]:first-of-type');
        this.title = page.locator('div[data-testid="title"]:first-of-type');
    }
 
    async launchUrl() {
        await this.page.goto(process.env.bookingURL);
    }
   
    async verfyingPageTitleAndUrl() {
        const title = await this.page.title();
        await helperFile.assertWithAllureStep(
            "Verifying page title and URL", async()=>{
                await expect(title).toContain(data.bookinApplication.BookingTitle);
                await expect(this.page).toHaveTitle(data.bookinApplication.BookingFullTitle);
                await expect(this.page).toHaveURL(process.env.bookingURL,);
            }
        )
        
    }
   
    async closePopup() {
        try {
            await this.popupDismissButton.waitFor({ state: 'visible', timeout: 5000 });
            await this.popupDismissButton.click();
        } catch (error) {
            console.log("Popup dismiss button not found or not visible:", error);
        }
    }
   
    async getDateElement(date) {
        const currentMonth = new Date().toLocaleString('default', { month: 'long' });
        const currentYear = new Date().getFullYear();
        return this.currentDate;
    }
   
    async selectingDate() {
        const currentDate = getCurrentDate();
        const todayDateElement = await this.getDateElement(currentDate);
        await this.page.waitForLoadState('domcontentloaded');
        await todayDateElement.click({ force: true });
    }
   
    async searchForHotel() {
        await this.destination.click();
        await this.destination.fill(data.bookinApplication.countryName);
        await this.date.click();
        await this.selectingDate();
        await this.checkOutDate.click({ force: true });
        await this.exactDates.click();
        await helperFile.assertWithAllureStep(
            "Exact dates should be visible",async()=>{
            await expect(this.exactDates).toBeVisible();

            }
        )
       
        await this.selectTheGuest.click();
        await this.selectTheAdultCount.click();
        await this.doneContext.click();
        await this.search.click();
        await this.page.waitForTimeout(5000);
    }
   
    async filterTheSearchResult() {
        await helperFile.assertWithAllureStep(
            "filter search results",async()=>{
                await expect(this.grid).toBeVisible();
                await expect(this.hotelClick).not.toBeChecked();
                await this.hotelClick.click();
                await expect(this.hotelClick).toBeChecked();
            }
        )

    }
   
    async matchingTheContext() {
        const linksCount = await this.hotelLink.count();
        for (let i = 0; i < linksCount; i++) {
            const currentLink = this.hotelLink.nth(i);
            const currentTitle = this.title.nth(i);
            const titleText = await currentTitle.innerText();
            await expect(titleText.trim()).toBeTruthy();
            if (titleText.trim() === "Maison Colbert Member of Meliá Collection Notre-Dame") {
                console.log('Found the hotel link:', titleText);
                await currentLink.click();
            }
        }
    }
   
}