function exibirCardConfirmacao() {
    // Exibe o card de confirmação
    document.getElementById('confirmation-card').style.display = 'block';
}

function iniciarLeituraQR() {
    // Oculta o botão "BUSCAR"
    document.getElementById('btn-busca').style.display = 'none';

    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(function (stream) {
            document.getElementById('video-container').innerHTML = '<video id="video" playsinline class="w-100"></video>';
            var video = document.getElementById('video');
            video.srcObject = stream;
            video.play();
            
            Quagga.init({
                inputStream: {
                    name: "Live",
                    type: "LiveStream",
                    target: video
                },
                decoder: {
                    readers: ["code_128_reader"]
                }
            }, function (err) {
                if (err) {
                    console.error(err);
                    return;
                }
                Quagga.start();
            });

            Quagga.onDetected(function (result) {
                Quagga.stop();
                video.srcObject.getTracks().forEach(track => track.stop());
                document.getElementById('video-container').innerHTML = '';

                // Verificar a validade do QR code (exemplo: se o código tiver mais de 5 caracteres)
                if (result.codeResult.code.length > 5) {
                    // Exibir pop-up de sucesso com SweetAlert2
                    Swal.fire({
                        title: "Sucesso!",
                        text: "Código QR válido: " + result.codeResult.code,
                        icon: "success"
                    });
                    
                    // Exibir o card de confirmação
                    exibirCardConfirmacao();
                } else {
                    // Exibir pop-up de erro com SweetAlert2
                    Swal.fire({
                        title: "Erro!",
                        text: "Código QR inválido!",
                        icon: "error"
                    });

                    // Restaurar o botão "BUSCAR"
                    document.getElementById('btn-busca').style.display = 'block';
                }
            });
        })
        .catch(function (err) {
            console.error(err);
        });
}
