// Premium easing curves
const easeOut = [0.25, 0.46, 0.45, 0.94];
const snap = [0.16, 1, 0.3, 1]; // Snappy "overshoot" feel

// ─── Fade ────────────────────────────────────────────────────
export const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: easeOut },
  },
};

export const fadeDown = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

// ─── Slide ───────────────────────────────────────────────────
export const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

// ─── Scale ───────────────────────────────────────────────────
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: snap },
  },
};

// ─── Text reveal (clips from below — parent needs overflow-hidden) ─
export const textReveal = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.75, ease: snap },
  },
};

// ─── Stagger helpers ─────────────────────────────────────────
export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren },
  },
});

export const staggerItem = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

// ─── Card ─────────────────────────────────────────────────────
export const cardVariant = {
  hidden: { opacity: 0, y: 50, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: easeOut },
  },
};

// ─── Section heading underline draw ──────────────────────────
export const underlineDraw = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, delay: 0.3, ease: snap },
  },
};
