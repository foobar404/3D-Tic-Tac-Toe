<template>
<Fragment>
    <div id="cube" :class="{mobile}"> 
    </div>
</Fragment>
</template>

<script>
import * as THREE from 'three'
import {Fragment} from "vue-fragment"

export default{
    name:"Cube",
    data:function(){
        return {
            mouseTop:0,
            mouseLeft:0,
            mouseDown:false,
            manualPostion:{x:0,y:0},
            manualMode:false,
            mobile:this.$store.state.mobile,
            freeSpin:true
        }
    },
    components:{
        Fragment
    },
    methods: {
        init: function() {
            let container = document.querySelector("#cube")
            let scene = new THREE.Scene()

            let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
            camera.position.z = 5.5 + (1300 / window.innerWidth)

            let light = new THREE.DirectionalLight(0xdfebff, 1.75);
            light.position.set(1, 1, 1);
            light.position.multiplyScalar(1.3);
            light.castShadow = true;
            scene.add(light);

            let cubeGroup = new THREE.Group()
            cubeGroup.castShadow = true
            cubeGroup.receiveShadow = true

            let cubes = []

            for(let i = 1;i<=3;i++){
                for(let j = 1;j<=3;j++){
                    for(let k = 1;k<=3;k++){
                        let geometry = new THREE.BoxGeometry(1, 1, 1)
                        let material = new THREE.MeshPhongMaterial({ color: "#b76c77" })
                        material.shininess = 300
                        // let roundingModifier = new THREE.SubdivisionModifier(2, false);
                        // roundingModifier
                        // rounder.modify(geometry)

                        let cube = new THREE.Mesh( geometry, material )
                        cube.castShadow = true
                        cube.receiveShadow = true

                        let x = -3 + (j*1.5)
                        let y = -3 + (i*1.5)
                        let z = -3  + (k*1.5)

                        cube.position.set(x, y, z);
                        cubeGroup.add(cube)
                        cubes.push(cube)
                    }
                }
            }
            scene.add(cubeGroup)

            let renderer = new THREE.WebGLRenderer({ alpha: true,antialias:true })
            renderer.shadowMapEnabled = true;
            renderer.shadowMapType = THREE.PCFSoftShadowMap;
            renderer.setSize(container.clientWidth, container.clientHeight)
            container.appendChild(renderer.domElement)

            this.camera = camera
            this.scene = scene
            this.renderer = renderer
            this.cubes = cubes
            this.cubeGroup = cubeGroup
            this.container = container

            return {
                camera,
                scene,
                renderer,
                cubes,
                cubeGroup,
                container
            }
        },
        animate: function(data) {
            requestAnimationFrame(this.animate.bind(this,data))

            if(this.freeSpin){
                data.cubeGroup.rotation.x += .005
                data.cubeGroup.rotation.y += .005
            }else if(!this.manualMode){
                let x = -this.mouseTop * 2
                let y = -(this.mouseLeft*7)
                data.cubeGroup.rotation.x = x
                data.cubeGroup.rotation.y = y
                this.manualPostion.lastPosition = {x,y}
            }else if(this.manualMode){
                data.cubeGroup.rotation.x = this.manualPostion.lastPosition.x + this.manualPostion.y * .01 
                data.cubeGroup.rotation.y = this.manualPostion.lastPosition.y + this.manualPostion.x * .01  
            }

            data.renderer.render(data.scene,data.camera)
        },
        addEvents:function(){
            let container = document.querySelector("#cube")

            container.addEventListener("mousemove",e=>{
                this.freeSpin = false
                this.canPick = false

                if(this.mouseDown){
                    this.manualPostion.x += e.movementX
                    this.manualPostion.y += e.movementY
                }else{
                    let elm = e.srcElement.getBoundingClientRect()
                    // -1 <-> 1
                    this.mouseLeft = ( (e.x - elm.left) / (elm.width/2) ) - 1 
                    this.mouseTop = ( (e.y - elm.top) / (elm.height/2) ) - 1
                }
            })

            container.addEventListener("mouseleave",()=>{
                this.mouseTop = 0
                this.mouseLeft= 0
                this.freeSpin = true
                this.manualMode = false
                this.manualPostion.x = 0
                this.manualPostion.y = 0
            })

            container.addEventListener("mouseup",()=>{
                this.mouseDown = false
            })
            container.addEventListener("mousedown",()=>{
                this.canPick = true
                this.mouseDown = true
                this.manualMode = true
            })

            container.addEventListener("click",e=>{
                if(!this.canPick) return 

                var raycaster = new THREE.Raycaster()
                let container = this.container.getBoundingClientRect()

                let mouse = {}  
                mouse.x = ( (e.clientX - container.x) / container.width ) * 2 - 1;
                mouse.y = - ( (e.clientY - container.y) / container.height ) * 2 + 1;
                
                raycaster.setFromCamera( mouse, this.camera )
                var intersects = raycaster.intersectObjects(this.cubes)

                if(intersects.length){
                    intersects[0].object.material.color.setStyle(this.$store.state.userColor)
                }
        
            })
        }
  },
  mounted() {
      this.addEvents()
      let data = this.init()
      this.animate(data)
  }
}
</script>

<style lang="scss" scoped>
    div{
        height: 100%;

        canvas{
            height: 100%;
            width: 100%;
        }
    }
    div:not(.mobile){
        width: 50%;
    }
    div.mobile{
        width: 80%;
    }
</style>