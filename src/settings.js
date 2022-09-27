let DEBUG = true;
let HOST_URL = "localhost";
let SOCKET_URL = "ws://127.0.0.1:8000";
if (DEBUG) {
  HOST_URL = "http://127.0.0.1:8000";
  SOCKET_URL = "ws://127.0.0.1:8000";
}

export { HOST_URL, SOCKET_URL };
