import Puppeteer from "puppeteer-core";

export default class StrukPrinter {
    static async printStructPay(payment: string, id: string, item: string, price: number, quantity: number) {
        const d = new Date().toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
        const template = `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Struk</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .header {
            margin-top: 50px;
            text-align: center;
            font-family: sans-serif;
        }

        .header h1 {
            font-weight: bold;
            font-size: 50px;
        }

        .header p {
            font-size: 35px;
        }

        .details {
            padding-left: 40px;
            padding-right: 40px;
            text-align: center;
            margin-top: 30px;
        }

        .details p {
            font-size: 25px;
            font-family: sans-serif;
        }

        .details p strong {
            text-decoration: underline;
        }

        .details .items {
            list-style-type: none;
            font-family: sans-serif;
            margin-top: 10px;
            border: 3px solid #000000;
            padding: 5px;
        }

        .details .items li {
            font-size: 25px;
        }

        footer {
            margin-top: 10px;
            text-align: center;
            font-size: 20px;
            font-family: serif;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>
            ${id}
        </h1>
        <p style="color: greenyellow;"><strong>PAID - ${payment.replace(/[^A-Za-z0-9]/g, "").toUpperCase()}</strong></p>
    </div>

    <div class="details">
        <p>
            On ${d}. Payment has been made and <strong>confirmed</strong> by the payment gateway (midtrans)
        </p>
        <ul class="items">
            <li>
                Item: <strong>${item}</strong>
            </li>
            <li>
                Price: Rp. ${price.toLocaleString()}
            </li>
            <li>
                Quantity: ${quantity}x
            </li>
            <li>
                Price total: Rp. ${(price * quantity).toLocaleString()}
            </li>
        </ul>
    </div>
    <footer>
        &copy; PayBOT 2021
    </footer>
</body>
</html>
        `;
        const browser = await Puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(template);
        await page.setViewport({
            width: 623,
            height: 560
        });
        const screenshot = await page.screenshot({
            type: "png"
        });
        await page.close();
        await browser.close();
        return screenshot as Buffer;
    }
}