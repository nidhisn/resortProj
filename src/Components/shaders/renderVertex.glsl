precision highp float;

attribute vec2 a_position;
varying vec2 v_ripple_uv;
varying vec2 v_bg_uv;

void main() {
    // Pass the texture coordinates to the fragment shader
    v_ripple_uv = a_position * 0.5 + 0.5;
    v_bg_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
}