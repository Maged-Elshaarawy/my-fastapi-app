const { createApp } = Vue;

createApp({
  data() {
    return {
      loading: false,
      items: [],
      newItem: "",
      editId: null,
      editName: "",
    };
  },

  mounted() {
    this.fetchItems();
  },

  methods: {
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
      {
        this.loading = true;
        const res = await fetch("/api/items");
        this.items = await res.json();
        this.loading = false;
      }
    },
  },
}).mount("#app");
