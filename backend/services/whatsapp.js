const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER;
const adminNumber = process.env.ADMIN_WHATSAPP_NUMBER || 'whatsapp:+919101043385';

let client;
// Check if credentials are real (not placeholders)
const isRealCreds = accountSid && !accountSid.includes('YOUR_ACCOUNT_SID') && authToken && !authToken.includes('YOUR_AUTH_TOKEN');

if (isRealCreds) {
    try {
        client = twilio(accountSid, authToken);
    } catch (err) {
        console.error('Twilio initialization failed:', err.message);
    }
} else {
    console.warn('Twilio credentials missing or invalid (placeholders found). WhatsApp notifications will be simulated in console.');
}

const sendWhatsApp = async ({ to, body }) => {
    if (!to) {
        console.error('No recipient phone number provided for WhatsApp notification');
        return;
    }

    // Ensure "whatsapp:" prefix
    // If 'to' is like '919535901059', start with whatsapp:+
    // We assume 'to' might just be the number.
    let formattedTo = to;
    if (!formattedTo.startsWith('whatsapp:')) {
        // If it doesn't have +, add it if missing (simple heuristic)
        if (!formattedTo.startsWith('+')) {
            // Assuming Indian numbers if no country code, but best to trust input or standardise in frontend
            // For now, if no +, just prepend +91 if length is 10, else just +
            if (formattedTo.length === 10) formattedTo = '+91' + formattedTo;
            else formattedTo = '+' + formattedTo;
        }
        formattedTo = `whatsapp:${formattedTo}`;
    }

    if (!client) {
        console.log(`[SIMULATION] Sending WhatsApp to ${formattedTo}: ${body}`);
        return;
    }

    try {
        const message = await client.messages.create({
            body: body,
            from: fromNumber,
            to: formattedTo
        });
        console.log(`WhatsApp sent to ${formattedTo}: ${message.sid}`);
        return message;
    } catch (error) {
        console.error(`Failed to send WhatsApp to ${formattedTo}:`, error.message);
    }
};


const setTwilioClient = (newClient) => {
    client = newClient;
};

const formatWhatsApp = (number) => {
    if (!number) return '';
    let formatted = number.toString().replace(/\s+/g, '');
    if (!formatted.startsWith('whatsapp:')) {
        if (!formatted.startsWith('+')) {
            if (formatted.length === 10) formatted = '+91' + formatted;
            else formatted = '+' + formatted;
        }
        formatted = `whatsapp:${formatted}`;
    }
    return formatted;
};

module.exports = { sendWhatsApp, adminNumber, setTwilioClient, formatWhatsApp };

