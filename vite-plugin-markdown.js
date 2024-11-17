import Markdown from "markdown-it";
const md = new Markdown();

const mdCustomPlugin = () => {
  return {
    name: "vite-plugin-markdown",
    transform(code, id) {
      if (/\.(md)$/.test(id)) {
        const result = md.render(code);

        return `export default ${JSON.stringify(result)}`;
      }
    },
    async handleHotUpdate({ server, file, read }) {
      if (/\.(md)$/.test(file)) {
        server.ws.send({
          type: "custom",
          event: "markdown-update",
          data: md.render(await read()),
        });
        return [];
      }
    },
  };
};

export default mdCustomPlugin;
