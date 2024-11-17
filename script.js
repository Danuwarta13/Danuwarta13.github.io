document.addEventListener("scroll", function () {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";

  // Periksa scroll posisi
  if (pageYOffset === 0) {
    current = "home"; // Tetapkan ke "home" jika di posisi paling atas
  } else {
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100; // Offset untuk kompensasi tinggi navbar
      if (pageYOffset >= sectionTop) {
        current = section.getAttribute("id");
      }
    });
  }

  // Update kelas 'active' untuk menu
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.href.includes(current)) {
      link.classList.add("active");
    }
  });
});

// Animasi Mnegetik
const texts = ["Muchalim Danu Warta."];
const typingSpeed = 100; // Kecetapan mengetik
const erasingSpeed = 50; // Kecepatan Meghapus
const delayBetweenTexts = 1000; // Jeda sebelum text sebelum nya dimulai
let index = 0; // Huruf yang sedang diketik
let textIndex = 0; // Indeks kalimat yang sedang tampil
let isDeleting = false; // Status apakah sedang mengetik

function typeText() {
  // Ambil elemen dengan ID typingText
  const typingElement = document.getElementById("typingText");

  // Ambil text saat ini berdasarkan index
  const currentText = texts[textIndex];

  // Tambah atau hapus huruf
  if (!isDeleting) {
    typingElement.textContent += currentText[index]; // Tambahkan huruf
    index++;

    // Jika selesai mengetik
    if (index === currentText.length) {
      isDeleting = true; // Ubah status menjadi menghapus
      setTimeout(typeText, delayBetweenTexts); // Tunggu sebelum mulai menghapus
      return;
    }
  } else {
    typingElement.textContent = currentText.substring(0, index - 1); // Hapus Huruf
    index--;

    // Jika selesai menghapus
    if (index === 0) {
      isDeleting = false; // Ubah setatus menjadi mengetik
      textIndex = (textIndex + 1) % texts.length; // pindah ke teks berikutnya
    }
  }

  // Panggil lagi dengan jeda sesuai status (mengetik/menghapus)
  setTimeout(typeText, isDeleting ? erasingSpeed : typingSpeed);
}

// Jalankan animasi saat halaman dimuat
typeText();
