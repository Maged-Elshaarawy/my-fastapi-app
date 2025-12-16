const { createApp } = Vue;

createApp({
  data() {
    return {
      message: "Hello from Vue"
    }
  },
  methods: {
    async checkApi() {
      const res = await fetch("/api/health");
      const data = await res.json();
      alert(data.status);
    }
  }
}).mount("#app");

