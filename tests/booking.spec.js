const {test, expect} = require("@playwright/test")
const{BookingPage} = require("../pageobject/booking.page")

test.describe("bookings flow tests",async()=>{


let bookingsPage;
test.beforeEach("navagation", async({page})=>{
    bookingsPage = new BookingPage(page)
   await  bookingsPage.launchUrl()   
   await bookingsPage.closePopup(); 
   
})

test("Verify the Page Title and URL", async({page})=>{
   bookingsPage = new BookingPage(page)
    await bookingsPage.verfyingPageTitleAndUrl()
   await bookingsPage.searchForHotel();
   await bookingsPage.filterTheSearchResult();
   await bookingsPage.matchingTheContext()
})

// test("SearchForHotels",async({page})=>{
//     bookingsPage = new bookings(page)
//     await bookingsPage.SearchForHotels()
// })

// test("filterSearchResults", async({page})=>{
//     bookingsPage = new bookings(page)
//     await bookingsPage.filterSearchResults()
// })



})