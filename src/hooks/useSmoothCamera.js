import { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export const useSmoothCamera = (targetPosition, targetRotation, reset) => {
  const { camera } = useThree();
  const positionRef = useRef();
  const rotationRef = useRef();

  useEffect(() => {
    if (targetPosition) {
      positionRef.current = new THREE.Vector3(...targetPosition);
    }
    if (targetRotation) {
      rotationRef.current = new THREE.Euler(...targetRotation);
    }
  }, [targetPosition, targetRotation]);

  useEffect(() => {
    if (reset) {
      positionRef.current = null;
      rotationRef.current = null;
    }
  }, [reset]);

  useFrame(() => {
    if (positionRef.current) {
      camera.position.lerp(positionRef.current, 0.05);

      if (camera.position.distanceTo(positionRef.current) < 0.1) {
        positionRef.current = null;
      }
    }
    if (rotationRef.current) {
      camera.rotation.x += (rotationRef.current.x - camera.rotation.x) * 0.05;
      camera.rotation.y += (rotationRef.current.y - camera.rotation.y) * 0.05;
      camera.rotation.z += (rotationRef.current.z - camera.rotation.z) * 0.05;
    }
  });
};
