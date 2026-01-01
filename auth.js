// auth.js
const supabaseUrl = 'https://hoqenpnkmnsfyqsvfvab.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhvcWVucG5rbW5zZnlxc3ZmdmFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY5Mzk5MTUsImV4cCI6MjA4MjUxNTkxNX0.qKqv6NEyCU5ZMNj6Z34kpCiY7NoUzzBggiPSRJdTz0Y'; 

// Initialize Supabase
export const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

/**
 * INVITE VIA EMAIL
 * Sends a magic link/confirmation email to the user
 */
export async function inviteUserByEmail(email) {
    const { data, error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
            // This sends the "Confirm your signup" email template
            emailRedirectTo: window.location.origin + '/admin.html',
        }
    });
    if (error) throw error;
    return data;
}

/**
 * INVITE VIA PHONE (OTP)
 * Sends the 6-digit code to the user's phone
 */
export async function inviteUserByPhone(phone) {
    const { data, error } = await supabase.auth.signInWithOtp({
        phone: phone,
    });
    if (error) throw error;
    return data;
}

/**
 * VERIFY OTP (For Phone Invitations)
 */
export async function verifyInvitation(phone, token) {
    const { data, error } = await supabase.auth.verifyOTP({
        phone: phone,
        token: token,
        type: 'sms'
    });
    if (error) throw error;
    return data;
}