// rendererFragmentShader.glsl

uniform sampler2D textureA;  // Simulation texture (displacement / distortion)
uniform sampler2D textureB;  // Text texture or base layer

varying vec2 vUv;            // UV coordinates

void main() {
    // Sample simulation data (usually containing velocity, displacement, etc.)
    vec4 data = texture2D(textureA, vUv);

    // Apply a distortion effect using the Z/W channels from the simulation
    vec2 distortion = 0.3 * data.zw;

    // Sample the text/background texture with the distortion applied
    vec4 color = texture2D(textureB, vUv + distortion);

    // Compute a pseudo-normal for lighting based on the data texture
    vec3 normal = normalize(vec3(-data.z * 2.0, 0.5, -data.w * 2.0));

    // Define a fixed light direction
    vec3 lightDir = normalize(vec3(-3.0, 10.0, 3.0));

    // Calculate specular highlights
    float specular = pow(max(0.0, dot(normal, lightDir)), 60.0) * 1.5;

    // Combine the color and specular highlight
    gl_FragColor = color + vec4(vec3(specular), 0.0);
}
