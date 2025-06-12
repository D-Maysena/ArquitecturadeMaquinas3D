import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  PerspectiveCamera,
  useGLTF,
  Stars,
  Html,
  OrbitControls,
} from "@react-three/drei";
import { SunIndicator } from "./components/SunIndicator";
import CameraController from "./components/CameraController";
import { Box, Button, Typography } from "@mui/material";
import MemoryIcon from "@mui/icons-material/Memory";
import BoltIcon from "@mui/icons-material/Bolt";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { hotspots } from "./Hotspots";
import { useSmoothCamera } from "./hooks/useSmoothCamera";
import { Hotspot } from "./Hotspot";
import { ZoomOnlyController } from "./ZoomOnlyController";
import MonitorIcon from "@mui/icons-material/DesktopWindows";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import SpeakerIcon from "@mui/icons-material/Speaker";

const CPUModel = ({ onLoaded }) => {
  const { scene } = useGLTF("/cpu.glb");

  useEffect(() => {
    if (onLoaded) onLoaded();
  }, [onLoaded]);

  return <primitive object={scene} scale={1.5} />;
};
function SmoothCameraController({ targetPos, targetRot, reset }) {
  useSmoothCamera(targetPos, targetRot, reset);
  return null;
}
const ModelViewer = () => {
  const [sceneReady, setSceneReady] = useState(false);

  const [targetPos, setTargetPos] = useState(null);
  const [targetRot, setTargetRot] = useState(null);

  const handleHotspotClick = (position, rotation) => {
    setTargetPos(position);
    setTargetRot(rotation);
  };

  const [resetCamera, setResetCamera] = useState(false);
  const [components, setComponents] = useState([
    {
      title: "Monitor",
      description:
        "Monitor gaming de alta gama con tasa de refresco ultra rápida",
      specs: [
        "27 pulgadas QHD",
        "240Hz refresh rate",
        "1ms response time",
        "HDR400",
      ],
      icon: <MonitorIcon sx={{ color: "#3b82f6" }} />,
      checked: false,
      position: [-2, 6.8, 7.8],
      positionCamera: [6.4, 5.0, 4.8],
      rotation: [-1.54, 1.255, -4.734],
      rotationCamera: [-1.5, 1.435, -4.774],
      distanceFactor: 7,
    },
    {
      title: "Mouse",
      description:
        "Mouse gaming profesional con sensor óptico de alta precisión",
      specs: [
        "16,000 DPI",
        "6 botones programables",
        "RGB personalizable",
        "Cable trenzado",
      ],
      icon: <BoltIcon sx={{ color: "#3b82f6" }} />,
      checked: false,
      position: [0.5, 0, 1],
      positionCamera: [2.4, 2.7, -0.0],
      rotation: [-1.54, 1.255, -4.734],
      rotationCamera: [-1.5, 0.435, -4.774],
      distanceFactor: 3,
    },
    {
      title: "Teclado",
      description: "Teclado mecánico para gaming con switches táctiles",
      specs: [
        "Switches Redragon",
        "RGB full spectrum",
        "Reposamuñecas magnético",
        "Anti-ghosting",
      ],
      icon: <KeyboardIcon sx={{ color: "#3b82f6" }} />,
      checked: false,
      position: [0, 0, 6],

      positionCamera: [2.38, 4.9, 6.6],
      rotation: [-1.54, 1.255, -4.734],
      rotationCamera: [-1.5, 0.045, -4.724],
      distanceFactor: 4,
    },
    {
      title: "Altavoces",
      description: "Sistema de audio 2.1 con subwoofer independiente",
      specs: [
        "80W RMS",
        "Control de graves/agudos",
        "Entrada auxiliar",
        "Luces LED",
      ],
      icon: <SpeakerIcon sx={{ color: "#3b82f6" }} />,
      checked: false,
      position: [-5, 2.5, -3.3],
      positionCamera: [0.0, 1.7, -1.4],
      rotation: [-1.54, 1.255, -4.734],
      rotationCamera: [-1.5, 1.445, -4.774],
      distanceFactor: 5.3,
    },
    {
      title: "CPU",
      description:
        "Estación de alto rendimiento para gaming extremo y tareas exigentes.",
      specs: [
        "Intel Core i9-13900K",
        "NVIDIA RTX 4090 24GB",
        "32GB DDR5 6000MHz",
        "Refrigeración líquida AORUS",
      ],
      icon: <MemoryIcon sx={{ color: "#3b82f6" }} />,
      checked: false,
      position: [0, 4.8, -7],
      positionCamera: [-1.8, 4.099, -0.2999],
      rotation: [-1.54, 1.255, -4.734],
      rotationCamera: [-3.28, 3.215, -3.154],
      distanceFactor: 4,
    },
  ]);

  const lightPosition = [10, 5, 30];

  const handleResetClick = () => {
    setResetCamera(true);
    setTimeout(() => setResetCamera(false), 100);
  };

  const toggleCheck = (index) => {
    const newComponents = [...components];
    newComponents[index].checked = !newComponents[index].checked;
    setComponents(newComponents);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom right, #0f172a, #1e293b, #1e3a8a)",
        position: "relative",
        p: 4,
      }}
    >
      {/* Background blur circles */}
      <Box sx={{ position: "absolute", inset: 0, opacity: 0.1 }}>
        <Box
          sx={{
            position: "absolute",
            top: "5rem",
            left: "5rem",
            width: 300,
            height: 300,
            bgcolor: "primary.main",
            borderRadius: "50%",
            filter: "blur(80px)",
            animation: "pulse 6s infinite",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "10rem",
            right: "5rem",
            width: 300,
            height: 300,
            bgcolor: "grey.700",
            borderRadius: "50%",
            filter: "blur(80px)",
            animation: "pulse 6s infinite 1s",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "5rem",
            left: "10rem",
            width: 300,
            height: 300,
            bgcolor: "indigo.600",
            borderRadius: "50%",
            filter: "blur(80px)",
            animation: "pulse 6s infinite 2s",
          }}
        />
      </Box>

      {/* Encabezado */}
      <Box
        sx={{
          position: "relative",
          zIndex: 10,
          p: 4,
          color: "white",
          maxWidth: "1800px",
          mx: "auto",
          mb: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
            flexWrap: "wrap",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                p: 2,
                bgcolor: "linear-gradient(to right, #334155, #1e3a8a)",
                borderRadius: 3,
              }}
            >
              <MemoryIcon sx={{ fontSize: 40, color: "white" }} />
            </Box>
            <Box>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "bold",
                  background: "linear-gradient(to right, #e2e8f0, #bfdbfe)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Anatomía de una Computadora Moderna
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mt: 1,
                }}
              >
                <AutoAwesomeIcon
                  sx={{ color: "#93c5fd", animation: "pulse 2s infinite" }}
                />
                <Typography variant="body1" sx={{ color: "#cbd5e1" }}>
                  Exploración Interactiva de Hardware
                </Typography>
                <BoltIcon
                  sx={{ color: "#cbd5e1", animation: "bounce 2s infinite" }}
                />
              </Box>
            </Box>
          </Box>
        </Box>

        <Typography
          variant="h6"
          sx={{ color: "#cbd5e1", maxWidth: "700px", lineHeight: 1.6 }}
        >
          Descubre cada componente de una computadora gaming moderna en 3D.
          <span style={{ color: "#7dd3fc", fontWeight: "bold" }}>
            {" "}
            Toca o{" "}
          </span>
          
          <span style={{ fontWeight: "bold" }}> haz clic </span> para descubrir información detallada de cada uno.
        </Typography>
      </Box>

      {/* Contenedor principal para Canvas y Componentes */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          maxWidth: "1800px",
          mx: "auto",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Canvas - 60% de ancho en desktop */}
        <Box
          sx={{
            width: { xs: "100%", md: "100%" },
            height: { xs: "60vh", md: "85vh" },
            border: "2px solid rgba(30, 41, 59, 0.5)",
            borderRadius: 3,
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 20,
              right: 20,
              zIndex: 10,
            }}
          >
            <Button
              variant="contained"
              style={{ color: "white", backgroundColor: "#1e3a8a" }}
              onClick={handleResetClick}
            >
              Inicio
            </Button>
          </Box>

          <Canvas>
            <ZoomOnlyController />
            <PerspectiveCamera
              makeDefault
              position={[11.0, 6.5, 1.97]}
              rotation={[-1.54, 1.255, -4.734]}
              fov={50}
            />
            <SmoothCameraController
              targetPos={targetPos}
              targetRot={targetRot}
              reset={resetCamera}
            />

            {components.map((component) => (
              <Hotspot
                key={component.title}
                position={component.position}
                title={component.title}
                description={component.description}
                specs={component.specs}
                icon={component.icon}
                distanceFactor={component.distanceFactor}
              />
            ))}

            <CameraController reset={resetCamera} sceneReady={sceneReady} />
            <color attach="background" args={["rgba(30, 41, 59, 0.5)"]} />

            <Stars
              radius={30}
              depth={100}
              count={10000}
              factor={4}
              saturation={0}
              fade
              speed={2}
            />

            <ambientLight intensity={-0} />
            <directionalLight
              position={lightPosition}
              intensity={1}
              castShadow
            />
            <SunIndicator position={lightPosition} />

            <Suspense fallback={null}>
              <CPUModel onLoaded={() => setSceneReady(true)} />
              <Html position={[0, 6.5, 0]}></Html>
            </Suspense>
          </Canvas>
        </Box>

        {/* Sección de Componentes - 40% de ancho en desktop */}
        <Box
          sx={{
            width: { xs: "100%", md: "40%" },
            color: "white",
            p: 3,
            borderRadius: 3,
            bgcolor: "rgba(15, 23, 42, 0.7)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            maxHeight: { md: "80vh" },
            overflowY: { md: "auto" },
          }}
        >
          <Typography variant="h4" sx={{ mb: 4 }}>
            Componentes
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              mb: 4,
            }}
          >
            {components.map((item, index) => (
              <Box
                onClick={() =>
                  handleHotspotClick(item.positionCamera, item.rotationCamera)
                }
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 2,
                  p: 2,
                  bgcolor: "rgba(30, 41, 59, 0.5)",
                  borderRadius: 2,
                  borderLeft: "4px solid #3b82f6",
                  cursor: "pointer",
                  "&:hover": {
                    bgcolor: "rgba(30, 41, 59, 0.8)",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                <Box>
                  <Typography
                    variant="h6"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    {item.icon}
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#cbd5e1", ml: 4 }}>
                    {item.desc}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ModelViewer;
