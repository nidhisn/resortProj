precision highp float;

uniform sampler2D u_bg_texture; // The background sand image
uniform sampler2D u_logo_texture; // The "sandbank" text image
uniform sampler2D u_ripple_texture; // The simulation texture
uniform vec2 u_delta;
uniform float u_perturbance;

varying vec2 v_ripple_uv;
varying vec2 v_bg_uv;

void main() {
    // Get the height from the ripple simulation texture
    float height = texture2D(u_ripple_texture, v_ripple_uv).r;

    // Calculate normals from the heightmap to create a lighting effect
    float height_x = texture2D(u_ripple_texture, v_ripple_uv + vec2(u_delta.x, 0.0)).r;
    float height_y = texture2D(u_ripple_texture, v_ripple_uv + vec2(0.0, u_delta.y)).r;

    vec3 dx = vec3(u_delta.x, height_x - height, 0.0);
    vec3 dy = vec3(0.0, height_y - height, u_delta.y);

    // The 'offset' vector represents how much to displace the texture coordinates
    vec2 offset = -normalize(cross(dy, dx)).xz;

    // *** THIS IS THE REVERTED LINE ***
    // Sample the background texture using the displaced coordinates
    vec4 bg_color = texture2D(u_bg_texture, v_bg_uv + offset * u_perturbance);
    vec4 logo_color = texture2D(u_logo_texture, v_bg_uv + offset * u_perturbance);
    
    // Blend the logo over the background.
    gl_FragColor = mix(bg_color, logo_color, logo_color.a);
}