self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("planner-v1").then(cache => {
      return cache.addAll([
        "./",
        "./index.html",
        "./style.css",
        "./app.js"
      ]);
    })
  );
});
