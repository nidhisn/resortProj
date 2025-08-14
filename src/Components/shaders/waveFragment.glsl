// src/shaders/waveFragment.glsl

precision highp float;

uniform float u_time;
uniform float u_scroll_progress; // 0 (top) to 1 (bottom)
uniform vec2 u_resolution;
varying vec2 vUv;

// --- CONFIGURATION ---
// You can tweak these colors to match your design
const vec3 COLOR_LIQUID_MAIN = vec3(0.96, 0.44, 0.61); // Main pink color
const vec3 COLOR_LIQUID_SHADOW = vec3(0.89, 0.35, 0.52); // Slightly darker pink for depth
const vec3 COLOR_BACKGROUND = vec3(0.18, 0.73, 0.48); // Green background
const vec3 COLOR_BUBBLE = vec3(1.0, 1.0, 1.0); // White bubbles

// --- UTILITY FUNCTIONS ---
// 2D Random function
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

// 2D Value Noise function
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(random(i + vec2(0.0, 0.0)), random(i + vec2(1.0, 0.0)), u.x),
               mix(random(i + vec2(0.0, 1.0)), random(i + vec2(1.0, 1.0)), u.x), u.y);
}

// Fractional Brownian Motion (adds detail to noise)
float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 4; i++) {
        value += amplitude * noise(st);
        st *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

// Function to draw rising bubbles
float bubbles(vec2 uv, float time) {
    float bubble_total = 0.0;
    // Create 5 layers of bubbles of different sizes and speeds
    for (int i = 1; i <= 5; i++) {
        float fi = float(i);
        float speed = -0.1 * fi; // Different speed for each layer
        float scale = 2.0 + fi * 3.0; // Different scale for each layer

        vec2 bubble_uv = uv * scale;
        vec2 grid_id = floor(bubble_uv);
        
        // Animate bubbles rising vertically
        bubble_uv.y += time * speed + 5.0 * fi; // Add offset to decorrelate layers
        
        float r = random(grid_id); // Unique random value for each grid cell
        
        if (r > 0.92) { // Only show some bubbles
            vec2 bubble_center = vec2(0.5, 0.5);
            // Use random value for variation in position and start time
            bubble_center += (random(grid_id * 20.0) - 0.5) * 0.8;
            bubble_center.y += fract(r * 10.0);
            
            vec2 pos = fract(bubble_uv) - bubble_center;
            
            // Make bubbles of different sizes using smoothstep for a soft edge
            float bubble_size = 1.0 - smoothstep(0.0, 0.15 / fi, length(pos));
            bubble_total += bubble_size;
        }
    }
    return clamp(bubble_total, 0.0, 1.0);
}

void main() {
    // We use vUv which goes from (0,0) at bottom-left to (1,1) at top-right.
    
    // --- WAVE CALCULATION ---
    // The base level of the wave, controlled by scroll progress.
    // Starts at 1.1 (covering the screen) and goes to -0.6 (off-screen bottom)
    float wave_level = 1.1 - (u_scroll_progress * 1.7);

    // Create wave shapes by combining noise with different frequencies and speeds
    // We use the x-coordinate and time as inputs to the noise function
    float wave1 = fbm(vec2(vUv.x * 0.7, u_time * 0.1)) * 0.1;
    float wave2 = fbm(vec2(vUv.x * 2.2, u_time * 0.3)) * 0.04;
    float wave3 = noise(vec2(vUv.x * 5.0, u_time * 0.4)) * 0.02;

    float total_wave_height = wave_level + wave1 + wave2 + wave3;
    
    // --- DRAWING ---
    vec3 final_color = COLOR_BACKGROUND;
    
    // Calculate vertical distance from the pixel to the wave surface
    float dist_from_surface = total_wave_height - vUv.y;
    
    // Create the main liquid body with a soft edge using smoothstep
    float liquid_mask = smoothstep(0.0, 0.005, dist_from_surface);
    final_color = mix(final_color, COLOR_LIQUID_MAIN, liquid_mask);
    
    // Create a shadow just below the surface to give depth and a layered look
    float shadow_mask = smoothstep(0.0, -0.05, dist_from_surface);
    final_color = mix(final_color, COLOR_LIQUID_SHADOW, shadow_mask * 0.8 * liquid_mask);
    
    // --- BUBBLES ---
    // Only draw bubbles inside the main liquid body
    if (dist_from_surface > 0.0) {
        float bubble_value = bubbles(vUv, u_time);
        // Mix the bubble color with the current color (liquid or shadow)
        final_color = mix(final_color, COLOR_BUBBLE, bubble_value * 0.8);
    }

    gl_FragColor = vec4(final_color, 1.0);
}