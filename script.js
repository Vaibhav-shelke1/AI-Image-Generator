const token = "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";
const inputTxt = document.getElementById("input");
const image = document.getElementById("image");
const button = document.getElementById("btn");
const downloadButton = document.createElement('a');
downloadButton.innerText = "Download";
downloadButton.id = "download-btn";
downloadButton.style.display = "none";
document.body.appendChild(downloadButton);
async function query(data) {
    image.src = "./loading.gif";
    image.style.border = "none";
	const response = await fetch(
		"https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
		{
            headers: { Authorization: `Bearer ${token}` },
            method: "POST",
            body: JSON.stringify({ "inputs": inputTxt.value }),
        }
	);
	const result = await response.blob();
	return result;
}
function setDownloadButton(url) {
    downloadButton.href = url;
    downloadButton.download = "generated_image.png";
    downloadButton.style.display = "block";
}

button.addEventListener("click", async function() {
    query().then((response) => {
        const objectUrl = URL.createObjectURL(response);
        image.src = objectUrl;
        image.style.border = "5px solid #40A2D8"; // Add border after image is generated
        setDownloadButton(objectUrl);
    });
});

// Add event listener for Enter key
inputTxt.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        button.click();
    }
});
