export default {
    title: 'Jimmer Code Gen',
    description: '旨在快捷创建 Jimmer 下实体与关联',
    base: '/jimmer-code-gen-doc/',
    head: [
        ['link', {rel: 'icon', href: '/logo.png'}]
    ],

    markdown: {
        lineNumbers: true,
    },

    lastUpdated: true,

    themeConfig: {
        logo: '/logo.svg',

        lastUpdatedText: 'Last edit time',

        outline: [2, 4],

        outlineTitle: 'Outline',

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
                link: '/introduce/index.html'
            },
            {
                text: '快速开始',
                link: '/quick-start/index.html'
            },
            {
                text: '生成演示',
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
                    }
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
}
