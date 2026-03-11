module.exports = {
    apps: [{
      name: "baglac-website",
      script: "npm",
      args: "start",
      env: {
        PORT: 3001,
        NODE_ENV: "production"
      }
    }]
  };