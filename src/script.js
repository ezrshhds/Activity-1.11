import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

/**
* Fonts
*/
const fontLoader = new FontLoader()
fontLoader.load(
    'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
    (font) =>
    {
        const textGeometry = new TextGeometry(
            '28 Days Later',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            }
        )

        const matcapTexture = textureLoader.load('/textures/matcaps/9.jpg')
        const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
        const text = new THREE.Mesh(textGeometry, textMaterial)

        const donutGeometry = new THREE.TorusGeometry(0.9, 0.18, 25, 40)
        const donutMaterial = new THREE.MeshMatcapMaterial({ matcap:
        matcapTexture })
        const donut = new THREE.Mesh(donutGeometry, donutMaterial)
        donut.position.set(0, 0, -0.5)
        scene.add(donut)

        const moonTopGeometry = new THREE.TorusGeometry(0.72, 0.18, 25, 40)
        const moonTopMaterial = new THREE.MeshMatcapMaterial({ matcap:
        matcapTexture })
        const moontop = new THREE.Mesh(moonTopGeometry, moonTopMaterial)
        moontop.position.set(0, 1, -0.5)
        scene.add(moontop)

        const moon2Geometry = new THREE.TorusGeometry(0.2, 0.5, 25, 40)
        const moon2Material = new THREE.MeshBasicMaterial({ color: 0x000000})
        const moonHider = new THREE.Mesh(moon2Geometry, moon2Material)
        moonHider.position.set(0, 1.9, -0.5)
        scene.add(moonHider)

        const moonRightGeometry = new THREE.TorusGeometry(0.72, 0.18, 25, 40)
        const moonRightMaterial = new THREE.MeshMatcapMaterial({ matcap:
        matcapTexture })
        const moonright = new THREE.Mesh(moonRightGeometry, moonRightMaterial)
        moonright.position.set(0.9, -0.6, -0.5)
        scene.add(moonright)

        const moon3Geometry = new THREE.TorusGeometry(0.2, 0.5, 25, 40)
        const moon3Material = new THREE.MeshBasicMaterial({ color: 0x000000})
        const moonHider2 = new THREE.Mesh(moon3Geometry, moon3Material)
        moonHider2.position.set(1.5, -1.1, -0.5)
        scene.add(moonHider2)

        const moonLeftGeometry = new THREE.TorusGeometry(0.72, 0.18, 25, 40)
        const moonLeftMaterial = new THREE.MeshMatcapMaterial({ matcap:
        matcapTexture })
        const moonleft = new THREE.Mesh(moonLeftGeometry, moonLeftMaterial)
        moonleft.position.set(-0.9, -0.6, -0.5)
        scene.add(moonleft)

        const moon4Geometry = new THREE.TorusGeometry(0.2, 0.5, 25, 40)
        const moon4Material = new THREE.MeshBasicMaterial({ color: 0x000000})
        const moonHider3 = new THREE.Mesh(moon4Geometry, moon4Material)
        moonHider3.position.set(-1.5, -1.1, -0.5)
        scene.add(moonHider3)

        textGeometry.computeBoundingBox()
        console.log(textGeometry.boundingBox)

        textGeometry.translate(
            - textGeometry.boundingBox.max.x * 0.5,
            - textGeometry.boundingBox.max.y * 0.5,
            - textGeometry.boundingBox.max.z * 0.5
        )
        
        scene.add(text)
    }
)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()