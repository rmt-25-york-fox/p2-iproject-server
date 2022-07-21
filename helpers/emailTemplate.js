const emailTemplate = (name) => {
  return `<!DOCTYPE html>
  <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="x-apple-disable-message-reformatting" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Dancing+Script&family=Nunito:ital,wght@0,300;0,700;1,300&display=swap"
        rel="stylesheet"
      />
      <script src="https://kit.fontawesome.com/2a80e5e5a9.js" crossorigin="anonymous"></script>
      <title></title>
      <!--[if mso]>
        <noscript>
          <xml>
            <o:OfficeDocumentSettings>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
        </noscript>
      <![endif]-->
      <style>
        table,
        td,
        div,
        h1,
        p {
          font-family: "Nunito", sans-serif;
        }
        body {
          font-family: "Nunito", sans-serif;
          background-color: #f8f9fc;
        }
        .brand-name {
          font-family: "Dancing Script", cursive;
        }
      </style>
    </head>
    <body style="margin: 0; padding: 0">
      <table role="presentation" style="width: 100%; border-collapse: collapse; border: 0; border-spacing: 0">
        <tr>
          <td align="center" style="padding: 0">
            <table
              role="presentation"
              style="
                width: 602px;
                border-collapse: collapse;
                border: 1px solid #cccccc;
                border-spacing: 0;
                text-align: left;
              "
            >
              <tr>
                <td align="center" style="padding: 40px 0 30px 0; background: #d4d4d4">
                  <h1 class="brand-name">BackMiUp</h1>
                </td>
              </tr>
              <tr>
                <td style="padding: 36px 30px 42px 30px">
                  <table role="presentation" style="width: 100%; border-collapse: collapse; border: 0; border-spacing: 0">
                    <tr>
                      <td style="padding: 0 0 36px 0; color: #153643; text-align: center;">
                        <h1 style="font-size: 24px; margin: 0 0 20px 0; font-family: Arial, sans-serif">
                          Thank you for supporting us, ${name}!
                        </h1>
                        <p style="margin: 0 0 12px 0; font-size: 16px; line-height: 24px; font-family: Arial, sans-serif;">
                          "As we work to create light for others, we naturally light our own way."
                        </p>
                        <p style="margin: 0 0 12px 0; font-size: 16px; line-height: 24px; font-family: Arial, sans-serif">
                          Mary Anne Radmacher
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
};

module.exports = emailTemplate;
