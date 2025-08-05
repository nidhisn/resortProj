// simulationFragmentShader.glsl

uniform sampler2D textureA;  // Previous simulation state
uniform vec2 mouse;          // Mouse position in pixels
uniform vec2 resolution;     // Screen resolution
uniform int frame;           // Frame counter
uniform float time;          // Elapsed time

varying vec2 vUv;

const float delta = 1.4;     // Time step / update strength

void main() {
    vec2 uv = vUv;

    // On first frame: initialize to zero
    if (frame == 0) {
        gl_FragColor = vec4(0.0);
        return;
    }

    // Fetch current simulation state
    vec4 data = texture2D(textureA, uv);
    float pressure = data.x;
    float pVel = data.y;

    // Compute neighbor sampling offsets
    vec2 texelSize = 1.0 / resolution;
    float p_right = texture2D(textureA, uv + vec2(texelSize.x, 0.0)).x;
    float p_left  = texture2D(textureA, uv + vec2(-texelSize.x, 0.0)).x;
    float p_up    = texture2D(textureA, uv + vec2(0.0, texelSize.y)).x;
    float p_down  = texture2D(textureA, uv + vec2(0.0, -texelSize.y)).x;

    // Boundary conditions: mirror edges
    if (uv.x <= texelSize.x) p_left = p_right;
    if (uv.x >= 1.0 - texelSize.x) p_right = p_left;
    if (uv.y <= texelSize.y) p_down = p_up;
    if (uv.y >= 1.0 - texelSize.y) p_up = p_down;

    // Enhanced wave equation (2D Laplacian + velocity)
    pVel += delta * (-2.0 * pressure + p_right + p_left) / 4.0;
    pVel += delta * (-2.0 * pressure + p_up + p_down) / 4.0;
    pressure += delta * pVel;

    // Damping and decay (less aggressive than usual)
    pVel -= 0.003 * delta * pressure; 
    pVel *= 1.0 - 0.001 * delta;      
    pressure *= 0.998;               

    // Mouse interaction: add strong local pressure
    vec2 mouseUV = mouse / resolution;
    if (mouse.x > 0.0) {
        float dist = distance(uv, mouseUV);
        if (dist <= 0.02) {
            pressure += 2.0 * (1.0 - dist / 0.02);
        }
    }

    // Idle ripples when user is not interacting
    float idleRipple = 0.002 * sin(uv.x * 20.0 + time * 0.7) * cos(uv.y * 20.0 + time * 0.9);
    pressure += idleRipple;

    // Output updated simulation data
    gl_FragColor = vec4(
        pressure,
        pVel,
        (p_right - p_left) / 2.0,  // X-gradient
        (p_up - p_down) / 2.0      // Y-gradient
    );
}
