// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Theme Toggle
  const themeToggle = document.querySelector(".theme-toggle")
  const lightIcon = document.querySelector(".light-icon")
  const darkIcon = document.querySelector(".dark-icon")

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme")
    lightIcon.classList.toggle("active")
    darkIcon.classList.toggle("active")

    // Store theme preference
    const theme = document.body.classList.contains("light-theme") ? "light" : "dark"
    localStorage.setItem("theme", theme)
  })

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "light") {
    document.body.classList.add("light-theme")
    lightIcon.classList.add("active")
    darkIcon.classList.remove("active")
  }

  // Preloader
  const preloader = document.querySelector(".preloader")
  const progress = document.querySelector(".progress")
  let loadProgress = 0

  const interval = setInterval(() => {
    loadProgress += Math.random() * 10
    if (loadProgress >= 100) {
      loadProgress = 100
      clearInterval(interval)

      setTimeout(() => {
        preloader.style.opacity = "0"
        setTimeout(() => {
          preloader.style.display = "none"
          // Start animations after preloader is gone
          startAnimations()
        }, 500)
      }, 500)
    }
    progress.style.width = `${loadProgress}%`
  }, 150)

  // Custom Cursor
  const cursorDot = document.querySelector(".cursor-dot")
  const cursorOutline = document.querySelector(".cursor-outline")

  if (window.matchMedia("(hover: hover)").matches) {
    window.addEventListener("mousemove", (e) => {
      const posX = e.clientX
      const posY = e.clientY

      cursorDot.style.left = `${posX}px`
      cursorDot.style.top = `${posY}px`

      // Add a slight delay to the cursor outline for a smooth effect
      setTimeout(() => {
        cursorOutline.style.left = `${posX}px`
        cursorOutline.style.top = `${posY}px`
      }, 50)
    })

    // Cursor effects for interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, .menu-toggle, .project-card, .social-link, .filter-btn, .tab-btn, .testimonial-control, .testimonial-arrow, .model-control",
    )

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursorOutline.style.width = "60px"
        cursorOutline.style.height = "60px"
        cursorOutline.style.borderColor = "var(--primary)"
        cursorDot.style.transform = "scale(1.5)"
      })

      el.addEventListener("mouseleave", () => {
        cursorOutline.style.width = "40px"
        cursorOutline.style.height = "40px"
        cursorOutline.style.borderColor = "var(--primary)"
        cursorDot.style.transform = "scale(1)"
      })
    })
  }

  // Header scroll effect
  const header = document.querySelector("header")
  const backToTop = document.querySelector(".back-to-top")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.classList.add("scrolled")
      backToTop.classList.add("active")
    } else {
      header.classList.remove("scrolled")
      backToTop.classList.remove("active")
    }
  })

  // Back to top button
  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Mobile Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle")
  const nav = document.querySelector("nav")

  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active")
    nav.classList.toggle("active")
  })

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll(".nav-link")

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active")
      nav.classList.remove("active")
    })
  })

  // Active navigation link based on scroll position
  const sections = document.querySelectorAll("section")

  window.addEventListener("scroll", () => {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (window.scrollY >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  })

  // Project Filters
  const filterBtns = document.querySelectorAll(".filter-btn")
  const projectCards = document.querySelectorAll(".project-card")

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      filterBtns.forEach((btn) => btn.classList.remove("active"))
      // Add active class to clicked button
      btn.classList.add("active")

      const filter = btn.getAttribute("data-filter")

      projectCards.forEach((card) => {
        if (filter === "all") {
          card.style.display = "block"
          setTimeout(() => {
            card.style.opacity = "1"
            card.style.transform = "translateY(0)"
          }, 100)
        } else if (card.getAttribute("data-category") === filter) {
          card.style.display = "block"
          setTimeout(() => {
            card.style.opacity = "1"
            card.style.transform = "translateY(0)"
          }, 100)
        } else {
          card.style.opacity = "0"
          card.style.transform = "translateY(20px)"
          setTimeout(() => {
            card.style.display = "none"
          }, 300)
        }
      })
    })
  })

  // Skills Tabs
  const tabBtns = document.querySelectorAll(".tab-btn")
  const tabContents = document.querySelectorAll(".tab-content")

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons and contents
      tabBtns.forEach((btn) => btn.classList.remove("active"))
      tabContents.forEach((content) => content.classList.remove("active"))

      // Add active class to clicked button
      btn.classList.add("active")

      // Show corresponding content
      const tabId = btn.getAttribute("data-tab")
      document.getElementById(tabId).classList.add("active")

      // Animate skill bars
      animateSkillBars()
    })
  })

  // Testimonial Slider
  const testimonialSlides = document.querySelectorAll(".testimonial-slide")
  const testimonialControls = document.querySelectorAll(".testimonial-control")
  const prevArrow = document.querySelector(".testimonial-arrow.prev")
  const nextArrow = document.querySelector(".testimonial-arrow.next")
  let currentSlide = 0

  function showSlide(index) {
    testimonialSlides.forEach((slide) => slide.classList.remove("active"))
    testimonialControls.forEach((control) => control.classList.remove("active"))

    testimonialSlides[index].classList.add("active")
    testimonialControls[index].classList.add("active")
    currentSlide = index
  }

  testimonialControls.forEach((control, index) => {
    control.addEventListener("click", () => {
      showSlide(index)
    })
  })

  prevArrow.addEventListener("click", () => {
    let index = currentSlide - 1
    if (index < 0) index = testimonialSlides.length - 1
    showSlide(index)
  })

  nextArrow.addEventListener("click", () => {
    let index = currentSlide + 1
    if (index >= testimonialSlides.length) index = 0
    showSlide(index)
  })

  // Auto-rotate testimonials
  setInterval(() => {
    let index = currentSlide + 1
    if (index >= testimonialSlides.length) index = 0
    showSlide(index)
  }, 5000)

  // Model Controls
  const modelControls = document.querySelectorAll(".model-control")
  let currentModel = 1

  modelControls.forEach((control) => {
    control.addEventListener("click", () => {
      currentModel = control.getAttribute("data-model")
      updateModel(currentModel)
    })
  })

  function updateModel(modelIndex) {
    // This function will be implemented in the 3D model showcase initialization
    console.log(`Switching to model ${modelIndex}`)
  }

  // Counter Animation
  function animateCounter() {
    const counters = document.querySelectorAll(".counter")

    counters.forEach((counter) => {
      const target = Number.parseInt(counter.getAttribute("data-target"))
      const duration = 2000 // 2 seconds
      const step = target / (duration / 16) // 60fps
      let current = 0

      const updateCounter = () => {
        current += step
        if (current < target) {
          counter.textContent = Math.floor(current)
          requestAnimationFrame(updateCounter)
        } else {
          counter.textContent = target
        }
      }

      updateCounter()
    })
  }

  // Animate skill bars
  function animateSkillBars() {
    const skillBars = document.querySelectorAll(".skill-progress")

    skillBars.forEach((bar) => {
      const width = bar.style.width
      bar.style.width = "0"

      setTimeout(() => {
        bar.style.width = width
      }, 100)
    })
  }

  // Check if device is mobile
  function isMobile() {
    return window.innerWidth <= 768 || 
           ('ontouchstart' in window) || 
           (navigator.maxTouchPoints > 0) || 
           (navigator.msMaxTouchPoints > 0);
  }

  // Initialize WebGL Background
  function initWebGLBackground() {
    const container = document.getElementById("webgl-background")
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // Limit pixel ratio for better performance
    container.appendChild(renderer.domElement)

    // Create shader material
    const vertexShader = `
      varying vec2 vUv;
      varying vec3 vPosition;
      
      void main() {
        vUv = uv;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `

    const fragmentShader = `
      uniform float time;
      uniform vec3 color1;
      uniform vec3 color2;
      uniform vec3 color3;
      varying vec2 vUv;
      varying vec3 vPosition;
      
      void main() {
        float noise = sin(vUv.x * 10.0 + time) * sin(vUv.y * 10.0 + time) * 0.5 + 0.5;
        float noise2 = cos(vUv.x * 15.0 - time) * cos(vUv.y * 15.0 - time) * 0.5 + 0.5;
        
        vec3 color = mix(color1, color2, noise);
        color = mix(color, color3, noise2);
        
        gl_FragColor = vec4(color, 0.3);
      }
    `

    const uniforms = {
      time: { value: 0 },
      color1: { value: new THREE.Color(0x6c63ff) },
      color2: { value: new THREE.Color(0xf72585) },
      color3: { value: new THREE.Color(0x4ecdc4) },
    }

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
    })

    // Create a plane that covers the screen
    const geometry = new THREE.PlaneGeometry(50, 50, 32, 32)
    const plane = new THREE.Mesh(geometry, material)
    scene.add(plane)

    camera.position.z = 5

    // Handle window resize
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    })

    // Animation loop
    function animate() {
      requestAnimationFrame(animate)
      uniforms.time.value += 0.01
      renderer.render(scene, camera)
    }

    animate()
  }

  // Initialize particles background
  function initParticlesBackground() {
    const particlesContainer = document.getElementById("particles-background")
    if (!particlesContainer) return

    // Adjust particle count based on device
    const particlesCount = isMobile() ? 50 : 100

    for (let i = 0; i < particlesCount; i++) {
      const particle = document.createElement("div")
      particle.classList.add("particle")

      // Random size
      const size = Math.random() * 5 + 1
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`

      // Random position
      particle.style.left = `${Math.random() * 100}%`
      particle.style.top = `${Math.random() * 100}%`

      // Random color
      const colors = ["#6c63ff", "#ff6b6b", "#4ecdc4", "#ffd166", "#f72585", "#7209b7", "#3a86ff"]
      const color = colors[Math.floor(Math.random() * colors.length)]
      particle.style.backgroundColor = color
      particle.style.boxShadow = `0 0 ${size * 2}px ${color}`

      // Random animation duration and delay
      const duration = Math.random() * 20 + 10
      const delay = Math.random() * 5
      particle.style.animation = `float ${duration}s ${delay}s infinite linear`

      particlesContainer.appendChild(particle)
    }
  }

  // Initialize Three.js for hero section
  function initHeroCanvas() {
    const canvas = document.getElementById("hero-canvas")
    if (!canvas) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // Limit pixel ratio for better performance

    // Create particles
    const particlesCount = isMobile() ? 2000 : 5000 // Reduce particles on mobile
    const particlesGeometry = new THREE.BufferGeometry()
    const posArray = new Float32Array(particlesCount * 3)
    const colorsArray = new Float32Array(particlesCount * 3)

    const colors = [
      new THREE.Color(0x6c63ff), // primary
      new THREE.Color(0xff6b6b), // secondary
      new THREE.Color(0x4ecdc4), // accent
      new THREE.Color(0xffd166), // accent2
      new THREE.Color(0xf72585), // accent3
      new THREE.Color(0x7209b7), // accent4
      new THREE.Color(0x3a86ff), // accent5
    ]

    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Position
      posArray[i] = (Math.random() - 0.5) * 15
      posArray[i + 1] = (Math.random() - 0.5) * 15
      posArray[i + 2] = (Math.random() - 0.5) * 15

      // Color
      const color = colors[Math.floor(Math.random() * colors.length)]
      colorsArray[i] = color.r
      colorsArray[i + 1] = color.g
      colorsArray[i + 2] = color.b
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))
    particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colorsArray, 3))

    // Material
    const particlesMaterial = new THREE.PointsMaterial({
      size: isMobile() ? 0.05 : 0.03, // Larger size on mobile for better visibility
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
    })

    // Mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    // Position camera
    camera.position.z = 5

    // Mouse movement effect
    let mouseX = 0
    let mouseY = 0

    function onDocumentMouseMove(event) {
      mouseX = (event.clientX - window.innerWidth / 2) / 100
      mouseY = (event.clientY - window.innerHeight / 2) / 100
    }

    function onTouchMove(event) {
      if (event.touches.length > 0) {
        mouseX = (event.touches[0].clientX - window.innerWidth / 2) / 50
        mouseY = (event.touches[0].clientY - window.innerHeight / 2) / 50
      }
    }

    document.addEventListener("mousemove", onDocumentMouseMove)
    document.addEventListener("touchmove", onTouchMove, { passive: true })

    // Handle window resize
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    })

    // Animation loop
    function animate() {
      requestAnimationFrame(animate)

      particlesMesh.rotation.x += 0.0005
      particlesMesh.rotation.y += 0.0005

      // Responsive to mouse/touch movement
      particlesMesh.rotation.x += mouseY * 0.0005
      particlesMesh.rotation.y += mouseX * 0.0005

      renderer.render(scene, camera)
    }

    animate()
  }

  // Initialize 3D Text in Hero Section
  function init3DText() {
    const container = document.getElementById("hero-3d-text")
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // Limit pixel ratio for better performance
    container.appendChild(renderer.domElement)

    // Load font
    const fontLoader = new THREE.FontLoader()
    fontLoader.load("https://threejs.org/examples/fonts/helvetiker_bold.typeface.json", (font) => {
      // Adjust text size for mobile
      const textSize = isMobile() ? 0.3 : 0.5
      const textHeight = isMobile() ? 0.05 : 0.1
      const bevelSize = isMobile() ? 0.01 : 0.02
      
      const textGeometry = new THREE.TextGeometry("CREATIVE DEVELOPER", {
        font: font,
        size: textSize,
        height: textHeight,
        curveSegments: isMobile() ? 8 : 12, // Reduce segments on mobile
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: bevelSize,
        bevelOffset: 0,
        bevelSegments: isMobile() ? 3 : 5,
      })

      textGeometry.center()

      const materials = [
        new THREE.MeshPhongMaterial({ color: 0x6c63ff, emissive: 0x6c63ff, emissiveIntensity: 0.2 }), // front
        new THREE.MeshPhongMaterial({ color: 0x4ecdc4, emissive: 0x4ecdc4, emissiveIntensity: 0.2 }), // side
      ]

      const textMesh = new THREE.Mesh(textGeometry, materials)
      scene.add(textMesh)

      // Add lights
      const pointLight = new THREE.PointLight(0xffffff, 1)
      pointLight.position.set(5, 5, 5)
      scene.add(pointLight)

      const pointLight2 = new THREE.PointLight(0xff6b6b, 1)
      pointLight2.position.set(-5, -5, 5)
      scene.add(pointLight2)

      camera.position.z = 3

      // Handle window resize
      window.addEventListener("resize", () => {
        if (container.clientWidth > 0 && container.clientHeight > 0) {
          renderer.setSize(container.clientWidth, container.clientHeight)
          camera.aspect = container.clientWidth / container.clientHeight
          camera.updateProjectionMatrix()
        }
      })

      // Animation
      function animate() {
        requestAnimationFrame(animate)

        textMesh.rotation.y += 0.01

        renderer.render(scene, camera)
      }

      animate()
    })
  }

  // Initialize About 3D Scene
  function initAbout3DScene() {
    const container = document.getElementById("about-3d-scene")
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    // Make sure the renderer is visible on mobile
    const size = isMobile() ? 200 : 300
    renderer.setSize(size, size)
    container.appendChild(renderer.domElement)

    // Create a DNA-like double helix
    const helixGroup = new THREE.Group()
    scene.add(helixGroup)

    // Adjust complexity based on device
    const sphereGeometry = new THREE.SphereGeometry(0.2, isMobile() ? 8 : 16, isMobile() ? 8 : 16)
    const colors = [0x6c63ff, 0xff6b6b, 0x4ecdc4, 0xffd166, 0xf72585]

    // Create two helices
    for (let i = 0; i < 2; i++) {
      const helix = new THREE.Group()

      // Create spheres along the helix
      for (let j = 0; j < 20; j++) {
        const material = new THREE.MeshPhongMaterial({
          color: colors[j % colors.length],
          emissive: colors[j % colors.length],
          emissiveIntensity: 0.2,
          shininess: 100,
        })

        const sphere = new THREE.Mesh(sphereGeometry, material)

        // Position spheres in a helix pattern
        const angle = j * 0.5
        const radius = 1.5
        sphere.position.x = Math.cos(angle + i * Math.PI) * radius
        sphere.position.y = j * 0.2 - 2
        sphere.position.z = Math.sin(angle + i * Math.PI) * radius

        helix.add(sphere)
      }

      helixGroup.add(helix)
    }

    // Add connecting lines between the helices
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.5, transparent: true })

    for (let j = 0; j < 20; j += 2) {
      const points = []
      const angle1 = j * 0.5
      const angle2 = j * 0.5 + Math.PI
      const radius = 1.5
      const y = j * 0.2 - 2

      points.push(new THREE.Vector3(Math.cos(angle1) * radius, y, Math.sin(angle1) * radius))

      points.push(new THREE.Vector3(Math.cos(angle2) * radius, y, Math.sin(angle2) * radius))

      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
      const line = new THREE.Line(lineGeometry, lineMaterial)
      helixGroup.add(line)
    }

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0x6c63ff, 1)
    pointLight.position.set(5, 5, 5)
    scene.add(pointLight)

    camera.position.z = 5

    // Animation
    function animate() {
      requestAnimationFrame(animate)
      helixGroup.rotation.y += 0.01
      renderer.render(scene, camera)
    }

    animate()
  }

  // Initialize Projects 3D Background
  function initProjects3DBackground() {
    const container = document.getElementById("projects-3d-background")
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // Limit pixel ratio for better performance
    container.appendChild(renderer.domElement)

    // Create a grid of cubes
    const cubeSize = 0.5
    const gap = 1
    const gridSize = isMobile() ? 6 : 10 // Smaller grid on mobile
    const cubes = []

    for (let x = -gridSize / 2; x < gridSize / 2; x++) {
      for (let z = -gridSize / 2; z < gridSize / 2; z++) {
        const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize)

        // Create a unique material for each cube with a random color
        const colors = [0x6c63ff, 0xff6b6b, 0x4ecdc4, 0xffd166, 0xf72585, 0x7209b7, 0x3a86ff]
        const color = colors[Math.floor(Math.random() * colors.length)]

        const material = new THREE.MeshPhongMaterial({
          color: color,
          transparent: true,
          opacity: 0.7,
          shininess: 100,
        })

        const cube = new THREE.Mesh(geometry, material)

        // Position the cube in the grid
        cube.position.x = x * gap
        cube.position.z = z * gap
        cube.position.y = -5 // Position below the content

        // Store original position for animation
        cube.userData.originalY = cube.position.y
        cube.userData.randomFactor = Math.random() * 2 + 1

        scene.add(cube)
        cubes.push(cube)
      }
    }

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
    scene.add(ambientLight)

    const pointLight1 = new THREE.PointLight(0x6c63ff, 1)
    pointLight1.position.set(5, 5, 5)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0xff6b6b, 1)
    pointLight2.position.set(-5, 5, -5)
    scene.add(pointLight2)

    camera.position.y = 2
    camera.position.z = 10
    camera.lookAt(0, 0, 0)

    // Handle window resize
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    })

    // Animation
    function animate() {
      requestAnimationFrame(animate)

      // Animate cubes
      const time = Date.now() * 0.001

      cubes.forEach((cube) => {
        const factor = cube.userData.randomFactor
        cube.position.y = cube.userData.originalY + Math.sin(time * factor) * 0.3
        cube.rotation.x += 0.01 / factor
        cube.rotation.y += 0.01 / factor
      })

      renderer.render(scene, camera)
    }

    animate()
  }

  // Initialize Testimonials 3D Background
  function initTestimonials3DBackground() {
    const container = document.getElementById("testimonials-3d-background")
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // Limit pixel ratio for better performance
    container.appendChild(renderer.domElement)

    // Create particles with custom shader
    const particlesCount = isMobile() ? 500 : 1000 // Reduce particles on mobile
    const positions = new Float32Array(particlesCount * 3)
    const sizes = new Float32Array(particlesCount)

    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
      sizes[i] = Math.random() * 2 + 0.5
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1))

    const vertexShader = `
      attribute float size;
      varying vec3 vColor;
      
      void main() {
        vColor = vec3(0.5 + position.x / 20.0, 0.5 + position.y / 20.0, 0.8);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `

    const fragmentShader = `
      varying vec3 vColor;
      
      void main() {
        if (length(gl_PointCoord - vec2(0.5, 0.5)) > 0.5) discard;
        gl_FragColor = vec4(vColor, 1.0);
      }
    `

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    camera.position.z = 10

    // Handle window resize
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    })

    // Animation
    function animate() {
      requestAnimationFrame(animate)

      particles.rotation.x += 0.0005
      particles.rotation.y += 0.001

      renderer.render(scene, camera)
    }

    animate()
  }

  // Initialize Three.js for skills section
  function initSkillsCanvas() {
    const canvas = document.getElementById("skills-canvas")
    if (!canvas) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    })

    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // Limit pixel ratio for better performance

    // Create a sphere with skills texture
    const geometry = new THREE.SphereGeometry(2, isMobile() ? 32 : 64, isMobile() ? 32 : 64) // Reduce complexity on mobile

    // Create a dynamic canvas texture for skills
    const textureCanvas = document.createElement("canvas")
    textureCanvas.width = isMobile() ? 512 : 1024 // Smaller texture on mobile
    textureCanvas.height = isMobile() ? 512 : 1024
    const context = textureCanvas.getContext("2d")

    // Fill background
    context.fillStyle = "#0a0a1a"
    context.fillRect(0, 0, textureCanvas.width, textureCanvas.height)

    // Add skills text
    const skills = [
      { text: "HTML5", color: "#ff6b6b" },
      { text: "CSS3", color: "#4ecdc4" },
      { text: "JavaScript", color: "#ffd166" },
      { text: "Three.js", color: "#6c63ff" },
      { text: "WebGL", color: "#f72585" },
      { text: "GSAP", color: "#4ecdc4" },
      { text: "React", color: "#6c63ff" },
      { text: "Vue.js", color: "#4ecdc4" },
      { text: "Node.js", color: "#ffd166" },
      { text: "Express", color: "#ff6b6b" },
      { text: "MongoDB", color: "#4ecdc4" },
      { text: "UI/UX", color: "#f72585" },
      { text: "Figma", color: "#6c63ff" },
      { text: "Photoshop", color: "#4ecdc4" },
      { text: "Illustrator", color: "#ff6b6b" },
      { text: "3D Modeling", color: "#ffd166" },
      { text: "Animation", color: "#f72585" },
      { text: "GLSL", color: "#6c63ff" },
      { text: "Blender", color: "#4ecdc4" },
      { text: "Git", color: "#ff6b6b" },
    ]

    // Use fewer skills on mobile
    const displaySkills = isMobile() ? skills.slice(0, 12) : skills

    displaySkills.forEach((skill, i) => {
      context.font = `bold ${isMobile() ? 24 : 32}px Poppins` // Smaller font on mobile
      context.fillStyle = skill.color

      const x = Math.random() * (textureCanvas.width - 200) + 100
      const y = Math.random() * (textureCanvas.height - 100) + 50

      context.fillText(skill.text, x, y)

      // Add glow effect
      context.shadowColor = skill.color
      context.shadowBlur = 15
      context.fillText(skill.text, x, y)
      context.shadowBlur = 0
    })

    // Create texture from canvas
    const texture = new THREE.CanvasTexture(textureCanvas)

    // Create material with the texture
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.7,
      metalness: 0.3,
      emissive: 0x111111,
      emissiveIntensity: 0.5,
    })

    // Create mesh
    const sphere = new THREE.Mesh(geometry, material)
    scene.add(sphere)

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    // Add point lights with different colors
    const pointLight1 = new THREE.PointLight(0x6c63ff, 1)
    pointLight1.position.set(5, 5, 5)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0xff6b6b, 1)
    pointLight2.position.set(-5, -5, 5)
    scene.add(pointLight2)

    const pointLight3 = new THREE.PointLight(0x4ecdc4, 1)
    pointLight3.position.set(0, 5, -5)
    scene.add(pointLight3)

    // Position camera
    camera.position.z = 5

    // Animation loop
    function animate() {
      requestAnimationFrame(animate)

      sphere.rotation.y += 0.003
      sphere.rotation.x += 0.001

      renderer.render(scene, camera)
    }

    animate()

    // Handle window resize
    window.addEventListener("resize", () => {
      if (canvas.clientWidth > 0 && canvas.clientHeight > 0) {
        camera.aspect = canvas.clientWidth / canvas.clientHeight
        camera.updateProjectionMatrix()
        renderer.setSize(canvas.clientWidth, canvas.clientHeight)
      }
    })

    // Make the sphere interactive
    function handleInteraction(x, y) {
      const rect = canvas.getBoundingClientRect()
      const normalizedX = ((x - rect.left) / canvas.clientWidth) * 2 - 1
      const normalizedY = -((y - rect.top) / canvas.clientHeight) * 2 + 1
      
      // Rotate the sphere based on interaction position
      gsap.to(sphere.rotation, {
        x: normalizedY * 0.5,
        y: normalizedX * 0.5,
        duration: 1,
      })
    }
    
    // Mouse interaction
    canvas.addEventListener("mousemove", (event) => {
      handleInteraction(event.clientX, event.clientY)
    })

    // Touch support for mobile
    canvas.addEventListener("touchmove", (event) => {
      event.preventDefault()
      if (event.touches.length > 0) {
        handleInteraction(event.touches[0].clientX, event.touches[0].clientY)
      }
    }, { passive: false })
  }

  // Initialize Three.js for 3D model showcase
  function initModelCanvas() {
    const canvas = document.getElementById("model-canvas")
    if (!canvas) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // Limit pixel ratio for better performance

    // Create models container to switch between models
    const modelsContainer = new THREE.Group()
    scene.add(modelsContainer)

    // Model 1: Torus Knot
    const model1 = new THREE.Group()
    // Reduce geometry complexity on mobile
    const geometry1 = new THREE.TorusKnotGeometry(
      1.5, 
      0.5, 
      isMobile() ? 50 : 100, 
      isMobile() ? 8 : 16
    )
    const material1 = new THREE.MeshStandardMaterial({
      color: 0x6c63ff,
      roughness: 0.3,
      metalness: 0.7,
      emissive: 0x6c63ff,
      emissiveIntensity: 0.2,
    })
    const torusKnot = new THREE.Mesh(geometry1, material1)
    model1.add(torusKnot)

    // Add smaller floating objects to model 1
    const smallObjects = []
    const geometries = [
      new THREE.IcosahedronGeometry(0.3, 0),
      new THREE.OctahedronGeometry(0.3, 0),
      new THREE.TetrahedronGeometry(0.3, 0),
      new THREE.DodecahedronGeometry(0.3, 0),
      new THREE.TorusGeometry(0.2, 0.1, 16, 32),
    ]

    const colors = [0xff6b6b, 0x4ecdc4, 0xffd166, 0xf72585, 0x7209b7, 0x3a86ff]

    // Reduce number of objects on mobile
    const objectCount = isMobile() ? 15 : 30
    
    for (let i = 0; i < objectCount; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)]
      const material = new THREE.MeshStandardMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        roughness: 0.3,
        metalness: 0.7,
        emissive: 0x111111,
        emissiveIntensity: 0.5,
      })

      const object = new THREE.Mesh(geometry, material)

      // Position randomly around the torus knot
      const angle = Math.random() * Math.PI * 2
      const radius = 3 + Math.random() * 3
      object.position.x = Math.cos(angle) * radius
      object.position.y = (Math.random() - 0.5) * 5
      object.position.z = Math.sin(angle) * radius

      // Store initial position for animation
      object.userData.initialPosition = {
        x: object.position.x,
        y: object.position.y,
        z: object.position.z,
      }

      // Random rotation speed
      object.userData.rotationSpeed = {
        x: (Math.random() - 0.5) * 0.03,
        y: (Math.random() - 0.5) * 0.03,
        z: (Math.random() - 0.5) * 0.03,
      }

      model1.add(object)
      smallObjects.push(object)
    }

    // Model 2: Galaxy
    const model2 = new THREE.Group()
    // Reduce particle count on mobile
    const galaxyParticlesCount = isMobile() ? 2000 : 5000
    const galaxyGeometry = new THREE.BufferGeometry()
    const galaxyPositions = new Float32Array(galaxyParticlesCount * 3)
    const galaxyColors = new Float32Array(galaxyParticlesCount * 3)

    for (let i = 0; i < galaxyParticlesCount; i++) {
      // Create a spiral galaxy
      const radius = Math.random() * 5
      const spinAngle = radius * 5
      const branchAngle = ((i % 3) * Math.PI * 2) / 3

      const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3
      const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3
      const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3

      galaxyPositions[i * 3] = Math.cos(branchAngle + spinAngle) * radius + randomX
      galaxyPositions[i * 3 + 1] = randomY
      galaxyPositions[i * 3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

      // Color based on distance from center
      const colorIndex = i % colors.length
      const color = new THREE.Color(colors[colorIndex])
      galaxyColors[i * 3] = color.r
      galaxyColors[i * 3 + 1] = color.g
      galaxyColors[i * 3 + 2] = color.b
    }

    galaxyGeometry.setAttribute("position", new THREE.BufferAttribute(galaxyPositions, 3))
    galaxyGeometry.setAttribute("color", new THREE.BufferAttribute(galaxyColors, 3))

    const galaxyMaterial = new THREE.PointsMaterial({
      size: isMobile() ? 0.08 : 0.05, // Larger size on mobile for better visibility
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    })

    const galaxy = new THREE.Points(galaxyGeometry, galaxyMaterial)
    model2.add(galaxy)

    // Model 3: Abstract Sculpture
    const model3 = new THREE.Group()

    // Create base
    const baseGeometry = new THREE.CylinderGeometry(2, 2, 0.5, isMobile() ? 16 : 32)
    const baseMaterial = new THREE.MeshStandardMaterial({
      color: 0x4ecdc4,
      metalness: 0.8,
      roughness: 0.2,
    })
    const base = new THREE.Mesh(baseGeometry, baseMaterial)
    base.position.y = -2
    model3.add(base)

    // Create abstract shapes
    const shapeCount = isMobile() ? 6 : 10 // Fewer shapes on mobile
    const abstractShapes = []

    for (let i = 0; i < shapeCount; i++) {
      // Choose a random geometry
      let shapeGeometry
      const shapeType = Math.floor(Math.random() * 5)

      switch (shapeType) {
        case 0:
          shapeGeometry = new THREE.TorusGeometry(0.5, 0.2, isMobile() ? 8 : 16, isMobile() ? 16 : 32)
          break
        case 1:
          shapeGeometry = new THREE.ConeGeometry(0.5, 1, isMobile() ? 8 : 16)
          break
        case 2:
          shapeGeometry = new THREE.OctahedronGeometry(0.6)
          break
        case 3:
          shapeGeometry = new THREE.BoxGeometry(0.7, 0.7, 0.7)
          break
        case 4:
          shapeGeometry = new THREE.SphereGeometry(0.5, isMobile() ? 8 : 16, isMobile() ? 8 : 16)
          break
      }

      // Create material with random color
      const color = colors[Math.floor(Math.random() * colors.length)]
      const shapeMaterial = new THREE.MeshStandardMaterial({
        color: color,
        metalness: 0.7,
        roughness: 0.3,
        emissive: color,
        emissiveIntensity: 0.2,
      })

      const shape = new THREE.Mesh(shapeGeometry, shapeMaterial)

      // Position randomly but artistically
      const angle = (i / shapeCount) * Math.PI * 2
      const height = i * 0.4 - 1
      const radius = 1.2

      shape.position.x = Math.cos(angle) * radius
      shape.position.y = height
      shape.position.z = Math.sin(angle) * radius

      // Random rotation
      shape.rotation.x = Math.random() * Math.PI
      shape.rotation.y = Math.random() * Math.PI
      shape.rotation.z = Math.random() * Math.PI

      // Store for animation
      shape.userData.initialPosition = { ...shape.position }
      shape.userData.initialRotation = { ...shape.rotation }
      shape.userData.animationSpeed = Math.random() * 0.01 + 0.005

      model3.add(shape)
      abstractShapes.push(shape)
    }

    // Add all models to container
    modelsContainer.add(model1)
    modelsContainer.add(model2)
    modelsContainer.add(model3)

    // Hide models 2 and 3 initially
    model2.visible = false
    model3.visible = false

    // Function to switch models
    function switchToModel(modelIndex) {
      model1.visible = modelIndex === "1"
      model2.visible = modelIndex === "2"
      model3.visible = modelIndex === "3"
    }

    // Connect to model controls
    const modelControls = document.querySelectorAll(".model-control")
    modelControls.forEach((control) => {
      control.addEventListener("click", () => {
        const modelIndex = control.getAttribute("data-model")
        switchToModel(modelIndex)
      })
    })

    // Update model function for external access
    window.updateModel = switchToModel

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const pointLight1 = new THREE.PointLight(0x6c63ff, 1)
    pointLight1.position.set(5, 5, 5)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0xff6b6b, 1)
    pointLight2.position.set(-5, -5, 5)
    scene.add(pointLight2)

    const pointLight3 = new THREE.PointLight(0x4ecdc4, 1)
    pointLight3.position.set(0, 5, -5)
    scene.add(pointLight3)

    // Position camera
    camera.position.z = isMobile() ? 10 : 8 // Move camera back on mobile for better view

    // Mouse/touch movement effect
    let mouseX = 0
    let mouseY = 0

    function onDocumentMouseMove(event) {
      mouseX = (event.clientX - window.innerWidth / 2) / 100
      mouseY = (event.clientY - window.innerHeight / 2) / 100
    }

    function onTouchMove(event) {
      if (event.touches.length > 0) {
        mouseX = (event.touches[0].clientX - window.innerWidth / 2) / 50
        mouseY = (event.touches[0].clientY - window.innerHeight / 2) / 50
      }
    }

    document.addEventListener("mousemove", onDocumentMouseMove)
    document.addEventListener("touchmove", onTouchMove, { passive: true })

    // Handle window resize
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    })

    // Animation loop
    function animate() {
      requestAnimationFrame(animate)

      // Model 1 animations
      torusKnot.rotation.x += 0.01
      torusKnot.rotation.y += 0.01

      smallObjects.forEach((obj) => {
        // Rotate each object
        obj.rotation.x += obj.userData.rotationSpeed.x
        obj.rotation.y += obj.userData.rotationSpeed.y
        obj.rotation.z += obj.userData.rotationSpeed.z

        // Float up and down
        const time = Date.now() * 0.001
        const initialPos = obj.userData.initialPosition
        obj.position.y = initialPos.y + Math.sin(time + initialPos.x) * 0.5
      })

      // Model 2 animations
      galaxy.rotation.y += 0.002

      // Model 3 animations
      if (model3.visible) {
        abstractShapes.forEach((shape) => {
          const time = Date.now() * 0.001
          const speed = shape.userData.animationSpeed

          // Gentle floating motion
          shape.position.y = shape.userData.initialPosition.y + Math.sin(time * speed * 2) * 0.2

          // Slow rotation
          shape.rotation.x = shape.userData.initialRotation.x + time * speed
          shape.rotation.y = shape.userData.initialRotation.y + time * speed * 1.5
        })
      }

      // Responsive to mouse/touch movement
      modelsContainer.rotation.y += mouseX * 0.01
      modelsContainer.rotation.x += mouseY * 0.01

      renderer.render(scene, camera)
    }

    animate()
  }

  // Initialize 3D elements for project cards
  function initProjectCanvases() {
    const canvases = document.querySelectorAll(".project-canvas")

    canvases.forEach((canvas, index) => {
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000)
      const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true,
      })

      renderer.setSize(canvas.clientWidth, canvas.clientHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // Limit pixel ratio for better performance

      // Create different geometry for each project
      let geometry
      const colorIndex = index % 6
      const colors = [0x6c63ff, 0xff6b6b, 0x4ecdc4, 0xffd166, 0xf72585, 0x3a86ff]

      // Reduce geometry complexity on mobile
      switch (index % 5) {
        case 0:
          geometry = new THREE.TorusKnotGeometry(0.8, 0.3, isMobile() ? 50 : 100, isMobile() ? 8 : 16)
          break
        case 1:
          geometry = new THREE.IcosahedronGeometry(1, 0)
          break
        case 2:
          geometry = new THREE.OctahedronGeometry(1, 0)
          break
        case 3:
          geometry = new THREE.TorusGeometry(0.7, 0.3, isMobile() ? 8 : 16, isMobile() ? 16 : 32)
          break
        case 4:
          geometry = new THREE.DodecahedronGeometry(1, 0)
          break
      }

      const material = new THREE.MeshStandardMaterial({
        color: colors[colorIndex],
        roughness: 0.3,
        metalness: 0.7,
        emissive: colors[colorIndex],
        emissiveIntensity: 0.2,
      })

      const mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)

      // Add light
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
      scene.add(ambientLight)

      const pointLight = new THREE.PointLight(colors[colorIndex], 1)
      pointLight.position.set(5, 5, 5)
      scene.add(pointLight)

      camera.position.z = 3

      // Handle window resize
      window.addEventListener("resize", () => {
        if (canvas.clientWidth > 0 && canvas.clientHeight > 0) {
          renderer.setSize(canvas.clientWidth, canvas.clientHeight)
          camera.aspect = canvas.clientWidth / canvas.clientHeight
          camera.updateProjectionMatrix()
        }
      })

      // Animation
      function animate() {
        requestAnimationFrame(animate)

        mesh.rotation.x += 0.01
        mesh.rotation.y += 0.01

        renderer.render(scene, camera)
      }

      animate()
    })
  }

  // Initialize 3D element for contact section
  function initContact3D() {
    const container = document.getElementById("contact-3d-element")
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    // Make sure the renderer is visible on mobile
    const size = isMobile() ? 200 : 300
    renderer.setSize(size, size)
    container.appendChild(renderer.domElement)

    // Create a spiral of small spheres
    const spheres = []
    const sphereCount = isMobile() ? 30 : 50 // Fewer spheres on mobile

    for (let i = 0; i < sphereCount; i++) {
      const geometry = new THREE.SphereGeometry(0.2, isMobile() ? 8 : 16, isMobile() ? 8 : 16)

      // Gradient of colors
      const t = i / sphereCount
      const color = new THREE.Color()
      color.setHSL(t, 0.8, 0.5)

      const material = new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.3,
        roughness: 0.3,
        metalness: 0.7,
      })

      const sphere = new THREE.Mesh(geometry, material)

      // Position in a spiral
      const angle = 0.2 * i
      const radius = 0.05 * i
      sphere.position.x = radius * Math.cos(angle)
      sphere.position.y = 0.1 * i - 2
      sphere.position.z = radius * Math.sin(angle)

      scene.add(sphere)
      spheres.push(sphere)
    }

    // Add light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0x6c63ff, 1)
    pointLight.position.set(5, 5, 5)
    scene.add(pointLight)

    camera.position.z = 5

    // Animation
    function animate() {
      requestAnimationFrame(animate)

      // Rotate the entire scene
      scene.rotation.y += 0.01

      // Animate each sphere
      spheres.forEach((sphere, i) => {
        const time = Date.now() * 0.001
        sphere.position.y = 0.1 * i - 2 + Math.sin(time + i * 0.1) * 0.1
      })

      renderer.render(scene, camera)
    }

    animate()
  }

  // Form validation
  const contactForm = document.getElementById("contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Simple form validation
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const subject = document.getElementById("subject").value
      const message = document.getElementById("message").value

      if (name && email && subject && message) {
        // Here you would typically send the form data to a server
        alert("Thank you for your message! I will get back to you soon.")
        contactForm.reset()
      } else {
        alert("Please fill in all fields.")
      }
    })
  }

  // Initialize GSAP animations
  function startAnimations() {
    gsap.registerPlugin(ScrollTrigger)

    // Hero section animations
    gsap.from(".hero-subtitle", {
      y: 50,
      opacity: 0,
      duration: 1,
      delay: 0.2,
    })

    gsap.from(".hero-title", {
      y: 50,
      opacity: 0,
      duration: 1,
      delay: 0.5,
    })

    gsap.from(".hero-description", {
      y: 50,
      opacity: 0,
      duration: 1,
      delay: 0.8,
    })

    gsap.from(".cta-buttons", {
      y: 50,
      opacity: 0,
      duration: 1,
      delay: 1.1,
    })

    gsap.from(".scroll-indicator", {
      y: 50,
      opacity: 0,
      duration: 1,
      delay: 1.4,
    })

    // Scroll animations for sections
    gsap.utils.toArray(".section-header").forEach((header) => {
      gsap.from(header, {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: header,
          start: "top 80%",
        },
      })
    })

    // About section animations
    gsap.from(".about-image-wrapper", {
      x: -100,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: ".about-content",
        start: "top 80%",
      },
    })

    gsap.from(".experience-badge", {
      scale: 0,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      scrollTrigger: {
        trigger: ".about-content",
        start: "top 80%",
      },
    })

    gsap.from(".about-text", {
      x: 100,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: ".about-content",
        start: "top 80%",
      },
    })

    // Animate counters when they come into view
    ScrollTrigger.create({
      trigger: ".about-stats",
      start: "top 80%",
      onEnter: animateCounter,
    })

    // Project cards animations
    gsap.utils.toArray(".project-card").forEach((card, i) => {
      gsap.from(card, {
        y: 100,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.1,
        scrollTrigger: {
          trigger: ".projects-grid",
          start: "top 80%",
        },
      })
    })

    // Skills animations
    animateSkillBars()
    ScrollTrigger.create({
      trigger: ".skills-content",
      start: "top 80%",
      onEnter: animateSkillBars,
    })

    // Testimonials animations
    gsap.from(".testimonial-card", {
      y: 50,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: ".testimonials-container",
        start: "top 80%",
      },
    })

    // Contact section animations
    gsap.utils.toArray(".contact-card").forEach((card, i) => {
      gsap.from(card, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.2,
        scrollTrigger: {
          trigger: ".contact-container",
          start: "top 80%",
        },
      })
    })

    gsap.from(".contact-form", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: ".contact-container",
        start: "top 80%",
      },
    })
  }

  // Initialize all components
  const THREE = window.THREE
  const gsap = window.gsap
  const ScrollTrigger = window.ScrollTrigger

  // Add CSS for particles
  const style = document.createElement("style")
  style.textContent = `
    .particle {
      position: absolute;
      border-radius: 50%;
      pointer-events: none;
      opacity: 0.6;
    }
    
    @keyframes float {
      0% { transform: translateY(0) translateX(0); }
      25% { transform: translateY(-20px) translateX(10px); }
      50% { transform: translateY(0) translateX(20px); }
      75% { transform: translateY(20px) translateX(10px); }
      100% { transform: translateY(0) translateX(0); }
    }
  `
  document.head.appendChild(style)

  // Initialize all Three.js canvases and effects
  initWebGLBackground()
  initParticlesBackground()
  initHeroCanvas()
  init3DText()
  initAbout3DScene()
  initProjects3DBackground()
  initTestimonials3DBackground()
  initSkillsCanvas()
  initModelCanvas()
  initProjectCanvases()
  initContact3D()

  // Apply tilt effect to project cards
  const VanillaTilt = window.VanillaTilt // Declare VanillaTilt
  if (VanillaTilt) {
    VanillaTilt.init(document.querySelectorAll(".project-card"), {
      max: isMobile() ? 5 : 10, // Reduce tilt effect on mobile
      speed: 300,
      glare: true,
      "max-glare": 0.3,
    })
  }
})
