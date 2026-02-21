<?php
// =====================================
// BLAZE LACE - EMAIL CONFIGURATION
// =====================================
// IMPORTANT: Keep this file secure and do not commit to public repositories

// =====================================
// EMAIL ADDRESSES
// =====================================
// TO_EMAIL: Where emails will be sent (your inbox)
define('TO_EMAIL', 'embers@blaze-lace.com');

// FROM_EMAIL: Must be an email address from your domain
// This MUST be a local email (e.g., noreply@blaze-lace.com)
// Create this email in cPanel if it doesn't exist
define('FROM_EMAIL', 'no-reply@blaze-lace.com');

// =====================================
// OPTIONAL FEATURES
// =====================================
// Enable logging to email_log.txt file
define('ENABLE_LOGGING', true);

// =====================================
// SECURITY NOTES
// =====================================
/*
 * SETUP INSTRUCTIONS:
 * 
 * 1. Create a local email address in cPanel (e.g., noreply@blaze-lace.com)
 *    - Go to cPanel >> Email Accounts >> Create
 *    - This email doesn't need to receive emails, just send them
 * 
 * 2. Make sure your domain has Local Mail Exchanger enabled
 *    - Go to cPanel >> Email Routing
 *    - Select your domain
 *    - Choose "Local Mail Exchanger"
 * 
 * 3. Update the FROM_EMAIL constant above with your created email
 * 
 * 4. Test the form to ensure emails are being received
 * 
 * 5. SECURITY: Set permissions on this file
 *    - Run: chmod 640 config.php
 *    - This prevents unauthorized access
 */
?>
