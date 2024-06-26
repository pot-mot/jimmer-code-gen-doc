import { defineConfig } from 'vitepress'

export default defineConfig({
    title: 'Jimmer Code Gen',
    description: '旨在快捷创建 Jimmer 下实体与关联',
    base: '/jimmer-code-gen-doc/',
    head: [
        ['link', {rel: 'icon', href: 'logo.png'}]
    ],

    markdown: {
        lineNumbers: true,
    },

    lastUpdated: true,

    themeConfig: {
        search: {
            provider: 'local'
        },

        logo: '/logo.svg',

        lastUpdated: {
            text: 'Last edit time'
        },

        outline: {
            label: 'Outline',
            level: [2, 4]
        },

        docFooter: {prev: 'prev', next: 'next'},

        socialLinks: [
            {icon: 'github', link: 'https://github.com/pot-mot/jimmer-code-gen-kotlin'},
        ],

        editLink: {
            pattern: 'https://github.com/pot-mot/jimmer-code-gen-doc/tree/main/docs/:path'
        },

        sidebar: [
            {
                text: '简介',
                link: '/start/introduce.html'
            },
            {
                text: '快速开始',
                link: '/start/quick-start.html',
            },
            {
                text: '源码启动',
                link: '/start/source-start.html',
            },
            {
                text: '生成配置',
                link: '/start/config.html',
            },
            {
                text: '功能',
                items: [
                    {
                        text: '表继承',
                        link: '/feature/table-inherit.html',
                    },
                    {
                        text: '复制黏贴',
                        link: '/feature/copy-and-paste.html',
                    },
                    {
                        text: '列默认',
                        link: '/feature/column-default.html',
                    }
                ]
            },
            {
                text: '示例',
                items: [
                    {
                        text: '一对多 / 多对一',
                        link: '/example/many-to-one.html'
                    },
                    {
                        text: '一对一',
                        link: '/example/one-to-one.html'
                    },
                    {
                        text: '多对多',
                        link: '/example/many-to-many.html'
                    }
                ]
            },
            {
                text: '前端',
                link: '/frontend/index.html',
                items: [
                    {
                        text: '图交互',
                        link: '/frontend/graph.html'
                    },
                    {
                        text: 'Debug 与消息反馈',
                        link: '/frontend/debug-and-message.html'
                    },
                ]
            },
            {
                text: '后端',
                link: '/backend/index.html',
                items: [
                    {
                        text: 'TableDefine 生成',
                        link: '/backend/generate-table-define.html'
                    },
                    {
                        text: 'Entity 生成',
                        link: '/backend/generate-entity.html'
                    },
                    {
                        text: '支持其他数据源',
                        link: '/backend/other-datasource.html'
                    },
                ]
            },
        ],
    }
})
