const logoModules = import.meta.glob("../assets/images/tech/*.svg", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const getKey = (path: string) => path.split("/").pop()!.replace(".svg", "");


const displayNameOverrides: Record<string, string> = {
  tailwindcss: "TailwindCSS",
  nextjs: "Next.js",
  nodejs: "Node.js",
  mysql: "MySQL",
  socketio: "Socket.IO",
  html: "HTML",
  css: "CSS",
  javascript: "JavaScript",
};

const needsInvertion: Record<string, boolean> = {
  flask: true,
  mysql: true,
  socketio: true,
  express: true
}

export const techIcons = Object.fromEntries(
  Object.entries(logoModules).map(([path, url]) => {
    const key = getKey(path);

    // default display name if no override
    const defaultName = key.charAt(0).toUpperCase() + key.slice(1);


    var value: Record<string, any> = {
      name: displayNameOverrides[key] ?? defaultName,
      logo: url,
    }

    if (needsInvertion[key]) value["needsInvertion"] = true

    return [
      key,
      value
    ];
  })
);
