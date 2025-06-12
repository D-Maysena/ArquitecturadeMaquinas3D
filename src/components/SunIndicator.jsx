export const SunIndicator = ({ position }) => {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.2, 32, 32]} />
      <meshStandardMaterial
        emissive={"yellow"}
        emissiveIntensity={2}
        color="yellow"
      />
    </mesh>
  );
};
