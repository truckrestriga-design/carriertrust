"use client";

import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";

function useShieldGeometry() {
  return useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 1.22);
    s.quadraticCurveTo(0.74, 1.06, 0.98, 0.56);
    s.quadraticCurveTo(1.12, 0.10, 0.76, -0.58);
    s.quadraticCurveTo(0.34, -1.06, 0, -1.26);
    s.quadraticCurveTo(-0.34, -1.06, -0.76, -0.58);
    s.quadraticCurveTo(-1.12, 0.10, -0.98, 0.56);
    s.quadraticCurveTo(-0.74, 1.06, 0, 1.22);

    const geom = new THREE.ExtrudeGeometry(s, {
      depth: 0.26,
      bevelEnabled: true,
      bevelThickness: 0.09,
      bevelSize: 0.09,
      bevelSegments: 12,
      curveSegments: 48,
    });

    geom.center();
    geom.computeVertexNormals();
    return geom;
  }, []);
}

function useCheckGeometry() {
  return useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-0.48, 0.08);
    s.lineTo(-0.16, -0.20);
    s.lineTo(0.55, 0.44);
    s.lineTo(0.38, 0.62);
    s.lineTo(-0.16, 0.18);
    s.lineTo(-0.34, 0.35);
    s.closePath();

    const geom = new THREE.ExtrudeGeometry(s, {
      depth: 0.085,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 6,
      curveSegments: 24,
    });

    geom.center();
    return geom;
  }, []);
}

// супер-дешёвый “френель” обводка для премиум блика
function FresnelRim({ color = "#cfe9ff" }: { color?: string }) {
  const mat = useMemo(() => {
    const c = new THREE.Color(color);
    return new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Vector3(c.r, c.g, c.b) },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        varying vec3 vN;
        varying vec3 vW;
        void main(){
          vN = normalize(normalMatrix * normal);
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vW = wp.xyz;
          gl_Position = projectionMatrix * viewMatrix * wp;
        }
      `,
      fragmentShader: `
        varying vec3 vN;
        varying vec3 vW;
        uniform vec3 uColor;
        void main(){
          vec3 V = normalize(cameraPosition - vW);
          float f = pow(1.0 - max(dot(vN, V), 0.0), 2.1);
          float a = clamp(f * 0.85, 0.0, 1.0);
          gl_FragColor = vec4(uColor, a);
        }
      `,
    });
  }, [color]);

  return <primitive object={mat} attach="material" />;
}

function Rings() {
  const g = useRef<THREE.Group>(null);

  const rings = useMemo(() => {
    // тонкие “стеклянные” кольца (без мазни)
    return new Array(8).fill(0).map((_, i) => {
      const r = 1.25 + i * 0.16;
      const tilt = new THREE.Euler(
        (Math.random() - 0.5) * 0.28,
        (Math.random() - 0.5) * 0.55,
        (Math.random() - 0.5) * 0.28
      );
      const speed = 0.05 + Math.random() * 0.08;
      return { r, tilt, speed };
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!g.current) return;
    g.current.rotation.y = t * 0.08;
    g.current.children.forEach((child, idx) => {
      const s = rings[idx]?.speed ?? 0.08;
      child.rotation.y = t * s;
    });
  });

  return (
    <group ref={g}>
      {rings.map((r, i) => (
        <group key={i} rotation={r.tilt}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[r.r, 0.010, 10, 180]} />
            <meshBasicMaterial
              color={i % 2 === 0 ? "#8bd3ff" : "#66a8ff"}
              transparent
              opacity={0.10}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>

          {/* “пульс” на кольце */}
          <mesh position={[r.r, 0, 0]}>
            <sphereGeometry args={[0.028, 12, 12]} />
            <meshBasicMaterial
              color="#dff3ff"
              transparent
              opacity={0.95}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function FloorGlow() {
  const ring = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!ring.current) return;
    ring.current.rotation.z = t * 0.12;
    const m = ring.current.material as THREE.MeshBasicMaterial;
    m.opacity = 0.09 + (Math.sin(t * 0.9) * 0.5 + 0.5) * 0.05;
  });

  return (
    <mesh ref={ring} position={[0, -1.18, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.9, 1.55, 90]} />
      <meshBasicMaterial
        color="#7dc7ff"
        transparent
        opacity={0.12}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

function Shield() {
  const shieldGeom = useShieldGeometry();
  const checkGeom = useCheckGeometry();

  const group = useRef<THREE.Group>(null);
  const metal = useRef<THREE.MeshPhysicalMaterial>(null);

  // realtime env reflections (small) — gives premium metal
  const cubeRT = useMemo(
    () =>
      new THREE.WebGLCubeRenderTarget(128, {
        format: THREE.RGBAFormat,
        generateMipmaps: true,
        minFilter: THREE.LinearMipmapLinearFilter,
      }),
    []
  );
  const cubeCam = useMemo(() => new THREE.CubeCamera(0.1, 30, cubeRT), [cubeRT]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (group.current) {
      group.current.rotation.y = t * 0.22;
      group.current.rotation.x = Math.sin(t * 0.25) * 0.03;
      group.current.rotation.z = Math.cos(t * 0.22) * 0.02;

      const s = 1 + Math.sin(t * 0.8) * 0.01;
      group.current.scale.setScalar(s);
    }

    const gl = state.gl;
    const scene = state.scene;

    if (group.current) group.current.visible = false;
    cubeCam.position.set(0, 0.08, 0);
    cubeCam.update(gl, scene);
    if (group.current) group.current.visible = true;

    if (metal.current) {
      metal.current.envMap = cubeRT.texture;
      metal.current.envMapIntensity = 1.15;
      metal.current.needsUpdate = true;
    }
  });

  return (
    <group ref={group}>
      {/* metal body */}
      <mesh geometry={shieldGeom}>
        <meshPhysicalMaterial
          ref={metal}
          metalness={1}
          roughness={0.035}
          clearcoat={1}
          clearcoatRoughness={0.03}
          reflectivity={1}
          color="#e7eef7"
        />
      </mesh>

      {/* rim highlight */}
      <mesh geometry={shieldGeom} scale={1.02}>
        <FresnelRim color="#cfeaff" />
      </mesh>

      {/* check (glow) */}
      <mesh geometry={checkGeom} position={[0, 0.06, 0.235]}>
        <meshStandardMaterial
          color="#ffffff"
          emissive="#bfe9ff"
          emissiveIntensity={2.2}
          metalness={0}
          roughness={0.25}
        />
      </mesh>

      {/* premium lights */}
      <pointLight position={[2.2, 1.6, 2.8]} intensity={1.05} color="#ffffff" />
      <pointLight position={[-2.2, 0.2, 1.4]} intensity={0.45} color="#bfffe9" />
    </group>
  );
}

function StudioPlates() {
  // “студия” для отражений — даёт дорогой металл без HDRI
  return (
    <>
      <mesh position={[0, 0, -4.4]}>
        <planeGeometry args={[18, 12]} />
        <meshStandardMaterial color="#ffffff" roughness={1} metalness={0} />
      </mesh>

      <mesh position={[5.3, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[18, 12]} />
        <meshStandardMaterial color="#eef6ff" roughness={1} metalness={0} />
      </mesh>

      <mesh position={[-5.3, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[18, 12]} />
        <meshStandardMaterial color="#f4fff9" roughness={1} metalness={0} />
      </mesh>
    </>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#000000"]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[7, 10, 7]} intensity={0.9} />
      <directionalLight position={[-6, -2, -5]} intensity={0.18} />

      <StudioPlates />
      <FloorGlow />
      <Rings />

      {/* micro “dust” */}
      <Sparkles count={80} size={1.15} speed={0.25} opacity={0.35} scale={[7, 4, 7]} color="#d9f1ff" />

      <Shield />
    </>
  );
}

export default function HeroVisual() {
  return (
    <div
      style={{
        width: "100%",
        height: 460,
        borderRadius: 28,
        overflow: "hidden",
        background:
          "radial-gradient(900px 420px at 60% 35%, rgba(90,175,255,0.18), rgba(255,255,255,0) 62%), linear-gradient(135deg, rgba(255,255,255,0.94), rgba(242,250,255,0.72))",
        border: "1px solid rgba(0,0,0,0.08)",
        boxShadow: "0 26px 90px rgba(15, 20, 30, 0.12)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Canvas
        camera={{ position: [0, 0.14, 4.25], fov: 42 }}
        dpr={1}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "low-power",
          preserveDrawingBuffer: false,
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}