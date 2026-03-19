const net = require('net');
const crypto = require('crypto');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let username = '';
const PORT = 3000;
const HOST = '127.0.0.1';

/**
 * Calculates SHA-256 hash of a string.
 * @param {string} data - The message content.
 * @returns {string} - The hex digest of the hash.
 */
function calculateHash(data) {
    return crypto.createHash('sha256').update(data).digest('hex');
}

/**
 * Validates the integrity of a message using its hash.
 * @param {Object} payload - The message object.
 * @returns {boolean} - True if valid, false otherwise.
 */
function validateIntegrity(payload) {
    const { message, hash } = payload;
    return calculateHash(message) === hash;
}

const client = new net.Socket();

client.connect(PORT, HOST, () => {
    console.log('[CLIENT] Connected to server.');
    rl.question('Enter your username: ', (answer) => {
        username = answer;
        console.log(`[CLIENT] Logged in as: ${username}`);
        promptMessage();
    });
});

client.on('data', (data) => {
    try {
        const payload = JSON.parse(data.toString());

        // Validate Integrity
        if (validateIntegrity(payload)) {
            console.log(`\r[${payload.sender}]: ${payload.message}`);
        } else {
            console.error('\r[SYSTEM]: Warning! Message integrity failed.');
        }
        promptMessage();
    } catch (e) {
        console.error('[CLIENT] Failed to parse message from server.');
    }
});

client.on('close', () => {
    console.log('[CLIENT] Connection closed.');
    process.exit();
});

client.on('error', (err) => {
    console.error(`[CLIENT] Connection error: ${err.message}`);
});

function promptMessage() {
    rl.question('> ', (input) => {
        let receiver = 'ALL';
        let message = input;

        // Check for private message format: @user message
        if (input.startsWith('@')) {
            const parts = input.split(' ');
            receiver = parts[0].substring(1);
            message = parts.slice(1).join(' ');
        }

        const payload = {
            sender: username,
            receiver: receiver,
            message: message,
            hash: calculateHash(message)
        };

        client.write(JSON.stringify(payload));
        promptMessage();
    });
}
