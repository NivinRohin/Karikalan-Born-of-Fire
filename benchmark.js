import * as THREE from 'three';

const start = performance.now();
const meshes = [];
for(let i=0; i<10000; i++) {
    const geo = new THREE.ConeGeometry(0.4, 1, 4);
    const mat = new THREE.MeshBasicMaterial({ color: i % 2 === 0 ? "#ff0000" : "#ff8800" });
    const mesh = new THREE.Mesh(geo, mat);
    meshes.push(mesh);
}
const end = performance.now();

console.log(`Uncached: ${end - start} ms`);

const start2 = performance.now();
const meshes2 = [];
const sharedGeo = new THREE.ConeGeometry(0.4, 1, 4);
const sharedMat1 = new THREE.MeshBasicMaterial({ color: "#ff0000" });
const sharedMat2 = new THREE.MeshBasicMaterial({ color: "#ff8800" });
for(let i=0; i<10000; i++) {
    const mesh = new THREE.Mesh(sharedGeo, i % 2 === 0 ? sharedMat1 : sharedMat2);
    meshes2.push(mesh);
}
const end2 = performance.now();

console.log(`Cached: ${end2 - start2} ms`);
