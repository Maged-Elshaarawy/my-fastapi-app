const { createApp } = Vue;

createApp({
  data() {
    return {
      items: [],
      newItem: "",
      editId: null,
      editName: "",
      darkMode: localStorage.getItem("darkMode") === "true",
      loading: false,
      error: null,
      action: null,
      deletingId: null,
    };
  },

  mounted() {
    this.fetchItems();
    this.applyTheme();
    // Load theme preference on mount
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      if (localStorage.getItem("darkMode") === null) {
        this.darkMode = true;
        this.applyTheme();
      }
    }
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
      try {
        this.loading = true;
        this.error = null;
        const res = await fetch("/api/items");
        if (!res.ok) throw new Error("Failed to fetch items");
        this.items = await res.json();
      } catch (err) {
        this.error = "Failed to load items";
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    async addItem() {
      if (!this.newItem.trim()) return;

      try {
        this.loading = true;
        this.action = "add";
        this.error = null;
        const res = await fetch("/api/items", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: this.newItem.trim() }),
        });
        if (!res.ok) throw new Error("Failed to add item");
        this.newItem = "";
        await this.fetchItems();
      } catch (err) {
        this.error = "Failed to add item";
        console.error(err);
      } finally {
        this.loading = false;
        this.action = null;
      }
    },

    startEdit(item) {
      this.editId = item.id;
      this.editName = item.name;
      // Focus the input after Vue updates
      this.$nextTick(() => {
        const input = document.querySelector('.item-edit-input');
        if (input) input.focus();
      });
    },

    cancelEdit() {
      this.editId = null;
      this.editName = "";
    },

    async updateItem(id) {
      if (!this.editName.trim()) return;

      try {
        this.loading = true;
        this.action = "edit";
        this.error = null;
        const res = await fetch(`/api/items/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: this.editName.trim() }),
        });
        if (!res.ok) throw new Error("Failed to update item");
        this.editId = null;
        this.editName = "";
        await this.fetchItems();
      } catch (err) {
        this.error = "Failed to update item";
        console.error(err);
      } finally {
        this.loading = false;
        this.action = null;
      }
    },

    async deleteItem(id) {
      if (!confirm("Are you sure you want to delete this item?")) return;

      try {
        this.deletingId = id;
        this.error = null;
        const res = await fetch(`/api/items/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Failed to delete item");
        await this.fetchItems();
      } catch (err) {
        this.error = "Failed to delete item";
        console.error(err);
      } finally {
        this.deletingId = null;
      }
    },
  },
}).mount("#app");
