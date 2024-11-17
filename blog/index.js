import dummy from "./content.md";
import { log } from "@/utils";

log();

document.querySelector("[data-content]").innerHTML = dummy;

if (import.meta.hot) {
  import.meta.hot.on("markdown-update", (data) => {
    document.querySelector("[data-content]").innerHTML = data;
  });
}