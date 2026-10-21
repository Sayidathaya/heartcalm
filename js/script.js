// Interaksi landing page HEARTCALM Acne Water Gel.
// Membutuhkan Bootstrap bundle (dimuat di index.html sebelum file ini).

document.addEventListener('DOMContentLoaded', () => {
    aktifkanSmoothScroll();
    aktifkanValidasiNewsletter();
    buatGelembung();
    aktifkanReveal();
    aktifkanScrollSpy();
    aktifkanEfekScroll();
});

// Smooth scroll ke bagian tujuan; posisi disesuaikan dengan tinggi navbar sticky
const aktifkanSmoothScroll = () => {
    const navbar = document.getElementById('navbar');
    const menuNavbar = document.getElementById('navbarSupportedContent');

    document.querySelectorAll('a.nav-link, a.navbar-brand').forEach(tautan => {
        tautan.addEventListener('click', (event) => {
            const bagianTujuan = document.getElementById(tautan.getAttribute('href').substring(1));
            if (!bagianTujuan) return;

            event.preventDefault();
            const posisi = bagianTujuan.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight;
            window.scrollTo({ top: Math.max(posisi, 0), behavior: 'smooth' });

            // tutup menu hamburger (layar ponsel) setelah item dipilih
            if (menuNavbar.classList.contains('show')) {
                bootstrap.Collapse.getOrCreateInstance(menuNavbar).hide();
            }
        });
    });
};

// Validasi format email newsletter + modal konfirmasi.
// Hanya simulasi antarmuka: email tidak dikirim atau disimpan ke database.
const aktifkanValidasiNewsletter = () => {
    const formNewsletter = document.getElementById('newsletterForm');
    const modalKonfirmasi = bootstrap.Modal.getOrCreateInstance(document.getElementById('newsletterModal'));

    formNewsletter.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!formNewsletter.checkValidity()) {
            formNewsletter.classList.add('was-validated'); // tampilkan pesan error
            return;
        }

        modalKonfirmasi.show();
        formNewsletter.reset();
        formNewsletter.classList.remove('was-validated');  // bersihkan status validasi setelah sukses
    });
};

// Gelembung air yang naik perlahan sebagai dekorasi
const buatGelembung = (jumlah = 14) => {
    const wadah = document.getElementById('bubbles');
    for (let i = 0; i < jumlah; i++) {
        const gelembung = document.createElement('span');
        const ukuran = 12 + Math.random() * 46;
        gelembung.className = 'bubble';
        gelembung.style.cssText = `width:${ukuran}px;height:${ukuran}px;left:${Math.random() * 100}%;` +
            `animation-duration:${10 + Math.random() * 14}s;animation-delay:${-Math.random() * 20}s;` +
            `--dx:${(Math.random() - 0.5) * 120}px`;
        wadah.appendChild(gelembung);
    }
};

// Elemen muncul halus saat di-scroll; cincin persentase ikut dianimasikan
const aktifkanReveal = () => {
    const pengamat = new IntersectionObserver((daftar) => {
        daftar.forEach(item => {
            if (!item.isIntersecting) return;
            item.target.classList.add('in');
            item.target.querySelectorAll('.ring').forEach(animasiCincin);
            pengamat.unobserve(item.target);
        });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(el => pengamat.observe(el));
};

const animasiCincin = (cincin) => {
    const target = Number(cincin.dataset.target);
    const angka = cincin.querySelector('b');
    const mulai = performance.now();

    const langkah = (sekarang) => {
        const progres = Math.min((sekarang - mulai) / 1600, 1);
        const nilai = Math.round(target * (1 - Math.pow(1 - progres, 3)));
        cincin.style.setProperty('--p', nilai);
        angka.textContent = nilai + '%';
        if (progres < 1) requestAnimationFrame(langkah);
    };
    requestAnimationFrame(langkah);
};

// Menandai menu navbar sesuai bagian yang sedang dilihat
const aktifkanScrollSpy = () => {
    const tautanMenu = document.querySelectorAll('#navbar a.nav-link');
    const pengamat = new IntersectionObserver((daftar) => {
        daftar.forEach(item => {
            if (!item.isIntersecting) return;
            tautanMenu.forEach(t => t.classList.toggle('active', t.getAttribute('href') === '#' + item.target.id));
        });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main section[id]').forEach(bagian => pengamat.observe(bagian));
};

// Progress bar scroll + bayangan navbar saat halaman digulir
const aktifkanEfekScroll = () => {
    const bar = document.getElementById('scrollbar');
    const navbar = document.getElementById('navbar');

    const perbarui = () => {
        const tinggi = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (tinggi > 0 ? (window.scrollY / tinggi) * 100 : 0) + '%';
        navbar.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', perbarui, { passive: true });
    perbarui();
};
