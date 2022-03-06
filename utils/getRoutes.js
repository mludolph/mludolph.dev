export default async () => {
  const { $content } = require("@nuxt/content");
  const files = await $content({ deep: true })
    .only(["published", "path"])
    .fetch();
  return files
    .filter((file) => file.published)
    .map((file) => (file.path === "/index" ? "/" : file.path));
};
