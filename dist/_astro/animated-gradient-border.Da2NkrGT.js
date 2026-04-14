import{j as m}from"./jsx-runtime.u17CrQMm.js";import"./index.D9mrT8mP.js";const y={primary:"#584827",secondary:"#c7a03c",accent:"#f9de90"},x=({children:n,className:c="",animationMode:o="auto-rotate",animationSpeed:d=5,gradientColors:r=y,backgroundColor:e="#2d230f",borderWidth:a=2,borderRadius:t=20,style:i={},...p})=>{const s=()=>{switch(o){case"auto-rotate":return"gradient-border-auto";case"rotate-on-hover":return"gradient-border-hover";case"stop-rotate-on-hover":return"gradient-border-stop-hover";default:return""}},$={"--gradient-primary":r.primary,"--gradient-secondary":r.secondary,"--gradient-accent":r.accent,"--bg-color":e,"--border-width":`${a}px`,"--border-radius":`${t}px`,"--animation-duration":`${d}s`,border:`${a}px solid transparent`,borderRadius:`${t}px`,backgroundImage:`
      linear-gradient(${e}, ${e}),
      conic-gradient(
        from var(--gradient-angle, 0deg),
        ${r.primary} 0%,
        ${r.secondary} 37%,
        ${r.accent} 30%,
        ${r.secondary} 33%,
        ${r.primary} 40%,
        ${r.primary} 50%,
        ${r.secondary} 77%,
        ${r.accent} 80%,
        ${r.secondary} 83%,
        ${r.primary} 90%
      )
    `,backgroundClip:"padding-box, border-box",backgroundOrigin:"padding-box, border-box",...i};return m.jsx("div",{className:`gradient-border-component ${s()} ${c}`,style:$,...p,children:n})};export{x as B};
