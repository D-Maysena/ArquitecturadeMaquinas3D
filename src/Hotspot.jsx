import { Box, Chip, Typography } from '@mui/material';
import { Html } from '@react-three/drei';

export const Hotspot = ({ 
  position, 
  title, 
  description,
  specs,
  icon,
  onClick,
  distanceFactor
 
}) => {

    console.log(distanceFactor);
    
  return (
    <group 
      position={position} 
      onClick={onClick}
    
    >
      {/* Punto interactivo */}
      <mesh>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshBasicMaterial 
          color={"#3b82f6"} 
          transparent 
          opacity={0.7} 
        />
      </mesh>
      
      {/* Card detallada */}
      <Html
        distanceFactor={distanceFactor}
        style={{
          transition: 'all 0.3s ease',
          opacity:  1 ,
          pointerEvents: 'none',
          transform: 'translateX(-50%)'
        }}
      >
       <Box sx={{
  width: { xs: 250, sm: 280, md: 300 },
  bgcolor: 'rgba(15, 23, 42, 0.95)',
  borderRadius: 2,
  p: 2,
  boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
  borderLeft: '4px solid #3b82f6',
  backdropFilter: 'blur(10px)'
}}>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            {icon}
            <Typography variant="h6" sx={{ color: 'white' }}>
              {title}
            </Typography>
          </Box>
          
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mb: 2 }}>
            {description}
          </Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {specs.map((spec, i) => (
              <Chip 
                key={i}
                label={spec}
                size="small"
                sx={{ 
                  bgcolor: 'rgba(59, 130, 246, 0.2)',
                  color: 'white',
                  border: '1px solid rgba(59, 130, 246, 0.5)'
                }}
              />
            ))}
          </Box>
        </Box>
      </Html>
    </group>
  );
};
