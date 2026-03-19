const net = require('net');
const crypto = require('crypto');

const PORT = 3000;
const clients = new Map();

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

const server = net.createServer((socket) => {
    let clientId = `${socket.remoteAddress}:${socket.remotePort}`;
    console.log(`[SERVER] New client connected: ${clientId}`);

    socket.on('data', (data) => {
        try {
            const payload = JSON.parse(data.toString());

            // 1. Validate Integrity
            if (!validateIntegrity(payload)) {
                console.error(`[SERVER] Integrity check failed for message from ${payload.sender}`);
                socket.write(JSON.stringify({
                    sender: 'SYSTEM',
                    message: 'Error: Message integrity check failed.',
                    hash: calculateHash('Error: Message integrity check failed.')
                }));
                return;
            }

            // 2. Register client name if not already done
            if (!clients.has(payload.sender)) {
                clients.set(payload.sender, socket);
                console.log(`[SERVER] Client registered as: ${payload.sender}`);
            }

            // 3. Routing: Private or Broadcast
            if (payload.receiver && payload.receiver !== 'ALL') {
                // Private Message
                const targetSocket = clients.get(payload.receiver);
                if (targetSocket) {
                    targetSocket.write(JSON.stringify(payload));
                    console.log(`[SERVER] Private message from ${payload.sender} to ${payload.receiver}`);
                } else {
                    socket.write(JSON.stringify({
                        sender: 'SYSTEM',
                        message: `Error: User ${payload.receiver} not found.`,
                        hash: calculateHash(`Error: User ${payload.receiver} not found.`)
                    }));
                }
            } else {
                // Broadcast
                console.log(`[SERVER] Broadcast from ${payload.sender}: ${payload.message}`);
                for (const [name, clientSocket] of clients.entries()) {
                    if (name !== payload.sender) {
                        clientSocket.write(JSON.stringify(payload));
                    }
                }
            }
        } catch (error) {
            console.error('[SERVER] Error processing message:', error.message);
        }
    });

    socket.on('end', () => {
        // Clean up on disconnect
        for (const [name, clientSocket] of clients.entries()) {
            if (clientSocket === socket) {
                clients.delete(name);
                console.log(`[SERVER] Client ${name} disconnected.`);
                break;
            }
        }
    });

    socket.on('error', (err) => {
        console.error(`[SERVER] Socket error: ${err.message}`);
    });
});

server.listen(PORT, () => {
    console.log(`[SERVER] TCP Server listening on port ${PORT}`);
});
