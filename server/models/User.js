// /models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

/**
 * Mongoose schema for a User.
 * 
 * This schema defines the structure of the User document in MongoDB. It includes 
 * fields for username, email, password, API keys, and an optional recovery code. 
 * Password encryption is handled automatically before saving, and methods are 
 * provided for password comparison.
 * 
 * @typedef {Object} User
 * @property {String} username - Unique username for the user.
 * @property {String} email - Unique email address for the user.
 * @property {String} password - Hashed user password.
 * @property {String} apiKey - API key for the user.
 * @property {String} secretKey - Secret key for the user.
 * @property {String|null} recoveryCode - Optional recovery code for account recovery.
 * @property {Date} createdAt - Timestamp for when the user was created.
 * @property {Date} updatedAt - Timestamp for when the user was last updated.
 */
const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    apiKey: { type: String, required: true },
    secretKey: { type: String, required: true },
    recoveryCode: { type: String, default: null } 
}, { timestamps: true });


/**
 * Pre-save middleware to hash the user's password before saving it to the database.
 * 
 * If the password field is modified, the function generates a salt and hashes the password.
 * This ensures that the password is stored securely in the database.
 * 
 * @function pre-save
 * @param {Function} next - Express callback to proceed to the next middleware.
 */
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

/**
 * Method to compare the entered password with the user's hashed password.
 * 
 * This method compares a plaintext password with the stored, hashed password using bcrypt.
 * 
 * @function matchPassword
 * @param {String} enteredPassword - The password entered by the user.
 * @returns {Promise<Boolean>} Returns `true` if the password matches, otherwise `false`.
 */
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

/**
 * Mongoose model for the User schema.
 * 
 * @typedef {Model} User
 */
const User = mongoose.model('User', userSchema);
export default User;
