import requests
import json
import sys

BASE_URL = "http://localhost:5000"

def get_device_status():
    """Consulta o status atual do dispositivo, meu bem!"""
    try:
        response = requests.get(f"{BASE_URL}/")
        response.raise_for_status()
        print(f"Status Atual: {json.dumps(response.json(), indent=2)}")
    except requests.exceptions.RequestException as e:
        print(f"Erro ao consultar status: {e}")

def send_command(client_id, command_type, value):
    """Envia um comando para o dispositivo."""
    payload = {
        "client_id": client_id,
        "type": command_type,
        "value": value
    }
    
    print(f"\nEnviando comando do cliente {client_id}: {command_type} -> {value}")
    
    try:
        response = requests.post(f"{BASE_URL}/control", json=payload)
        response.raise_for_status()
        print(f"Resposta do Servidor: {json.dumps(response.json(), indent=2)}")
    except requests.exceptions.RequestException as e:
        print(f"Erro ao enviar comando: {e}")

if __name__ == "__main__":
    print("--- Consultando Status Inicial ---")
    get_device_status()

    send_command(client_id=1223, command_type="speed", value=20)

    print("\n--- Consultando Status Final ---")
    get_device_status()
