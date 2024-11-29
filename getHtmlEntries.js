import { glob } from "glob";
import path, { resolve } from "path";

const getHtmlEntries = () => {
  return Object.fromEntries([
    ...glob
      .sync("./**/*.html", { ignore: "./dist/**" })
      .map((file) => [
        file.slice(0, file.length - path.extname(file).length),
        resolve(__dirname, file),
      ]),
  ]);
};

export default getHtmlEntries;
