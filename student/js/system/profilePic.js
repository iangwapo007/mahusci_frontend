// DILIPA NI MO GANA

document.addEventListener("DOMContentLoaded", function () {
  const dropZone = document.querySelector(".file-drop-zone");
  const fileInput = document.getElementById("fileInput");

  // Click to open file dialog
  dropZone.addEventListener("click", () => fileInput.click());

  // Handle file selection
  fileInput.addEventListener("change", handleFiles);

  // Drag & drop events
  ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
    dropZone.addEventListener(eventName, preventDefaults, false);
  });

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  // Highlight drop zone when dragging over
  ["dragenter", "dragover"].forEach((eventName) => {
    dropZone.addEventListener(eventName, highlight, false);
  });

  ["dragleave", "drop"].forEach((eventName) => {
    dropZone.addEventListener(eventName, unhighlight, false);
  });

  function highlight() {
    dropZone.classList.add("dragover");
  }

  function unhighlight() {
    dropZone.classList.remove("dragover");
  }

  // Handle dropped files
  dropZone.addEventListener("drop", handleDrop, false);

  function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    fileInput.files = files;
    handleFiles(); // Process the files
  }

  function handleFiles() {
    const files = fileInput.files;
    if (files.length) {
      // File processing logic here (e.g., preview, upload)
      console.log("Files selected:", files);

      // Example: Preview the image
      if (files[0].type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function (e) {
          // Replace the upload icon with the preview
          const img = dropZone.querySelector("img");
          img.src = e.target.result;
          img.classList.remove("w-25");
          img.classList.add("w-50");

          // Change the prompt text
          const prompt = dropZone.querySelector("p");
          prompt.textContent = "Click to change image";
        };
        reader.readAsDataURL(files[0]);
      }
    }
  }
});
