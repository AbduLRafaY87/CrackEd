/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

// Example HTTP function for testing
exports.helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

// Example: Function to verify payment and update user status
exports.verifyPayment = onRequest(async (req, res) => {
    // This is a placeholder. Real implementation would involve:
    // 1. Authentication/Authorization check for admin users
    // 2. Receiving payment_id and user_id from frontend
    // 3. Updating Firestore user document (e.g., set isPaid: true)
    // 4. Triggering welcome email (e.g., by updating a user field that MailerLite watches, or directly via MailerLite API)

    logger.info("Payment verification request received.", req.body);

    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    const { userId, paymentStatus, reason } = req.body; // e.g., 'approved', 'rejected'

    if (!userId || !paymentStatus) {
        return res.status(400).send('Missing userId or paymentStatus');
    }

    try {
        const userRef = db.collection('users').doc(userId);
        if (paymentStatus === 'approved') {
            await userRef.update({
                isPaid: true,
                paymentVerifiedAt: admin.firestore.FieldValue.serverTimestamp(),
                // Add expiryDate logic here
            });
            logger.info(`User ${userId} payment approved.`);
            // Trigger welcome email (e.g., call another function or service)
        } else if (paymentStatus === 'rejected') {
            await userRef.update({
                isPaid: false, // Ensure false if it was pending
                paymentVerifiedAt: admin.firestore.FieldValue.serverTimestamp(),
                paymentRejectionReason: reason || 'Payment could not be verified.',
            });
            logger.info(`User ${userId} payment rejected.`);
            // Trigger rejection email
        } else {
            return res.status(400).send('Invalid paymentStatus');
        }

        res.status(200).send(`Payment for user ${userId} processed as ${paymentStatus}`);

    } catch (error) {
        logger.error("Error processing payment verification:", error);
        res.status(500).send("Internal Server Error");
    }
});
