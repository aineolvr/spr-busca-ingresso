document.addEventListener('DOMContentLoaded', function () {
    const btnBusca = document.getElementById('btn-busca');
    const cameraContainer = document.getElementById('camera-container');
    const btnCapturar = document.getElementById('btn-capturar');
    const btnCancelar = document.getElementById('btn-cancelar');
    const cameraPreview = document.getElementById('camera-preview');

    btnBusca.addEventListener('click', function () {
        // Oculta o conteúdo principal
        document.querySelector('.content').style.display = 'none';
        // Exibe o container da câmera
        cameraContainer.style.display = 'flex';

        // Acessa a câmera do dispositivo
        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
            .then((stream) => {
                cameraPreview.srcObject = stream;
            })
            .catch((error) => {
                console.error('Erro ao acessar a câmera:', error);
            });
    });

    btnCancelar.addEventListener('click', function () {
        // Exibe o conteúdo principal
        document.querySelector('.content').style.display = 'block';
        // Oculta o container da câmera
        cameraContainer.style.display = 'none';

        // Parar o stream da câmera
        const stream = cameraPreview.srcObject;
        const tracks = stream.getTracks();

        tracks.forEach(track => track.stop());

        cameraPreview.srcObject = null;
    });

    btnCapturar.addEventListener('click', function () {
       
    });
});
