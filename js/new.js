function alertShow()
{
    alert("click ok to close this alert");
}
    await driver.findElement(By.linkText('See an example alert')).click();

// Wait for the alert to be displayed
await driver.wait(until.alertIsPresent());

// Store the alert in a variable
let alert = await driver.switchTo().alert();

//Store the alert text in a variable
let alertText = await alert.getText();

//Press the OK button
await alert.accept();