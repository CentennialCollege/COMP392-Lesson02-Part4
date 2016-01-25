/// <reference path="../../typings/tsd.d.ts"/>

module objects {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    export class Control { 
        // PRIVATE INSTANCE VARIABLES
        private _planeWidth: number;
        private _planeHeight: number;
        
        // PUBLIC INSTANCE VARIABLES
        public rotationSpeed: number;
        public numberOfObjects: number;
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        constructor(rotationSpeed: number, planeWidth: number, planeHeight: number) {
            this.rotationSpeed = rotationSpeed;
            this.numberOfObjects = scene.children.length;
            this._planeWidth = planeWidth;
            this._planeHeight = planeHeight;
        }


        //PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++
        
        // Remove Cube Method +++++++++++++++++++++++++++++++++
        public removeCube(): void {
            var allChildren: THREE.Object3D[] = scene.children;
            var lastObject = allChildren[allChildren.length - 1];
            if (lastObject instanceof THREE.Mesh) {
                scene.remove(lastObject);
                this.numberOfObjects = scene.children.length;
            }
        }
        
        // Add Cube Method
        public addCube(): void {
            var cubeSize: number = Math.ceil((Math.random() * 3));
            var cubeGeometry: CubeGeometry = new THREE.CubeGeometry(cubeSize, cubeSize, cubeSize);
            var cubeMaterial: LambertMaterial = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff });
            var cube = new gameObject(
                cubeGeometry,
                cubeMaterial,
                -30 + Math.round((Math.random() * this._planeWidth)),
                Math.round((Math.random() * 5)),
                -20 + Math.round((Math.random() * this._planeHeight)));
            scene.add(cube);
            this.numberOfObjects = scene.children.length;
        }
        
        // show scene objects
        public outputObjects(): void {
            console.log(scene.children);
        }
    }
}
