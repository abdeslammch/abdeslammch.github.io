
const main = () => {

    var montimeout;
    $(document).ready(function () {
        $("#textLutin1").hide();
    });



    //////////////////////////////////////////////////////////////////////////////////
    //		Init
    //////////////////////////////////////////////////////////////////////////////////

    // init renderer
    var renderer = new THREE.WebGLRenderer({
        // antialias	: true,
        alpha: true
    });
    renderer.setClearColor(new THREE.Color('lightgrey'), 0)
    // renderer.setPixelRatio( 1/2 );
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.id = 'arCanvas';
    document.body.appendChild(renderer.domElement);

    // array of functions for the rendering loop
    var onRenderFcts = [];

    // init scene and camera
    var scene = new THREE.Scene();

    //////////////////////////////////////////////////////////////////////////////////
    //		Initialize a basic camera
    //////////////////////////////////////////////////////////////////////////////////

    // Create a camera
    var camera = new THREE.Camera();
    scene.add(camera);

    ////////////////////////////////////////////////////////////////////////////////
    //          handle arToolkitSource
    ////////////////////////////////////////////////////////////////////////////////

    var arToolkitSource = new THREEx.ArToolkitSource({
        // to read from the webcam
        sourceType: 'webcam',

        // to read from an image
        // sourceType : 'image',
        // sourceUrl : THREEx.ArToolkitContext.baseURL + '../data/images/img.jpg',

        // to read from a video
        // sourceType : 'video',
        // sourceUrl : THREEx.ArToolkitContext.baseURL + '../data/videos/headtracking.mp4',
    })

    arToolkitSource.init(function onReady() {
        onResize()
    })

    // handle resize
    window.addEventListener('resize', function () {
        onResize()
    })
    function onResize() {
        arToolkitSource.onResizeElement()
        arToolkitSource.copyElementSizeTo(renderer.domElement)
        if (arToolkitContext.arController !== null) {
            arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas)
        }
    }
    ////////////////////////////////////////////////////////////////////////////////
    //          initialize arToolkitContext
    ////////////////////////////////////////////////////////////////////////////////


    // create atToolkitContext
    var arToolkitContext = new THREEx.ArToolkitContext({
        // cameraParametersUrl: THREEx.ArToolkitContext.baseURL + 'data/camera_para.dat',
        cameraParametersUrl: 'data/camera_para.dat',
        //cameraParametersUrl:"https://jeromeetienne.github.io/AR.js/data/data/camera_para.dat",
        detectionMode: 'mono',
        maxDetectionRate: 50,
        canvasWidth: 100 * 5,
        canvasHeight: 100 * 5,

    })


    // initialize it
    arToolkitContext.init(function onCompleted() {
        // copy projection matrix to camera
        camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
        artoolkitMarker.addEventListener('markerFound', function (event) {
            console.log("trouvé !!!!!!!!!!!!!!!");
            $("#textLutin1").show();
            $("#imageLutin1").attr("src", "imagep1/houle.png");
            montimeout = setTimeout(textL1invisible, 15000);

        });
    })


    // update artoolkit on every frame
    onRenderFcts.push(function () {
        if (arToolkitSource.ready === false) return

        arToolkitContext.update(arToolkitSource.domElement)
    })


    ////////////////////////////////////////////////////////////////////////////////
    //          Create a ArMarkerControls
    ////////////////////////////////////////////////////////////////////////////////

    var markerRoot = new THREE.Group
    scene.add(markerRoot)
    var artoolkitMarker = new THREEx.ArMarkerControls(arToolkitContext, markerRoot, {
        type: 'pattern',
        patternUrl: 'data/fee.patt'
        // patternUrl : THREEx.ArToolkitContext.baseURL + '../data/data/patt.kanji'
    })

    // build a smoothedControls
    var smoothedRoot = new THREE.Group()
    scene.add(smoothedRoot)
    var smoothedControls = new THREEx.ArSmoothedControls(smoothedRoot, {
        lerpPosition: 0.4,
        lerpQuaternion: 0.3,
        lerpScale: 1,
    })
    onRenderFcts.push(function (delta) {
        smoothedControls.update(markerRoot)
    })
    //////////////////////////////////////////////////////////////////////////////////
    //		add an object in the scene
    //////////////////////////////////////////////////////////////////////////////////

    var arWorldRoot = smoothedRoot


    const loader = new THREE.GLTFLoader();
    loader.load('model/fee/essaye.glb', (gltf) => {
        console.log("Modèle chargé avec succès");
        //loader.load( 'Wolf_dae.dae', function ( gltf ) {
        gltf.scene.scale.set(0.2, 0.2, 0.2);

        const lutin = (gltf.scene);

        lutin.position.y = 0.5;
        lutin.rotation.x = 5;
        arWorldRoot.add(lutin);

        // add a torus knot
        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshNormalMaterial({
            transparent: true,
            opacity: 0.5,
            side: THREE.DoubleSide
        });
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = geometry.parameters.height / 2
        //arWorldRoot.add( mesh );

        var geometry = new THREE.TorusKnotGeometry(0.3, 0.1, 64, 16);
        var material = new THREE.MeshNormalMaterial();
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = 0.5
        //arWorldRoot.add( mesh );


        onRenderFcts.push(function () {

            lutin1.rotation.y += 0.01;

        })

    }, undefined, function (error) {

        console.error(error);

    });



    //////////////////////////////////////////////////////////////////////////////////
    //		render the whole thing on the page
    //////////////////////////////////////////////////////////////////////////////////
    //var stats = new Stats();
    //document.body.appendChild( stats.dom );
    // render the scene
    onRenderFcts.push(function () {
        renderer.render(scene, camera);
        //stats.update();
    })

    // run the rendering loop
    requestAnimationFrame(function animate(nowMsec) {
        // keep looping
        requestAnimationFrame(animate);
        // measure time
        const lastTimeMsec = lastTimeMsec || nowMsec - 1000 / 60
        var deltaMsec = Math.min(200, nowMsec - lastTimeMsec)
        lastTimeMsec = nowMsec
        // call each update function
        onRenderFcts.forEach(function (onRenderFct) {
            onRenderFct(deltaMsec / 1000, nowMsec / 1000)
        })
    })




    function textL1invisible() {
        $("#textLutin1").hide();
    }
}

document.onload(main)