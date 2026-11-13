import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { WaveLook } from "@/lib/wave";

const DEFAULT_FPS = 40;
const DEFAULT_MAX_DPR = 1.25;
const FREEZE_AT = 14; // time (seconds) shown as the still frame when motion is reduced

const VERTEX = `
attribute vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const FRAGMENT = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 uRes;
uniform float uTime;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
uniform float uAngle;
uniform vec2 uCenter;
uniform float uScale;
uniform float uFade;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

vec3 palette(float g) {
  vec3 light = mix(uColorA, vec3(1.0), 0.45);
  vec3 middle = mix(uColorB, uColorC, 0.5);
  vec3 c = mix(light, uColorA, smoothstep(0.0, 0.25, g));
  c = mix(c, uColorB, smoothstep(0.25, 0.5, g));
  c = mix(c, middle, smoothstep(0.5, 0.75, g));
  return mix(c, uColorC, smoothstep(0.75, 1.0, g));
}

// Returns premultiplied color + alpha for one silk ribbon.
vec4 ribbon(vec2 q, vec2 dir, vec2 nrm, float t, float seed, float widthScale, float shift) {
  float ts = t + seed;
  float u = dot(q, dir);
  float v = dot(q, nrm) - shift;

  float center = 0.10 * sin(u * 1.9 - ts * 0.45) + 0.04 * sin(u * 4.7 + ts * 0.6);
  float w = (0.24 + 0.09 * sin(u * 1.7 + ts * 0.30) + 0.04 * sin(u * 3.9 - ts * 0.42)) * widthScale;
  float d = (v - center) / w;

  float edge = 1.0 - smoothstep(0.74, 1.0, abs(d));
  if (edge <= 0.0) return vec4(0.0);

  float warp = sin(u * 2.4 + ts * 0.2) * 3.0 + noise(vec2(u * 1.6, d * 5.0 + ts * 0.1)) * 2.5;
  float hair = 0.5 + 0.5 * sin(d * 34.0 + warp + ts * 0.35);
  hair = 0.6 * hair + 0.4 * (0.5 + 0.5 * sin(d * 87.0 - warp * 1.7 + u * 4.0));

  float fold = 0.5 + 0.5 * sin(d * 2.2 + u * 1.3 + ts * 0.3);

  float g = smoothstep(-0.95, 0.95, u + d * 0.22 + 0.15 * sin(ts * 0.2));
  vec3 col = palette(g);
  col = mix(col, vec3(1.0), (1.0 - hair) * 0.38);
  col *= 0.86 + 0.14 * fold;
  col = mix(col, vec3(1.0), pow(abs(d), 4.0) * 0.18);

  float a = edge * (0.30 + 0.70 * hair);
  return vec4(col * a, a);
}

void main() {
  float aspect = uRes.x / uRes.y;
  vec2 p = gl_FragCoord.xy / uRes.y;
  vec2 q = p - vec2(uCenter.x * aspect, uCenter.y);
  vec2 dir = vec2(cos(uAngle), sin(uAngle));
  vec2 nrm = vec2(-dir.y, dir.x);

  vec4 back = ribbon(q, dir, nrm, uTime, 2.3, 1.3 * uScale, 0.16) * 0.55;
  vec4 front = ribbon(q, dir, nrm, uTime, 0.0, uScale, 0.0);
  vec4 c = front + back * (1.0 - front.a);

  // on the home page, keep the left side calmer so the headline stays readable
  float nx = gl_FragCoord.x / uRes.x;
  float calm = mix(0.35, 1.0, smoothstep(0.28, 0.62, nx));
  c *= mix(1.0, calm, uFade);

  gl_FragColor = c;
}
`;

function readColor(name: string, fallback: string) {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return /^#[0-9a-f]{6}$/i.test(raw) ? raw : fallback;
}

function toRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

type HeroWaveProps = {
  className?: string;
  look?: WaveLook;
  /** Pixels drawn per screen pixel. A low number such as 0.3 gives a soft, blurry ribbon. */
  resolution?: number;
  fps?: number;
  /** 1 keeps the left side calmer (home page hero), 0 shows the ribbon evenly. */
  fade?: number;
};

export function HeroWave({ className, look, resolution, fps, fade = 1 }: HeroWaveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      premultipliedAlpha: true,
      powerPreference: "low-power",
    });
    if (!gl) return; // no WebGL: the page simply shows no ribbon

    const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX);
    const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
    const program = gl.createProgram();
    if (!vertex || !fragment || !program) return;

    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program error:", gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    // one oversized triangle that covers the whole canvas
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const colors = look?.colors ?? [
      readColor("--color-brand-500", "#3d5cff"),
      "#8b5cf6",
      readColor("--color-coral-400", "#ff8a6b"),
    ];
    const center = look?.center ?? [0.72, 0.55];
    const speed = look?.speed ?? 1;
    const seed = (look?.seed ?? 0) * 10;

    const uRes = gl.getUniformLocation(program, "uRes");
    const uTime = gl.getUniformLocation(program, "uTime");
    gl.uniform3f(gl.getUniformLocation(program, "uColorA"), ...toRgb(colors[0]));
    gl.uniform3f(gl.getUniformLocation(program, "uColorB"), ...toRgb(colors[1]));
    gl.uniform3f(gl.getUniformLocation(program, "uColorC"), ...toRgb(colors[2]));
    gl.uniform1f(gl.getUniformLocation(program, "uAngle"), look?.angle ?? -0.75);
    gl.uniform2f(gl.getUniformLocation(program, "uCenter"), center[0], center[1]);
    gl.uniform1f(gl.getUniformLocation(program, "uScale"), look?.scale ?? 1);
    gl.uniform1f(gl.getUniformLocation(program, "uFade"), fade);
    gl.clearColor(0, 0, 0, 0);

    const frameMs = 1000 / (fps ?? DEFAULT_FPS);
    const origin = performance.now();
    let frame = 0;
    let lastDraw = 0;

    const render = (seconds: number) => {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, seconds);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = (now: number) => {
      frame = requestAnimationFrame(loop);
      if (now - lastDraw < frameMs) return;
      lastDraw = now;
      render(((now - origin) / 1000) * speed + seed);
    };
    const start = () => {
      if (!frame) frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const resize = () => {
      const scale = resolution ?? Math.min(window.devicePixelRatio || 1, DEFAULT_MAX_DPR);
      canvas.width = Math.max(1, Math.round(canvas.clientWidth * scale));
      canvas.height = Math.max(1, Math.round(canvas.clientHeight * scale));
      // resizing clears the canvas, so draw right away to avoid a blank flash
      render(reduced ? FREEZE_AT + seed : ((performance.now() - origin) / 1000) * speed + seed);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    let intersectionObserver: IntersectionObserver | undefined;
    if (!reduced) {
      intersectionObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) start();
        else stop();
      });
      intersectionObserver.observe(canvas);
    }

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver?.disconnect();
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      gl.deleteBuffer(buffer);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [reduced, look, resolution, fps, fade]);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
