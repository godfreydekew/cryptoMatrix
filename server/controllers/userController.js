//controllers/userController.js
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import createBybitClient from '../config/bybit.js';
import nodemailer from 'nodemailer';



const PASSWORD =  process.env.EMAIL_PASSWORD;
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Use SSL/TLS for secure connection
    auth: {
        user: "dekewgodfrey@gmail.com",  // Your email
        pass: PASSWORD
    }
});


// Function to send a welcome email after successful registration
const sendWelcomeEmail = (username, recipientEmail) => {
    const subject = `Welcome to CryptoMatrix, ${username}!`;
    const text = `Dear ${username},

    Thank you for joining CryptoMatrix. We're pleased to confirm your account has been successfully created.

    How CryptoMatrix can help you:

    • Track your balance across multiple wallets and exchanges in real-time
    • Monitor your transaction history, including deposits and withdrawals
    • Gain insights into your portfolio with advanced analytics

    Our support team is available if you need assistance.

    Best regards,
    
    The CryptoMatrix Team`;

    const mailOptions = {
        from: "dekewgodfrey@gmail.com",  // Sender email
        to: recipientEmail,  // Recipient email
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending welcome email:', error);
        } else {
            console.log('Welcome email sent:', info.response);
        }
    });
};
// Signup controller
const registerUser = async (req, res) => {
    
    const { username, email, password, apiKey, secretKey } = req.body;
    
    try {
        const userExists = await User.findOne({ username });
        const emailExists = await User.findOne({ email });
        if (userExists || emailExists) return res.status(400).json({ error: 'Username or email already exists' });

        if (!apiKey || !secretKey) return res.status(404).json({ error:  'API key or Secret key missing'});

        const bybitClient = createBybitClient(apiKey, secretKey);
        const accountType = 'FUND';
        const coin = '';
        const response = await bybitClient.getAllCoinsBalance({ accountType, coin });
        if (response.retMsg !== 'success') {
          console.error('Error getting balance:', response.retMsg);
          throw new Error(response.retMsg);  // Throw an error with the retMsg for easier debugging.
        } 

        const user = await User.create({ username, email, password, apiKey, secretKey });

        console.log('Befor logging in', req.session)
        // Store user info in session after registration
        req.session.userId = user._id;
        req.session.username = user.username;
        req.session.apiKey = user.apiKey;  // Store API key in session
        req.session.secretKey = user.secretKey;  // Store Secret key in session
        // console.log('Session data:', req.session);
        sendWelcomeEmail(username, email);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'User registered failed' });
    }
};


// Login controller
const loginUser = async (req, res) => {

    console.log('login Session data:', req.session);
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Store user info in session
        req.session.userId = user._id;
        req.session.username = user.username;
        req.session.apiKey = user.apiKey;  
        req.session.secretKey = user.secretKey;
        console.log('Session data:', req.session);

        res.json({ message: 'Logged in successfully'});
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};


// Logout controller
const logoutUser = (req, res) => {
    console.log('Session data:', req.session);

    req.session.destroy((err) => {
        if (err) return res.status(500).json({ error: 'Logout failed' });
        res.clearCookie('connect.sid'); // Clear session cookie
        res.json({ message: 'Logged out successfully' });
    });
};

// Update API Key controller
const updateApiKey = async (req, res) => {
    // Check session data
    console.log('Session data:', req.session);

    const { userId } = req.session;
    if (!userId) {
        return res.status(401).json({ error: 'You must be logged in to update API keys' });
    }

    const { apiKey, secretKey } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.apiKey = apiKey;
        user.secretKey = secretKey;

        console.log('Updated API Key:', user.apiKey, 'Updated Secret Key:', user.secretKey);
        await user.save();
        req.session.apiKey = user.apiKey;  // Store API key in session
        req.session.secretKey = user.secretKey;  // Store Secret key in session
        res.json({ message: 'API keys updated successfully' });
        
    } catch (error) {
        console.error('Error updating API keys:', error); // Log the error for debugging
        res.status(500).json({ error: 'Server error' });
    }
};


const getApiKeys = async (req, res) => {
    const { userId } = req.session;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        res.json({ apiKey: user.apiKey, secretKey: user.secretKey });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Helper function to generate a 5-digit random code
const generateRecoveryCode = () => {
    return Math.floor(10000 + Math.random() * 90000).toString();
};

// Function to send the recovery code via email
const sendRecoveryCode = (email, code) => {
    const mailOptions = {
        from: 'dekewgodfrey@gmail.com',
        to: email,
        subject: 'CryptoMatrix Password Reset',
        text: `Your cryptoMatrix password reset code is: ${code} \nPLease dont share it with anyone`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending recovery code email:', error);
        } else {
            console.log('Recovery code email sent:', info.response);
        }
    });
};


const requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Generate recovery code and send it via email
        const recoveryCode = generateRecoveryCode();
        user.recoveryCode = recoveryCode;
        await user.save();

        sendRecoveryCode(email, recoveryCode);

        res.json({ message: 'Recovery code sent to your email.' });
    } catch (error) {
        console.error('Error during password reset request:', error);
        res.status(500).json({ error: 'Server error' });
    }
};


// Password reset (validate recovery code and set new password)
const resetPassword = async (req, res) => {
    const { email, recoveryCode, newPassword } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Validate the recovery code
        if (user.recoveryCode !== recoveryCode) {
            return res.status(400).json({ error: 'Invalid recovery code' });
        }

        // // Update the password
        // const salt = await bcrypt.genSalt(10);
        // user.password = await bcrypt.hash(newPassword, salt);
        user.password = newPassword;
        user.recoveryCode = null;
        await user.save();

        res.json({ message: 'Password has been reset successfully' });
    } catch (error) {
        console.error('Error during password reset:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// sendRecoveryCode('dekewgodfrey@icloud.com', '234234523')
// console.log(generateRecoveryCode())
export { registerUser, loginUser, logoutUser, updateApiKey, getApiKeys, requestPasswordReset, resetPassword};
