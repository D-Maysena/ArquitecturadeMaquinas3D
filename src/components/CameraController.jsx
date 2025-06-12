import { useCameraController } from "../hooks/useCameraController";

export default function CameraController({reset, sceneReady}) {
  useCameraController(reset, sceneReady);
  return null;
}
