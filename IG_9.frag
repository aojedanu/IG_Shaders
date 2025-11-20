#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float n(vec2 p){
    return fract(sin(dot(p,vec2(12.9,78.2)))*4e4);
}

float s(vec2 p){
    vec2 i=floor(p),f=fract(p);
    f=f*f*(3.-2.*f);
    return mix(mix(n(i),n(i+vec2(1,0)),f.x),mix(n(i+vec2(0,1)),n(i+vec2(1,1)),f.x),f.y);
}

void main(){
    vec2 v=gl_FragCoord.xy/u_resolution,p=v*2.-1.;
    p.x*=u_resolution.x/u_resolution.y;
    float t=u_time*.5,w=sin(p.x*2.+t)*.3+sin(p.x*3.-t*.6)*.2+.2,d=abs(p.y-w),a=smoothstep(.5,0.,d)*s(vec2(p.x*6.,p.y*4.+t*.2));
    vec3 c=mix(vec3(0,1,.5),mix(vec3(.3,.5,1),vec3(.8,.2,1),a),sin(t+p.x)*.5+.5)*a*1.5;
    gl_FragColor=vec4(c+vec3(0,0,.05+v.y*.1),1);
}