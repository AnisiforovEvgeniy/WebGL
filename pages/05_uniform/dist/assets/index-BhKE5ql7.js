(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))t(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&t(s)}).observe(document,{childList:!0,subtree:!0});function c(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function t(o){if(o.ep)return;o.ep=!0;const i=c(o);fetch(o.href,i)}})();var S=typeof Float32Array<"u"?Float32Array:Array;function b(){var e=new S(16);return S!=Float32Array&&(e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0),e[0]=1,e[5]=1,e[10]=1,e[15]=1,e}function F(e){return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function E(e,r,c){var t=c[0],o=c[1],i=c[2],s,d,l,m,u,h,v,p,A,P,g,y;return r===e?(e[12]=r[0]*t+r[4]*o+r[8]*i+r[12],e[13]=r[1]*t+r[5]*o+r[9]*i+r[13],e[14]=r[2]*t+r[6]*o+r[10]*i+r[14],e[15]=r[3]*t+r[7]*o+r[11]*i+r[15]):(s=r[0],d=r[1],l=r[2],m=r[3],u=r[4],h=r[5],v=r[6],p=r[7],A=r[8],P=r[9],g=r[10],y=r[11],e[0]=s,e[1]=d,e[2]=l,e[3]=m,e[4]=u,e[5]=h,e[6]=v,e[7]=p,e[8]=A,e[9]=P,e[10]=g,e[11]=y,e[12]=s*t+u*o+A*i+r[12],e[13]=d*t+h*o+P*i+r[13],e[14]=l*t+v*o+g*i+r[14],e[15]=m*t+p*o+y*i+r[15]),e}const w=`#version 300 es
    in vec4 aPosition;
    out vec4 vColor;
    uniform mat4 uModelMatrix;

    void main(){
        gl_Position = uModelMatrix * aPosition;
        vColor = vec4(1, 0.5, 0.5, 1);
    }
`,T=`#version 300 es
    precision mediump float;
    in vec4 vColor;
    out vec4 outColor;
    uniform float uPositionX; 

    void main(){
        float t = (uPositionX + 0.75) / 1.5; // от 0 (слева) до 1 (справа)
        vec3 red = vec3(1.0, 0.0, 0.0);
        vec3 blue = vec3(0.0, 0.0, 1.0);
        vec3 color = mix(blue, red, t); // Интерполяция цвета
        outColor = vec4(color, 1.0);
    }
`,x=document.getElementById("canvas"),n=x.getContext("webgl2");n||alert("webgl2 не работает!");function C(e,r){const t=(window.devicePixelRatio||1)*800;r.width=t,r.height=t,r.style.width="800px",r.style.height="800px",e.viewport(0,0,t,t)}function L(e,r,c){const t=e.createShader(r);return e.shaderSource(t,c),e.compileShader(t),e.getShaderParameter(t,e.COMPILE_STATUS)?t:(console.error(e.getShaderInfoLog(t)),null)}function I(e,r,c){const t=e.createProgram();return e.attachShader(t,r),e.attachShader(t,c),e.linkProgram(t),e.getProgramParameter(t,e.LINK_STATUS)?t:(console.error(e.getProgramInfoLog(t)),null)}const _=L(n,n.VERTEX_SHADER,w),O=L(n,n.FRAGMENT_SHADER,T),f=I(n,_,O),B=new Float32Array([-.25,-.25,0,.25,-.25,0,0,.25,0]),N=n.createBuffer();n.bindBuffer(n.ARRAY_BUFFER,N);n.bufferData(n.ARRAY_BUFFER,B,n.STATIC_DRAW);const R=n.getAttribLocation(f,"aPosition");n.enableVertexAttribArray(R);n.vertexAttribPointer(R,3,n.FLOAT,!1,0,0);const U=n.getUniformLocation(f,"uModelMatrix"),X=n.getUniformLocation(f,"uPositionX"),a=b(),q=2.5;function M(e){const r=e/1e3,c=2*Math.PI/q,t=.75*Math.cos(c*r);F(a),E(a,a,[t,0,0]),n.useProgram(f),n.uniformMatrix4fv(U,!1,a),n.uniform1f(X,t),n.drawArrays(n.TRIANGLES,0,3),requestAnimationFrame(M)}C(n,x);requestAnimationFrame(M);
