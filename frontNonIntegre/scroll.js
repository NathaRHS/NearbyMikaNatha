const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (!prefersReducedMotion.matches) {
  document.body.classList.add("js-ready");

  const revealGroups = [
    {
      selector: "header",
      classes: ["scroll-reveal"],
    },
    {
      selector: ".bigImageRight",
      classes: ["scroll-reveal", "reveal-left"],
    },
    {
      selector: ".bigImageLeft",
      classes: ["scroll-reveal", "reveal-right"],
    },
    {
      selector: ".productClassicCasual .classics",
      classes: ["scroll-reveal", "reveal-left"],
    },
    {
      selector: ".productClassicCasual .Casual",
      classes: ["scroll-reveal", "reveal-right"],
    },
    {
      selector: ".pontSection",
      classes: ["scroll-reveal", "reveal-up"],
    },
    {
      selector: ".productsGrid .product",
      classes: ["scroll-reveal", "reveal-scale"],
      stagger: true,
    },
    {
      selector: "footer > *",
      classes: ["scroll-reveal", "reveal-up"],
      stagger: true,
    },
  ];

  revealGroups.forEach(({ selector, classes, stagger = false }) => {
    const elements = document.querySelectorAll(selector);

    elements.forEach((element, index) => {
      element.classList.add(...classes);

      if (stagger) {
        element.style.transitionDelay = `${index * 90}ms`;
      }
    });
  });

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  document.querySelectorAll(".scroll-reveal").forEach((element) => {
    observer.observe(element);
  });
}
