import nodemailer from 'nodemailer';

const FOUNDER_NOTIFICATION_EMAIL = process.env.FOUNDER_EMAIL || 'swamianchal047@gmail.com';

export async function sendFounderNotificationEmail({
  type,
  senderName,
  senderContact,
  service,
  budget,
  message,
}: {
  type: 'Enquiry' | 'Direct Message' | 'Consultation';
  senderName: string;
  senderContact?: string;
  service?: string;
  budget?: string;
  message: string;
}) {
  console.log(`[MAILER] Preparing email notification to ${FOUNDER_NOTIFICATION_EMAIL} for ${type} from ${senderName}...`);

  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0c0e17; color: #f1f5f9; border-radius: 16px; overflow: hidden; border: 1px solid #232742;">
      <div style="background: linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%); padding: 28px 24px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px; color: #ffffff; letter-spacing: 1px;">GrowthNova</h1>
        <p style="margin: 6px 0 0 0; font-size: 13px; color: #e2e8f0; letter-spacing: 2px; text-transform: uppercase;">New ${type} Received</p>
      </div>

      <div style="padding: 28px 24px;">
        <p style="font-size: 15px; color: #cbd5e1; margin-top: 0;">
          Hello <strong>Anchal Swami & Komal Swami</strong>,
        </p>
        <p style="font-size: 14px; color: #94a3b8; line-height: 1.6;">
          A new client enquiry was just submitted through the GrowthNova website. Here are the full details:
        </p>

        <div style="background: #141829; border-radius: 12px; padding: 18px; margin: 20px 0; border: 1px solid #232742;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #94a3b8; width: 140px;">Client Name:</td>
              <td style="padding: 8px 0; color: #ffffff; font-weight: 600;">${senderName}</td>
            </tr>
            ${senderContact ? `
            <tr>
              <td style="padding: 8px 0; color: #94a3b8;">Contact / Email:</td>
              <td style="padding: 8px 0; color: #38bdf8; font-weight: 500;">${senderContact}</td>
            </tr>` : ''}
            ${service ? `
            <tr>
              <td style="padding: 8px 0; color: #94a3b8;">Service Requested:</td>
              <td style="padding: 8px 0; color: #a78bfa; font-weight: 600;">${service}</td>
            </tr>` : ''}
            ${budget ? `
            <tr>
              <td style="padding: 8px 0; color: #94a3b8;">Budget Tier:</td>
              <td style="padding: 8px 0; color: #34d399; font-weight: 600;">${budget}</td>
            </tr>` : ''}
          </table>
        </div>

        <div style="margin: 20px 0;">
          <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #a78bfa; margin-bottom: 8px;">Message / Project Brief:</h3>
          <div style="background: #141829; border-left: 3px solid #8b5cf6; padding: 14px 16px; border-radius: 8px; color: #e2e8f0; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</div>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #232742; text-align: center;">
          <a href="https://www.instagram.com/littleluxefinds.co19/" style="display: inline-block; background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%); color: #ffffff; text-decoration: none; padding: 10px 22px; border-radius: 8px; font-size: 13px; font-weight: 600;">Open GrowthNova Instagram</a>
        </div>
      </div>

      <div style="background: #080910; padding: 16px 24px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #1e2238;">
        GrowthNova Agency • Forwarded securely to ${FOUNDER_NOTIFICATION_EMAIL}
      </div>
    </div>
  `;

  // Check if SMTP is configured, else log the full payload
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"GrowthNova Leads" <${process.env.SMTP_USER}>`,
        to: FOUNDER_NOTIFICATION_EMAIL,
        subject: `[GrowthNova] New ${type} from ${senderName}`,
        html: htmlContent,
      });

      console.log(`[MAILER] Email successfully dispatched to ${FOUNDER_NOTIFICATION_EMAIL}`);
      return { success: true, forwardedTo: FOUNDER_NOTIFICATION_EMAIL };
    } catch (err) {
      console.error('[MAILER] SMTP send failed:', err);
      return { success: false, forwardedTo: FOUNDER_NOTIFICATION_EMAIL, error: err };
    }
  } else {
    console.log(`[MAILER SIMULATION] Forwarded enquiry to ${FOUNDER_NOTIFICATION_EMAIL}:\nSender: ${senderName}\nContact: ${senderContact}\nMessage: ${message}`);
    return { success: true, simulated: true, forwardedTo: FOUNDER_NOTIFICATION_EMAIL };
  }
}
