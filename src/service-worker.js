/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
// @ts-ignore
import { precacheAndRoute } from "workbox-precaching";

precacheAndRoute(self.__WB_MANIFEST);
workbox.core.setCacheNameDetails({ prefix: "news-app" });

workbox.routing.registerRoute(
  new RegExp("https://newsapi.org/.*"),
  new workbox.strategies.NetworkFirst()
);

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});
