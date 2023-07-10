const { test, expect} = require("@playwright/test");


test('Main page has links for login and register', async ({ page }) => {
    await page.goto('/'); // Replace with your application URL
    const loginLink = await page.$('a[href="/auth/login"]');
    const registerLink = await page.$('a[href="/auth/register"]');
    expect(loginLink).toBeTruthy();
    expect(registerLink).toBeTruthy();
});

test('All links have the navbar', async ({ page }) => {
    await page.goto('/'); // Replace with your application URL
    const navbarLinks = await page.$$eval('nav a', (links) => links.map((link) => link.href));
  
    for (const link of navbarLinks) {
      await page.goto(link);
      const navbar = await page.$('nav');
      expect(navbar).toBeTruthy();
    }
});

test('All topics are available for the quiz', async ({ page }) => {
   
    await page.goto('/topics');
  
    const topics = await page.$$eval('ul li a', (elements) =>
      elements.map((el) => el.innerText.trim())
    );
   
    await page.goto('/quiz');
  
    const quiz = await page.$$eval('ul li a', (elements) =>
      elements.map((el) => el.innerText.trim())
    );
  
    // Assert that the topics in /quiz page are in alphabetical order
    expect(topics).toEqual(quiz);
});


test('List of topics is in alphabetical order', async ({ page }) => {
  await page.goto('/topics'); 
  const topics = await page.$$eval('ul .topics li', (elements) =>
    elements.map((el) => el.innerText)
  );
  const sortedTopics = [...topics].sort((a, b) => a.localeCompare(b));
  expect(topics).toEqual(sortedTopics);
});



  
