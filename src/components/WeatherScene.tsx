import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Cloud } from '@react-three/drei';
import * as THREE from 'three';
import { WeatherSceneProps } from '../types/weather';

const WeatherScene: React.FC<WeatherSceneProps> = ({ condition, isDay }) => {
  const sunRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Group[]>([]);

  useFrame(({ clock }) => {
    if (sunRef.current) {
      // Rotate the sun
      sunRef.current.rotation.z = clock.getElapsedTime() * 0.2;
    }

    // Animate clouds
    cloudsRef.current.forEach((cloud, i) => {
      const t = clock.getElapsedTime();
      cloud.position.x = Math.sin(t * 0.2 + i * 0.5) * 0.5;
      cloud.position.y = Math.cos(t * 0.2 + i * 0.5) * 0.2;
    });
  });

  // Sun properties
  const sunColor = isDay ? "#FFD700" : "#FFA500";
  const sunIntensity = isDay ? 1.5 : 0.5;
  const atmosphereColor = isDay ? "#87CEEB" : "#4A4A4A";

  // Cloud properties based on weather condition
  const cloudCount = condition.toLowerCase().includes('cloud') ? 5 :
                    condition.toLowerCase().includes('rain') ? 7 : 2;

  return (
    <>
      {/* Ambient light */}
      <ambientLight intensity={0.5} />

      {/* Sun */}
      <group position={[2, 2, -5]}>
        {/* Core */}
        <Sphere ref={sunRef} args={[1, 32, 32]}>
          <meshBasicMaterial
            color={sunColor}
            transparent
            opacity={0.9}
          />
        </Sphere>
        
        {/* Glow */}
        <Sphere args={[1.2, 32, 32]}>
          <meshBasicMaterial
            color={sunColor}
            transparent
            opacity={0.3}
          />
        </Sphere>
        
        {/* Atmosphere */}
        <Sphere args={[1.4, 32, 32]}>
          <meshBasicMaterial
            color={atmosphereColor}
            transparent
            opacity={0.1}
          />
        </Sphere>

        {/* Sun light */}
        <pointLight color={sunColor} intensity={sunIntensity} distance={20} />
      </group>

      {/* Clouds */}
      <group position={[0, 0, -2]}>
        {Array.from({ length: cloudCount }).map((_, i) => (
          <group
            key={i}
            position={[
              (i - cloudCount / 2) * 1.5,
              Math.sin(i) * 0.5,
              0
            ]}
            ref={(el) => {
              if (el) cloudsRef.current[i] = el;
            }}
          >
            <Cloud
              opacity={0.7}
              speed={0.4}
              segments={20}
              color={isDay ? "#ffffff" : "#a0a0a0"}
              position={[0, 0, 0]}
            />
          </group>
        ))}
      </group>

      {/* Rain effect */}
      {condition.toLowerCase().includes('rain') && (
        <group position={[0, 2, 0]}>
          {Array.from({ length: 100 }).map((_, i) => (
            <mesh
              key={i}
              position={[
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10
              ]}
            >
              <sphereGeometry args={[0.02, 8, 8]} />
              <meshBasicMaterial
                color="#87CEEB"
                transparent
                opacity={0.6}
              />
            </mesh>
          ))}
        </group>
      )}
    </>
  );
};

export default WeatherScene;
