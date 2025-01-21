const {allure}=require("allure-playwright")
// import allure from 'allure-playwright';

export function getCurrentDate () {
    const today = new Date();
    return today.getDate().toString(); // Returns the current day as a string
};

export async function assertWithAllureStep(stepName, fn) {
    await allure.step(stepName, async () => {
        await fn();
    });
}
 
//module.exports = { getCurrentDate };