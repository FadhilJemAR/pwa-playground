const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
        await navigator.serviceWorker.register("/sw.js", { scope: "/",});

    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};
registerServiceWorker();