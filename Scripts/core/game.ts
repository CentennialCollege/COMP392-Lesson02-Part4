/// <reference path="_reference.ts"/>

// MAIN GAME FILE

// THREEJS Aliases
import Scene = THREE.Scene;
import Renderer = THREE.WebGLRenderer;
import PerspectiveCamera = THREE.PerspectiveCamera;
import BoxGeometry = THREE.BoxGeometry;
import CubeGeometry = THREE.CubeGeometry;
import PlaneGeometry = THREE.PlaneGeometry;
import SphereGeometry = THREE.SphereGeometry;
import AxisHelper = THREE.AxisHelper;
import LambertMaterial = THREE.MeshLambertMaterial;
import MeshBasicMaterial = THREE.MeshBasicMaterial;
import Mesh = THREE.Mesh;
import SpotLight = THREE.SpotLight;
import PointLight = THREE.PointLight;
import AmbientLight = THREE.AmbientLight;
import Control = objects.Control;
import GUI = dat.GUI;
import Color = THREE.Color;
import Vector3 = THREE.Vector3;

//Custom Game Objects
import gameObject = objects.gameObject;

var scene: Scene;
var renderer: Renderer;
var camera: PerspectiveCamera;
var axes: AxisHelper;
var cube: Mesh;
var plane: Mesh;
var sphere: Mesh;
var ambientLight: AmbientLight;
var spotLight: SpotLight;
var control: Control;
var gui: GUI;
var stats: Stats;
var step: number = 0;

function init() {
    // Instantiate a new Scene object
    scene = new Scene();

    setupRenderer(); // setup the default renderer
	
    setupCamera(); // setup the camera
	
    // add an axis helper to the scene
    axes = new AxisHelper(20);
    scene.add(axes);
    console.log("Added Axis Helper to scene...");
    
    //Add a Plane to the Scene
    plane = new gameObject(
        new PlaneGeometry(60, 40, 1, 1),
        new LambertMaterial({ color: 0xffffff }),
        0, 0, 0);

    plane.rotation.x = -0.5 * Math.PI;

    scene.add(plane);
    console.log("Added Plane Primitive to scene...");
     
    
    // Add an AmbientLight to the scene
    ambientLight = new AmbientLight(0x090909);
    scene.add(ambientLight);
    console.log("Added an Ambient Light to Scene");
	
    // Add a SpotLight to the scene
    spotLight = new SpotLight(0xffffff);
    spotLight.position.set(-40, 40, 50);
    spotLight.castShadow = true;
    scene.add(spotLight);
    console.log("Added a SpotLight Light to Scene");
    
    // add geometries
    addGeometries(scene);
    console.log("Added various Geometries to scene...");
    
    // Add framerate stats
    addStatsObject();
    console.log("Added Stats to scene...");

    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	
    
    window.addEventListener('resize', onResize, false);
}

function addGeometries(scene: Scene): void {
    var geoms: THREE.Geometry[] = new Array<THREE.Geometry>();

    geoms.push(new THREE.CylinderGeometry(1, 4, 4));

    // basic cube
    geoms.push(new THREE.CubeGeometry(2, 2, 2));
    console.log(new THREE.CubeGeometry(2, 2, 2));

    // basic spherer
    geoms.push(new THREE.SphereGeometry(2));

    geoms.push(new THREE.IcosahedronGeometry(4, 1));

    // create a lathgeometry
    //http://en.wikipedia.org/wiki/Lathe_(graphics)
    var pts = [];//points array - the path profile points will be stored here
    var detail: number = .1;//half-circle detail - how many angle increments will be used to generate points
    var radius: number = 3;//radius for half_sphere
    for (var angle: number = 0.0; angle < Math.PI; angle += detail) {//loop from 0.0 radians to PI (0 - 180 degrees)
        pts.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));//angle/radius to x,z
    }
    geoms.push(new THREE.LatheGeometry(pts, 12));

    // create a OctahedronGeometry
    geoms.push(new THREE.OctahedronGeometry(3, 1));

    geoms.push(new THREE.TetrahedronGeometry(3));

    geoms.push(new THREE.TorusGeometry(3, 1, 10, 10));

    geoms.push(new THREE.TorusKnotGeometry(3, 0.5, 50, 20));

    var positionIndex: number = 0;
    for (var index: number = 0; index < geoms.length; index++) {
        var cubeMaterial = new THREE.MeshLambertMaterial({ wireframe: true, color: Math.random() * 0xffffff });

        var materials = [
            new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff, shading: THREE.FlatShading }),
            new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true })
        ];

        var mesh = THREE.SceneUtils.createMultiMaterialObject(geoms[index], materials);
        mesh.traverse(function(e) { e.castShadow = true });

        //var mesh = new THREE.Mesh(geoms[i],materials[i]);
        //mesh.castShadow=true;
        mesh.position.x = -24 + ((index % 4) * 12);
        mesh.position.y = 4;
        mesh.position.z = -8 + (positionIndex * 12);

        if ((index + 1) % 4 == 0) {
            positionIndex++;
        }
        scene.add(mesh);
    }
}

function onResize(): void {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function addControl(controlObject: Control): void {
    gui.add(controlObject, 'rotationSpeed', 0, 0.5);
    gui.add(controlObject, 'addCube');
    gui.add(controlObject, 'removeCube');
    gui.add(controlObject, 'outputObjects');
    gui.add(controlObject, 'numberOfObjects').listen();
}

function addStatsObject() {
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}

// Setup main game loop
function gameLoop(): void {
    stats.update();
    
    // render using requestAnimationFrame
    requestAnimationFrame(gameLoop);
	
    // render the scene
    renderer.render(scene, camera);
}

// Setup default renderer
function setupRenderer(): void {
    renderer = new Renderer();
    renderer.setClearColor(0xEEEEEE, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;
    console.log("Finished setting up Renderer...");
}

// Setup main camera for the scene
function setupCamera(): void {
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = -50;
    camera.position.y = 30;
    camera.position.z = 20;
    camera.lookAt(new Vector3(-10, 0, 0));
    console.log("Finished setting up Camera...");
}
