document.addEventListener("DOMContentLoaded", function () {
    fetch('/data/colors.json')
        .then(response => response.json()) // Parse the JSON response
        .then(data => {
            const mainElement = document.getElementById("main"); // Get the main container

            // Loop through each palette in the data array
            data.forEach((palette) => {
                // Create and append the palette name and description
                const paletteWrapper = document.createElement("div");
                paletteWrapper.classList.add("paletteWrapper");

                // Create a details div to group name and description
                const detailsElement = document.createElement("div");
                detailsElement.classList.add("details");

                // Create and append the name (h2)
                const nameElement = document.createElement("h2");
                nameElement.textContent = palette.name;
                detailsElement.appendChild(nameElement);

                // Create and append the description (p)
                const descriptionElement = document.createElement("p");
                descriptionElement.innerHTML = palette.description; // Use innerHTML to allow clickable links
                detailsElement.appendChild(descriptionElement);

                // Append the details div to the paletteWrapper
                paletteWrapper.appendChild(detailsElement);

                // Create a swatchWrapper for ungrouped swatches (to be shared across the whole palette)
                const swatchWrapper = document.createElement("div");
                swatchWrapper.classList.add("swatchWrapper");

                // Loop through each item in palette.paletteColors
                palette.paletteColors.forEach((groupOrSwatch) => {
                    // Create a group wrapper even if colorGroup is empty
                    const groupWrapper = document.createElement("div");
                    groupWrapper.classList.add("colorGroup");

                    // If colorGroup exists (non-empty), add its title
                    if (groupOrSwatch.colorGroup) {
                        const groupTitle = document.createElement("h3");
                        groupTitle.textContent = groupOrSwatch.colorGroup;
                        groupWrapper.appendChild(groupTitle);
                    }

                    // Create a swatchWrapper for the group
                    const groupSwatchWrapper = document.createElement("div");
                    groupSwatchWrapper.classList.add("swatchWrapper");

                    // Loop through colorSwatches inside the group (if they exist)
                    (groupOrSwatch.colorSwatches || []).forEach((color) => {
                        const colorElement = document.createElement("p");
                        colorElement.classList.add("swatch");

                        if (color.colorCode) {
                            colorElement.style.backgroundColor = color.colorCode;

                            // Check if a color name exists and add it
                            if (color.colorName) {
                                colorElement.innerHTML = `${color.colorName}<br>${color.colorCode}`;
                            } else {
                                colorElement.innerHTML = `${color.colorCode}`;
                            }
                        } else {
                            console.error(`Invalid color object:`, color);
                        }

                        // Append the color element to the swatchWrapper
                        groupSwatchWrapper.appendChild(colorElement);
                    });

                    // Append the groupSwatchWrapper to the groupWrapper
                    groupWrapper.appendChild(groupSwatchWrapper);

                    // Append the groupWrapper to the paletteWrapper
                    paletteWrapper.appendChild(groupWrapper);
                });

                // Append the swatchWrapper (for ungrouped swatches) to the paletteWrapper
                paletteWrapper.appendChild(swatchWrapper);

                // Append the paletteWrapper to the main container
                mainElement.appendChild(paletteWrapper);
            });
        })
        .catch(error => console.error("Error fetching JSON data:", error));
});
