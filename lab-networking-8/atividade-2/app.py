from flask import Flask, request, jsonify
import logging

app = Flask(__name__)

logging.basicConfig(level=logging.INFO)

device_status = {
    "speed": 0,
    "temperature": 25,
    "power": "OFF"
}

@app.route('/', methods=['GET'])
def get_status():
    """Retorna o status atual do dispositivo simulado."""
    return jsonify(device_status), 200

@app.route('/control', methods=['POST'])
def control_device():
    """
    Recebe comandos para alterar o estado do dispositivo.
    Payload esperado:
    {
      "client_id": 1223,
      "type": "speed",
      "value": 20
    }
    """
    data = request.get_json()

    if not data:
        return jsonify({"error": "No JSON payload provided"}), 400

    client_id = data.get("client_id")
    command_type = data.get("type")
    value = data.get("value")

    if not all([client_id, command_type, value]):
        return jsonify({"error": "Missing required fields"}), 400

    if command_type in device_status:
        device_status[command_type] = value
        app.logger.info(f"Client {client_id} updated {command_type} to {value}")
        return jsonify({"status": "success", "updated_status": device_status}), 200
    else:
        return jsonify({"error": f"Invalid command type: {command_type}"}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
