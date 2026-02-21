<?php
// =====================================
// BLAZE LACE - EMAIL SUBMISSION HANDLER
// =====================================
// Security: This script handles email submissions with validation,
// sanitization, rate limiting, and protection against common attacks.

// Start session for rate limiting
session_start();

// Include configuration
require_once 'config.php';

// Set JSON response header
header('Content-Type: application/json');

// CORS headers (adjust origin to your actual domain)
header('Access-Control-Allow-Origin: https://blaze-lace.com');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// =====================================
// RATE LIMITING
// =====================================
// Prevent spam by limiting submissions per session
$rate_limit_key = 'email_submit_count';
$rate_limit_time_key = 'email_submit_time';
$max_submissions = 3; // Maximum 3 submissions per hour
$time_window = 3600; // 1 hour in seconds

if (!isset($_SESSION[$rate_limit_time_key])) {
    $_SESSION[$rate_limit_time_key] = time();
    $_SESSION[$rate_limit_key] = 0;
}

// Reset counter if time window has passed
if (time() - $_SESSION[$rate_limit_time_key] > $time_window) {
    $_SESSION[$rate_limit_key] = 0;
    $_SESSION[$rate_limit_time_key] = time();
}

// Check if rate limit exceeded
if ($_SESSION[$rate_limit_key] >= $max_submissions) {
    http_response_code(429);
    echo json_encode([
        'success' => false, 
        'message' => 'Too many submissions. Please try again later.'
    ]);
    exit;
}

// =====================================
// GET AND VALIDATE INPUT
// =====================================
// Get JSON input
$json_input = file_get_contents('php://input');
$data = json_decode($json_input, true);

// Fallback to POST data if JSON parsing fails
if (json_last_error() !== JSON_ERROR_NONE) {
    $data = $_POST;
}

// Get email from input
$email = isset($data['email']) ? trim($data['email']) : '';

// =====================================
// EMAIL VALIDATION
// =====================================
// Check if email is provided
if (empty($email)) {
    http_response_code(400);
    echo json_encode([
        'success' => false, 
        'message' => 'Email address is required'
    ]);
    exit;
}

// Sanitize email to prevent XSS
$email = filter_var($email, FILTER_SANITIZE_EMAIL);

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        'success' => false, 
        'message' => 'Invalid email address format'
    ]);
    exit;
}

// Additional email validation rules
// Block common temporary/disposable email domains
$disposable_domains = [
    'tempmail.com', 'throwaway.email', '10minutemail.com', 
    'guerrillamail.com', 'mailinator.com', 'trash-mail.com'
];

$email_domain = substr(strrchr($email, "@"), 1);
if (in_array(strtolower($email_domain), $disposable_domains)) {
    http_response_code(400);
    echo json_encode([
        'success' => false, 
        'message' => 'Please use a permanent email address'
    ]);
    exit;
}

// Check email length (prevent abuse)
if (strlen($email) > 254) {
    http_response_code(400);
    echo json_encode([
        'success' => false, 
        'message' => 'Email address is too long'
    ]);
    exit;
}

// =====================================
// CHECK FOR DUPLICATE EMAIL
// =====================================
if (ENABLE_LOGGING && isDuplicateEmail($email)) {
    http_response_code(400);
    echo json_encode([
        'success' => false, 
        'message' => 'This email is already registered. The embers await.'
    ]);
    exit;
}

// =====================================
// PREPARE EMAIL
// =====================================
// Email subject
$subject = "New Ember Signup - Blaze Lace";

// Email body
$message = "New email signup from Blaze Lace teaser website:\n\n";
$message .= "Email: " . $email . "\n";
$message .= "Timestamp: " . date('Y-m-d H:i:s') . "\n";
$message .= "IP Address: " . $_SERVER['REMOTE_ADDR'] . "\n";
$message .= "User Agent: " . (isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : 'Not provided') . "\n";
$message .= "\n---\n";
$message .= "We ain't stars, we the whole damn sky.";

// Email headers
// IMPORTANT: Use an email address from your domain for the From field
$headers = "From: " . FROM_EMAIL . "\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// =====================================
// SEND EMAIL
// =====================================
$mail_sent = mail(TO_EMAIL, $subject, $message, $headers);

if ($mail_sent) {
    // Increment rate limit counter
    $_SESSION[$rate_limit_key]++;
    
    // Optional: Log to file for backup
    if (ENABLE_LOGGING) {
        logEmail($email);
    }
    
    // Success response
    http_response_code(200);
    echo json_encode([
        'success' => true, 
        'message' => 'You\'re in. The fire rises.'
    ]);
} else {
    // Error response
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Failed to send email. Please try again.'
    ]);
}

// =====================================
// OPTIONAL: LOG EMAILS TO FILE
// =====================================
function logEmail($email) {
    $log_file = 'email_log.txt';
    $timestamp = date('Y-m-d H:i:s');
    $ip = $_SERVER['REMOTE_ADDR'];
    $log_entry = "$timestamp | $email | $ip\n";
    
    // Append to log file
    file_put_contents($log_file, $log_entry, FILE_APPEND | LOCK_EX);
}

// =====================================
// CHECK IF EMAIL ALREADY EXISTS
// =====================================
function isDuplicateEmail($email) {
    $log_file = 'email_log.txt';
    
    // If log file doesn't exist, no duplicates possible
    if (!file_exists($log_file)) {
        return false;
    }
    
    // Read the log file
    $log_contents = file_get_contents($log_file);
    
    // If file is empty, no duplicates
    if (empty($log_contents)) {
        return false;
    }
    
    // Split into lines and check each entry
    $lines = explode("\n", $log_contents);
    
    // Normalize the search email for case-insensitive comparison
    $search_email = strtolower(trim($email));
    
    foreach ($lines as $line) {
        if (empty(trim($line))) {
            continue;
        }
        
        // Parse log entry: timestamp | email | ip
        $parts = explode(' | ', $line);
        
        if (count($parts) >= 2) {
            $logged_email = strtolower(trim($parts[1]));
            
            if ($logged_email === $search_email) {
                return true;
            }
        }
    }
    
    return false;
}

// =====================================
// SECURITY NOTES
// =====================================
/*
 * This script includes the following security measures:
 * 
 * 1. SQL Injection: Not applicable (no database queries)
 * 2. XSS Prevention: Email is sanitized using filter_var
 * 3. Email Validation: Multiple validation checks
 * 4. Rate Limiting: Max 3 submissions per hour per session
 * 5. Input Validation: Checks for empty, malformed, and suspicious emails
 * 6. Disposable Email Blocking: Prevents temporary email addresses
 * 7. Method Restriction: Only POST requests allowed
 * 8. CORS Protection: Restricts requests to your domain
 * 9. Header Injection Prevention: Email properly sanitized before use in headers
 * 10. Length Validation: Prevents buffer overflow attacks
 */
?>
