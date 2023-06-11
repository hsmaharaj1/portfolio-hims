//Text Animations
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const branch = entry.target.querySelector('.branch')
        const container = document.querySelector('.container')
        const three = document.getElementById("cont-threejs")
        if(entry.isIntersecting){
            branch.classList.add('animate')
            container.classList.add('bg-change')
            three.classList.add('hide')
            console.log("yes")
            return
        }
        branch.classList.remove('animate')
        container.classList.remove('bg-change')
        three.classList.remove('hide')
    })
})
observer.observe(document.querySelector('.page-two'))



//Threejs
const width = window.innerWidth
const height = window.innerHeight

//Creating Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color("#00000080")

//Setting Camera
const fov = 45
const aspect = width/height
const near = 0.1
const far = 100
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
camera.position.set(0,0,40)
scene.add(camera)

//Renderer
const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

//Light
const light = new THREE.DirectionalLight(0xffffff, 1.5)
light.position.set(0,0,1)
scene.add(light)

const loader  = new THREE.GLTFLoader()
loader.load("tony_stark/scene.gltf", function(gltf){
    console.log(gltf)
    const root = gltf.scene
    root.scale.set(10,10,10)
    root.position.set(0, 0, 0)
    scene.add(root)
},undefined, function(error){
    console.log(error)
})

const container = document.getElementById("cont-threejs")
container.append(renderer.domElement)

const controls = new THREE.OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.autoRotate = true
controls.autoRotateSpeed = 2
controls.update()

renderer.setPixelRatio(2)


function animate(){
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
}

animate()