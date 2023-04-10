///////////////////////////////////////////////////////////
// Set current year
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

///////////////////////////////////////////////////////////
// Make mobile navigation work

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

///////////////////////////////////////////////////////////
// Smooth scrolling animation

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    // Scroll back to top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    // Close mobile naviagtion
    if (link.classList.contains("main-nav-link"))
      headerEl.classList.toggle("nav-open");
  });
});

///////////////////////////////////////////////////////////
// Sticky navigation

const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);

    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }

    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    // In the viewport
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();
////////////////////////////////////////////////////////////////

function downloadPDF() {
  // Replace "path/to/pdf/file.pdf" with the path to your PDF file
  const pdfURL = "img/GoncaloAfonso.pdf";

  // Create an anchor element with the download attribute
  const link = document.createElement("a");
  link.download = "goncaloAfonsoCV.pdf";
  link.href = pdfURL;

  // Append the anchor element to the document body
  document.body.appendChild(link);

  // Click the anchor element to trigger the download
  link.click();

  // Remove the anchor element from the document body
  document.body.removeChild(link);
}

const words = ["developer", "n automation tester", "Java enthusiast", "student"];
const typingDelay = 100; // delay between typing each character
const deleteDelay = 50; // delay between deleting each character
const wordDelay = 1000; // delay between finishing a word and starting to delete it

let wordIndex = 0;
let currentWord = words[wordIndex];
let currentWordIndex = 0;
let isDeleting = false;

function typeWords() {
  const typingEffect = document.getElementById("typing-effect");

  if (isDeleting) {
    // deleting the current word
    currentWordIndex--;
    typingEffect.innerHTML = `<span id="fixed-text"><strong>I'm Gonçalo Afonso</strong>, a </span>${currentWord.substring(
      0,
      currentWordIndex
    )}`;

    if (currentWordIndex === 0) {
      isDeleting = false;
      wordIndex++;

      if (wordIndex === words.length) {
        wordIndex = 0;
      }

      currentWord = words[wordIndex];
      setTimeout(typeWords, wordDelay);
    } else {
      setTimeout(typeWords, deleteDelay);
    }
  } else {
    // typing the current word
    typingEffect.innerHTML = `<span id="fixed-text"><strong>I'm Gonçalo Afonso</strong>, a </span>${currentWord.substring(
      0,
      currentWordIndex + 1
    )}`;
    currentWordIndex++;

    if (currentWordIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(typeWords, wordDelay);
    } else {
      setTimeout(typeWords, typingDelay);
    }
  }
}

setTimeout(typeWords, wordDelay);
