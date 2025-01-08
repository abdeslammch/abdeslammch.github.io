// app.js

function scanObject() {
    // Charger un modèle 3D et l'ajouter à la scène AR
    const modelEntity = document.getElementById('3d-model');
    
    // Vérifier s'il y a déjà un modèle et le supprimer
    while (modelEntity.firstChild) {
        modelEntity.removeChild(modelEntity.firstChild);
    }
    
    // Charger un modèle 3D simple (par exemple, un cube)
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    
    // Utiliser la bibliothèque three.js pour charger le modèle
    const loader = new THREE.ObjectLoader();
    loader.parse(cube, function (loadedModel) {
        modelEntity.object3D.add(loadedModel);
    });
}
