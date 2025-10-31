// src/components/sections/ServiceGlobe.tsx
"use client";
import * as THREE from "three";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Html,
  shaderMaterial,
  useTexture,
} from "@react-three/drei";
import { Suspense, useMemo, useRef, useLayoutEffect } from "react";

/** ---------- Custom shader material: purple-gold gradient + grid ---------- */
const GradientGridMaterial = shaderMaterial(
  // Uniforms
  {
    uColorA: new THREE.Color("#f8e6a0"), // pale gold top
    uColorB: new THREE.Color("#e8b122"), // golden yellow bottom
    uGridColor: new THREE.Color("#3e2a79"), // deep purple grid
    uTime: 0,
    uGridLatCount: 18,
    uGridLonCount: 36,
    uLineWidth: 0.006,
    uMajorEvery: 6,
    uMajorBoost: 0.7,
    uSpecular: 0.35,
    uEmissive: 0.08,
  },
  // Vertex
  /* glsl */ `
    varying vec3 vWorldNormal;
    varying vec3 vWorldPos;
    void main(){
      vec4 wp = modelMatrix * vec4(position, 1.0);
      vWorldPos = wp.xyz;
      vWorldNormal = normalize(mat3(modelMatrix) * normal);
      gl_Position = projectionMatrix * viewMatrix * wp;
    }
  `,
  // Fragment
  /* glsl */ `
    precision highp float;

    varying vec3 vWorldNormal;
    varying vec3 vWorldPos;

    uniform vec3 uColorA;
    uniform vec3 uColorB;
    uniform vec3 uGridColor;
    uniform float uTime;
    uniform float uGridLatCount;
    uniform float uGridLonCount;
    uniform float uLineWidth;
    uniform float uMajorEvery;
    uniform float uMajorBoost;
    uniform float uSpecular;
    uniform float uEmissive;

    float aastep(float threshold, float value) {
      float afwidth = 0.7 * length(fwidth(value));
      return smoothstep(threshold - afwidth, threshold + afwidth, value);
    }

    float distToNearestMultiple(float x, float stepSize){
      float m = x / stepSize;
      float frac = abs(m - round(m));
      return frac;
    }

    void main(){
      vec3 N = normalize(vWorldNormal);

      // Hard bail near poles
      float poleCapStrict = 1.0 - abs(N.y);
      if (poleCapStrict < 0.015) {
        float gradT = 0.5 + 0.5 * N.y;
        gradT += 0.03 * sin((N.x + N.z) * 8.0 + uTime * 0.6);
        vec3 baseCol = mix(uColorB, uColorA, clamp(gradT, 0.0, 1.0));

        vec3 V = normalize(cameraPosition - vWorldPos);
        vec3 L = normalize(vec3(0.6, 0.5, 0.8));
        vec3 H = normalize(L + V);
        float spec = pow(max(dot(N, H), 0.0), 32.0) * uSpecular;

        gl_FragColor = vec4(baseCol + spec + uEmissive, 1.0);
        return;
      }

      float poleFade = smoothstep(0.00, 0.18, 1.0 - abs(N.y));
      float poleHardCut = step(0.06, 1.0 - abs(N.y));

      float lat = acos(clamp(N.y, -1.0, 1.0));
      float lon = atan(N.x, N.z);

      // Enhanced gradient with shimmer
      float gradT = 0.5 + 0.5 * N.y;
      gradT += 0.03 * sin((N.x + N.z) * 8.0 + uTime * 0.6);
      vec3 baseCol = mix(uColorB, uColorA, clamp(gradT, 0.0, 1.0));

      float latStep = 3.14159265 / uGridLatCount;
      float lonStep = 6.2831853 / uGridLonCount;

      float latDist = distToNearestMultiple(lat, latStep);
      float lonDist = distToNearestMultiple(lon + 3.14159265, lonStep);

      float s = sin(lat);
      float lonWidthScaled = max(uLineWidth * s, 0.0006);

      float latLine = (1.0 - aastep(uLineWidth, latDist));
      float lonLine = (1.0 - aastep(lonWidthScaled, lonDist));

      float poleDistance = 1.0 - abs(N.y);
      if (poleDistance < 0.20) {
        lonLine = 0.0;
      }

      float poleCap = 1.0 - abs(N.y);
      if (poleCap < 0.10) {
        latLine = 0.0;
        lonLine = 0.0;
      }

      float gridMask = max(latLine, lonLine);
      gridMask *= poleFade * poleHardCut;

      float latIndex = floor(lat / latStep + 0.5);
      float lonIndex = floor((lon + 3.14159265) / lonStep + 0.5);
      float isLatMajor = 1.0 - step(0.5, abs(mod(latIndex, uMajorEvery)));
      float isLonMajor = 1.0 - step(0.5, abs(mod(lonIndex, uMajorEvery)));
      float majorMask = max(isLatMajor * latLine, isLonMajor * lonLine);
      majorMask *= poleFade * poleHardCut;

      // Enhanced specular for travel globe
      vec3 V = normalize(cameraPosition - vWorldPos);
      vec3 L = normalize(vec3(0.6, 0.5, 0.8));
      vec3 H = normalize(L + V);
      float spec = pow(max(dot(N, H), 0.0), 32.0) * uSpecular;

      vec3 gridCol = uGridColor;
      float alphaGrid = 0.4 * gridMask + uMajorBoost * 0.4 * majorMask;

      vec3 col = baseCol + spec + uEmissive;
      col = mix(col, gridCol, clamp(alphaGrid, 0.0, 0.65));

      gl_FragColor = vec4(col, 1.0);
    }
  `
);

extend({ GradientGridMaterial });

/** ---------- Atmosphere (lavender-gold glow) ---------- */
function AtmosphereGlow() {
  const matRef = useRef<THREE.ShaderMaterial>(null!);
  useFrame((_, dt) => {
    if (matRef.current) (matRef.current.uniforms.uTime.value as number) += dt;
  });

  return (
    <mesh scale={1.035}>
      <sphereGeometry args={[0.92, 64, 64]} />
      <shaderMaterial
        ref={matRef}
        transparent
        side={THREE.BackSide}
        depthWrite={false}
        depthTest={false}
        blending={THREE.AdditiveBlending}
        uniforms={{
          uTime: { value: 0 },
          uColor: { value: new THREE.Color("#d4a5ff") },
          uIntensity: { value: 0.28 },
        }}
        vertexShader={
          /* glsl */ `
          varying vec3 vNormal;
          void main(){
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `
        }
        fragmentShader={
          /* glsl */ `
          precision highp float;
          varying vec3 vNormal;
          uniform vec3 uColor;
          uniform float uIntensity;
          uniform float uTime;

          void main(){
            float rim = pow(1.0 - abs(vNormal.z), 2.2);
            float twinkle = 0.05 * sin((vNormal.x + vNormal.y) * 12.0 + uTime * 0.8);
            float a = clamp(uIntensity * (rim + twinkle), 0.0, 0.7);
            gl_FragColor = vec4(uColor, a);
          }
        `
        }
      />
    </mesh>
  );
}

/** ---------- The travel globe ---------- */
function GradientGridGlobe() {
  const matRef = useRef<THREE.ShaderMaterial>(null!);
  useFrame((_, dt) => {
    if (matRef.current) {
      (matRef.current.uniforms.uTime.value as number) += dt;
    }
  });

  return (
    <group>
      <mesh>
        <sphereGeometry args={[0.92, 128, 128]} />
        {/* @ts-expect-error - injected by extend() */}
        <gradientGridMaterial
          ref={matRef}
          uColorA={"#f8e6a0"} // pale gold top
          uColorB={"#e8b122"} // golden bottom
          uGridColor={"#3e2a79"} // purple grid
          uGridLatCount={18}
          uGridLonCount={36}
          uLineWidth={0.006}
          uMajorEvery={6}
          uMajorBoost={0.7}
          uSpecular={0.35}
          uEmissive={0.08}
        />
      </mesh>
      <AtmosphereGlow />
    </group>
  );
}

/** ---------- Helpers ---------- */
function latLonToVector3(lat: number, lon: number, radius = 0.93) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return [x, y, z] as const;
}

/** ---------- Logo Sticker ---------- */
function LogoSticker({
  lat,
  lon,
  radius = 0.93,
  size = 0.22,
  src = "/MYSHA-LOGO.png",
  duplicateOpposite = false,
  rollDeg = 0,
}: {
  lat: number;
  lon: number;
  radius?: number;
  size?: number;
  src?: string;
  duplicateOpposite?: boolean;
  rollDeg?: number;
}) {
  const group = useRef<THREE.Group>(null!);
  const tex = useTexture(src);
  tex.anisotropy = 8;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.generateMipmaps = true;
  tex.minFilter = THREE.LinearMipmapLinearFilter;

  const [x, y, z] = latLonToVector3(lat, lon, radius + 0.006);
  const N = new THREE.Vector3(x, y, z).normalize();

  const eps = 0.001;
  const [nx, ny, nz] = latLonToVector3(
    Math.min(lat + eps, 89.999),
    lon,
    radius + 0.003
  );
  const northDir = new THREE.Vector3(nx, ny, nz)
    .sub(new THREE.Vector3(x, y, z))
    .normalize();

  const right = new THREE.Vector3().crossVectors(northDir, N).normalize();
  const up = new THREE.Vector3().crossVectors(N, right).normalize();

  const rot = new THREE.Matrix4().makeBasis(right, up, N);

  const rollQ = new THREE.Quaternion().setFromAxisAngle(
    N,
    THREE.MathUtils.degToRad(rollDeg)
  );
  const q = new THREE.Quaternion().setFromRotationMatrix(rot).multiply(rollQ);

  useLayoutEffect(() => {
    if (!group.current) return;
    group.current.position.set(x, y, z);
    group.current.quaternion.copy(q);
  }, [x, y, z, q]);

  const StickerMesh = () => (
    <mesh renderOrder={10}>
      <planeGeometry args={[size, size]} />
      <meshBasicMaterial
        map={tex}
        transparent
        depthTest
        depthWrite={false}
        polygonOffset
        polygonOffsetFactor={-4}
        polygonOffsetUnits={-4}
        alphaTest={0.02}
        premultipliedAlpha
        toneMapped={false}
      />
    </mesh>
  );

  const oppLon = ((lon + 180) % 360) - 180;

  return (
    <>
      <group ref={group}>
        <StickerMesh />
      </group>

      {duplicateOpposite && (
        <LogoSticker
          lat={lat}
          lon={oppLon}
          radius={radius}
          size={size}
          src={src}
          duplicateOpposite={false}
          rollDeg={rollDeg}
        />
      )}
    </>
  );
}

/** ---------- Pin Component ---------- */
function Pin({ lat, lon }: { lat: number; lon: number }) {
  const [x, y, z] = latLonToVector3(lat, lon);
  return (
    <group position={[x, y, z]}>
      <mesh>
        <sphereGeometry args={[0.015, 16, 16]} />
        <meshStandardMaterial
          color={"#3e2a79"}
          emissive={"#6b5fa6"}
          emissiveIntensity={0.4}
        />
      </mesh>
      <mesh position={[0, 0.03, 0]}>
        <cylinderGeometry args={[0.002, 0.002, 0.05, 6]} />
        <meshStandardMaterial color={"#e8b122"} />
      </mesh>
    </group>
  );
}

/** ---------- Main ServiceGlobe Component ---------- */
export function ServiceGlobe() {
  const pins = useMemo(
    () => [
      { lat: 49.2827, lon: -123.1207 },
      { lat: 49.2488, lon: -122.9805 },
      { lat: 49.1666, lon: -123.1336 },
      { lat: 49.3209, lon: -123.0726 },
    ],
    []
  );

  function normalizeLon(lon: number) {
    return ((((lon + 180) % 360) + 360) % 360) - 180;
  }

  const LOGO_LAT = 0;
  const BASE_LON = -90;

  const logoLons = [
    normalizeLon(BASE_LON + 0),
    normalizeLon(BASE_LON + 90),
    normalizeLon(BASE_LON + 180),
    normalizeLon(BASE_LON + 270),
  ];

  return (
    <Canvas
      camera={{ position: [0, 0, 2.6], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.8]}
      style={{ width: "100%", height: "100%" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.outputColorSpace = THREE.SRGBColorSpace;
      }}
    >
      <ambientLight intensity={0.75} />
      <directionalLight position={[2.5, 1.5, 3]} intensity={1.1} />

      <Suspense fallback={<Html>Loading…</Html>}>
        <GradientGridGlobe />

        {logoLons.map((lon, i) => (
          <LogoSticker
            key={i}
            lat={LOGO_LAT}
            lon={lon}
            src="/MYSHA-LOGO.png"
            size={0.22}
          />
        ))}

        {pins.map((p, i) => (
          <Pin key={i} lat={p.lat} lon={p.lon} />
        ))}
      </Suspense>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={1.8}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.4}
        minPolarAngle={Math.PI * 0.15}
        maxPolarAngle={Math.PI * 0.85}
      />
    </Canvas>
  );
}
