// ===== Sticky Navbar =====
const navbar = document.querySelector(".navbar");

navbar.style.transition = "all 0.3s ease";

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    // Sticky state
    navbar.style.position = "fixed";
    navbar.style.top = "0";
    navbar.style.left = "0";
    navbar.style.width = "100%";
    navbar.style.zIndex = "1000";
    navbar.style.transform = "translateY(0)";
    navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.08)";
  } else {
    // Normal state
    navbar.style.position = "relative";
    navbar.style.boxShadow = "none";
  }
});

/* ===== IMAGE ZOOM ===== */

const mainImage = document.getElementById("mainImage");

const lens = document.querySelector(".zoom-lens");

const zoomResult = document.querySelector(".zoom-result");

const zoomedImage = document.getElementById("zoomedImage");

zoomedImage.src = mainImage.src;

// SHOW
mainImage.addEventListener("mouseenter", () => {
  if (window.innerWidth > 992) {
    lens.style.display = "block";
    zoomResult.style.display = "block";
  }
});

// HIDE
mainImage.addEventListener("mouseleave", () => {
  lens.style.display = "none";
  zoomResult.style.display = "none";
});

// MOVE
mainImage.addEventListener("mousemove", moveLens);

function moveLens(e) {
  const rect = mainImage.getBoundingClientRect();

  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;

  const lensWidth = lens.offsetWidth / 2;
  const lensHeight = lens.offsetHeight / 2;

  x = Math.max(lensWidth, Math.min(x, rect.width - lensWidth));

  y = Math.max(lensHeight, Math.min(y, rect.height - lensHeight));

  lens.style.left = `${x - lensWidth}px`;

  lens.style.top = `${y - lensHeight}px`;

  const percentX = x / rect.width;
  const percentY = y / rect.height;

  zoomedImage.style.left = `-${percentX * 100}%`;

  zoomedImage.style.top = `-${percentY * 100}%`;
}

/* ===== UPDATE ZOOM IMAGE ===== */

function updateZoomImage() {
  zoomedImage.src = mainImage.src;
}

// ===== Carousel Logic =====
const images = [
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1616661317985-aeb2a13016d6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHBpcGVzfGVufDB8fDB8fHww",
  "https://plus.unsplash.com/premium_photo-1664299333564-2460b069dd32?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHBpcGVsaW5lfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1759950345204-dae34876d9cb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGhkcGUlMjBwaXBlfGVufDB8fDB8fHww",
  "https://media.istockphoto.com/id/2262651443/photo/worker-performing-hdpe-pipe-fusion-welding-on-construction-site.webp?a=1&b=1&s=612x612&w=0&k=20&c=7UmdiPBH_IyCeODXFu5Q3J1PqDFqEWfPocWIC0LXMSA=",
  "https://images.unsplash.com/photo-1642797735471-3e90055c5ff9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGluZHVzdHJpYWwlMjBwaXBlfGVufDB8fDB8fHww",
  "https://plus.unsplash.com/premium_photo-1672213508054-f4eed47dba71?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29pbHN8ZW58MHx8MHx8fDA%3D",
  "https://media.istockphoto.com/id/1163344935/photo/steel-coil-transport.webp?a=1&b=1&s=612x612&w=0&k=20&c=gXfEeExtPMsQuJwi0R7X0EgDimk2VkoAdpHWkkRz3h0=",
  "https://media.istockphoto.com/id/912174592/photo/modern-pipe-rolling-plant-with-steel-tubes.webp?a=1&b=1&s=612x612&w=0&k=20&c=AS3r95thMJ_--bPPVjgEiv0CfrkuM3XcvhM3AigC5WY=",
];

let currentIndex = 0;
let scrollIndex = 0;
const extendedImages = [...images, ...images];

const mainImg = document.querySelector(".main-img img");
const nextBtn = document.querySelector(".arrow.right");
const prevBtn = document.querySelector(".arrow.left");
const thumbContainer = document.querySelector(".thumbnails");

const thumbWidth = 90; // 80px + gap

// create thumbnails
extendedImages.forEach((img) => {
  const image = document.createElement("img");
  image.src = img;
  image.classList.add("thumb");
  image.loading = "eager";
  image.referrerPolicy = "no-referrer";
  thumbContainer.appendChild(image);
});

// select AFTER creating
const thumbnails = document.querySelectorAll(".thumb");

// ACTIVE
function updateActiveThumb() {
  thumbnails.forEach((thumb, i) => {
    thumb.classList.toggle("active", i % images.length === currentIndex);
  });
}

// SLIDE
function updateSlider() {
  thumbContainer.style.transform = `translateX(-${scrollIndex * thumbWidth}px)`;
}

// NEXT
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;

  mainImg.src = images[currentIndex];
  updateZoomImage();

  // FIX: compare in images scale
  let lastVisibleIndex = (scrollIndex + 5) % images.length;

  if (currentIndex === lastVisibleIndex) {
    scrollIndex++;
  }

  // loop reset (smooth)
  if (scrollIndex >= images.length) {
    scrollIndex = 0;
    thumbContainer.style.transition = "none";
    updateSlider();

    setTimeout(() => {
      thumbContainer.style.transition = "transform 0.3s ease";
    }, 50);
  }

  updateSlider();
  updateActiveThumb();
});

// PREVIOUS
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;

  mainImg.src = images[currentIndex];
  updateZoomImage();

  if (currentIndex === scrollIndex % images.length) {
    scrollIndex--;
  }

  if (scrollIndex < 0) {
    scrollIndex = images.length - 1;
  }

  updateSlider();
  updateActiveThumb();
});

// CLICK
thumbnails.forEach((thumb, i) => {
  thumb.addEventListener("click", () => {
    currentIndex = i;
    mainImg.src = images[currentIndex];
    updateZoomImage();
    updateActiveThumb();
  });
});

// INIT
mainImg.src = images[0];
updateActiveThumb();

/* ===== FAQ Toggle ===== */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");

  question.addEventListener("click", () => {
    faqItems.forEach((faq) => {
      if (faq !== item) {
        faq.classList.remove("active");

        faq.querySelector("i").classList.remove("fa-chevron-up");
        faq.querySelector("i").classList.add("fa-chevron-down");
      }
    });

    item.classList.toggle("active");

    const icon = item.querySelector("i");

    if (item.classList.contains("active")) {
      icon.classList.remove("fa-chevron-down");
      icon.classList.add("fa-chevron-up");
    } else {
      icon.classList.remove("fa-chevron-up");
      icon.classList.add("fa-chevron-down");
    }
  });
});

/* ===== Applications Slider ===== */

const slider = document.querySelector(".applications-slider");
const appNextBtn = document.querySelector(".app-next");
const appPrevBtn = document.querySelector(".app-prev");

appNextBtn.addEventListener("click", () => {
  slider.scrollBy({
    left: 450,
    behavior: "smooth",
  });
});

appPrevBtn.addEventListener("click", () => {
  slider.scrollBy({
    left: -450,
    behavior: "smooth",
  });
});

/* ===== Process Tabs ===== */

// const processTabs = document.querySelectorAll(".process-tab");

// const processTitle = document.getElementById("processTitle");
// const processText = document.getElementById("processText");
// const processPoint1 = document.getElementById("processPoint1");
// const processPoint2 = document.getElementById("processPoint2");
// const processImage = document.getElementById("processImage");

// processTabs.forEach((tab) => {
//   tab.addEventListener("click", () => {
//     processTabs.forEach((item) => {
//       item.classList.remove("active");
//     });

//     tab.classList.add("active");

//     processTitle.innerHTML = tab.dataset.title;
//     processText.innerHTML = tab.dataset.text;
//     processPoint1.innerHTML = tab.dataset.point1;
//     processPoint2.innerHTML = tab.dataset.point2;
//     processImage.src = tab.dataset.image;
//   });
// });

/* ===== Process Tabs ===== */

const processTabs = document.querySelectorAll(".process-tab");

const processTitle = document.getElementById("processTitle");
const processText = document.getElementById("processText");
const processPoint1 = document.getElementById("processPoint1");
const processPoint2 = document.getElementById("processPoint2");
const processImage = document.getElementById("processImage");

const nextProcessBtn = document.querySelector(".next-btn");
const prevProcessBtn = document.querySelector(".prev-btn");

let currentProcess = 0;

// ===== UPDATE FUNCTION =====

function updateProcess(index) {
  processTabs.forEach((tab) => {
    tab.classList.remove("active");
  });

  const activeTab = processTabs[index];

  activeTab.classList.add("active");

  processTabs.forEach((tab) => {
    tab.innerHTML = tab.dataset.step;
  });

  if (window.innerWidth <= 992) {
    activeTab.innerHTML = `Step ${index + 1}/${processTabs.length}: ${activeTab.dataset.step}`;
  }
  processTitle.innerHTML = activeTab.dataset.title;
  processText.innerHTML = activeTab.dataset.text;
  processPoint1.innerHTML = activeTab.dataset.point1;
  processPoint2.innerHTML = activeTab.dataset.point2;
  processImage.src = activeTab.dataset.image;

  currentProcess = index;
}

// ===== TAB CLICK =====

processTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    updateProcess(index);
  });
});

// ===== NEXT =====

nextProcessBtn.addEventListener("click", () => {
  if (currentProcess < processTabs.length - 1) {
    updateProcess(currentProcess + 1);
  }
});

// ===== PREVIOUS =====

prevProcessBtn.addEventListener("click", () => {
  if (currentProcess > 0) {
    updateProcess(currentProcess - 1);
  }
});

// ===== INITIAL =====

updateProcess(0);
window.addEventListener("resize", () => {
  updateProcess(currentProcess);
});

fetch("modals/datasetModal.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("datasheet-modal-container").innerHTML = data;

    // ===== DATASHEET MODAL =====

    const openModalBtn = document.getElementById("openDatasheetModal");

    const modal = document.getElementById("datasheetModal");

    const closeModalBtn = document.getElementById("closeDatasheetModal");

    const overlay = document.querySelector(".datasheet-overlay");

    openModalBtn.addEventListener("click", () => {
      modal.classList.add("active");
    });

    closeModalBtn.addEventListener("click", () => {
      modal.classList.remove("active");
    });

    overlay.addEventListener("click", () => {
      modal.classList.remove("active");
    });

    const emailInput = modal.querySelector('input[type="email"]');

    const contactInput = modal.querySelector('input[type="text"]');

    const downloadBtn = modal.querySelector(".download-btn");

    // initially disabled

    downloadBtn.disabled = true;

    function validateForm() {
      const emailFilled = emailInput.value.trim() !== "";

      const contactFilled = contactInput.value.trim() !== "";

      if (emailFilled && contactFilled) {
        downloadBtn.disabled = false;

        downloadBtn.classList.add("active");
      } else {
        downloadBtn.disabled = true;

        downloadBtn.classList.remove("active");
      }
    }

    emailInput.addEventListener("input", validateForm);

    contactInput.addEventListener("input", validateForm);
  });

// ===== LOAD QUOTE MODAL =====

fetch("modals/quoteModal.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("quote-modal-container").innerHTML = data;

    const quoteModal = document.getElementById("quoteModal");
    const openQuoteBtn = document.getElementById("openQuoteModal");
    const closeQuoteBtn = quoteModal.querySelector(".close-modal");
    const quoteOverlay = quoteModal.querySelector(".datasheet-overlay");

    // OPEN
    openQuoteBtn.addEventListener("click", (e) => {
      e.preventDefault();
      quoteModal.classList.add("active");
      document.body.style.overflow = "hidden";
    });

    // CLOSE
    function closeQuoteModal() {
      quoteModal.classList.remove("active");
      document.body.style.overflow = "";
    }

    closeQuoteBtn.addEventListener("click", closeQuoteModal);
    quoteOverlay.addEventListener("click", closeQuoteModal);
  });
