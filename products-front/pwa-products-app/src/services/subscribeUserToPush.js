// services/pushService.js
export async function subscribeUserToPush(registration) {
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlB64ToUint8Array('BGm5bKOxOF91wRWsXQrUd9J9C8j7OJn03nrtqW3iL8gJo44bPdOCzxajr1DCDVDyTMQzh3LUQCK-qb4e7N-Hveg') // Asegúrate de usar tu clave pública
    });
  
    // Envía la suscripción al servidor
    await fetch('/api/subscribe', {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  
  function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    return new Uint8Array([...rawData].map(char => char.charCodeAt(0)));
  }
  