const { default: puppeteer } = require("puppeteer");

async function sendInvoice(req, res){

    const html = "<h1>Sample PDF1700</h1>";
    await createInVoice(html, `./pdfs/invoice${req.query.name}.pdf`);
    res.send("Create response ");
}


async function createInVoice(htmlContent, pdfFilePath, margin={top: "10mm", right:"10mm", bottom: "10mm", left: "10mm"}){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(htmlContent);
    await page.pdf({path: pdfFilePath, format: "A4", margin: margin});

    const open = await import("open");
    
    await open.default(pdfFilePath);
    await browser.close();
}

module.exports ={sendInvoice}