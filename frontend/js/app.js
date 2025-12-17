const { createApp } = Vue;

createApp({
  data() {
    return {
      items: [],
      newItem: "",
      editId: null,
      editName: "",
      darkMode: localStorage.getItem("darkMode") === "true",
    };
  },

  mounted() {
    this.fetchItems();
    this.applyTheme();
  },

  methods: {
    applyTheme() {
      document.body.classList.toggle("dark", this.darkMode);
      localStorage.setItem("darkMode", this.darkMode);
    },

    toggleDarkMode() {
      this.darkMode = !this.darkMode;
      this.applyTheme();
    },

    async fetchItems() {
      const res = await fetch("/api/items");
      this.items = await res.json();
    },

    async addItem() {
      if (!this.newItem) return;

      await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: this.newItem }),
      });

      this.newItem = "";
      this.fetchItems();
    },

    startEdit(item) {
      this.editId = item.id;
      this.editName = item.name;
    },

    async updateItem(id) {
      await fetch(`/api/items/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: this.editName }),
      });

      this.editId = null;
      this.editName = "";
      this.fetchItems();
    },

    async deleteItem(id) {
      if (!confirm("Are you sure you want to delete this item?")) return;

      await fetch(`/api/items/${id}`, { method: "DELETE" });
      this.fetchItems();
    },
  },
}).mount("#app");
