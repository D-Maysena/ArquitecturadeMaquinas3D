import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

export const ZoomOnlyController = ()=> {
  const { camera } = useThree();

  useEffect(() => {
    const handleWheel = (event) => {
      event.preventDefault();
      // Ajusta el FOV para hacer zoom (más pequeño = más zoom)
      camera.fov += event.deltaY * 0.01; // Ajusta velocidad aquí
      camera.fov = Math.max(15, Math.min(75, camera.fov)); // Limita el zoom
      camera.updateProjectionMatrix();
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [camera]);

  return null;
}
