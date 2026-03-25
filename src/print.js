import puppeteer from 'puppeteer';

(async () => {
  console.log('🚀 Starting PDF generation...');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // 1. Set the viewport to your base design size
  await page.setViewport({
    width: 1800,
    height: 1350,
    deviceScaleFactor: 4, // Keeps images sharp
  });

  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });

  // 2. THE FIX: Force the content to scale to the page size
  // We calculate the scale: 4608 (target px) / 1800 (current px) = 2.56
  await page.addStyleTag({
    content: `
      body {
        margin: 0;
        padding: 0;
        width: 1800px;
        height: 1350px;
        transform: scale(2.56);
        transform-origin: top left;
      }
    `
  });

  // 3. Generate the PDF
  await page.pdf({
    path: 'SoC_Poster_Final.pdf',
    width: '48in',
    height: '36in',
    printBackground: true,
    pageRanges: '1',
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });

  await browser.close();
  console.log('✅ Success! The poster should now fill the full 48x36 area.');
})();