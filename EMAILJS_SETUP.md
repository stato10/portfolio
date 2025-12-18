# EmailJS Setup Instructions

## Quick Start

The contact form is already configured to use EmailJS with environment variables for security. Follow these steps to activate it:

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (200 emails/month)
3. Verify your email address

## Step 2: Create Email Service

1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider:
   - **Gmail**: Most common, easy setup
   - **Outlook**: Good alternative
   - **Custom SMTP**: For other providers
4. Follow the authentication steps
5. **Copy your Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use this template structure:

**Subject:**
```
{{subject}} - Portfolio Contact Form
```

**Content:**
```
From: {{name}}
Email: {{email}}

Subject: {{subject}}

Message:
{{message}}

---
Sent from portfolio contact form
```

4. Make sure the template variables match exactly:
   - `{{name}}`
   - `{{email}}`
   - `{{subject}}`
   - `{{message}}`
5. Save the template and **copy your Template ID** (e.g., `template_xyz789`)

## Step 4: Get Public Key

1. Go to **Account** → **General**
2. Find **Public Key** (also called API Key)
3. **Copy your Public Key** (e.g., `abcdefghijklmnop`)

## Step 5: Configure Environment Variables

1. Create a `.env` file in the root directory of your project
2. Add the following variables:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

3. Replace the placeholder values with your actual credentials from Steps 2-4

**Example:**
```env
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=abcdefghijklmnop
```

## Step 6: Restart Development Server

After creating/updating the `.env` file:

1. Stop your development server (Ctrl+C)
2. Restart it: `npm run dev`
3. Environment variables are loaded on server start

## Step 7: Test the Form

1. Fill out the contact form on your website
2. Submit it
3. Check your email inbox for the message
4. Check EmailJS dashboard → **Logs** for delivery status

## Production Deployment

For production (GitHub Pages, Vercel, Netlify, etc.):

1. Add the same environment variables in your hosting platform's settings
2. For GitHub Pages: Use GitHub Secrets (if using Actions) or configure in your hosting provider
3. For Vercel/Netlify: Add environment variables in project settings
4. Redeploy your site

## Troubleshooting

### Form not sending
- Check browser console (F12) for errors
- Verify `.env` file exists and has correct variable names (must start with `VITE_`)
- Ensure you restarted the dev server after creating `.env`
- Check that all three environment variables are set

### Email not received
- Verify your email service is connected in EmailJS dashboard
- Check EmailJS dashboard → **Logs** for delivery errors
- Verify spam/junk folder
- Check that template variables match form field names exactly

### Template errors
- Ensure template variables use double curly braces: `{{variable}}`
- Variable names must match form field names: `name`, `email`, `subject`, `message`
- Check EmailJS dashboard → **Templates** for template errors

### Environment variables not working
- Variable names MUST start with `VITE_` for Vite projects
- Restart dev server after changing `.env`
- Check `.env` file is in project root (same level as `package.json`)
- No spaces around `=` sign in `.env` file

## Security Notes

- ✅ `.env` file is already in `.gitignore` - your credentials won't be committed
- ✅ Never commit your `.env` file to Git
- ✅ Use different credentials for development and production
- ✅ Public Key is safe to expose (it's called "public" for a reason)

## Free Tier Limits

- **200 emails per month** (free tier)
- Upgrade to paid plans for more emails if needed
- Check usage in EmailJS dashboard → **Account**

## Alternative: Direct Email Link

If you prefer not to use EmailJS, you can replace the form with a direct mailto link:

```jsx
<a href="mailto:your-email@example.com?subject=Portfolio Contact&body=Hello...">
  Send Email
</a>
```

However, EmailJS provides a better user experience and doesn't require users to have email configured.



