"use client";
import { Environment, MeshReflectorMaterial } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Frames from "./frames";
import { images } from "./data";

export default function Scene() {
  const handleResize = (): {
    fov: number;
    position: [x: number, y: number, z: number];
  } => {
    if (!global.window) return { fov: 70, position: [0, 2, 15] };

    if (window.innerWidth >= 1000) return { fov: 70, position: [0, 2, 15] };
    if (window.innerWidth <= 600) return { fov: 120, position: [0, 2, 15] };
    if (window.innerWidth <= 1000) return { fov: 100, position: [0, 2, 15] };
  };

  return (
    <Canvas dpr={[1, 2]} camera={handleResize()}>
      <color attach="background" args={["#E7E5E4"]} />
      <fog attach="fog" args={["#191920", 0, 15]} />
      <group position={[0, -0.5, 0]}>
        <Frames images={images} />

        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={2048}
            mirror={0.9}
            mixBlur={1}
            mixStrength={80}
            roughness={1}
            depthScale={1.23}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#060606"
            metalness={1.12}
          />
        </mesh>
      </group>
      <Environment preset="studio" />
    </Canvas>
  );
}
