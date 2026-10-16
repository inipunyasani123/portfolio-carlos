// Satu titik inisialisasi AOS untuk semua bagian beranda. Animasi dimatikan bila pengguna
// meminta gerak dikurangi (prefers-reduced-motion): AOS lalu melepas atribut data-aos-nya.
export function initAos() {
  import('aos').then(({ default: AOS }) => {
    AOS.init({ duration: 800, once: true, disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches });
  });
}
