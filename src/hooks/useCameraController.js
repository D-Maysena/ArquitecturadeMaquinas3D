import React, { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, useGLTF, Stars, Html } from "@react-three/drei";
import * as THREE from "three";

export const useCameraController = (resetSignal, sceneReady) => {
  const { camera, gl, scene } = useThree();

  console.log(camera.rotation);
  
  //el raycaster nos permite detetar objetos atraves de un rayo lanzado desde un punto en una direccion x
  const raycaster = new THREE.Raycaster();

  const mouse = new THREE.Vector2();

  const targetPosition = useRef(null);

  // Posición y rotación iniciales deseadas
  const initialPosition = useRef(new THREE.Vector3(11.0, 6.5, 1.97));
  const initialRotation = useRef(new THREE.Euler(-1.54, 1.255, -4.734));

  const handleClick = (event) => {
  console.log(camera.rotation);

    if (!sceneReady) return;
    //convertimos la posicion del mouse a coordenadas normalizadas
    const { top, left, width, height } = gl.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - left) / width) * 2 - 1;
    mouse.y = -((event.clientY - top) / height) * 2 + 1;

    //creamos un rayo que sale desde la camara hacia la direccion apuntada por el mouse

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      //tomamos el punto de interseccion del primer objeto intersectado
      //ademas ceamos una copia indepentiende para no modificarlo
      const point = intersects[0].point.clone();
      //direccion del punto que toco hacia la camara
      const dir = new THREE.Vector3()
        .subVectors(camera.position, point)
        .normalize();
      const offset = dir.multiplyScalar(2);
      targetPosition.current = point.clone().add(offset);
    }
  };

  useFrame(() => {
    if (!targetPosition.current) return;
    if (targetPosition.current) {
      camera.position.lerp(targetPosition.current, 0.03);

      if (camera.position.distanceTo(targetPosition.current) < 0.1) {
        targetPosition.current = null;
      }
    }
  });

  // Añadir listener al canvas
  useEffect(() => {
    if (!sceneReady) return;

    const canvas = gl.domElement;
    canvas.addEventListener("click", handleClick);
    return () => canvas.removeEventListener("click", handleClick);
  }, [gl, sceneReady]);

  useEffect(() => {
    if (resetSignal) {
      targetPosition.current = null;
      camera.position.copy(initialPosition.current);
      camera.rotation.copy(initialRotation.current);
    }
  }, [resetSignal, camera]);
};
