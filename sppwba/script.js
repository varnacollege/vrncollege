(() => {
  const FORM_ENABLED = false;
  const forms = document.querySelectorAll(".js-lead-form");

  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!FORM_ENABLED) return;

      const data = new FormData(form);
      const payload = {
        name: String(data.get("name") || "").trim(),
        email: String(data.get("email") || "").trim(),
        page: "sppwba",
      };
      if (!payload.name || !payload.email) return;
      console.info("SPPWBA lead (pending email wiring):", payload);
      form.reset();
      alert("Заявката е приета. Очаквайте наръчника на имейла си.");
    });
  });
})();
