# Portfolio site

## Private contact form setup (required before publishing)

This is a static GitHub Pages site. It cannot securely send email by itself, so the contact form uses Formspree as the form-delivery service. The recipient email is configured privately in the Formspree dashboard; it is not included in the website HTML or JavaScript. The public form endpoint ID is visible in page source, which is normal and does not reveal the recipient email.

1. Create/sign in to a Formspree account at https://formspree.io/.
2. Create a new form and set its recipient to your email address in the Formspree dashboard.
3. Copy the form endpoint, which looks like `https://formspree.io/f/abcdefgh`.
4. The contact form is configured for Web3Forms in `index.html`. Submit a test message after publishing and confirm delivery to the recipient email configured in your Web3Forms account.
5. Test a message and complete any email verification Formspree requests before publishing.

Until the endpoint is configured, the form intentionally will not send and displays a setup message. Do not put your recipient email in the form action, HTML, JavaScript, or public configuration.

The downloadable resume in this package has been adjusted to say `Contact via portfolio form` instead of displaying the email address. Review the resume before publishing if you want any other contact details removed.

The portfolio does not currently advertise a blog because no public blog URL has been configured.
