const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://f4hatlr72b.execute-api.us-east-1.amazonaws.com/production'
  }
})