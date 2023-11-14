let scene;
let renderer;
let camera;
let controls;

export async function createScene(parentElement) {
    // Create a scene
    scene = new THREE.Scene();

    // Create a camera
    camera = new THREE.PerspectiveCamera(
        75,
        parentElement.offsetWidth / parentElement.offsetHeight,
        0.1,
        1000
    );
    camera.position.z = 5;

    // Create a renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(parentElement.offsetWidth, parentElement.offsetHeight);
    parentElement.appendChild(renderer.domElement);

    // Create a sphere
    const geometry = new THREE.SphereGeometry(2, 32, 32);
    const texture = new THREE.TextureLoader().load("images/earth.jpg");
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Add mouse rotation control
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();
}

// Function to display image marker at a specific latitude and longitude with adjustable height
export function addImageMarker(latitude, longitude, imageUrl, height, text) {
    const markerSize = 0.1; // Adjust marker size as needed

    const markerTexture = new THREE.TextureLoader().load(imageUrl);
    const markerMaterial = new THREE.SpriteMaterial({ map: markerTexture });
    const marker = new THREE.Sprite(markerMaterial);

    // Convert latitude and longitude to spherical coordinates
    const phi = ((90 - latitude) * Math.PI) / 180;
    const theta = ((90 + longitude) * Math.PI) / 180;

    // Set marker's position on the sphere
    const sphereRadius = 2;
    const radius = sphereRadius + height; // Adjust the height from the surface of the sphere
    marker.position.setFromSphericalCoords(radius, phi, theta);

    // Create a FontLoader instance
    const fontLoader = new THREE.FontLoader();

    // Load the default font file
    fontLoader.load(
        "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
        function (font) {
            // Create text geometry
            const textGeometry = new THREE.TextGeometry(text, {
                font: font,
                size: 1,
                height: 0.01,
            });

            textGeometry.computeBoundingBox();

            const boundingBox = textGeometry.boundingBox;
            const width = boundingBox.max.x - boundingBox.min.x;
            const height = boundingBox.max.y - boundingBox.min.y;
            const depth = boundingBox.max.z - boundingBox.min.z;

            const offsetX = -0.5 * width;
            const offsetY = -0.5 * height;
            const offsetZ = -0.5 * depth;

            textGeometry.translate(offsetX, offsetY, offsetZ);

            // Create material
            const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

            // Create a mesh using the text geometry and material
            const textMesh = new THREE.Mesh(textGeometry, material);

            // Add the text mesh to the scene
            textMesh.position.copy(marker.position);
            textMesh.position.y += 0.2; // Adjust the vertical offset as needed

            // Adjust marker's scale to keep it visible at all distances
            textMesh.scale.set(markerSize, markerSize, 1);

            // Make the marker always face the camera
            textMesh.lookAt(camera.position);

            scene.add(textMesh);
        }
    );

    // Adjust marker's scale to keep it visible at all distances
    marker.scale.set(markerSize, markerSize, 1);

    // Make the marker always face the camera
    marker.lookAt(camera.position);

    // Add marker to the scene
    scene.add(marker);
}
