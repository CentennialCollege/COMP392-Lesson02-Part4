/// <reference path="../../typings/tsd.d.ts"/>
var objects;
(function (objects) {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    var Control = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        function Control(rotationSpeed, planeWidth, planeHeight) {
            this.rotationSpeed = rotationSpeed;
            this.numberOfObjects = scene.children.length;
            this._planeWidth = planeWidth;
            this._planeHeight = planeHeight;
        }
        //PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++
        // Remove Cube Method +++++++++++++++++++++++++++++++++
        Control.prototype.removeCube = function () {
            var allChildren = scene.children;
            var lastObject = allChildren[allChildren.length - 1];
            if (lastObject instanceof THREE.Mesh) {
                scene.remove(lastObject);
                this.numberOfObjects = scene.children.length;
            }
        };
        // Add Cube Method
        Control.prototype.addCube = function () {
            var cubeSize = Math.ceil((Math.random() * 3));
            var cubeGeometry = new THREE.CubeGeometry(cubeSize, cubeSize, cubeSize);
            var cubeMaterial = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff });
            var cube = new objects.gameObject(cubeGeometry, cubeMaterial, -30 + Math.round((Math.random() * this._planeWidth)), Math.round((Math.random() * 5)), -20 + Math.round((Math.random() * this._planeHeight)));
            scene.add(cube);
            this.numberOfObjects = scene.children.length;
        };
        // show scene objects
        Control.prototype.outputObjects = function () {
            console.log(scene.children);
        };
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));
//# sourceMappingURL=control.js.map