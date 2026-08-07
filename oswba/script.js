(() => {
  const modal = document.getElementById("reg-modal");
  const form = document.getElementById("reg-form");
  const success = document.getElementById("form-success");
  const openers = document.querySelectorAll(".js-open-form");
  const closers = document.querySelectorAll(".js-close-form");

  function openModal(source) {
    if (!modal) return;
    modal.hidden = false;
    document.body.classList.add("modal-open");
    if (form) {
      form.hidden = false;
      form.dataset.source = source || "unknown";
    }
    if (success) success.hidden = true;
    const first = form?.querySelector("input");
    first?.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove("modal-open");
  }

  const FORM_ENABLED = false;

  openers.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      if (!FORM_ENABLED) return;
      openModal(btn.dataset.source);
    });
  });

  closers.forEach((btn) => {
    btn.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && !modal.hidden) closeModal();
  });

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      source: form.dataset.source || "unknown",
      page: "oswba",
    };

    if (!payload.name || !payload.email) return;

    // Ready for Formspree / serverless email later:
    // await fetch("https://formspree.io/f/xxxxx", { method: "POST", body: JSON.stringify(payload), headers: { "Content-Type": "application/json" }})
    console.info("OSWBA registration (pending email wiring):", payload);

    form.hidden = true;
    if (success) success.hidden = false;
    form.reset();
  });

  const revealTargets = document.querySelectorAll(
    ".why, .packs, .mid-cta, .speaker, .proof, .footer-cta"
  );
  revealTargets.forEach((el) => el.classList.add("reveal"));

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealTargets.forEach((el) => io.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }
})();
