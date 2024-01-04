
export default {
    title: 'Jimmer Code Gen',
    description: '旨在快捷创建 Jimmer 下实体与关联',
    base: '/jimmer-code-gen-doc/',
    head:[
        ['link', { rel: 'icon', href: '/jimmer-code-gen-doc/images/logo.png' }]
    ],

    markdown: {
        lineNumbers: true,
    },

    themeConfig: {
        logo: '/images/logo.svg',
        siteTitle: 'Jimmer Code Gen',

        socialLinks: [
            { icon: 'github', link: 'https://github.com/babyfish-ct/jimmer' },
        ],

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
                        text: '多对一',
                        link: '/frontend/many-to-one.html'
                    },
                    {
                        text: '一对一',
                        link: '/frontend/one-to-one.html'
                    },
                    {
                        text: '多对多',
                        link: '/frontend/many-to-many.html'
                    }
                ]
            },
            {
                text: '前端',
                link: '/frontend/index.html',
                items: [
                    {
                        text: '图操作',
                        link: '/frontend/graph.html'
                    },
                    {
                        text: '工具栏',
                        link: '/frontend/tool-bar.html'
                    }
                ]
            },
            {
                text: '后端',
                link: '/backend/index.html',
                items: [
                    {
                        text: 'Table Define 生成',
                        link: '/backend/generate-table-define.html'
                    },
                    {
                        text: 'Entity 生成',
                        link: '/backend/generate-entity.html'
                    },
                ]
            },
        ],
    }
}
