(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))t(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&t(a)}).observe(document,{childList:!0,subtree:!0});function c(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function t(n){if(n.ep)return;n.ep=!0;const i=c(n);fetch(n.href,i)}})();var S=typeof Float32Array<"u"?Float32Array:Array;function x(){var e=new S(16);return S!=Float32Array&&(e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0),e[0]=1,e[5]=1,e[10]=1,e[15]=1,e}function F(e){return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function T(e,r,c){var t=c[0],n=c[1],i=c[2],a,d,l,m,u,h,v,p,A,P,g,y;return r===e?(e[12]=r[0]*t+r[4]*n+r[8]*i+r[12],e[13]=r[1]*t+r[5]*n+r[9]*i+r[13],e[14]=r[2]*t+r[6]*n+r[10]*i+r[14],e[15]=r[3]*t+r[7]*n+r[11]*i+r[15]):(a=r[0],d=r[1],l=r[2],m=r[3],u=r[4],h=r[5],v=r[6],p=r[7],A=r[8],P=r[9],g=r[10],y=r[11],e[0]=a,e[1]=d,e[2]=l,e[3]=m,e[4]=u,e[5]=h,e[6]=v,e[7]=p,e[8]=A,e[9]=P,e[10]=g,e[11]=y,e[12]=a*t+u*n+A*i+r[12],e[13]=d*t+h*n+P*i+r[13],e[14]=l*t+v*n+g*i+r[14],e[15]=m*t+p*n+y*i+r[15]),e}const I=`#version 300 es
    in vec4 aPosition;
    out vec4 vColor;
    uniform mat4 uModelMatrix;

    void main(){
        gl_Position = uModelMatrix * aPosition;
        vColor = vec4(1, 0.5, 0.5, 1);
    }
`,C=`#version 300 es
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
`,L=document.getElementById("canvas"),o=L.getContext("webgl2");o||alert("webgl2 не работает!");function _(e,r){const t=Math.min(window.devicePixelRatio,2)*800;r.width=t,r.height=t,r.style.width="800px",r.style.height="800px",e.viewport(0,0,t,t)}function M(e,r,c){const t=e.createShader(r);return e.shaderSource(t,c),e.compileShader(t),e.getShaderParameter(t,e.COMPILE_STATUS)?t:(console.error(e.getShaderInfoLog(t)),null)}function O(e,r,c){const t=e.createProgram();return e.attachShader(t,r),e.attachShader(t,c),e.linkProgram(t),e.getProgramParameter(t,e.LINK_STATUS)?t:(console.error(e.getProgramInfoLog(t)),null)}const N=M(o,o.VERTEX_SHADER,I),U=M(o,o.FRAGMENT_SHADER,C),s=O(o,N,U),B=new Float32Array([-.25,-.25,0,.25,-.25,0,0,.25,0]),X=o.createBuffer();o.bindBuffer(o.ARRAY_BUFFER,X);o.bufferData(o.ARRAY_BUFFER,B,o.STATIC_DRAW);const R=o.getAttribLocation(s,"aPosition");o.enableVertexAttribArray(R);o.vertexAttribPointer(R,3,o.FLOAT,!1,0,0);const b=o.getUniformLocation(s,"uModelMatrix"),w=o.getUniformLocation(s,"uPositionX"),f=x(),q=2.5;function E(e){const r=e/1e3,c=2*Math.PI/q,t=.75*Math.cos(c*r);F(f),T(f,f,[t,0,0]),o.useProgram(s),o.uniformMatrix4fv(b,!1,f),o.uniform1f(w,t),o.drawArrays(o.TRIANGLES,0,3),requestAnimationFrame(E)}_(o,L);function D(){o.useProgram(s),o.uniformMatrix4fv(b,!1,x()),o.uniform1f(w,0),o.drawArrays(o.TRIANGLES,0,3),setTimeout(()=>{requestAnimationFrame(E)},16)}D();
