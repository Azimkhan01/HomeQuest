gsap.to(".obj",{
"backgroundColor":"#6BD0FF",
duration:Math.random()*15,
repeat:-1,
x:3000,
y:-1000

})

gsap.from(".obj1",{
    "backgroundColor":"#6BD0FF",
    duration:Math.random()*15,
    repeat:-1,
    x:2000,
    y:-800
    
    });

gsap.to("#heading2",{
 opacity:0.5,
 duration:2,
 ease: "back.out(1.7)",
 repeat:-1
})
