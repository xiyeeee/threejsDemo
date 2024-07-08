#### threejs

​	引用: https://zhuanlan.zhihu.com/p/337460642

* Three.js是基于原生WebGL封装运行的三维引擎

* WebGL是一种3D绘图标准，这种绘图技术标准允许把JavaScript和OpenGL ES 2.0结合在一起，通过增加OpenGL ES 2.0的一个JavaScript绑定，**WebGL可以为HTML5 Canvas提供硬件3D加速渲染（部分计算GPU）**，这样Web开发人员就可以借助系统显卡来在浏览器里更流畅地展示3D场景和模型了，还能创建复杂的导航和数据视觉化。显然，WebGL技术标准免去了开发网页专用渲染插件的麻烦，可被用于创建具有复杂3D结构的网站页面，甚至可以用来设计3D网页游戏等等。

  总结一下，**WebGL的本质 —— JavaScript操作OpenGL接口**

* OpenGL（Open Graphics Library） 一种图形应用程序编程接口规范(Application Programming Interface，API)。它是一种可以对图形硬件设备特性进行访问的软件库，OpenGL被设计为一个现代化的、硬件无关的接口，因此我们可以在不考虑计算机操作系统或窗口系统的前提下，在多种不同的图形硬件系统上，完全通过软件的方式实现OpenGL的接口

* 应用场景: 智慧城市 、 微信小游戏 、 可视化 、商城 、 自动驾驶...

#### threejs官网

*  https://threejs.org
*  https://threejs.org/editor


#### 开始

- npm init vite@latest
- npm install --save three

* ##### 场景（scene）、相机（camera）和渲染器（renderer）

  ###### Scene()

  * add()  添加模型等

    

  ###### PerspectiveCamera()透视相机

  * https://zhuanlan.zhihu.com/p/510877492

  * fov: Field of View—视场角度  ,fov越大, 渲染视野范围越大
  * aspect — 摄像机视锥体长宽比
  * near — 摄像机视锥体近端面
  * far — 摄像机视锥体远端面

  

  

  ###### WebGLRenderer()

  * setSize(window.innerWidth, window.innerHeight)
  * 画布domElement
  * 渲染render(scene, camera)

* ##### 物体geometry、材质MeshBasicMaterial 、 网格Mesh

  * BoxGeometry(width, height ,depth )
  * MeshBasicMaterial({ color: 0x00ff00 })
    *  color
    * 线框 : wireframe
  * Mesh(geometry, material)
    * position
    * rotation

* ##### 请求动画帧

  * requestAnimationFrame()

#### 坐标辅助器和轨道控制器

* ##### AxesHelper

* ##### OrbitControls

  * 引入: import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

  ###### 属性： 

  阻尼： enableDamping:Boolean
  自动：autoRotate:Boolean

  **注意在动画循环时调用update**

#### 自适应窗口

* 监听窗口变化 , 重新给渲染器和相机长宽比参数aspect赋值
* 透视相机参数变化后需要更新**updateProjectionMatrix()**

* 增加按钮操作



#### 调试库GUI

* https://github.com/georgealways/lil-gui

* 引入 : import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'

* 自动识别对象属性

* 方法: 

  * 添加: add({key:value},'key')

  * 命名: name('')

  * 修改: onChange(()=>{})

  * 完成后修改: onFinishChange(()=>{})

* 支持链式调用

  *  add(cube.position, 'x', -5, 5).onChange(()=>{})
  * add(cube.position, 'y') .name('立方体y轴位置')  .min(-10)  .max(10) .step(1)

* 文件夹: addFolder('')

* 颜色调试: addColor().onChange(()=>{})



###### 模型

* GLTFLoader()

* load方法

  * 在vue3中放入assets文件中

  * 下载的模型必须全放入文件夹中

  * 设置模型颜色

    ```
    const loader = new GLTFLoader()
    loader.load(
      'src/assets/test/scene.gltf',
      (gltf) => {
        gltf.scene.scale.set(0.01, 0.01, 0.01)
        gltf.scene.rotation.y = 4.5
        gltf.scene.position.x = -1
        gltf.scene.traverse((child) => {
          if (child.isMesh) {
            child.frustumCulled = false
            //模型阴影
            child.castShadow = true
            //模型自发光
            child.material.emissive = child.material.color
            child.material.emissiveMap = child.material.map
          }
        }),
          scene.add(gltf.scene)
      },
      undefined,
      (error) => {
        console.error(error)
      }
    )
    ```

    

  * 

- https://sketchfab.com/3d-models