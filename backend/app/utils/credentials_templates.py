def get_password_reset_email_html(username: str, code: str) -> str:
    return f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Reset Your Password</title>
    </head>
    <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #F4F6F8; margin: 0; padding: 0;-webkit-font-smoothing: antialiased;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
        <tr>
            <td align="center" style="padding: 40px 10px 40px 10px;">
                <!-- Centered Card Box (Updated to soft gray border and shadow) -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px; background-color: #FFFFFF; border-radius: 8px; box-shadow: 0 4px 12px rgba(29, 78, 216, 0.05); overflow: hidden; border: 1px solid #D1D5DB;">
                    
                    <!-- Header Banner (Updated to Deep Blue) -->
                    <tr>
                        <td align="center" style="background-color: #1D4ED8; padding: 30px 20px;">
                            <h1 style="color: #FFFFFF; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 0.5px;">PORTFOLIO DASHBOARD &nbsp;</h1>
                        </td>
                    </tr>
                    
                    <!-- Email Content Body -->
                    <tr>
                        <td style="padding: 40px 30px; text-align: left;">
                            <p style="font-size: 16px; line-height: 24px; color: #1F2937; margin: 0 0 16px 0;">Hi <strong>{username}</strong>,</p>
                            <p style="font-size: 15px; line-height: 24px; color: #4B5563; margin: 0 0 30px 0;">We received a request to reset your administrator password. Please use the 6-digit email verification code below on our website to confirm your identity and choose a new password:</p>
                            
                            <!-- Verification Code Container (Updated to Clean Gray Border and Slate Blue Code) -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td align="center" style="background-color: #F3F4F6; border: 2px dashed #9CA3AF; border-radius: 6px; padding: 18px; letter-spacing: 4px;">
                                        <span style="font-size: 32px; font-weight: 800; color: #1E40AF; font-family: monospace;">{code}</span>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="font-size: 13px; line-height: 20px; color: #6B7280; margin: 25px 0 0 0; text-align: center;">This verification code will expire in 15 minutes. If you did not request a password reset, you can safely ignore this email and your account password will remain unchanged.</p>
                        </td>
                    </tr>
                    
                    <!-- Footer Links (Updated to Slate Gray Theme) -->
                    <tr>
                        <td style="background-color: #F9FAFB; padding: 20px; text-align: center; border-top: 1px solid #E5E7EB;">
                            <p style="font-size: 12px; color: #9CA3AF; margin: 0;">&nbsp; &copy; 2026 Admin Dashboard Portal. All rights reserved.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

    </html>
    """