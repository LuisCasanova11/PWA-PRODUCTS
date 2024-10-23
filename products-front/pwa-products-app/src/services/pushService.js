// Función para suscribirse a las notificaciones push
export async function subscribeToPush() {
    try {
      const registration = await navigator.serviceWorker.ready;
      
      const applicationServerKey = urlBase64ToUint8Array('BGm5bKOxOF91wRWsXQrUd9J9C8j7OJn03nrtqW3iL8gJo44bPdOCzxajr1DCDVDyTMQzh3LUQCK-qb4e7N-Hveg');
  
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey
      });
  
      console.log('Suscripción obtenida:', subscription);
  
      // Enviar la suscripción al servidor (ajusta la URL)
      await fetch('https://localhost:5000/api/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      // Almacenar la suscripción localmente si lo deseas
      localStorage.setItem('pushSubscription', JSON.stringify(subscription));
  
    } catch (error) {
      console.error('Error al suscribirse a las notificaciones push:', error);
    }
  }
  
  export function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
  
    return outputArray;
  }
  