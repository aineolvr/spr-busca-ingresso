    function iniciarLeituraQR() {
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
                    // Exibir pop-up de sucesso com SweetAlert2
                    Swal.fire({
                        title: "Sucesso!",
                        text: "Código QR lido: " + result.codeResult.code,
                        icon: "success"
                    });
                });
            })
            .catch(function (err) {
                console.error(err);
            });
    }
