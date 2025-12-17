# EmailJS Setup Instructions

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Create Email Service

1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions
5. Copy your **Service ID**

## Step 3: Create Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use this template structure:

```
Subject: {{subject}} - Portfolio Contact Form

From: {{name}} ({{email}})

Message:
{{message}}
```

4. Save the template and copy your **Template ID**

## Step 4: Get Public Key

1. Go to **Account** → **General**
2. Copy your **Public Key** (also called API Key)

## Step 5: Update Your Code

Update the following files with your EmailJS credentials:

### `src/components/ContactSection.jsx`
Replace these lines (around line 30-32):
```javascript
const serviceId = 'YOUR_SERVICE_ID'
const templateId = 'YOUR_TEMPLATE_ID'
const publicKey = 'YOUR_PUBLIC_KEY'
```

### `src/pages/Contact.jsx`
Replace these lines (around line 30-32):
```javascript
const serviceId = 'YOUR_SERVICE_ID'
const templateId = 'YOUR_TEMPLATE_ID'
const publicKey = 'YOUR_PUBLIC_KEY'
```

## Step 6: Test the Form

1. Fill out the contact form on your website
2. Submit it
3. Check your email inbox for the message
4. Check EmailJS dashboard for delivery status

## Troubleshooting

- **Form not sending**: Check browser console for errors
- **Email not received**: Verify your email service is connected
- **Template errors**: Make sure template variables match form field names (name, email, subject, message)

## Free Tier Limits

- 200 emails per month (free tier)
- Upgrade for more emails if needed



