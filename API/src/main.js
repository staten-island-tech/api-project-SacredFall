import "./style.css";

//API-KEY: UwfaIbzBps4jWpTrHKSTSnWm9Wyqw995oieEReNy

const form = document.getElementById("rover-form");
const roverInfo = document.getElementById("rover-info");
const photoGallery = document.getElementById("photo-gallery");
const roverTitle = document.getElementById("rover-title");
const roverDetails = document.getElementById("rover-details");
const roverNameInput = document.getElementById("rover-name");
const roverSolInput = document.getElementById("rover-sol");
const roverTabs = document.querySelectorAll(".rover-tab");
const modal = document.getElementById("modal");
const modalImage = document.getElementById("modal-image");
const closeModalButton = document.getElementById("close-modal");

roverTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    // remove active
    roverTabs.forEach((t) =>
      t.classList.remove("text-white", "border-slate-500"),
    );
    // active tab to clicked
    tab.classList.add("text-white", "border-slate-500");
    // update the hidden input
    roverNameInput.value = tab.getAttribute("data-rover");
    // placeholder update
    const maxSol = tab.getAttribute("data-max-sol");
    roverSolInput.placeholder = `Max Sol: ${maxSol}`;
    roverSolInput.max = maxSol;
  });
});

// Preselect Curiosity tab
document.addEventListener("DOMContentLoaded", () => {
  const curiosityTab = document.querySelector(
    '.rover-tab[data-rover="curiosity"]',
  );
  curiosityTab.classList.add("text-white", "border-slate-500");
  roverNameInput.value = "curiosity";
  roverSolInput.placeholder = "Max Sol: 4427";
  roverSolInput.max = "4427";

  // initial fetch
  fetchInitialData();
});

// async function to fetch initial data
async function fetchInitialData() {
  const apiKey = "UwfaIbzBps4jWpTrHKSTSnWm9Wyqw995oieEReNy"; // Replace with your API key
  const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=3000&api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.photos.length > 0) {
      const roverData = data.photos[0].rover;

      // update
      roverTitle.textContent = `Rover: ${roverData.name}`;
      roverDetails.innerHTML = `
                Launch Date: ${roverData.launch_date} <br>
                Landing Date: ${roverData.landing_date} <br>
                Status: ${roverData.status}
            `;
      roverInfo.classList.remove("hidden");

      // photo display
      photoGallery.innerHTML = "";
      photoGallery.classList.add(
        "grid",
        "grid-cols-1",
        "sm:grid-cols-2",
        "md:grid-cols-3",
        "lg:grid-cols-4",
        "xl:grid-cols-5",
        "gap-4",
      );
      data.photos.forEach((photo) => {
        const img = document.createElement("img");
        img.src = photo.img_src;
        img.alt = "Mars Rover Photo";
        img.className =
          "w-full h-auto rounded-lg border border-gray-500 cursor-pointer";
        img.onerror = () => {
          const emptyDiv = document.createElement("div");
          emptyDiv.className =
            "w-full h-auto rounded-lg border border-gray-500";
          img.replaceWith(emptyDiv);
        };
        img.addEventListener("click", () => {
          modalImage.src = photo.img_src;
          modal.classList.remove("hidden");
        });
        photoGallery.appendChild(img);
      });
      photoGallery.classList.remove("hidden");
    } else {
      alert("No photos found for the initial Sol.");
    }
  } catch (error) {
    console.error("Error fetching initial data:", error);
    alert("Something went wrong. Please try again later.");
  }
}

// Form submission event listener for the second API call
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Get form values
  const roverName = roverNameInput.value;
  const sol = roverSolInput.value;

  if (!roverName || !sol) {
    alert("Please fill in all fields.");
    return;
  }

  // info
  const apiKey = "UwfaIbzBps4jWpTrHKSTSnWm9Wyqw995oieEReNy";
  const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?sol=${sol}&api_key=${apiKey}`;

  try {
    // fetch
    const response = await fetch(url);
    const data = await response.json();

    if (data.photos.length > 0) {
      const roverData = data.photos[0].rover;

      // rover update
      roverTitle.textContent = `Rover: ${roverData.name}`;
      roverDetails.innerHTML = `
                Launch Date: ${roverData.launch_date} <br>
                Landing Date: ${roverData.landing_date} <br>
                Status: ${roverData.status}
            `;
      roverInfo.classList.remove("hidden");

      // photo display
      photoGallery.innerHTML = "";
      photoGallery.classList.add(
        "grid",
        "grid-cols-1",
        "sm:grid-cols-2",
        "md:grid-cols-3",
        "lg:grid-cols-4",
        "xl:grid-cols-5",
        "gap-4",
      );
      data.photos.forEach((photo) => {
        const img = document.createElement("img");
        img.src = photo.img_src;
        img.alt = "Mars Rover Photo";
        img.className =
          "w-full h-auto rounded-lg border border-gray-500 cursor-pointer";
        img.addEventListener("click", () => {
          modalImage.src = photo.img_src;
          modal.classList.remove("hidden");
        });
        photoGallery.appendChild(img);
      });
      photoGallery.classList.remove("hidden");
    } else {
      alert("No photos found for the given Sol.");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("Something went wrong. Please try again later.");
  }
});

//close
closeModalButton.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// close when click outside
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.add("hidden");
  }
});
