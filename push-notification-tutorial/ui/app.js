window.addEventListener("load", async () => {
  const subscribeButton = document.querySelector("#subscribeButton");

  //Register Service Worker
  const sW = await navigator.serviceWorker.register("./sw.js");
  console.log("Service Worker => ", sW);

  subscribeButton.addEventListener("click", async () => {
    const serviceWorker = await navigator.serviceWorker.ready;
    const clientID = await serviceWorker.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: "X",
    });

    console.log(clientID);
    console.log(JSON.stringify(clientID));
  });
});
