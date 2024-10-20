import{_ as n,c as a,a4 as p,o as e}from"./chunks/framework.BDeXF6e8.js";const u=JSON.parse('{"title":"双线程架构","description":"","frontmatter":{},"headers":[],"relativePath":"front/wxApp/架构.md","filePath":"front/wxApp/架构.md","lastUpdated":1729410235000}'),t={name:"front/wxApp/架构.md"};function o(l,s,c,i,d,m){return e(),a("div",null,s[0]||(s[0]=[p(`<h1 id="双线程架构" tabindex="-1">双线程架构 <a class="header-anchor" href="#双线程架构" aria-label="Permalink to &quot;双线程架构&quot;">​</a></h1><p>官方文档：</p><ul><li>第 3 章：<em><a href="https://gitee.com/link?target=https%3A%2F%2Fdevelopers.weixin.qq.com%2Febook%3Faction%3Dget_post_info%26docid%3D0000286f908988db00866b85f5640a" target="_blank" rel="noreferrer">https://developers.weixin.qq.com/ebook?action=get_post_info&amp;docid=0000286f908988db00866b85f5640a</a></em></li><li>第 6 章：<em><a href="https://gitee.com/link?target=https%3A%2F%2Fdevelopers.weixin.qq.com%2Febook%3Faction%3Dget_post_info%26docid%3D0006a2289c8bb0bb0086ee8c056c0a" target="_blank" rel="noreferrer">https://developers.weixin.qq.com/ebook?action=get_post_info&amp;docid=0006a2289c8bb0bb0086ee8c056c0a</a></em></li></ul><p>小程序的架构模型有别与传统 web 单线程架构，小程序为双线程架构。</p><p>微信小程序的渲染层与逻辑层分别由两个线程管理，渲染层的界面使用 <code>webview</code> 进行渲染；逻辑层采用 <code>JSCore</code>运行<code>JavaScript</code>代码。小程序的架构图如下。</p><p><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2023-02-14-085008.png" alt="image-20230214165008721"></p><p>可以从图中看出，由于渲染层与逻辑层分开，一个小程序有多个界面，所以渲染层对应存在多个<code>webview</code>。这两个线程之间由<code>Native</code>层进行统一处理。无论是线程之间的通讯、数据的传递、网络请求都由Native层做转发。</p><p>首先，我们来解释一下什么是<code>webview</code></p><p>平常我们浏览网页都是在浏览器中，可以想象<code>webview</code>是一个嵌入式的浏览器，是嵌入在原生应用中的。<code>webview</code> 用来展示网页的 <code>view</code> 组件，该组件是你运行自己的浏览器或者在你的线程中展示线上内容的基础。使用 <code>webkit</code> 渲染引擎来展示，并且支持前进后退、浏览历史、放大缩小、等更多功能。</p><p>简单来说 <code>webview</code> 是手机中内置了一款高性能 <code>webkit</code> 内核浏览器，在 SDK 中封装的一个组件。不过没有提供地址栏和导航栏，只是单纯的展示一个网页界面。</p><p>因此，微信小程序本质上是一个 Hybrid 应用。</p><p>简单回忆一下当前移动端应用的三种模式：</p><ul><li>原生应用（react native）</li><li>WebApp（HTML、CSS、JS）</li><li>Hybrid 应用（uniapp、微信小程序）</li></ul><p>那么，这里采用双线程的好处有哪些呢？在我看来，至少有如下几个点的好处：</p><ul><li>避免单线程阻塞问题</li><li>多个<code>webview</code>更接近于原生应用的体验</li><li>依赖<code>Natvie</code>层做转发，逻辑层与渲染层更加专注于自身的责任</li></ul><p><strong>避免单线程阻塞问题</strong></p><p>我们知道，浏览器在渲染页面时，靠的是渲染线程进行渲染，所有的活儿都依赖于这个单线程，因此页面的渲染和 JS 的执行是互斥的。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;button id=&quot;btn&quot;&gt;阻塞5秒&lt;/button&gt;</span></span>
<span class="line"><span>&lt;div class=&quot;one&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span>&lt;div class=&quot;two&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span>div {</span></span>
<span class="line"><span>  width: 100px;</span></span>
<span class="line"><span>  height: 100px;</span></span>
<span class="line"><span>  background-color: red;</span></span>
<span class="line"><span>  border-radius: 50%;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>.one{</span></span>
<span class="line"><span>  animation: move1 5s infinite alternate;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>.two{</span></span>
<span class="line"><span>  background-color:blue;</span></span>
<span class="line"><span>  position: absolute;</span></span>
<span class="line"><span>  left: 10px;</span></span>
<span class="line"><span>  top: 150px;</span></span>
<span class="line"><span>  animation: move2 5s infinite alternate;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>@keyframes move1 {</span></span>
<span class="line"><span>  0% {</span></span>
<span class="line"><span>    transform: translateX(0);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  100% {</span></span>
<span class="line"><span>    transform: translateX(500px);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>@keyframes move2 {</span></span>
<span class="line"><span>  0% {</span></span>
<span class="line"><span>    left: 10px;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  100% {</span></span>
<span class="line"><span>    left: 500px;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>function delay(duration) {</span></span>
<span class="line"><span>  var start = Date.now();</span></span>
<span class="line"><span>  while (Date.now() - start &lt; duration) {}</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>btn.onclick = function () {</span></span>
<span class="line"><span>  delay(5000);</span></span>
<span class="line"><span>};</span></span></code></pre></div><p>在上面的示例中，一旦我们执行耗时的 JS 操作，那么小球移动的渲染工作就会被搁置。</p><p>但是在小程序中就不存在这个现象，因为它并非像 Web 那样单线程导致 JS 的执行会阻塞页面的渲染。在小程序中，即便执行耗时的 JS 操作，页面仍然能够正常的渲染，不被阻塞。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;button bindtap=&quot;handletap&quot;&gt;阻塞&lt;/button&gt;</span></span>
<span class="line"><span>&lt;view class=&quot;one&quot;&gt;&lt;/view&gt;</span></span>
<span class="line"><span>&lt;view class=&quot;two&quot;&gt;&lt;/view&gt;</span></span>
<span class="line"><span>view {</span></span>
<span class="line"><span>  width: 100px;</span></span>
<span class="line"><span>  height: 100px;</span></span>
<span class="line"><span>  background-color: red;</span></span>
<span class="line"><span>  border-radius: 50%;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>.one {</span></span>
<span class="line"><span>  animation: move1 5s infinite alternate;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>.two {</span></span>
<span class="line"><span>  background-color: blue;</span></span>
<span class="line"><span>  position: absolute;</span></span>
<span class="line"><span>  left: 0px;</span></span>
<span class="line"><span>  top: 150px;</span></span>
<span class="line"><span>  animation: move2 5s infinite alternate;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@keyframes move1 {</span></span>
<span class="line"><span>  0% {</span></span>
<span class="line"><span>    transform: translateX(0);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  100% {</span></span>
<span class="line"><span>    transform: translateX(250px);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@keyframes move2 {</span></span>
<span class="line"><span>  0% {</span></span>
<span class="line"><span>    left: 0px;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  100% {</span></span>
<span class="line"><span>    left: 250px;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>Page({</span></span>
<span class="line"><span>  delay(duration){</span></span>
<span class="line"><span>    console.log(&quot;阻塞开始&quot;);</span></span>
<span class="line"><span>    var start = Date.now();</span></span>
<span class="line"><span>    while (Date.now() - start &lt; duration) {}</span></span>
<span class="line"><span>    console.log(&quot;阻塞结束&quot;);</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  handletap(){</span></span>
<span class="line"><span>    this.delay(5000);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>})</span></span></code></pre></div><p><strong>多个<code>webview</code>更接近于原生应用的体验</strong></p><p>在浏览器的单页应用中，渲染页面是通过路由识别随后动态将页面（组件）挂载到<code>root</code>节点中去，如果单页面应用打开一个新的页面，需要先卸载掉当前页面结构，并且重新渲染。</p><p>但是原生APP并不是这个样子，比较明显的特征为从页面右侧向左划入一个新的页面，并且我们可以同时看到两个页面。</p><p><img src="https://gitee.com/gbsy/imgs/raw/master/typora-img/202410010959207.png" alt="image-20230214203712804"></p><p>多页面应用就很好达到这个效果，新页面直接滑动出来并且覆盖在旧页面上即可，这也是小程序现在所做的形式。多个<code>webview</code>能够加接近原生应用APP的用户体验。</p><p><strong>依赖<code>Natvie</code>层做转发，逻辑层与渲染层更加专注于自身的责任</strong></p><p>双线程的好处不仅仅是一分为二而已，还有强大的<code>Native</code>层做背后支撑。</p><p><code>Native</code>层除了做一些资源的动态注入，还负责着很多的事情，请求的转发，离线存储，组件渲染等等。界面主要由成熟的 Web 技术渲染，辅之以大量的接口提供丰富的客户端原生能力。同时，每个小程序页面都是用不同的WebView去渲染，这样可以提供更好的交互体验，更贴近原生体验，也避免了单个<code>WebView</code>的任务过于繁重。</p><p>有了<code>Native</code>层这么一个靠山后，让逻辑层与渲染层更加专注于自身的责任。</p><h1 id="exparser设计原理" tabindex="-1">Exparser设计原理 <a class="header-anchor" href="#exparser设计原理" aria-label="Permalink to &quot;Exparser设计原理&quot;">​</a></h1><p>本章主要包含以下内容：</p><ul><li>WebComponent原理</li><li>Custom Element原理</li><li>ShadowDOM思想</li><li>Exparser原理</li></ul><h2 id="什么是webcomponent" tabindex="-1">什么是WebComponent? <a class="header-anchor" href="#什么是webcomponent" aria-label="Permalink to &quot;什么是WebComponent?&quot;">​</a></h2><p><code>WebComponent</code> 汉语直译过来第一感觉是web组件的意思，但是它只是一套规则、一套API。你可以通过这些API创建自定义的新的组件，并且组件是可以重复使用的，封装好的组件可以在网页和Web应用程序中进行使用。</p><p>当前的前端开发环境，Vue、React等都基于组件化开发的形式，但是他们的组件生态并不互通，如果你有过两个框架的开发经验的话，你应该知道最烦恼的就是两个框架的UI组件表现不一致的问题。</p><p>我们抽离组件为了提高复用率，提升开发效率。但是脱离了像<code>Vue、React</code>这样的框架后，你会发现，原生JS难道就不能开发自定义组件吗？<code>WebComponent</code>就是为了解决这个问题。</p><p>换一个角度来说，并不是所有的业务场景都需要<code>Vue\\React</code>这样的框架进行开发、也并是都需要工程化。很多业务场景我们需要原生JS、HTML。</p><p>言归正传，<code>WebComponent</code>实现的组件可以和HTML原生标签一起使用，有了这个概念之后，我们看一下它的具体表现形式是怎样的。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;body&gt;</span></span>
<span class="line"><span>  &lt;custom-component&gt;&lt;/custom-component&gt;</span></span>
<span class="line"><span>&lt;/body&gt;</span></span></code></pre></div><p>上面我们看到<code>&lt;body&gt;</code>标签还是我们熟悉的标签，但是<code>&lt;custom-component&gt;</code>标签就是自定义组件的标签了，它不属于html语义化标签中的任何一个，是自定义的。</p><p>接下来我们从这个简单的DEMO入手，对<code>WebComponent</code>进行了解。首先就是三大规范：</p><ul><li>Custom Elements规范</li><li>Template规范</li><li>Shadow DOM规范</li></ul><blockquote><p>MDN：<a href="https://gitee.com/link?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FWeb_Components" target="_blank" rel="noreferrer">https://developer.mozilla.org/zh-CN/docs/Web/Web_Components</a></p></blockquote><h2 id="custom-element" tabindex="-1">Custom Element <a class="header-anchor" href="#custom-element" aria-label="Permalink to &quot;Custom Element&quot;">​</a></h2><p>所谓自定义元素，即当内置元素无法为问题提供解决方案时，自己动手来创建一个自定义元素来解决，上方的<code>&lt;custom-component&gt;</code>就是我们手动创建的自定义元素。</p><p>元素的状态是指定义该元素（或者叫做升级该元素）时元素状态的改变，升级过程是异步的。 元素内部的状态有：</p><ul><li><code>undefined</code> 未升级：即自定义元素还未被define。</li><li><code>failed</code> 升级失败：即define过了也实例化过了，但失败了。会自动按HTMLUnknownElement类来实例化。</li><li><code>uncustomized</code> 未定制化：没有define过但却被实例化了，会自动按HTMLUnknownElement类来实例化。</li><li><code>custom</code> 升级成功：define过并且实例化成功了。</li></ul><p>接下来我们来看一个示例：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;custom-component&gt;&lt;/custom-component&gt;</span></span>
<span class="line"><span>.custom-style{</span></span>
<span class="line"><span>  display: inline-block;</span></span>
<span class="line"><span>  padding: 15px;</span></span>
<span class="line"><span>  border: 1px solid red;</span></span>
<span class="line"><span>  border-radius: 4px;</span></span>
<span class="line"><span>  color: red;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>// 定义自定义组件</span></span>
<span class="line"><span>class CustomComponent extends HTMLElement {</span></span>
<span class="line"><span>  constructor() {</span></span>
<span class="line"><span>    super();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    const box = document.createElement(&quot;div&quot;);</span></span>
<span class="line"><span>    box.className = &quot;custom-style&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    const text = document.createElement(&quot;p&quot;);</span></span>
<span class="line"><span>    text.innerText = &quot;这是一个自定义组件&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    box.appendChild(text);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    this.appendChild(box);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>window.customElements.define(&quot;custom-component&quot;, CustomComponent);</span></span></code></pre></div><p>效果如下：</p><p><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2023-02-15-014800.png" alt="image-20230215094800286"></p><p>首先可以看出，需要有个类的概念。自定义元素类必须继承自window内置的<code>HTMLElement</code>类。</p><p>然后在<code>constructor</code>中定义类一些标记模版，定义模板后，执行<code>this.appendChild</code>，其中<code>this</code>指向了当前类实例。</p><p>最后将自定义组件挂载到<code>customElements</code>上，通过<code>window.customElements.define</code>方法。这个时候注意了，需要给自定义组件起一个名字，可以看到上面例子中我起的名字为<code>custom-component</code>。起名字是有规则的，规则如下：</p><ul><li>自定义元素的名称，<strong>必须</strong>包含短横线（-）。它可以确保html解析器能够区分常规元素和自定义元素，还能确保html标记的兼容性。</li><li>自定义元素只能一次定义一个，一旦定义无法撤回。</li><li>自定义元素不能单标记封闭。比如<code>&lt;custom-component /&gt;</code>，必须写一对开闭标记。比如 <code>&lt;custom-component&gt;&lt;/custom-component&gt;</code>。</li></ul><p>对于自定义组件挂载的相关API：</p><ul><li><code>window.customElement.define(&#39;custom-component&#39;, CustomComponent, extendsInit)</code> // 定义一个自定义元素</li><li><code>window.customElement.get(&#39;custom-component&#39;)</code> // 返回已定义的自定义元素的构造函数</li><li><code>window.customElement.whenDefined(&#39;custom-component&#39;)</code> // 接收一个promise对象，是当定义自定义元素时返回的，可监听元素状态变化但无法捕捉内部状态值。</li></ul><p>其中<code>window.customElement.whenDefined</code>方法监听的元素状态为上述讲解的四种元素状态中的： <code>failed</code>升级失败和<code>custom</code>升级成功。</p><p>这里有个问题，我们demo里的dom结构比较简单，所以我们通过<code>document.createElement</code>、<code>appendChild</code>方法进行构建还不算复杂，如果dom结构很复杂的组件怎么办呢？一顿使用createElement也不是个办法。这个时候我们就要引入<code>&lt;template&gt;</code>标记了。</p><h3 id="template" tabindex="-1">Template <a class="header-anchor" href="#template" aria-label="Permalink to &quot;Template&quot;">​</a></h3><p><code>Web Components API</code> 提供了<code>&lt;template&gt;</code>标签，可以在它里面使用HTML定义DOM结构。这样的话我们改版一下我们的自定义组件：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;custom-component&gt;&lt;/custom-component&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;template id=&quot;constomCompinentTemplate&quot;&gt;</span></span>
<span class="line"><span>  &lt;div class=&quot;custom-style&quot;&gt;</span></span>
<span class="line"><span>    &lt;p&gt;这是一个自定义组件&lt;/p&gt;</span></span>
<span class="line"><span>  &lt;/div&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span>// 定义自定义组件</span></span>
<span class="line"><span>class CustomComponent extends HTMLElement {</span></span>
<span class="line"><span>  constructor() {</span></span>
<span class="line"><span>    super();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    const template = document.getElementById(&quot;constomCompinentTemplate&quot;);</span></span>
<span class="line"><span>    const content = template.content.cloneNode(true);</span></span>
<span class="line"><span>    this.appendChild(content);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>window.customElements.define(&quot;custom-component&quot;, CustomComponent);</span></span></code></pre></div><p>这里有两个需要考虑的地方：</p><ol><li>这里因为是demo演示所以把<code>&lt;template&gt;</code>标签写在了一起，其实可以用脚本把<code>&lt;template&gt;</code>注入网页。这样的话，JavaScript 脚本跟<code>&lt;template&gt;</code>就能封装成一个 JS 文件，成为独立的组件文件。网页只要加载这个脚本，就能使用<code>&lt;custom-component&gt;</code>组件。</li><li><code>&lt;template&gt;</code>标签内的节点进行操作必须通过<code>template.content</code>返回的节点来操作。因为这里获取的<code>template</code>并不是一个正常的DOM结构，在控制台打印一下<code>template.content</code>得到的结果是<code>#document-fragment</code>。它其实是<code>DocumentFragment</code>节点，里面才是真正的结构。而且这个模板还要留给其他实例使用，所以不能直接移动它的子元素</li></ol><p>在 Vue 和 React 中使用组件时，我们经常涉及到 props 的传递，例如：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;custom-component&gt;&lt;/custom-component&gt;</span></span>
<span class="line"><span>&lt;custom-component text=&quot;显示这个文本&quot;&gt;&lt;/custom-component&gt;</span></span></code></pre></div><p>传入自定义的文本text，如果有text内容那么就展示text，如果没有，那么展示默认值。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;template id=&quot;constomCompinentTemplate&quot;&gt;</span></span>
<span class="line"><span>  &lt;style&gt;</span></span>
<span class="line"><span>    .custom-style {</span></span>
<span class="line"><span>      display: inline-block;</span></span>
<span class="line"><span>      padding: 15px;</span></span>
<span class="line"><span>      border: 1px solid red;</span></span>
<span class="line"><span>      border-radius: 4px;</span></span>
<span class="line"><span>      color: red;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  &lt;/style&gt;</span></span>
<span class="line"><span>  &lt;div class=&quot;custom-style&quot;&gt;</span></span>
<span class="line"><span>    &lt;p class=&quot;component-text&quot;&gt;这是一个自定义组件&lt;/p&gt;</span></span>
<span class="line"><span>  &lt;/div&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span>// 定义自定义组件</span></span>
<span class="line"><span>class CustomComponent extends HTMLElement {</span></span>
<span class="line"><span>  constructor() {</span></span>
<span class="line"><span>    super();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    const template = document.getElementById(&quot;constomCompinentTemplate&quot;);</span></span>
<span class="line"><span>    const content = template.content.cloneNode(true);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 从 this 上获取 text 属性，如果有值就赋值给 content</span></span>
<span class="line"><span>    const textValue = this.getAttribute(&quot;text&quot;);</span></span>
<span class="line"><span>    if(textValue){</span></span>
<span class="line"><span>      content.querySelector(&quot;.component-text&quot;).innerHTML = textValue;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    this.appendChild(content);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>window.customElements.define(&quot;custom-component&quot;, CustomComponent);</span></span></code></pre></div><p>你看，这样之后就可以传入参数了，但是我们平常使用组件的时候是可以嵌套的，我们不仅仅需要参数注入的形式，还需要嵌套的children形式。继续修改自定义组件。</p><h4 id="slot" tabindex="-1">slot <a class="header-anchor" href="#slot" aria-label="Permalink to &quot;slot&quot;">​</a></h4><p>WebComponent有一个slot概念，插槽，提供了一个“缺口”让给需要嵌套的dom。用法和Vue是比较相似的，例如：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;custom-component&gt;</span></span>
<span class="line"><span>  &lt;p slot=&quot;my-text&quot;&gt;这是插入的内容！&lt;/p&gt;</span></span>
<span class="line"><span>&lt;/custom-component&gt;</span></span>
<span class="line"><span>&lt;custom-component text=&quot;显示这个文本&quot;&gt;&lt;/custom-component&gt;</span></span>
<span class="line"><span>&lt;p class=&quot;custom-style&quot;&gt;这是一个测试&lt;/p&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;template id=&quot;constomCompinentTemplate&quot;&gt;</span></span>
<span class="line"><span>  &lt;style&gt;</span></span>
<span class="line"><span>    .custom-style {</span></span>
<span class="line"><span>      display: inline-block;</span></span>
<span class="line"><span>      padding: 15px;</span></span>
<span class="line"><span>      border: 1px solid red;</span></span>
<span class="line"><span>      border-radius: 4px;</span></span>
<span class="line"><span>      color: red;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  &lt;/style&gt;</span></span>
<span class="line"><span>  &lt;div class=&quot;custom-style&quot;&gt;</span></span>
<span class="line"><span>    &lt;p class=&quot;component-text&quot;&gt;这是一个自定义组件&lt;/p&gt;</span></span>
<span class="line"><span>    &lt;slot name=&quot;my-text&quot;&gt;插槽默认内容&lt;/slot&gt;</span></span>
<span class="line"><span>  &lt;/div&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span>// 定义自定义组件</span></span>
<span class="line"><span>class CustomComponent extends HTMLElement {</span></span>
<span class="line"><span>  constructor() {</span></span>
<span class="line"><span>    super();</span></span>
<span class="line"><span>    const shadow = this.attachShadow({ mode: &quot;closed&quot; });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    const template = document.getElementById(&quot;constomCompinentTemplate&quot;);</span></span>
<span class="line"><span>    const content = template.content.cloneNode(true);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 从 this 上获取 text 属性，如果有值就赋值给 content</span></span>
<span class="line"><span>    const textValue = this.getAttribute(&quot;text&quot;);</span></span>
<span class="line"><span>    if (textValue) {</span></span>
<span class="line"><span>      content.querySelector(&quot;.component-text&quot;).innerHTML = textValue;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    shadow.appendChild(content);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>window.customElements.define(&quot;custom-component&quot;, CustomComponent);</span></span></code></pre></div><p>在上面的代码中，我们使用到了 slot 插槽，代码本身比较容易理解，但是注意我们这边还引入了一个新的东西，就是 shadow，这也是 webcomponents 的三大特性之一，shadow DOM中的结构是与外界隔离的，外界是无法获取到内部dom的，它可以理解为一颗单独的dom树，隐藏的dom树。因此组件内部的样式也和外界完全隔离，即使下面的 p 也使用了 custom-style 的类名。</p><p>有关shadow DOM将会在后面具体进行介绍。</p><h4 id="事件" tabindex="-1">事件 <a class="header-anchor" href="#事件" aria-label="Permalink to &quot;事件&quot;">​</a></h4><p>有了参数之后不能离开事件Event，对吧，我们想添加一个文本的点击事件。继续来改造升级。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 定义自定义组件</span></span>
<span class="line"><span>class CustomComponent extends HTMLElement {</span></span>
<span class="line"><span>  constructor() {</span></span>
<span class="line"><span>    super();</span></span>
<span class="line"><span>    const shadow = this.attachShadow({ mode: &quot;closed&quot; });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    const template = document.getElementById(&quot;constomCompinentTemplate&quot;);</span></span>
<span class="line"><span>    const content = template.content.cloneNode(true);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 从 this 上获取 text 属性，如果有值就赋值给 content</span></span>
<span class="line"><span>    const textValue = this.getAttribute(&quot;text&quot;);</span></span>
<span class="line"><span>    const textDOM = content.querySelector(&quot;.component-text&quot;);</span></span>
<span class="line"><span>    if (textValue) {</span></span>
<span class="line"><span>      textDOM.innerHTML = textValue;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 绑定事件</span></span>
<span class="line"><span>    textDOM.addEventListener(&quot;click&quot;, (e) =&gt; {</span></span>
<span class="line"><span>      e.stopPropagation();</span></span>
<span class="line"><span>      alert(&quot;Hello Web Components&quot;);</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    shadow.appendChild(content);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>window.customElements.define(&quot;custom-component&quot;, CustomComponent);</span></span></code></pre></div><p>在上面的demo中，我们为里面的 p 元素绑定了一个点击事件，并且使用了<code>e.stopPropagation()</code>方法阻止了事件冒泡。</p><p>这里有个知识点，自定义事件 <code>new Event()</code>中，options有几个参数可以设置冒泡行为方式，其中就有关于<code>Shadow DOM</code>的。我们来看一下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var options = {</span></span>
<span class="line"><span>  detail : {</span></span>
<span class="line"><span>    ...</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  composed: false, // Boolean 类型，默认值为 false，指示事件是否会在 ShadowDOM 根节点之外触发侦听器</span></span>
<span class="line"><span>  bubbles: true, // Boolean 类型，默认值为 false，表示该事件是否冒泡</span></span>
<span class="line"><span>  canceable: false // Boolean 类型，默认值为 false，表示该事件是否能被取消</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>var myEvent = new CustomEvent(eventname, options);</span></span></code></pre></div><h2 id="shadow-dom" tabindex="-1">Shadow DOM <a class="header-anchor" href="#shadow-dom" aria-label="Permalink to &quot;Shadow DOM&quot;">​</a></h2><p>Shadow DOM 允许将隐藏的 DOM 树附加到常规的 DOM 树中——它以 shadow root 节点为起始根节点，在这个根节点的下方，可以是任意元素，和普通的 DOM 元素一样。</p><p><img src="https://gitee.com/gbsy/imgs/raw/master/typora-img/202410010935383.png" alt="image-20230215104608599"></p><p>把本来DOM树中的一部分封装起来，并且隐藏起来，隐藏起来的树概念为Shadow Tree。把它理解成DOM上一棵特殊的子树，称之为shadow tree或影子树。也是树，但是很特殊，树里面也是DOM，就像我们上面用document.createElement创建的DOM一样。</p><p>影子树的根节点，我们称之为<code>shadow root</code>或<code>影子根</code>。</p><p>影子根的父节点，我称之为宿主<code>shadow host</code></p><p><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2023-02-15-025037.png" alt="image-20230215105036312"></p><p>在自定义元素中，里面的结构已经变成了Shadow DOM。顺带说下<code>attachShadow</code>中的mode参数有两种值“open”、“closed”；</p><ul><li><code>open</code>： 表示可以通过页面内的 JavaScript 方法来获取 Shadow DOM，例如使用 Element.shadowRoot 属性：</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let myShadowDom = myCustomElem.shadowRoot;</span></span></code></pre></div><ul><li><code>closed</code>： 那么就不可以从外部获取<code>Shadow DOM了</code>。<code>myCustomElem.shadowRoot</code> 将会返回 null</li></ul><p>ShadowDOM的概念在HTML中非常常见，举一个例子，在 HTML 中有 Video 标签</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;video </span></span>
<span class="line"><span> src=&quot;http://maoyan.meituan.net/movie/videos/854x4804c109134879943f4b24387adc040504b.mp4&quot;</span></span>
<span class="line"><span> controls</span></span>
<span class="line"><span> width=&quot;500&quot;</span></span>
<span class="line"><span>&gt;&lt;/video&gt;</span></span></code></pre></div><p>当我们使用该标签渲染一个视频的时候，会发现页面中会呈现出来一个完整的播放器，里面有播放视频的进度条、播放按钮、音量调节等。明明只有一个标签，为什么内部有如此丰富的内容呢？</p><p><img src="https://gitee.com/gbsy/imgs/raw/master/typora-img/202410010935257.png" alt="image-20230215110726053"></p><p>打开控制台查看结构时，看到的也仅仅是一个 video 标签而已，我们可以打开控制台的【设置】，勾选上【显示用户代理Shadow DOM】</p><p><img src="https://gitee.com/gbsy/imgs/raw/master/typora-img/202410010935162.png" alt="image-20230215111137642"></p><p>之后就可以看到在 video 中的 shadowDOM了</p><p><img src="https://gitee.com/gbsy/imgs/raw/master/typora-img/202410010935368.png" alt="image-20230215111304144"></p><p>因此，像img、button、input、textarea、select、radio、checkbox，video等等这些标签是不可以作为宿主的，因为它们本身内部就已经有shadowDOM了。</p><h2 id="exparser框架原理" tabindex="-1">Exparser框架原理 <a class="header-anchor" href="#exparser框架原理" aria-label="Permalink to &quot;Exparser框架原理&quot;">​</a></h2><p><code>Exparser</code>是微信小程序的组件组织框架，内置在小程序基础库中，为小程序提供各种各样的组件支撑。内置组件和自定义组件都有Exparser组织管理。</p><p>有关<code>Exparser</code>可参阅官网：<em><a href="https://gitee.com/link?target=https%3A%2F%2Fdevelopers.weixin.qq.com%2Febook%3Faction%3Dget_post_info%26docid%3D0000aac998c9b09b00863377251c0a" target="_blank" rel="noreferrer">https://developers.weixin.qq.com/ebook?action=get_post_info&amp;docid=0000aac998c9b09b00863377251c0a</a></em></p><h1 id="wxss编译原理和适配" tabindex="-1">WXSS编译原理和适配 <a class="header-anchor" href="#wxss编译原理和适配" aria-label="Permalink to &quot;WXSS编译原理和适配&quot;">​</a></h1><p>前面我们有讲过，微信小程序的本质是一个 Hybrid 应用，在App组件中有一个 WebView 的组件可以用来显示网页。</p><p>而如果你把浏览器想象成两部分，那么一部分是 <em>UI</em>（地址栏，导航栏按钮等），其它部分是把标记跟代码转换成我们可见和可交互视图的浏览器引擎。</p><p><img src="https://gitee.com/gbsy/imgs/raw/master/typora-img/202410010942207.png" alt="image-20220222115102001"></p><p><em>WebView</em> 就是浏览器引擎部分，你可以像插入 <em>iframe</em> 一样将 <em>Webview</em> 插入到你的原生应用中，并且编程化的告诉它将会加载什么网页内容。这样我们可以用它来作为我们原生 <em>app</em> 的视觉部分。当你使用原生应用时，<em>WebView</em> 可能只是被隐藏在普通的原生 <em>UI</em> 元素中，你甚至用不到注意到它。</p><p><img src="https://gitee.com/gbsy/imgs/raw/master/typora-img/202410010942119.png" alt="image-20220222115121519"></p><p>明确了这一点之后，那么我们可以知道，最终微信小程序中的 <code>WXML</code> 以及 <code>WXSS</code> 还是离不开原生的 <code>HTML、CSS</code></p><p>有关 <code>WXML</code> 之前我们已经看过了，实际上就是使用的类似 <code>WebComponents</code> 来自定义的组件。</p><p>那么 <code>WXSS</code> 呢？</p><p><code>WXSS</code>并不可以直接执行在<code>webview</code>层进行渲染，而是通过了一层编译。我们接下来就带大家编译一个<code>WXSS</code>看一下。</p><p>编译的工具名字叫<code>WCSC</code>，这个编译的过程是在微信开发者工具端执行的，那么这个编译工具在哪呢，我们来找一下。在微信开发者工具的控制台界面，输入<code>help()</code>命令可见如所示界面。</p><p><img src="https://gitee.com/gbsy/imgs/raw/master/typora-img/202410010942134.png" alt="image-20230215141015364"></p><blockquote><p>如果help( )函数执行后无效果或者抛错，请检查控制台下方位置是否为top选项卡。</p></blockquote><p>可以看到这里有一些命令。我们继续在控制台执行第八条<code>openVendor()</code>命令。</p><p>这时候弹出了一个名为<code>WeappVendor</code>的文件夹。在我截图的这个顺序里，可以看到最后一个文件名称正是我们要寻找的<code>WCSC</code>。文件种类是可执行文件。<code>WXSS</code>正是用这个工具来编译的。</p><p><img src="https://gitee.com/gbsy/imgs/raw/master/typora-img/202410010942105.png" alt="image-20230215141122926"></p><p>我们找到了<code>WCSC</code>编译工具后，把这个工具复制到项目的<code>pages/index</code>目录下，与<code>index.wxss</code>同目录。</p><p><img src="https://gitee.com/gbsy/imgs/raw/master/typora-img/202410010942089.png" alt="image-20230215141202360"></p><p>把终端目录打开到<code>pages/index</code>目录中。执行：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>./wcsc -js index.wxss &gt;&gt; wxss.js</span></span></code></pre></div><p>这时候可以看到目录中多了一个<code>wxss.js</code>文件。</p><p><code>wxss.js</code>文件就是<code>WXSS</code>文件编译后的文件，<code>index.wxss</code>文件会先通过<code>WCSC</code>可执行程序文件编译成<code>js</code>文件。并不是直接编译成<code>css</code>文件。</p><p>那么我们直接看一下内部代码是怎样的呢。</p><p>这里我拆成了三部分来看，三部分加一起就是完整的代码。第一部分：<code>设备信息</code>。</p><p><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2023-02-15-061435.png" alt="image-20230215141434913"></p><p>这个部分用于获取一套基本设备信息，包含<code>设备高度</code>、<code>设备宽度</code>、<code>物理像素与CSS像素比例</code>、<code>设备方向</code>。</p><p><img src="https://gitee.com/gbsy/imgs/raw/master/typora-img/202410010942106.png" alt="image-20230215141502522"></p><p>这里就是<code>rpx转化</code>的方法了，<code>rpx转化</code>的具体算法就是中间那两句，并且做了一个精度收拢的优化。把那两句单独提取出来再看一下，平常在开发中自己写一个这样的方法也是一种不错的选择。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>number = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);</span></span>
<span class="line"><span>number = Math.floor(number + eps);</span></span></code></pre></div><p><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2023-02-15-061653.png" alt="image-20230215141653173"></p><p>最后这一段代码比较长，看到方法名称我们就可以猜到这个函数是干嘛用的了<code>setCssToHead</code>。</p><p>首先看到最下方执行<code>setCssToHead</code>方法时候的传入参数。隐约可以看出来是我们在<code>index.wxss</code>之中写入的样式。但是仔细一看，格式不太一样了，变成了结构化数据，方便遍历处理，并且处理后便于<code>makeup</code>组装。还哪里不一样了呢，可以看到其中在<code>index.wxss</code>中写<code>rpx</code>单位的属性都变成了区间的样子<code>[0, 128]</code>、<code>[0, 20]</code>。其他单位并没有转换。这样的话就可以方便的识别哪里写了<code>rpx</code>单位，然后执行第二部分的<code>transformRPX</code>方法即可。</p><p><code>makeup</code>组装之后，创建<code>&lt;style&gt;</code>标记，插入到<code>&lt;head&gt;</code>中。</p><p>这就是整个 <code>WXSS</code> 编译后得到的结果，编译后的 <code>JS</code> 代码是通过<code>eval</code>方法注入执行，这样的话完成了<code>WXSS</code>的一整套流程</p>`,138)]))}const g=n(t,[["render",o]]);export{u as __pageData,g as default};
