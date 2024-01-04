import{_ as e,c as a,o as r,U as t}from"./chunks/framework.s8P_zT9m.js";const i="/jimmer-code-gen-doc/assets/model-edit.yupML1Gp.png",n="/jimmer-code-gen-doc/assets/model-config.vRGwAcX6.png",l="/jimmer-code-gen-doc/assets/table-edit.rikwiJ2Q.png",o="/jimmer-code-gen-doc/assets/enum-edit.-wlc07tS.png",s="/jimmer-code-gen-doc/assets/code-preview.dN9tyVPY.png",k=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"introduce/index.md","filePath":"introduce/index.md"}'),p={name:"introduce/index.md"},c=t('<h1 style="font-size:50px;font-weight:800;line-height:2em;">Jimmer Code Gen</h1><p>一款模型设计与代码生成器，旨在快捷创建 <a href="https://github.com/babyfish-ct/jimmer" target="_blank" rel="noreferrer">Jimmer</a> 下的实体与关联。</p><p>实现了可视化的设计数据库关联模型并转化成 jimmer 实体。</p><h2 id="功能预览" tabindex="-1">功能预览 <a class="header-anchor" href="#功能预览" aria-label="Permalink to &quot;功能预览&quot;">​</a></h2><h3 id="模型设计" tabindex="-1">模型设计 <a class="header-anchor" href="#模型设计" aria-label="Permalink to &quot;模型设计&quot;">​</a></h3><p><img src="'+i+'" alt="model-edit"></p><h3 id="模型配置" tabindex="-1">模型配置 <a class="header-anchor" href="#模型配置" aria-label="Permalink to &quot;模型配置&quot;">​</a></h3><p><img src="'+n+'" alt="model-config.png"></p><h3 id="表设计" tabindex="-1">表设计 <a class="header-anchor" href="#表设计" aria-label="Permalink to &quot;表设计&quot;">​</a></h3><p><img src="'+l+'" alt="table-edit.png"></p><h3 id="枚举编辑" tabindex="-1">枚举编辑 <a class="header-anchor" href="#枚举编辑" aria-label="Permalink to &quot;枚举编辑&quot;">​</a></h3><p><img src="'+o+'" alt="enum-edit.png"></p><h3 id="代码预览" tabindex="-1">代码预览 <a class="header-anchor" href="#代码预览" aria-label="Permalink to &quot;代码预览&quot;">​</a></h3><p><img src="'+s+'" alt="code-preview.png"></p><h2 id="依赖说明" tabindex="-1">依赖说明 <a class="header-anchor" href="#依赖说明" aria-label="Permalink to &quot;依赖说明&quot;">​</a></h2><p>前后端项目均完全基于 Jimmer ORM 的持久化与前后端免对接实现，更多关于 Jimmer 本身的信息请参阅 <a href="https://babyfish-ct.github.io/jimmer/zh/" target="_blank" rel="noreferrer">Jimmer 官方文档</a>。</p><p>除了 Jimmer 这一核心，本项目还使用了以下技术栈：</p><p>后端</p><ul><li><a href="https://www.schemacrawler.com/" target="_blank" rel="noreferrer">SchemaCrawler</a>：数据库元数据的统一获取。</li><li>（目前尚未正式使用）<a href="https://www.liquibase.org/" target="_blank" rel="noreferrer">Liquibase</a>：逆向模型为 sql。</li></ul><p>前端</p><ul><li><a href="https://x6.antv.antgroup.com/" target="_blank" rel="noreferrer">AntV/X6</a>：图可视化操作。</li><li><a href="https://element-plus.org/zh-CN/" target="_blank" rel="noreferrer">Element-Plus</a>：业务 UI 组件。</li><li><a href="https://pinia.vuejs.org/zh/" target="_blank" rel="noreferrer">pinia</a> 与 <a href="https://www.npmjs.com/package/mitt" target="_blank" rel="noreferrer">mitt</a>: 状态关联与事件分发。</li><li><a href="https://www.npmjs.com/package/typescript-json-schema" target="_blank" rel="noreferrer">typescript-json-schema</a> 与 <a href="https://www.npmjs.com/package/ajv" target="_blank" rel="noreferrer">ajv</a>： 实现运行时校验。</li><li><a href="https://www.npmjs.com/package/jszip" target="_blank" rel="noreferrer">jszip</a> 和 <a href="https://www.npmjs.com/package/file-saver" target="_blank" rel="noreferrer">file-save</a>：完全在前端进行的 zip 压缩与文件下载。</li><li><a href="https://antoniandre.github.io/splitpanes/" target="_blank" rel="noreferrer">splitpanes</a>：伸缩布局。</li><li><a href="https://www.npmjs.com/package/vue3-draggable-resizable" target="_blank" rel="noreferrer">vue3-draggable-resizable</a>： 可拖曳变形的对话框。</li></ul>',21),h=[c];function m(d,g,f,_,b,u){return r(),a("div",null,h)}const j=e(p,[["render",m]]);export{k as __pageData,j as default};
