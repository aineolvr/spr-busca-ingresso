document.addEventListener("DOMContentLoaded", function () {
    const btnBusca = document.getElementById("btn-busca");

    btnBusca.addEventListener("click", () => {
        openCamera();
    });

    function openCamera() {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
            .then((stream) => {
                const video = document.createElement("video");
                document.body.appendChild(video);
                video.srcObject = stream;
                video.setAttribute("playsinline", true);
                video.play();

                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d");
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;

                video.addEventListener("loadedmetadata", () => {
                    setInterval(() => {
                        context.drawImage(video, 0, 0, canvas.width, canvas.height);
                        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                        const code = jsQR(imageData.data, canvas.width, canvas.height);
                        
                        if (code) {
                            alert("Código QR lido: " + code.data);
                            // Aqui você pode fazer algo com o código QR lido
                            stream.getTracks().forEach(track => track.stop());
                            document.body.removeChild(video);
                            document.body.removeChild(canvas);
                        }
                    }, 1000);
                });
            })
            .catch((error) => {
                console.error("Erro ao acessar a câmera: ", error);
            });
    }
});
