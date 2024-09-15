'use strict';

let deferredInstallPromt = null;
const installButton = document.getElementById('butInstall');
installButton.addEventListener('click', installPWA);

window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);

function saveBeforeInstallPromptEvent(evt) {
    deferredInstallPromt = evt;
    installButton.removeAttribute('hidden');
}

function installPWA(evt){
    deferredInstallPromt.prompt();
    evt.srcElement.setAttribute('hidden', true);
    deferredInstallPromt.userChoice.then((choice)=>{
        if(choice.outcome === 'accepted'){
            console.log('Aceptado');
        }
        else{
            console.log('Denegado');
        }
        deferredInstallPromt = null;
    })
}

window.addEventListener('appinstalled', logAppInstalled);

function logAppInstalled(evt){
     console.log('App instalada correctamente');
}