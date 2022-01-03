self.addEventListener("push", (e) => {
  console.log("e :>> ", e.data.text());
  const config = {
    body: e.data.text() || "Yeni Makaleye Gözatın!!",
    data: {
      dateOfArrival: Date.now(),
      primaryKey: "33",
    },
    icon: "images/logo.png",
    vibrate: [100, 50, 100],
    actions: [
      {
        action: "explore",
        title: "Action1",
        //icon:
      },
      { action: "close", title: "Bildirimi Kapat" },
    ],
  };

  e.waitUntil(
    self.registration.showNotification("Yeni Makale Eklendi!!", config)
  );
});
