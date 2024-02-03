async function iniciarLeituraQR() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        const video = document.createElement('video');
        video.srcObject = stream;
        document.getElementById('video-container').appendChild(video);

        await video.play();

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const intervalId = setInterval(() => {
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, canvas.width, canvas.height);

            if (code) {
                // Código QR encontrado, faça o que for necessário com o código (por exemplo, interagir com a API)
                alert('Código QR encontrado: ' + code.data);
                // Pare a leitura após encontrar o código
                clearInterval(intervalId);
                // Encerre o stream de vídeo
                stream.getTracks().forEach(track => track.stop());
                // Remova o vídeo e o canvas
                video.remove();
                canvas.remove();
            }
        }, 100);
    } catch (error) {
        console.error('Erro ao acessar a câmera:', error);
    }
}
