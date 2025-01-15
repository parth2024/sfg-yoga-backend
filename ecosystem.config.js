export const apps = [
    {
      name: "sfg-backend",
      script: "./src/main.ts",
      interpreter: "/usr/bin/ts-node",  // Use ts-node as the interpreter for TypeScript
      watch: true,  // Optional: to watch for changes in your files and auto-restart
    },
  ];